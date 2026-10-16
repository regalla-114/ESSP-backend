import { eq, desc } from 'drizzle-orm';
import { db } from '../db/index.js';
import { serviceRequests, type ServiceRequest, type NewServiceRequest } from '../db/schema/index.js';
import { RequestStatus } from '../types/index.js';

export class RequestModel {
  static async create(data: NewServiceRequest): Promise<void> {
    await db.insert(serviceRequests).values(data);
  }

  static async findById(id: string) {
    return await db.query.serviceRequests.findFirst({
      where: eq(serviceRequests.id, id),
    });
  }

  static async findAll() {
    return await db.query.serviceRequests.findMany({
      orderBy: [desc(serviceRequests.createdAt)],
      with: {
        user: {
          columns: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
      },
    });
  }

  static async findByUserId(userId: string) {
    return await db.query.serviceRequests.findMany({
      where: eq(serviceRequests.userId, userId),
      orderBy: [desc(serviceRequests.createdAt)],
    });
  }

  static async updateStatus(id: string, status: RequestStatus): Promise<void> {
    await db.update(serviceRequests).set({ status }).where(eq(serviceRequests.id, id));
  }
}
