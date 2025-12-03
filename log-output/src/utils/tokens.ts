import 'dotenv/config';
import path from 'node:path';

const { NODE_ENV, PORT } = process.env;
const CSP = {
  'connect-src': ["'self'", 'localhost:5070'],
};
const ERROR = {
  FETCH: 'Data fetching error',
};
const EVENT = {
  ERROR: 'error',
};
const FILE_HASH = 'hash.txt';
const HEADER = {
  XFP: 'x-forwarded-proto',
};
const HOST = '0.0.0.0';
const MESSAGE = {
  LISTEN: 'Server started in port',
};
const PATH_SAVE = path.join(process.cwd(), `files/${FILE_HASH}`);
const PATH_SAVE_COUNT = path.join(process.cwd(), 'files/count.txt');
const PORT_DEFAULT = 4000;
const PORT_EXTERNAL = 5070;
const PROTOCOL = {
  HTTPS: 'https',
};
const RATE_LIMIT = {
  MAX_REQUESTS: 100,
  WINDOW: 15 * 60 * 1000,
};
const ROUTES = {
  API: {
    BASE_PATHNAME: '/api',
    PINGS: '/pings',
    STATUS: '/status',
    STORAGE: '/storage',
  },
  BASE_PATHNAME: '/',
  BASE_URL: 'http://localhost',
};
const SERVER = process.env.SERVER || 'false';

export {
  CSP,
  ERROR,
  EVENT,
  FILE_HASH,
  HEADER,
  HOST,
  MESSAGE,
  NODE_ENV,
  PATH_SAVE,
  PATH_SAVE_COUNT,
  PORT,
  PORT_DEFAULT,
  PORT_EXTERNAL,
  PROTOCOL,
  RATE_LIMIT,
  ROUTES,
  SERVER,
};
