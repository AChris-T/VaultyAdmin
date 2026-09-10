import {
  MutationCache,
  QueryClient,
  environmentManager,
} from '@tanstack/react-query';
import { QUERY_DEFAULTS } from '@/config/constants';
import { toast } from '@/lib/toast';
import type { ApiError } from '@/types/api';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_DEFAULTS.staleTimeMs,
        gcTime: QUERY_DEFAULTS.gcTimeMs,
        retry: QUERY_DEFAULTS.retry,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
    mutationCache: new MutationCache({
      onError: (error) => {
        const apiError = error as unknown as ApiError;
        toast.error(apiError.message || 'Something went wrong.');
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}
