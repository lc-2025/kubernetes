import { Request, Response, NextFunction } from 'express';

/**
 * @description Error middleware
 * Custom error handler for system errors
 * @author Luca Cattide
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(err.stack);
  res.status(500).send({ message: err.message });
};

export default errorMiddleware;
