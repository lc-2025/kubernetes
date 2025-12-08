import 'dotenv/config';

const { API_TODO, BASE_PATHNAME, BASE_URL, HOST, MAX_REQUEST, NODE_ENV, PORT, WINDOW } = process.env;
const CSP = {
  'connect-src': ["'self'", 'picsum.photos', 'fastly.picsum.photos'],
  'img-src': ["'self'", 'picsum.photos', 'fastly.picsum.photos'],
};
const ERROR = {
  INPUT_INVALID: 'Invalid input',
  INPUT_MISSING: 'Missing input',
};
const EVENT = {
  ERROR: 'error',
};
const HEADER = {
  XFP: 'x-forwarded-proto',
};
const MESSAGE = {
  LISTEN: 'Server started in port',
};
const PAGE = {
  INDEX: 'index',
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

export {
  CSP,
  ERROR,
  EVENT,
  HEADER,
  HOST,
  MESSAGE,
  NODE_ENV,
  PAGE,
  PORT,
  PORT_DEFAULT,
  PROTOCOL,
  RATE_LIMIT,
  ROUTES,
};
