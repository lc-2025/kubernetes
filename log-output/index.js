/**
 * @description Timestamp getter
 * Retrieves the current timestamp and pairs it to a random hash
 * @author Luca Cattide
 * @date 22/11/2025
 * @returns {*}
 */
function getTimestamp() {
  return `${new Date().toISOString()}: ${setHash()}`;
}

/**
 * @description Hash output helper
 * Prints the generated hash every 5 seconds
 * @author Luca Cattide
 * @date 22/11/2025
 */
function printHash() {
  console.log(getTimestamp());

  setInterval(() => {
    console.log(getTimestamp());
  }, 5000);
}

/**
 * @description Hash setter
 * Generates a random alphanumeric string
 * - lowercase/numbers - between 0 and 12 characters
 * @author Luca Cattide
 * @date 22/11/2025
 * @returns {*}
 */
function setHash() {
  return Math.random().toString(36).slice(2);
}

printHash();
