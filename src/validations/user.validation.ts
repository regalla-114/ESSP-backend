import { z } from 'zod';

export const updateUserProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    department: z.string().optional(),
    designation: z.string().optional(),
    phoneNumber: z.string().optional(),
    avatarUrl: z.string().url().optional(),
  }),
});

export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID format'),
  }),
});
