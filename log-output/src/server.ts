import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { json } from 'express';
import helmet from 'helmet';
import middlewares from './middlewares';
import rateLimit from 'express-rate-limit';
import router from './routes';
import { Server } from 'http';
import {
  HOST,
  PORT_DEFAULT,
  PORT,
  RATE_LIMIT,
  EVENT,
  MESSAGE,
} from './utils/tokens';

const { WINDOW, MAX_REQUESTS } = RATE_LIMIT;
const { ssl, error } = middlewares;
const app = express();

app.set('port', PORT ?? PORT_DEFAULT);
app.use(
  bodyParser.json(),
  compression(),
  cors(),
  helmet(),
  json(),
  rateLimit({
    windowMs: WINDOW,
    max: MAX_REQUESTS,
  }),
  router,
  ssl,
  error,
);

/**
 * @description Server starting
 * @author Luca Cattide
 * @returns {*}  {Promise<Server>}
 */
const startServer = async (): Promise<Server> => {
  const port = app.get('port');
  const server = app
    .listen(port, HOST, () => {
      console.log(`${MESSAGE.LISTEN} ${port}`);
    })
    .on(EVENT.ERROR, (error) => {
      throw error;
    });

  return server;
};

const server = startServer();

export default server;
