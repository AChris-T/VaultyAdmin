import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/users.api';
import type { UsersFilters } from '../types/user';
import { usersKeys } from './users.keys';

export function useUsersQuery(filters: UsersFilters = {}) {
  return useQuery({
    queryKey: usersKeys.list(filters),
    queryFn: () => getUsers(filters),
    placeholderData: (previous) => previous,
  });
}
