import {
  Request, Response, ErrorRequestHandler,
} from 'express';
import statusCode from 'http-status';
import winston from '@config/winston';

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = statusCode;

export const notFound = (req: Request, res: Response) => {
  winston.error(`${NOT_FOUND} - Not Found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(statusCode.NOT_FOUND).send({
    status: statusCode.NOT_FOUND,
    error: 'Not Found',
  });
};

const errorHandler: ErrorRequestHandler = (
  err: { message: any; name: string; code: number;
     errors: { [s: string]: unknown } | ArrayLike<unknown> },
  req: Request,
  res: Response,
) => {
  const error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err);

  winston.error(`${error.code || NOT_FOUND} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  return res.status(error.code || INTERNAL_SERVER_ERROR).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
