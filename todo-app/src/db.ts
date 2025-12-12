import { Pool, QueryResult, PoolClient } from 'pg';
import Cursor from 'pg-cursor';
import dotenv from 'dotenv';
import { ERROR, LOG, TRANSACTION } from './utils/tokens';

dotenv.config();

const { BEGIN, COMMIT, ROLLBACK } = TRANSACTION;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (error) => {
  console.error(ERROR.POOL, error);
  process.exit(-1);
})

/**
 * @description Client helper with release management
 * @author Luca Cattide
 * @date 11/12/2025
 * @returns {*}  {Promise<PoolClient>}
 */
const getClient = async (): Promise<PoolClient> => {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;
  const timeout = setTimeout(() => {
    console.error(ERROR.CLIENT);
  }, 5000);

  try {
    return client;
  } catch(error) {
    await client.query(ROLLBACK);
    throw error;
  } finally {
    client.release = () => {
      clearTimeout(timeout);

      client.query = query;
      client.release = release;

      return release.apply(client);
    }
  }
}

/**
 * @description Query helper
 * @author Luca Cattide
 * @date 11/12/2025
 * @param {string} text
 * @param {*} params
 * @returns {*}  {Promise<QueryResult<any>>}
 */
const query = async (text: string, params: any): Promise<QueryResult<any>> => {
  const start = Date.now()
  const response = await pool.query(text, params)
  const duration = Date.now() - start

  console.log(LOG.QUERY, { text, duration, rows: response.rowCount });

  return response
}

/**
 * @description Cursor helper to support streaming with transactions & release management
 * @author Luca Cattide
 * @date 10/12/2025
 * @param {string} query
 * @param {number} limit
 * @returns {*}  {Promise<unknown[]>}
 */
const withCursor = async (query: string, limit: number): Promise<unknown[]> => {
  const client = await getClient();

  try {
    await client.query(BEGIN);

    const cursor = client.query(new Cursor(query));
    const rows = cursor.read(limit);

    await client.query(COMMIT);
    return rows;
  } catch (error) {
    await client.query(ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * @description Client helper including transactions and release management
 * @author Luca Cattide
 * @date 10/12/2025
 * @param {Function} callback
 * @returns {*}  {Promise<unknown>}
 */
const withTransaction = async (callback: Function): Promise<unknown> => {
  const client = await getClient();

  try {
    await client.query(BEGIN);

    const result = await callback(client);

    await client.query(COMMIT);
    return result;
  } catch (error) {
    await client.query(ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
};

export { getClient, query, withCursor, withTransaction };
export default pool;
