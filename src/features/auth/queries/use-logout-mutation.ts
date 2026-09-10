'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { clearAuthTokens } from '@/lib/axios/token-storage';
import { logout } from '../api/auth.api';
import { meQueryKey } from './use-me-query';

export function useLogoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    // onSettled, not onSuccess: a failed logout request (e.g. a network
    // blip) shouldn't trap the user in a logged-in-but-broken state —
    // clear the local session and redirect either way. The global toast
    // (mutationCache.onError) still surfaces the failure if it happens.
    onSettled: () => {
      clearAuthTokens();
      queryClient.removeQueries({ queryKey: meQueryKey });
      router.push('/login');
    },
  });
}
