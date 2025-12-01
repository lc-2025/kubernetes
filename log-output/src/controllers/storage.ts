import {PATH_SAVE} from '../utils/tokens';
import fs from 'fs';
import {NextFunction, Request, Response} from 'express';

/**
 * @description Storage getter
 * Retrieves generated hasesh from file
 * @author Luca Cattide
 * @date 01/12/2025
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 * @returns {*}  {Promise<void>}
 */
const getStorage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const readStream = fs.createReadStream(PATH_SAVE, { encoding: 'utf8' });

  try {
    let chunks = '';

    for await (const chunk of readStream) {
      chunks += `<pre>${chunk}</pre>`;
    }

    response.send(chunks);
  } catch(error) {
    next(error);
  }
}

export { getStorage };
