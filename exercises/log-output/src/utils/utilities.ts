import fs from 'fs';

/**
 * @description File stream reader
 * Creates and return file data chunks from a stream
 * @author Luca Cattide
 * @date 01/12/2025
 * @param {string} path
 * @returns {*}  {(Promise<string | undefined>)}
 */
const readStream = async (path: string): Promise<string | undefined> => {
  const readStream = fs.createReadStream(path, {encoding: 'utf-8'});

  try {
    let chunks = '';

    for await (const chunk of readStream) {
      chunks += `<pre>${chunk}</pre>`;
    }

    return chunks;
  } catch(error) {
    console.error(error);
  }
}

export { readStream };
