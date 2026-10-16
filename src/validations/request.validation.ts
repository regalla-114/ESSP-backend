import { z } from 'zod';

export const createServiceRequestSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(5, 'Description must be at least 5 characters'),
    category: z.string().min(2, 'Category is required'),
  }),
});

export const updateRequestStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid request ID'),
  }),
  body: z.object({
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  }),
});
