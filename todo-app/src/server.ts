import 'dotenv/config';

import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import hbs from 'hbs';
import helmet from 'helmet';
import logger from './logger';
import middlewares from './middlewares';
import path from 'path';
import pool from './db';
import rateLimit from 'express-rate-limit';
import router from './routes';
import { Server } from 'http';
import session from 'express-session';
import {
  CSP,
  HOST,
  PORT_DEFAULT,
  PORT,
  RATE_LIMIT,
  EVENT,
  MESSAGE,
  NODE_ENV,
  ERROR,
  LOG,
  SIGNAL,
  PLACEHOLDER,
} from './utils/tokens';
import {pinoHttp} from 'pino-http';

const { POOL_CLOSE, TIMEOUT } = ERROR;
const { DB, HTTP, SHUTDOWN } = LOG;
const { WINDOW, MAX_REQUESTS } = RATE_LIMIT;
const { SIGINT, SIGTERM } = SIGNAL;
const { ssl, error } = middlewares;
const app = express();

app.set(PLACEHOLDER.PORT, PORT ? parseInt(PORT, 10) : PORT_DEFAULT);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(
  bodyParser.json(),
  compression(),
  cors(),
  express.static(path.join(__dirname, '..', 'public')),
  urlencoded({ extended: true }),
  helmet({
    contentSecurityPolicy: {
      directives: CSP,
    },
    crossOriginOpenerPolicy: NODE_ENV === 'production' ? undefined : {
      policy: 'same-origin'
    },
    originAgentCluster: NODE_ENV === 'development',
  }),
  json(),
  pinoHttp({
    logger,
  }),
  rateLimit({
    windowMs: WINDOW,
    max: MAX_REQUESTS,
  }),
  session({
    cookie: {
      secure: false,
    },
    saveUninitialized: true,
    secret: PLACEHOLDER.SECRET,
    resave: false,
  }),
  // Excluding for testing purposes
  /* ssl, */
  router,
  error,
);

/**
 * @description Server starting
 * @author Luca Cattide
 * @returns {*}  {Server}
 */
const startServer = (): Server => {
  const port = app.get(PLACEHOLDER.PORT);

  return app
    .listen(port, HOST!, () => {
      console.log(`${MESSAGE.LISTEN} ${port}`);
    })
    .on(EVENT.ERROR, (error) => {
      throw error;
    });
};

const server = startServer();

/**
 * @description Graceful shutdown
 * @author Luca Cattide
 * @date 12/12/2025
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
