import {PATH_SAVE, PATH_SAVE_COUNT} from '../utils/tokens';
import {NextFunction, Request, Response} from 'express';
import { readStream } from '../utils/utilities';

/**
 * @description Storage getter
 * Retrieves generated hasesh/counts from files
 * @author Luca Cattide
 * @date 01/12/2025
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 * @returns {*}  {Promise<void>}
 */
const getStorage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    response.send(`${readStream(PATH_SAVE)}\n${readStream(PATH_SAVE_COUNT)}`);
  } catch(error) {
    next(error);
  }
}

export { getStorage };
