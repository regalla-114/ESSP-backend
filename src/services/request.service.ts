import { RequestModel } from '../models/request.model.js';
import { ApiError } from '../utils/apiError.js';
import { RequestStatus } from '../types/index.js';

export class RequestService {
  static async createRequest(userId: string, data: { title: string; description: string; category: string }) {
    const id = crypto.randomUUID();

    await RequestModel.create({
      id,
      userId,
      title: data.title,
      description: data.description,
      category: data.category,
    });

    return await RequestModel.findById(id);
  }

  static async getAllRequests() {
    return await RequestModel.findAll();
  }

  static async getUserRequests(userId: string) {
    return await RequestModel.findByUserId(userId);
  }

  static async updateStatus(id: string, status: RequestStatus) {
    const request = await RequestModel.findById(id);

    if (!request) {
      throw ApiError.notFound('Service request not found');
    }

    await RequestModel.updateStatus(id, status);

    return await RequestModel.findById(id);
  }
}
