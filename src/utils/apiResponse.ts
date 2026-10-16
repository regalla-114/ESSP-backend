import { Response } from 'express';

export class ApiResponse {
  static success<T>(
    res: Response,
    message: string = 'Operation successful',
    data: T | null = null,
    statusCode: number = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static created<T>(
    res: Response,
    message: string = 'Resource created successfully',
    data: T | null = null
  ) {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res: Response,
    message: string = 'An error occurred',
    statusCode: number = 500,
    errors: unknown = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}
