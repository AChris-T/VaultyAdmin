'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { ApiError } from '@/types/api';
import { setAuthTokens } from '@/lib/axios/token-storage';
import { toast } from '@/lib/toast';
import { verifyLogin } from '../api/auth.api';
import { meQueryKey } from './use-me-query';
import type { VerifyLoginInput } from '../schemas/verify-login.schema';
import type { VerifyLoginResponse } from '../types/auth';

export function useVerifyLoginMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<VerifyLoginResponse, ApiError, VerifyLoginInput>({
    mutationFn: verifyLogin,
    onSuccess: (data) => {
      setAuthTokens({
        accessToken: data.accessToken,
        accessTokenExpiresAt: data.accessTokenExpiresAt,
        refreshToken: data.refreshToken,
        refreshTokenExpiresAt: data.refreshTokenExpiresAt,
      });

      queryClient.setQueryData(meQueryKey, data.admin);
      toast.success(`Welcome back, ${data.admin.fullName}`);
      router.push('/');
    },
  });
}
