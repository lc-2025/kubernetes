import { subscribeNats } from 'dwk-messenger';

/**
 * @description NATS broadcaster
 * Forwards messages to external chat API
 * @author Luca Cattide
 * @date 31/12/2025
 * @returns {*}  {Promise<void>}
 */
const broadcaster = async (): Promise<void> => {
  await subscribeNats();
};

export default broadcaster;
