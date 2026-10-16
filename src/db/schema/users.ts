import { mysqlTable, varchar, timestamp, boolean, mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { profiles } from './profiles.js';
import { serviceRequests } from './requests.js';

export const roleEnum = mysqlEnum('role', ['EMPLOYEE', 'MANAGER', 'ADMIN']);

export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  role: roleEnum.default('EMPLOYEE').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  requests: many(serviceRequests),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
