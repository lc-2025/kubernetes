import {FILE_HASH} from '../utils/tokens';
import fs from 'fs';
import {NextFunction, Request, Response} from 'express';
import path from 'path';

const getStorage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const readStream = fs.createReadStream(path.join(process.cwd(), FILE_HASH), { encoding: 'utf8' });

  try {
    for await (const chunk of readStream) {
      console.log('--- File chunk start ---');
      console.log(chunk);
      console.log('--- File chunk end ---');
    }

    console.log('Finished reading the file.');
  } catch(error) {
    next(error)
  }
}

export { getStorage };
