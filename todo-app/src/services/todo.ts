import { PoolClient } from 'pg';
import { withTransaction } from '../db';
import { QUERY_TODO } from '../queries/todo';
import { ERROR } from '../utils/tokens';

/**
 * @description TODOs getter
 * @author Luca Cattide
 * @date 12/12/2025
 * @returns {*}  {(Promise<string[] | unknown>)}
 */
const getTodos = async (): Promise<string[] | unknown> => {
  try {
    const todos = await withTransaction(async (client: PoolClient) => {
      const result = await client.query(QUERY_TODO.SELECT);

      if (!result || !result.rows) {
        throw new Error(ERROR.QUERY);
      }

      return result.rows.map((row) => row.task);
    });

    if (!todos) {
      throw new Error(ERROR.EMPTY);
    }

    return todos;
  } catch (error) {
    console.error(error);
  }
}

/**
 * @description TODO setter
 * @author Luca Cattide
 * @date 12/12/2025
 * @param {string} todo
 * @returns {*}  {Promise<void>}
 */
const setTodo = async (todo: string): Promise<void> => {
  try {
    await withTransaction(async (client: PoolClient) => {
      client.query(QUERY_TODO.INSERT, [todo]);
    });
  } catch (error) {
    console.error(error);
  }
}

export { getTodos, setTodo };
