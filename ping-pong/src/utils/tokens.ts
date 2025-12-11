import 'dotenv/config';
import path from 'node:path';

const { NODE_ENV, PORT } = process.env;
const ERROR = {
  CLIENT: 'A client has been checked out for more than 5 seconds!',
  EMPTY: 'No results',
  POOL: 'Unexpected error on idle client',
  POOL_CLOSE: 'Pool closing error:',
  QUERY: 'Quert error:',
  SEED: 'Seeding error:',
  TIMEOUT: 'Timeout: forcing stop...',
};
const EVENT = {
  ERROR: 'error',
};
const HEADER = {
  XFP: 'x-forwarded-proto',
};
const HOST = '0.0.0.0';
const LOG = {
  DB: 'PostgreSQL successfully closed',
  HTTP: 'Server HTTP closed',
  QUERY: 'Executed query',
  SHUTDOWN: 'received – graceful shutdown...',
};
const MESSAGE = {
  LISTEN: 'Server started in port',
};
const PATH_SAVE = path.join(process.cwd(), 'files/count.txt');
const PLACEHOLDER = {
  PORT: 'port',
};
const PORT_DEFAULT = 4000;
const PROTOCOL = {
  HTTPS: 'https',
};
const RATE_LIMIT = {
  MAX_REQUESTS: 100,
  WINDOW: 15 * 60 * 1000,
};
const ROUTES = {
  API: {
    PING_PONG: '/pingpong',
    PINGS: '/pings',
  },
  BASE_PATHNAME: '/',
  BASE_URL: 'http://localhost',
};
const SEED = {
  CREATION: 'Tables creation...',
  DONE: 'Seeding completed',
  INSERT: 'Count population...',
  START: 'Seeding starting...'
}
const SIGNAL = {
  SIGINT: 'SIGINT',
  SIGTERM: 'SIGTERM',
};
const TRANSACTION = {
  BEGIN: 'BEGIN',
  COMMIT: 'COMMIT',
  ROLLBACK: 'ROLLBACK'
}

export {
  ERROR,
  EVENT,
  HEADER,
  HOST,
  LOG,
  MESSAGE,
  NODE_ENV,
  PATH_SAVE,
  PLACEHOLDER,
  PORT,
  PORT_DEFAULT,
  PROTOCOL,
  RATE_LIMIT,
  ROUTES,
  SEED,
  SIGNAL,
  TRANSACTION,
};
