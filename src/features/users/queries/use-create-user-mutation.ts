import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiError } from '@/types/api';
import { createUser } from '../api/users.api';
import type { CreateUserInput } from '../schemas/user.schema';
import type { User } from '../types/user';
import { usersKeys } from './users.keys';

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation<User, ApiError, CreateUserInput>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}
