import 'dotenv/config';
import path from 'node:path';

const { NODE_ENV, PORT } = process.env;
const SERVER = process.env.SERVER || 'false';
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
    BASE_PATHNAME: '/api',
    STATUS: '/status',
    STORAGE: '/storage',
  },
  BASE_PATHNAME: '/',
  BASE_URL: 'http://localhost',
};

export {
  EVENT,
  FILE_HASH,
  HEADER,
  HOST,
  MESSAGE,
  NODE_ENV,
  PATH_SAVE,
  PORT,
  PORT_DEFAULT,
  PROTOCOL,
  RATE_LIMIT,
  ROUTES,
  SERVER,
};
