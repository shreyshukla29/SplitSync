import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AnyZodObject, ZodError } from 'zod';

type Schema = {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
};

export const validate = (schema: Schema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (schema.body) req.body = schema.body.parse(req.body);
      if (schema.query) req.query = schema.query.parse(req.query);
      if (schema.params) req.params = schema.params.parse(req.params);
       next();
    } catch (err) {
      if (err instanceof ZodError) {
         res.status(400).json({
          success: false,
          message: 'Validation Error',
          errors: err.errors,
        });
        return;
      }

       next(err);
    }
  };
};
