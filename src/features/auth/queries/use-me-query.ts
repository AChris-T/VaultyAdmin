import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/auth.api';

// "me" is a singleton resource (no id), so a plain literal key is enough —
// the full createQueryKeys(entity) factory is built for collections
// (list/detail variants) that this endpoint doesn't have.
export const meQueryKey = ['me'] as const;

export function useMeQuery() {
  return useQuery({
    queryKey: meQueryKey,
    queryFn: getMe,
  });
}
