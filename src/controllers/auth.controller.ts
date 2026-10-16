import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AuthService } from '../services/auth.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body);
    return ApiResponse.created(res, 'User registered successfully', result);
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);
    return ApiResponse.success(res, 'Login successful', result);
  });

  static getMe = asyncHandler(async (req: Request, res: Response) => {
    return ApiResponse.success(res, 'Current authenticated user profile', req.user);
  });
}
