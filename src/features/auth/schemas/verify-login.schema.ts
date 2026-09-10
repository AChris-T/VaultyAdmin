import { z } from 'zod';

export const verifyLoginSchema = z.object({
  challengeToken: z.string().min(1),
  otp: z.string().length(6, 'Enter the 6-digit code'),
});

export type VerifyLoginInput = z.infer<typeof verifyLoginSchema>;
