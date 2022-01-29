class ErrorResponse extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorResponse;
