import fs from 'fs/promises';
import logger from 'dwk-logger';
import { REGEX, FALLBACK } from './constants';

/**
 * @description Extracts error message from unknown error
 * Standardized error extraction pattern
 * @author Luca Cattide
 * @date 25/01/2026
 * @param {unknown} error - Error object of unknown type
 * @returns {string} Error message string
 */
const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

/**
 * @description Generates random number between min and max
 * @author Luca Cattide
 * @date 25/01/2026
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {number} Random number between min and max
 */
const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * @description Converts seconds to specific format
 * @author Luca Cattide
 * @date 25/01/2026
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string (e.g., "5m 30s")
 */
const formatSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
};

/**
 * @description Ensures directory exists - create if needed
 * @author Luca Cattide
 * @date 25/01/2026
 * @param {string} dirPath - Directory path
 * @returns {Promise<void>}
 */
const ensureDirectory = async (dirPath: string): Promise<void> => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    logger.error(
      `Failed to ensure directory ${dirPath}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

/**
 * @description Extracts page title from HTML content
 * @author Luca Cattide
 * @date 25/01/2026
 * @param {string} htmlContent - HTML content from Wikipedia
 * @returns {string} Extracted page title or fallback
 */
const extractPageTitle = (htmlContent: string): string => {
  const titleMatch = htmlContent.match(REGEX.PAGE_TITLE);

  return titleMatch ? titleMatch[1] : FALLBACK.PAGE_TITLE;
};

export {
  ensureDirectory,
  extractPageTitle,
  formatSeconds,
  getErrorMessage,
  getRandomNumber,
};
