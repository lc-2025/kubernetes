import 'dotenv/config';

const { NODE_ENV, PORT, NAMESPACE } = process.env;
const HOST = '0.0.0.0';
const PORT_DEFAULT = 5000;
const SHARED_VOLUME = process.env.SHARED_VOLUME || '/data/www';
const EVENT = {
  ERROR: 'error',
};
const MESSAGE_SERVER = {
  LISTEN: 'Server started in port',
};
const CSP = {
  'default-src': ["'self'"],
  'script-src': ["'self'"],
  'style-src': ["'self'", "'unsafe-inline'"],
};
const RATE_LIMIT = {
  MAX_REQUESTS: 100,
  WINDOW: 15 * 60 * 1000,
};
const ROUTES = {
  BASE_PATHNAME: '/',
  HEALTH: '/health',
  READY: '/ready',
};
const HEALTH_CHECK = {
  HEALTHY: 'healthy',
  READY: 'ready',
};
const ERROR_RESPONSE = {
  STATUS_CODE: 500,
  MESSAGE: 'Internal Server Error',
};
const ERROR_MESSAGES = {
  INIT_CONTAINER_FAILED: 'Init container failed',
  INIT_CONTAINER_COMPLETED: 'Init container completed',
  INIT_CONTAINER_STARTED: 'Init container started',
  SIDECAR_FAILED_FATALLY: 'Sidecar failed fatally',
  SIDECAR_STARTED: 'Sidecar container started',
  SIDECAR_CONTINUING: 'Sidecar continuing despite error...',
  UNEXPECTED_ERROR_IN_LOOP: 'Unexpected error in sidecar loop',
  FETCH_RANDOM_FAILED: 'Failed to fetch random page',
  FETCHING_RANDOM: 'Fetching random Wikipedia page...',
  WAITING_NEXT_FETCH: 'Waiting',
  BEFORE_NEXT_FETCH: 'before next fetch...',
  SAVED_RANDOM_PAGE: 'Saved random page',
  TO_FILE: 'to',
};
const WIKIPEDIA = {
  BASE_URL: 'https://en.wikipedia.org',
  PAGES: {
    KUBERNETES: {
      PATH: '/wiki/Kubernetes',
      FILENAME: 'kubernetes.html',
    },
    RANDOM: {
      PATH: '/wiki/Special:Random',
      FILENAME: 'page.html',
    },
  },
  TIMINGS: {
    RANDOM_MIN_SECONDS: parseInt(
      process.env.RANDOM_MIN_SECONDS || '300',
      10
    ),
    RANDOM_MAX_SECONDS: parseInt(
      process.env.RANDOM_MAX_SECONDS || '900',
      10
    ),
  },
  REQUEST: {
    TIMEOUT: 10000,
    MAX_REDIRECTS: 5,
    USER_AGENT: 'Wikipedia-Reader/1.0 (https://github.com/lc-2025/kubernetes)',
  },
  ERROR_BACKOFF_MS: 30000,
};
const REGEX = {
  PAGE_TITLE: /<h1[^>]*class="firstHeading"[^>]*>([^<]+)<\/h1>/,
};
const FALLBACK = {
  PAGE_TITLE: 'random-page',
};
const SERVER = process.env.SERVER || 'false';

export {
  CSP,
  ERROR_MESSAGES,
  ERROR_RESPONSE,
  EVENT,
  FALLBACK,
  HEALTH_CHECK,
  HOST,
  MESSAGE_SERVER,
  NAMESPACE,
  NODE_ENV,
  PORT,
  PORT_DEFAULT,
  RATE_LIMIT,
  REGEX,
  ROUTES,
  SERVER,
  SHARED_VOLUME,
  WIKIPEDIA,
};
