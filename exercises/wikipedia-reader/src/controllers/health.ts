import { Request, Response } from 'express';
import { HEALTH_CHECK } from '../utils/constants';

/**
 * @description Health check endpoint response
 * @author Luca Cattide
 * @date 25/01/2026
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {void}
 */
const getHealth = (req: Request, res: Response): void => {
  res.status(200).json({ status: HEALTH_CHECK.HEALTHY });
};

/**
 * @description Readiness check endpoint response
 * @author Luca Cattide
 * @date 25/01/2026
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {void}
 */
const getReady = (req: Request, res: Response): void => {
  res.status(200).json({ status: HEALTH_CHECK.READY });
};

export { getHealth, getReady };
