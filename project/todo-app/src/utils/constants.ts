const { API_TODO, BASE_PATHNAME, BASE_URL, HEALTH, HOST, MAX_REQUEST, NATS_TIMEOUT, NATS_URL, NODE_ENV, PORT, PORT_NATS, WINDOW, WIKI_RANDOM, VERSION } = process.env;
const CSP = {
  'default-src': ["'self'"],
  'connect-src': ["'self'", 'picsum.photos', 'fastly.picsum.photos'],
  'form-action': ["'self'"],
  'img-src': ["'self'", 'picsum.photos', 'fastly.picsum.photos'],
  'style-src': ["'self'", "'unsafe-inline'"],
};
const ERROR = {
  CLIENT: 'A client has been checked out for more than 5 seconds!',
  EMPTY: 'No results',
  FETCH: 'Fetch error:',
  INPUT_INVALID: 'Invalid input',
  INPUT_MISSING: 'Missing input',
  NATS_CLIENT: 'Cannot connect to NATS server. Please initialize client',
  NATS_SERVER: 'Error connecting to NATS server',
  NATS_SUBSCRIPTION: 'Subscription closing error',
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
  NATS: {
    CLOSED_CONNECTION: 'Connection closed',
    CLOSED_SUBSCRIPTION: 'Subscription closed',
    CONNECTED: 'Connected to NATS server version',
    CREATED: 'A todo was created',
    LISTENING: 'Listenting for',
    SENT: '[Publisher]: Message sent to',
    UPDATED: 'A todo was updated',
  },
};
const NATS_CONNECTION = 'todo-app-nats';
const NATS_SUBJECT = 'todos';
const NATS_USER = 'bot';
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
  HEALTH
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
  NATS_CONNECTION,
  NATS_SUBJECT,
  NATS_TIMEOUT,
  NATS_URL,
  NATS_USER,
  NODE_ENV,
  PAGE,
  PLACEHOLDER,
  PORT,
  PORT_DEFAULT,
  PORT_NATS,
  PROTOCOL,
  RATE_LIMIT,
  ROUTES,
  SEED,
  SIGNAL,
  TRANSACTION,
  WIKI_RANDOM,
  VERSION
};
