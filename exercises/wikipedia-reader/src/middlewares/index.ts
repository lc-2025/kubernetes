import { errorHandler } from './error';

/**
 * @description Middleware collection
 * @author Luca Cattide
 * @date 25/01/2026
 */
const middlewares = {
  error: errorHandler,
};

export default middlewares;
