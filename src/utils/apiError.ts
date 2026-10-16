export class ApiError extends Error {
  public statusCode: number;
  public errors: unknown[];
  public isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    errors: unknown[] = [],
    stack: string = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message: string = 'Bad request', errors: unknown[] = []) {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message: string = 'Unauthorized access') {
    return new ApiError(401, message);
  }

  static forbidden(message: string = 'Forbidden resource') {
    return new ApiError(403, message);
  }

  static notFound(message: string = 'Resource not found') {
    return new ApiError(404, message);
  }

  static conflict(message: string = 'Resource already exists') {
    return new ApiError(409, message);
  }

  static internal(message: string = 'Internal server error') {
    return new ApiError(500, message);
  }
}
