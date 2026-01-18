import 'dotenv/config';

const { NATS_TIMEOUT, NATS_URL, NODE_ENV, PORT_NATS } = process.env;
const ERROR = {
  NATS_CLIENT: 'Cannot connect to NATS server. Please initialize client',
  NATS_SERVER: 'Error connecting to NATS server',
  NATS_SUBSCRIPTION: 'Subscription closing error',
};
const MESSAGE = {
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
const PORT_DEFAULT = 4222;

export {
  ERROR,
  MESSAGE,
  NATS_CONNECTION,
  NATS_SUBJECT,
  NATS_TIMEOUT,
  NATS_URL,
  NATS_USER,
  NODE_ENV,
  PORT_DEFAULT,
  PORT_NATS,
};
