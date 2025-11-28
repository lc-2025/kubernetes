import {FILE_HASH} from '../utils/tokens';
import fs from 'fs';
import {NextFunction, Request, Response} from 'express';
import path from 'path';

const getStorage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const readStream = fs.createReadStream(path.join(process.cwd(), FILE_HASH), { encoding: 'utf8' });

  try {
    let chunks = '';

    for await (const chunk of readStream) {
      chunks += `<pre>${chunk}</pre>`;
    }

    response.send(chunks);
  } catch(error) {
    next(error);
  }
}

export { getStorage };
