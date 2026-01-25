import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { json } from 'express';
import helmet from 'helmet';
import middlewares from './middlewares';
import router from './routes';
import { Server } from 'http';
import logger from 'dwk-logger';
import {
  HOST,
  PORT_DEFAULT,
  PORT,
  RATE_LIMIT,
  EVENT,
  MESSAGE_SERVER,
  SERVER,
  CSP,
} from './utils/constants';
const { WINDOW, MAX_REQUESTS } = RATE_LIMIT;
const { error } = middlewares;
const app = express();

app.set('port', PORT ?? PORT_DEFAULT);
app.use(
  bodyParser.json(),
  compression(),
  cors(),
  helmet({
    contentSecurityPolicy: {
      directives: CSP,
    },
  }),
  json(),
  // Excluding for testing purposes
  /* rateLimit({
    windowMs: WINDOW,
    max: MAX_REQUESTS,
  }), */
  router,
  error
);

/**
 * @description Server starting
 * @author Luca Cattide
 * @date 25/01/2026
 * @returns {Promise<Server>}
 */
const startServer = async (): Promise<Server> => {
  const port = app.get('port');
  const server = app
    .listen(port, HOST, () => {
      logger.info(`${MESSAGE_SERVER.LISTEN} ${port}`);
    })
    .on(EVENT.ERROR, (error: Error) => {
      logger.error(`Error: ${error.message}`);
      throw error;
    });

  return server;
};

let server: Server | null = null;

if (SERVER === 'true') {
  startServer().catch((error: Error) => {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  });
}

export default server;
