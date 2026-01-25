import logger from 'dwk-logger';
import { fetchAndSavePage } from './wikipedia';
import { WIKIPEDIA, ERROR_MESSAGES } from '../utils/constants';

/**
 * @description Init container main logic
 * Fetches Kubernetes Wikipedia page at pod startup
 * Runs once and exits
 * @author Luca Cattide
 * @date 25/01/2026
 * @returns {Promise<void>}
 */
const main = async (): Promise<void> => {
  logger.info(`${ERROR_MESSAGES.INIT_CONTAINER_STARTED}\nBase URL: ${WIKIPEDIA.BASE_URL}`);

  const { PATH, FILENAME } = WIKIPEDIA.PAGES.KUBERNETES;

  await fetchAndSavePage(PATH, FILENAME);

  logger.info(ERROR_MESSAGES.INIT_CONTAINER_COMPLETED);
  process.exit(0);
};

main().catch((error: Error) => {
  logger.error(`${ERROR_MESSAGES.INIT_CONTAINER_FAILED}: ${error.message}`);
  process.exit(1);
});
