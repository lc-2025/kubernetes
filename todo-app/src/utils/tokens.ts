import 'dotenv/config';

const { API_TODO, BASE_PATHNAME, BASE_URL, HOST, MAX_REQUEST, NODE_ENV, PORT, WINDOW, WIKI_RANDOM } = process.env;
const CSP = {
  'connect-src': ["'self'", 'picsum.photos', 'fastly.picsum.photos'],
  'img-src': ["'self'", 'picsum.photos', 'fastly.picsum.photos'],
};
const ERROR = {
  CLIENT: 'A client has been checked out for more than 5 seconds!',
  EMPTY: 'No results',
  FETCH: 'Fetch error:',
  INPUT_INVALID: 'Invalid input',
  INPUT_MISSING: 'Missing input',
  POOL: 'Unexpected error on idle client',
  POOL_CLOSE: 'Pool closing error:',
  QUERY: 'Query error:',
  SEED: 'Seeding error:',
  TIMEOUT: 'Timeout: forcing stop...',
};
const EVENT = {
  ERROR: 'error',
};
const HEADER = {
  XFP: 'x-forwarded-proto',
};
const LOG = {
  DB: 'PostgreSQL successfully closed',
  HTTP: 'Server HTTP closed',
  QUERY: 'Executed query',
  SHUTDOWN: 'received – graceful shutdown...',
};
const MESSAGE = {
  LISTEN: 'Server started in port',
};
const PAGE = {
  INDEX: 'index',
};
const PLACEHOLDER = {
  PORT: 'port',
  SECRET: 'foo',
};
const PORT_DEFAULT = 4000;
const PROTOCOL = {
  HTTPS: 'https',
};
const RATE_LIMIT = {
  MAX_REQUESTS: parseInt(MAX_REQUEST!, 10),
  WINDOW: parseInt(WINDOW!, 10),
};
const ROUTES = {
  API: {
    TODO: API_TODO,
  },
  BASE_PATHNAME,
  BASE_URL,
};
const SEED = {
  CREATION: 'Tables creation...',
  DONE: 'Seeding completed',
  INSERT: 'Count population...',
  START: 'Seeding starting...'
};
const SIGNAL = {
  SIGINT: 'SIGINT',
  SIGTERM: 'SIGTERM',
};
const TRANSACTION = {
  BEGIN: 'BEGIN',
  COMMIT: 'COMMIT',
  ROLLBACK: 'ROLLBACK'
};

export {
  CSP,
  ERROR,
  EVENT,
  HEADER,
  HOST,
  LOG,
  MESSAGE,
  NODE_ENV,
  PAGE,
  PLACEHOLDER,
  PORT,
  PORT_DEFAULT,
  PROTOCOL,
  RATE_LIMIT,
  ROUTES,
  SEED,
  SIGNAL,
  TRANSACTION,
  WIKI_RANDOM,
};
