import { Request, Response } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';
import { testDbConnection } from '../db/index.js';

export class HealthController {
  static check = async (_req: Request, res: Response) => {
    const isDbConnected = await testDbConnection();

    return ApiResponse.success(res, 'System is healthy', {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      services: {
        database: isDbConnected ? 'connected' : 'disconnected / check credentials',
      },
    });
  };
}
