import {
  Request, Response, ErrorRequestHandler,
} from 'express';
import statusCode from 'http-status';

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

  return res.status(error.code || statusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
