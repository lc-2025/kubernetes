import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { printHashOnce } from '../services/hash';
import { ERROR, MESSAGE, PATH_SAVE_CONF, PORT_EXTERNAL, ROUTES } from '../utils/tokens';
import {readStream} from '../utils/utilities';

/**
 * @description
 * @author Luca Cattide
 * @date 03/12/2025
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 * @returns {*}  {Promise<void>}
 */
const getStatus = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { API, BASE_URL } = ROUTES;

  try {
    const pings = await axios.get(`${BASE_URL}:${PORT_EXTERNAL}${API.PINGS}`);

    if (!pings) {
      throw new Error(ERROR.FETCH);
    }

    response.send(`<pre>file content: ${readStream(PATH_SAVE_CONF)}<br />env variable: MESSAGE=${MESSAGE}<br />${printHashOnce()}<br />${`Ping / Pongs: ${pings.data}`}</pre>`);
  } catch (error) {
    next(error);
  }
}

export { getStatus };
