import logger from 'dwk-logger';
import { SHARED_VOLUME, WIKIPEDIA, ERROR_MESSAGES } from '../utils/constants';
import {
  ensureDirectory,
  extractPageTitle,
  formatSeconds,
  getErrorMessage,
  getRandomNumber,
} from '../utils/utilities';
import fs from 'fs/promises';
import path from 'path';

/**
 * @description Fetches random Wikipedia page and save to shared volume
 * Random pages overwrite each other (same filename)
 * @author Luca Cattide
 * @date 25/01/2026
 * @returns {Promise<void>}
 */
const fetchAndSaveRandomPage = async (): Promise<void> => {
  try {
    logger.info(ERROR_MESSAGES.FETCHING_RANDOM);

    const { default: axios } = await import('axios');
    const response = await axios.get(
      `${WIKIPEDIA.BASE_URL}${WIKIPEDIA.PAGES.RANDOM.PATH}`,
      {
        timeout: WIKIPEDIA.REQUEST.TIMEOUT,
        maxRedirects: WIKIPEDIA.REQUEST.MAX_REDIRECTS,
        headers: {
          'User-Agent': WIKIPEDIA.REQUEST.USER_AGENT,
        },
      }
    );

    const pageTitle = extractPageTitle(response.data);
    const filename = WIKIPEDIA.PAGES.RANDOM.FILENAME;
    const filePath = path.join(SHARED_VOLUME, filename);

    await ensureDirectory(SHARED_VOLUME);
    await fs.writeFile(filePath, response.data, 'utf-8');

    logger.info(`${ERROR_MESSAGES.SAVED_RANDOM_PAGE} "${pageTitle}" ${ERROR_MESSAGES.TO_FILE}: ${filename}`);
  } catch (error: unknown) {
    logger.error(
      `${ERROR_MESSAGES.FETCH_RANDOM_FAILED}: ${getErrorMessage(error)}`
    );
  }
};

/**
 * @description Calculates delay and wait
 * @author Luca Cattide
 * @date 25/01/2026
 * @returns {Promise<void>}
 */
const waitForNextFetch = async (): Promise<void> => {
  const { RANDOM_MIN_SECONDS, RANDOM_MAX_SECONDS } = WIKIPEDIA.TIMINGS;
  const delaySeconds = getRandomNumber(RANDOM_MIN_SECONDS, RANDOM_MAX_SECONDS);

  logger.info(`${ERROR_MESSAGES.WAITING_NEXT_FETCH} ${formatSeconds(delaySeconds)} ${ERROR_MESSAGES.BEFORE_NEXT_FETCH}`);

  await new Promise((resolve) => setTimeout(resolve, delaySeconds * 1000));
};

/**
 * @description Main sidecar loop
 * Fetches random Wikipedia pages periodically
 * @author Luca Cattide
 * @date 25/01/2026
 * @returns {Promise<void>}
 */
const main = async (): Promise<void> => {
  logger.info(
    `${ERROR_MESSAGES.SIDECAR_STARTED}\nBase URL: ${WIKIPEDIA.BASE_URL}\nWait time: ${formatSeconds(WIKIPEDIA.TIMINGS.RANDOM_MIN_SECONDS)} to ${formatSeconds(WIKIPEDIA.TIMINGS.RANDOM_MAX_SECONDS)}`
  );

  while (true) {
    try {
      await fetchAndSaveRandomPage();
      await waitForNextFetch();
    } catch (error: unknown) {
      logger.error(`${ERROR_MESSAGES.UNEXPECTED_ERROR_IN_LOOP}: ${getErrorMessage(error)}`);
      logger.info(ERROR_MESSAGES.SIDECAR_CONTINUING);

      // Wait a bit before retrying after an error
      await new Promise((resolve) =>
        setTimeout(resolve, WIKIPEDIA.ERROR_BACKOFF_MS)
      );
    }
  }
};

main().catch((error: Error) => {
  logger.error(`${ERROR_MESSAGES.SIDECAR_FAILED_FATALLY}: ${error.message}`);
  process.exit(1);
});
