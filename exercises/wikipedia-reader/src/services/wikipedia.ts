import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import logger from 'dwk-logger';
import {
  SHARED_VOLUME,
  WIKIPEDIA,
  ERROR_MESSAGES,
} from '../utils/constants';
import {
  ensureDirectory,
  getErrorMessage,
} from '../utils/utilities';

/**
 * @description Fetch Wikipedia page and save to shared volume
 * @author Luca Cattide
 * @date 25/01/2026
 * @param {string} pageUrl - Wikipedia page URL path
 * @param {string} filename - Target filename
 * @returns {Promise<void>}
 */
const fetchAndSavePage = async (
  pageUrl: string,
  filename: string
): Promise<void> => {

  try {
    logger.info(`Fetching Wikipedia page: ${WIKIPEDIA.BASE_URL}${pageUrl}`);

    const response = await axios.get(
      `${WIKIPEDIA.BASE_URL}${pageUrl}`,
      {
        timeout: WIKIPEDIA.REQUEST.TIMEOUT,
        maxRedirects: WIKIPEDIA.REQUEST.MAX_REDIRECTS,
        headers: {
          'User-Agent': WIKIPEDIA.REQUEST.USER_AGENT,
        },
      }
    );
    const filePath = path.join(SHARED_VOLUME, filename);

    await ensureDirectory(SHARED_VOLUME);
    await fs.writeFile(filePath, response.data, 'utf-8');

    logger.info(`Saved page to: ${filePath}`);
  } catch (error: unknown) {
    logger.error(`${ERROR_MESSAGES.FETCH_RANDOM_FAILED}: ${getErrorMessage(error)}`);
  }
};

export { fetchAndSavePage };
