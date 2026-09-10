import { apiClient } from '@/lib/axios/instance';
import type { ApiEnvelope } from '@/types/api';
import type { LoginInput } from '../schemas/login.schema';
import type { VerifyLoginInput } from '../schemas/verify-login.schema';
import type {
  AuthUser,
  LoginChallenge,
  VerifyLoginResponse,
} from '../types/auth';

export async function login(payload: LoginInput): Promise<LoginChallenge> {
  const { data } = await apiClient.post<ApiEnvelope<LoginChallenge>>(
    '/admin/auth/login',
    payload
  );
  return data.data;
}

export async function verifyLogin(
  payload: VerifyLoginInput
): Promise<VerifyLoginResponse> {
  const { data } = await apiClient.post<ApiEnvelope<VerifyLoginResponse>>(
    '/admin/auth/login/verify',
    payload
  );
  return data.data;
}

export async function getMe(): Promise<AuthUser> {
  const { data } = await apiClient.get<ApiEnvelope<AuthUser>>('/admin/auth/me');
  return data.data;
}

export async function logout(): Promise<void> {
  await apiClient.post('/admin/auth/logout');
}
