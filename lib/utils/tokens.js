"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT_NATS = exports.PORT_DEFAULT = exports.NODE_ENV = exports.NATS_USER = exports.NATS_URL = exports.NATS_TIMEOUT = exports.NATS_SUBJECT = exports.NATS_CONNECTION = exports.MESSAGE = exports.ERROR = void 0;
const { NATS_TIMEOUT, NATS_URL, NODE_ENV, PORT_NATS } = process.env;
exports.NATS_TIMEOUT = NATS_TIMEOUT;
exports.NATS_URL = NATS_URL;
exports.NODE_ENV = NODE_ENV;
exports.PORT_NATS = PORT_NATS;
const ERROR = {
    NATS_CLIENT: 'Cannot connect to NATS server. Please initialize client',
    NATS_SERVER: 'Error connecting to NATS server',
    NATS_SUBSCRIPTION: 'Subscription closing error',
};
exports.ERROR = ERROR;
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
exports.MESSAGE = MESSAGE;
const NATS_CONNECTION = 'todo-app-nats';
exports.NATS_CONNECTION = NATS_CONNECTION;
const NATS_SUBJECT = 'todos';
exports.NATS_SUBJECT = NATS_SUBJECT;
const NATS_USER = 'bot';
exports.NATS_USER = NATS_USER;
const PORT_DEFAULT = 4222;
exports.PORT_DEFAULT = PORT_DEFAULT;
//# sourceMappingURL=tokens.js.map