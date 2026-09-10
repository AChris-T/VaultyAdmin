import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  // Not a "choose a strong password" check — this is login, and admins can
  // be on a short seeded/temporary password (see AuthUser.mustChangePassword).
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;
