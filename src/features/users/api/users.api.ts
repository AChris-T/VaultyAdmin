import { apiClient } from '@/lib/axios/instance';
import type { ApiEnvelope, Paginated } from '@/types/api';
import { usersResponseSchema } from '../schemas/user.schema';
import type { CreateUserInput } from '../schemas/user.schema';
import type { User, UsersFilters } from '../types/user';

export async function getUsers(
  filters: UsersFilters = {}
): Promise<Paginated<User>> {
  // Mirrors the `{ data: ... }` envelope confirmed on the auth endpoints.
  const { data } = await apiClient.get<ApiEnvelope<unknown>>('/users', {
    params: filters,
  });
  return usersResponseSchema.parse(data.data);
}

export async function getUser(id: string): Promise<User> {
  const { data } = await apiClient.get<ApiEnvelope<User>>(`/users/${id}`);
  return data.data;
}

export async function createUser(payload: CreateUserInput): Promise<User> {
  const { data } = await apiClient.post<ApiEnvelope<User>>(
    '/users',
    payload
  );
  return data.data;
}
