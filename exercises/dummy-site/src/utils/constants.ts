const GROUP = 'stable.dwk';
const VERSION = 'v1';
const PLURAL = 'dummysites';
const KIND = 'DummySite';
// 5 MB
const MAX_CONTENT_SIZE = 5 * 1024 * 1024;
const TIMEOUT = 10000;
const HEADERS = {
  FETCH: {
    'User-Agent': 'DummySite Controller',
  },
  SET: { 'Content-Type': 'application/merge-patch+json' },
};
const RECONNECTION = 5000;
const RESOURCE_SUFFIXES = {
  CONTENT: '-content',
  DEPLOYMENT: '-deployment',
  SERVICE: '-service',
};
const CONTAINER_CONFIG = {
  NAME: 'webserver',
  PORT: 3000,
  VOLUME_NAME: 'content',
  MOUNT_PATH: '/usr/share/nginx/html',
  SERVICE_PORT: 80,
  REPLICAS: 1,
  HTML_FILE: 'index.html',
};
const API_CONFIG = {
  WATCH_PATH: `/apis/${GROUP}/${VERSION}/${PLURAL}`,
  OWNER_REF_VERSION: `${GROUP}/${VERSION}`,
};

export {
  GROUP,
  VERSION,
  PLURAL,
  KIND,
  MAX_CONTENT_SIZE,
  TIMEOUT,
  HEADERS,
  RECONNECTION,
  RESOURCE_SUFFIXES,
  CONTAINER_CONFIG,
  API_CONFIG,
};
