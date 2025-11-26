import {NextFunction, Request, Response} from 'express';
import {printHashOnce} from '../services/hash';

/**
 * @description Status getter
 * Returns a single hash
 * @author Luca Cattide
 * @date 26/11/2025
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 */
const getStatus = (request: Request, response: Response, next: NextFunction): void => {
  try {
    response.send(printHashOnce());
  } catch (error) {
    next(error);
  }
}

export { getStatus };
