import fs from 'node:fs/promises';
import {getPingPongCount} from '../services/pingpong';
import {NextFunction, Request, Response} from 'express';
import { PATH_SAVE } from '../utils/tokens';

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
    const count = getPingPongCount();

    await fs.appendFile(PATH_SAVE, `Ping / Pongs: ${count}\n`);

    response.send(count);
  } catch (error) {
    next(error);
  }
};

export { getPingPong }
