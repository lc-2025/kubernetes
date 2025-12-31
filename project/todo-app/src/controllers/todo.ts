import { ERROR, PAGE, WIKI_RANDOM } from '../utils/tokens';
import { Request, Response } from 'express';
import { validate } from '../utils/utilities';
import { refreshPage, setTodo, setTodoRandom, updateTodo } from '../services/todo';

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
    dones: (request.session as any).dones,
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

  let { todo } = request.body;

  if (todo === WIKI_RANDOM) {
    await setTodoRandom();
  } else {
    await setTodo(request.body.todo);
  }

  await refreshPage(request, response);
}

/**
 * @description TODO putter
 * @author Luca Cattide
 * @date 30/12/2025
 * @param {Request} request
 * @param {Response} response
 * @returns {*}  {Promise<void>}
 */
const updateTodoRecord = async (request: Request, response: Response): Promise<void> => {
  if (!request.body || !request.params.id) {
    response.status(400).send(ERROR.INPUT_MISSING);
  }

  validate(request, response);

  await updateTodo(parseInt(request.params.id!, 10));
  await refreshPage(request, response);
}

export { getTodoRecords, setTodos, updateTodoRecord};
