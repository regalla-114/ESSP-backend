import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { RequestService } from '../services/request.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { RequestStatus } from '../types/index.js';

export class RequestController {
  static createRequest = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const result = await RequestService.createRequest(userId, req.body);
    return ApiResponse.created(res, 'Service request created successfully', result);
  });

  static getMyRequests = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const requests = await RequestService.getUserRequests(userId);
    return ApiResponse.success(res, 'User requests fetched successfully', requests);
  });

  static getAllRequests = asyncHandler(async (_req: Request, res: Response) => {
    const requests = await RequestService.getAllRequests();
    return ApiResponse.success(res, 'All service requests fetched successfully', requests);
  });

  static updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await RequestService.updateStatus(id as string, status as RequestStatus);
    return ApiResponse.success(res, 'Request status updated successfully', updated);
  });
}
