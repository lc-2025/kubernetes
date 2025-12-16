import pino from 'pino';

const logger = pino({
  formatters: {
    bindings: (bindings) => ({
      ...bindings,
      node_version: process.version
    }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
