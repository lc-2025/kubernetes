import 'dotenv/config';

const { NODE_ENV, PORT } = process.env;
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
const HOST = '0.0.0.0';
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
  MAX_REQUESTS: 100,
  WINDOW: 15 * 60 * 1000,
};
const ROUTES = {
  API: {
    TODO:'/todos',
  },
  BASE_PATHNAME: '/',
  BASE_URL: 'http://localhost',
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
