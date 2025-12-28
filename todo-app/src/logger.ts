import pino from 'pino';
import pretty from 'pino-pretty';

// Format on `development` only
const transport = process.stdout.isTTY ? {
  transport: {
    options: {
      colorize: pretty.isColorSupported,
    },
    target: 'pino-pretty'
  }
} : {};
const logger = pino({
  formatters: {
    bindings: (bindings) => ({
      ...bindings,
      node_version: process.version
    }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  ...transport
});

export default logger;
