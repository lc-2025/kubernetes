import { Request, Response, NextFunction } from 'express';

const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { body, url } = req;

  console.log(`[Request @ ${new Date().toISOString()}]:
    - URL: ${url}
    - ToDo: ${body.todo}
  `);
  next();
};

export default loggingMiddleware;
