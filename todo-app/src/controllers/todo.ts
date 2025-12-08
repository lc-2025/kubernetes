import { ERROR, PAGE, ROUTES } from '../utils/tokens';
import { Request, Response } from 'express';
import { TTodos } from '../types/Todo';
import { validate } from '../utils/utilities';

const { INDEX } = PAGE;
let todos: TTodos = [];

/**
 * @description TODO getter
 * @author Luca Cattide
 * @date 04/12/2025
 * @param {Request} request
 * @param {Response} response
 */
const getTodo = (request: Request, response: Response): void => {
  response.render(INDEX, {
    todos: (request.session as any).todos
  });
}

/**
 * @description TODO setter
 * @author Luca Cattide
 * @date 04/12/2025
 * @param {Request} request
 * @param {Response} response
 */
const setTodo = (request: Request, response: Response): void => {
  if (!request.body || !request.body.todo) {
    response.status(400).send(ERROR.INPUT_MISSING);
  }

  validate(request, response);

  todos = [
    ...todos,
    request.body.todo,
  ];

  (request.session as any).todos = todos;
  response.redirect(ROUTES.API.TODO!);
}

export { getTodo, setTodo };
