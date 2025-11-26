import {getPingPongCount} from '../services/pingpong';
import {NextFunction, Request, Response} from 'express';

/**
 * @description Ping Pong count getter
 * Returns the number of requests sent to the endpoint
 * @author Luca Cattide
 * @date 26/11/2025
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 */
const getPingPong = (request: Request, response: Response, next: NextFunction): void => {
  try {
    response.send(getPingPongCount());
  } catch (error) {
    next(error);
  }
};

export { getPingPong }
