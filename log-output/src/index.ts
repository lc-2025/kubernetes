import fs from 'node:fs/promises';
import { printHashOnce } from './services/hash';
import {FILE_HASH, PATH_SAVE} from './utils/tokens';

/**
 * @description Hash setter
 * Prints and save the hash into log and file
 * @author Luca Cattide
 * @date 28/11/2025
 * @returns {*}  {Promise<void>}
 */
const saveHash = async (): Promise<void> => {
  try {
    setInterval(async () => {
      const hash = printHashOnce();

      console.log(hash);

      await fs.appendFile(`./${FILE_HASH}` /*PATH_SAVE */, `${hash}\n`);
    }, 5000);
  } catch (error) {
    console.error(error);
  }
}

export { saveHash };
