import sslMiddleware from './ssl';
import errorMiddleware from './error';
import loggingMiddleware from './logging';

const middlewares = {
  logging: loggingMiddleware,
  ssl: sslMiddleware,
  error: errorMiddleware,
};

export default middlewares;
