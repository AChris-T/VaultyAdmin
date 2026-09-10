import { useMutation } from '@tanstack/react-query';
import type { ApiError } from '@/types/api';
import { login } from '../api/auth.api';
import type { LoginInput } from '../schemas/login.schema';
import type { LoginChallenge } from '../types/auth';

// Step 1 only verifies credentials and requests an OTP — nothing to store,
// nowhere to redirect. See useVerifyLoginMutation for the actual sign-in.
export function useLoginMutation() {
  return useMutation<LoginChallenge, ApiError, LoginInput>({
    mutationFn: login,
  });
}
