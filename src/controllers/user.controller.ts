import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { UserService } from '../services/user.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class UserController {
  static getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    return ApiResponse.success(res, 'Users fetched successfully', users);
  });

  static getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserService.getUserById(req.params.id as string);
    return ApiResponse.success(res, 'User fetched successfully', user);
  });

  static updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const updated = await UserService.updateProfile(userId, req.body);
    return ApiResponse.success(res, 'Profile updated successfully', updated);
  });
}
