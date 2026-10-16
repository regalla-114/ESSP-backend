import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { profiles, type Profile, type NewProfile } from '../db/schema/index.js';

export class ProfileModel {
  static async findByUserId(userId: string): Promise<Profile | undefined> {
    const results = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
    return results[0];
  }

  static async create(data: NewProfile): Promise<void> {
    await db.insert(profiles).values(data);
  }

  static async updateByUserId(userId: string, data: Partial<Omit<NewProfile, 'id' | 'userId'>>): Promise<void> {
    await db.update(profiles).set(data).where(eq(profiles.userId, userId));
  }

  static async deleteByUserId(userId: string): Promise<void> {
    await db.delete(profiles).where(eq(profiles.userId, userId));
  }
}
