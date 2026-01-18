import fs from 'node:fs/promises';
import { getPingPongCount } from '../services/pingpong';
import { NextFunction, Request, Response } from 'express';
import { PATH_SAVE } from '../utils/constants';

/**
 * @description  Stores and returns the number of requests sent to the endpoint
 * @author Luca Cattide
 * @date 01/12/2025
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 * @returns {*}  {Promise<void>}
 */
const getPingPong = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    await fs.appendFile(PATH_SAVE, `Ping / Pongs: ${getPingPongCount()}\n`);

    response.send(getPingPongCount());
  } catch (error) {
    next(error);
  }
};

/**
 * @description Returns the number of requests sent to the endpoint
 * @author Luca Cattide
 * @date 03/12/2025
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 */
const getPings = (request: Request, response: Response, next: NextFunction): void => {
  const count = getPingPongCount(true);

  if (!count) {
    next(Error);
  }

  response.send(count);
}

export { getPingPong, getPings }
