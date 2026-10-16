import { mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { users } from './users.js';

export const profiles = mysqlTable('profiles', {
  id: varchar('id', { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar('user_id', { length: 36 }).notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  department: varchar('department', { length: 100 }),
  designation: varchar('designation', { length: 100 }),
  phoneNumber: varchar('phone_number', { length: 20 }),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
