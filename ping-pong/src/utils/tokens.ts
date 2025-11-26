import 'dotenv/config';

const { NODE_ENV, PORT } = process.env;
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
    PING_PONG: '/pingpong'
  },
  BASE_PATHNAME: '/',
  BASE_URL: 'http://localhost',
};

export {
  EVENT,
  HEADER,
  HOST,
  MESSAGE,
  NODE_ENV,
  PORT,
  PORT_DEFAULT,
  PROTOCOL,
  RATE_LIMIT,
  ROUTES,
};
