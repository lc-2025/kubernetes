import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { json } from 'express';
import helmet from 'helmet';
import middlewares from './middlewares';
import pool from './db';
import rateLimit from 'express-rate-limit';
import router from './routes';
import { Server } from 'http';
import {
  ERROR,
  HOST,
  PORT_DEFAULT,
  PORT,
  RATE_LIMIT,
  EVENT,
  LOG,
  MESSAGE,
  SIGNAL,
  PLACEHOLDER,
} from './utils/tokens';

const { POOL_CLOSE, TIMEOUT } = ERROR;
const { DB, HTTP, SHUTDOWN } = LOG;
const { WINDOW, MAX_REQUESTS } = RATE_LIMIT;
const { SIGINT, SIGTERM } = SIGNAL;
const { ssl, error } = middlewares;
const app = express();

app.set(PLACEHOLDER.PORT, PORT ?? PORT_DEFAULT);
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
  // Excluding for testing purposes
  /* ssl, */
  error,
);

/**
 * @description Server starting
 * @author Luca Cattide
 * @returns {*}  {Server}
 */
const startServer = (): Server => {
  const port = app.get(PLACEHOLDER.PORT);

  return app.listen(port, HOST, () => {
    console.log(`${MESSAGE.LISTEN} ${port}`);
  }).on(EVENT.ERROR, (error) => {
    throw error;
  });
};

const server = startServer();

/**
 * @description Graceful shutdown
 * @author Luca Cattide
 * @date 11/12/2025
 * @param {string} signal
 * @returns {*}  {Promise<void>}
 */
const shutdown = async (signal: string): Promise<void> => {
  console.log(`${signal} ${SHUTDOWN}`);
  server.close(async () => {
    console.log(HTTP);

    try {
      await pool.end();

      console.log(DB);
      process.exit(0);
    } catch(error) {
      console.error(POOL_CLOSE, error);
      process.exit(1);
    }
  });

  setTimeout(() => {
    console.error(TIMEOUT);
    process.exit(1);
  }, 10000);
}

process.on(SIGINT, () => shutdown(SIGINT));
process.on(SIGTERM, () => shutdown(SIGTERM));


export default server;
