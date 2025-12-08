import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import hbs from 'hbs';
import helmet from 'helmet';
import middlewares from './middlewares';
import path from 'path';
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
} from './utils/tokens';

const { WINDOW, MAX_REQUESTS } = RATE_LIMIT;
const { ssl, error } = middlewares;
const app = express();

app.set('port', PORT ?? PORT_DEFAULT);
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
  }),
  json(),
  rateLimit({
    windowMs: WINDOW,
    max: MAX_REQUESTS,
  }),
  session({
    cookie: {
      secure: false,
    },
    saveUninitialized: true,
    secret: 'foo',
    resave: false,
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
    .listen(port, HOST!, () => {
      console.log(`${MESSAGE.LISTEN} ${port}`);
    })
    .on(EVENT.ERROR, (error) => {
      throw error;
    });

  return server;
};

const server = startServer();

export default server;
