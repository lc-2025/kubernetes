let counter = 0;

/**
 * @description Ping Pong counter getter
 * @author Luca Cattide
 * @date 26/11/2025
 * @returns {*}  {string}
 */
const getPingPongCount = (count?: boolean): number | string => {
  setPingPongCount();

  return count ? counter : `pong ${counter}`;
}

/**
 * @description Ping Pong counter setter
 * @author Luca Cattide
 * @date 26/11/2025
 */
const setPingPongCount = (): void => {
  counter++;
}

export { getPingPongCount };
