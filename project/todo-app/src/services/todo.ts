import { PoolClient } from 'pg';
import { withTransaction } from '../db';
import { QUERY_TODO } from '../queries/todo';
import { ERROR, MESSAGE, NATS_SUBJECT, NATS_USER, ROUTES, VERSION } from '../utils/constants';
import { TTodos } from '../types/Todo';
import { Request, Response } from 'express';
import { publishNats } from 'dwk-messenger';

/**
 * @description TODOs getter
 * @author Luca Cattide
 * @date 12/12/2025
 * @returns {*}  {(Promise<string[] | unknown>)}
 */
const getTodos = async (): Promise<TTodos[] | unknown> => {
  try {
    const todos = await withTransaction(async (client: PoolClient) => {
      const result = await client.query(QUERY_TODO.SELECT);

      if (!result || !result.rows) {
        throw new Error(ERROR.QUERY);
      }

      return result.rows.map(({ done, id, task }) => ({ done, id, task }));
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
 * @description Page redirection helper
 * @author Luca Cattide
 * @date 30/12/2025
 * @param {Request} request
 * @param {Response} response
 * @param {boolean} [done]
 * @returns {*}  {Promise<void>}
 */
const refreshPage = async (request: Request, response: Response): Promise<void> => {
  const todos = await getTodos();

  if (!todos) {
    response.status(500).send(ERROR.QUERY);
  }

  (request.session as any).dones = (todos as TTodos).filter(({ done }) => done);
  (request.session as any).todos = (todos as TTodos).filter(({ done }) => !done);

  response.redirect(303, ROUTES.API.TODO!);
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

    const payload = {
      message: MESSAGE.NATS.CREATED,
      user: NATS_USER,
    };

    if (VERSION === 'staging') {
      console.log(payload);
    } else {
      await publishNats(NATS_SUBJECT, payload);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * @description Random link TODO setter
 * @author Luca Cattide
 * @date 30/12/2025
 * @returns {*}  {Promise<void>}
 */
const setTodoRandom = async (): Promise<void> => {
  try {
    const response = await fetch(process.env.WIKI_RANDOM!);

    if (!response.ok) {
      throw new Error(ERROR.FETCH);
    }

    const data = response.url;

    await setTodo(`Read ${data}`);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @description TODO putter
 * @author Luca Cattide
 * @date 30/12/2025
 * @param {number} id
 * @returns {*}  {Promise<void>}
 */
const updateTodo = async (id: number): Promise<void> => {
  try {
    await withTransaction(async (client: PoolClient) => {
      client.query(QUERY_TODO.UPDATE, [id]);
    });
    await publishNats(NATS_SUBJECT, {
      message: MESSAGE.NATS.UPDATED,
      user: NATS_USER,
    });
  } catch (error) {
    console.error(error);
  }
}


export { getTodos, refreshPage, setTodo, setTodoRandom, updateTodo };
