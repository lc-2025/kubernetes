import { connect, NatsConnection, StringCodec } from 'nats';
import logger from 'dwk-logger';
import {
  ERROR,
  MESSAGE,
  NATS_CONNECTION,
  NATS_SUBJECT,
  NATS_TIMEOUT,
  NATS_URL,
  NODE_ENV,
  PORT_NATS,
} from '../../utils/tokens';

const isDevelopment = NODE_ENV === 'development';
const codec = StringCodec();
let clientNats: NatsConnection;

/**
 * @description NATS client getter
 * @author Luca Cattide
 * @date 31/12/2025
 * @returns {*}  {NatsConnection}
 */
const getNats = (): NatsConnection => {
  if (!clientNats) {
    console.error(ERROR.NATS_CLIENT);
    logger.error(clientNats);
  }

  return clientNats;
};

/**
 * @description NATS publisher
 * @author Luca Cattide
 * @date 31/12/2025
 * @param {string} subject
 * @param {object} payload
 * @returns {*}  {Promise<void>}
 */
const publishNats = async (subject: string, payload: object): Promise<void> => {
  const client = getNats();

  client.publish(subject, codec.encode(JSON.stringify(payload)));
  logger.info(`${MESSAGE.NATS.SENT} ${subject}`);

  // Connection drain to make sure every message is being received prior to close
  await client.drain();
};

/**
 * @description NATS connection helper
 * @author Luca Cattide
 * @date 31/12/2025
 * @returns {*}  {Promise<void>}
 */
const startNats = async (): Promise<void> => {
  try {
    clientNats = await connect({
      debug: isDevelopment,
      name: NATS_CONNECTION,
      // Naming conventions check
      pedantic: isDevelopment,
      port: parseInt(PORT_NATS!),
      reconnectTimeWait: parseInt(NATS_TIMEOUT!, 10),
      servers: [NATS_URL!],
    });

    logger.info(`${MESSAGE.NATS.CONNECTED} ${clientNats.info?.version}`);
  } catch (error) {
    console.error(ERROR.NATS_SERVER);
    logger.error(error);
  } finally {
    if (clientNats) {
      await clientNats
        .close()
        .then(() => {
          logger.info(MESSAGE.NATS.CLOSED_CONNECTION);
        })
        .catch((error) => {
          console.error(ERROR.NATS_SERVER);
          logger.error(error);
        });
    }
  }
};

/**
 * @description NATS subscriber
 * @author Luca Cattide
 * @date 31/12/2025
 * @returns {*}  {Promise<void>}
 */
const subscribeNats = async (): Promise<void> => {
  const client = getNats();
  const codec = StringCodec();
  const subscription = client.subscribe('todos');

  logger.info(`${MESSAGE.NATS.LISTENING} '${NATS_SUBJECT}'...`);

  for await (const message of subscription) {
    const data = JSON.parse(codec.decode(message.data));

    // TODO: Send to Discord

    logger.info(`[${subscription.getProcessed()}]: ${data}`);
  }

  subscription.closed
    .then(() => {
      logger.info(MESSAGE.NATS.CLOSED_SUBSCRIPTION);
    })
    .catch((error) => {
      console.error(ERROR.NATS_SUBSCRIPTION);
      logger.error(error);
    });
};

export { publishNats, startNats, subscribeNats };
