import { ERROR, PAGE, ROUTES } from '../utils/tokens';
import { Request, Response } from 'express';
import { validate } from '../utils/utilities';
import {getTodos, setTodo} from '../services/todo';

const { INDEX } = PAGE;

/**
 * @description TODOs getter
 * @author Luca Cattide
 * @date 04/12/2025
 * @param {Request} request
 * @param {Response} response
 */
const getTodoRecords = (request: Request, response: Response): void => {
  response.render(INDEX, {
    todos: (request.session as any).todos
  });
}

/**
 * @description TODOs setter
 * @author Luca Cattide
 * @date 12/12/2025
 * @param {Request} request
 * @param {Response} response
 * @returns {*}  {Promise<void>}
 */
const setTodos = async (request: Request, response: Response): Promise<void> => {
  if (!request.body || !request.body.todo) {
    response.status(400).send(ERROR.INPUT_MISSING);
  }

  validate(request, response);

  await setTodo(request.body.todo);

  const todos = await getTodos();

  if (!todos) {
    response.status(500).send(ERROR.QUERY);
  }

  (request.session as any).todos = todos;

  response.redirect(ROUTES.API.TODO!);
}

export { getTodoRecords, setTodos };
