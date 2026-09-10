import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'operator', 'viewer']),
  createdAt: z.string(),
});

export const usersResponseSchema = z.object({
  items: z.array(userSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  role: z.enum(['admin', 'operator', 'viewer']),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
