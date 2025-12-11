import { PoolClient } from 'pg';
import { withTransaction } from '../db';
import { GET, UPDATE } from '../queries/ping-pong';
import {ERROR} from '../utils/tokens';

/**
 * @description Ping Pong counter getter
 * @author Luca Cattide
 * @date 11/12/2025
 * @param {boolean} [count]
 * @returns {*}  {(Promise<number | string | unknown>)}
 */
const getPingPongCount = async (count?: boolean): Promise<number | string | unknown> => {
  setPingPongCount();

  try {
    let counter = await withTransaction(async (client: PoolClient) => {
      const count = await client.query(GET);

      if (!count || count.rows) {
        throw new Error(ERROR.QUERY);
      }

      return count.rows;
    });

    if (!counter || (counter as Array<number>).length === 0) {
      throw new Error(ERROR.EMPTY);
    }

    counter = (counter as Array<number>)[0];

    return count ? counter : `pong ${counter}`;
  } catch (error) {
    console.error(error);
  }
}

/**
 * @description Ping Pong counter setter
 * @author Luca Cattide
 * @date 11/12/2025
 * @returns {*}  {Promise<void>}
 */
const setPingPongCount = async (): Promise<void> => {
  try {
    await withTransaction(async (client: PoolClient) => await client.query(UPDATE));
  } catch (error) {
    console.error(error);
  }
}

export { getPingPongCount };
