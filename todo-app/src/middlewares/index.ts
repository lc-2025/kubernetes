import sslMiddleware from './ssl';
import errorMiddleware from './error';

const middlewares = {
  ssl: sslMiddleware,
  error: errorMiddleware,
};

export default middlewares;
