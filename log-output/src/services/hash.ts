/**
 * @description Timestamp getter
 * Retrieves the current timestamp and pairs it to a random hash
 * @author Luca Cattide
 * @date 22/11/2025
 * @returns {*} {string}
 */
const getTimestamp = (): string => {
  return `${new Date().toISOString()}: ${setHash()}`;
}

/**
 * @description Hash output helper
 * Prints the generated hash every 5 seconds
 * @author Luca Cattide
 * @date 22/11/2025
 */
const printHash = (): void => {
  console.log(getTimestamp());

  setInterval(() => {
    console.log(getTimestamp());
  }, 5000);
}

/**
 * @description Single hash output helper
 * Prints the generated hash once
 * - i.e. as HTTP response
 * @author Luca Cattide
 * @date 26/11/2025
 * @returns {*}  {string}
 */
const printHashOnce = (): string => {
  return getTimestamp();
}

/**
 * @description Hash setter
 * Generates a random alphanumeric string
 * - lowercase/numbers - between 0 and 12 characters
 * @author Luca Cattide
 * @date 22/11/2025
 * @returns {*} {string}
 */
const setHash = (): string => {
  return Math.random().toString(36).slice(2);
}

export { printHash, printHashOnce };
