import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { users, type User, type NewUser } from '../db/schema/index.js';

export class UserModel {
  static async findByEmail(email: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return results[0];
  }

  static async findById(id: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return results[0];
  }

  static async findByIdWithProfile(id: string) {
    return await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        password: false,
      },
      with: {
        profile: true,
      },
    });
  }

  static async findAllWithProfiles() {
    return await db.query.users.findMany({
      columns: {
        password: false,
      },
      with: {
        profile: true,
      },
    });
  }

  static async create(data: NewUser): Promise<void> {
    await db.insert(users).values(data);
  }

  static async update(id: string, data: Partial<Omit<NewUser, 'id'>>): Promise<void> {
    await db.update(users).set(data).where(eq(users.id, id));
  }

  static async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }
}
