import { Request, Response, NextFunction } from 'express';
import logger from 'dwk-logger';
import { ERROR_RESPONSE } from '../utils/constants';

/**
 * @description Error handling middleware
 * Catches all errors and sends standardized error response
 * @author Luca Cattide
 * @date 25/01/2026
 * @param {Error} err - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {void}
 */
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  logger.error(`Error: ${err.message}`);
  res.status(ERROR_RESPONSE.STATUS_CODE).json({ error: ERROR_RESPONSE.MESSAGE });
};

export { errorHandler };
