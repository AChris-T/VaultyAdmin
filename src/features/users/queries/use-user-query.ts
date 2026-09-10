import { useQuery } from '@tanstack/react-query';
import { getUser } from '../api/users.api';
import { usersKeys } from './users.keys';

export function useUserQuery(id: string | undefined) {
  return useQuery({
    queryKey: usersKeys.detail(id ?? ''),
    queryFn: () => getUser(id as string),
    enabled: Boolean(id),
  });
}
