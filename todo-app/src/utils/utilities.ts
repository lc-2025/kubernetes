import Joi from 'joi';
import { Request, Response } from 'express';
import {ERROR} from './tokens';

/**
 * @description Data validation helper
 * @author Luca Cattide
 * @date 04/12/2025
 * @param {Request} request
 * @param {Response} response
 */
const validate = (request: Request, response: Response): void => {
  const schema = Joi.object({
    todo: Joi.string().alphanum().required(),
  });
  const { error } = schema.validate({
    ...request.body,
  });

  if (error) {
    response.status(422).send(ERROR.INPUT_INVALID);
  }
}

export { validate };
