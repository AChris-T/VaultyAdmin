import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { env } from '@/config/env';
import type { ApiEnvelope, ApiError } from '@/types/api';
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
} from './token-storage';

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: env.NEXT_PUBLIC_API_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

const refreshClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: env.NEXT_PUBLIC_API_TIMEOUT_MS,
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

let refreshPromise: Promise<string | null> | null = null;

// This endpoint *rotates* the refresh token — the response carries a new
// refreshToken/refreshTokenExpiresAt alongside the new access token, and
// the old refresh token is invalidated server-side. Saving only the access
// token here (as an earlier version of this file did) meant every session
// broke after exactly one silent refresh: the next 401 would retry against
// a refresh token the server had already invalidated.
type TokenRefreshResponse = {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
};

function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return Promise.resolve(null);

  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post<ApiEnvelope<TokenRefreshResponse>>('/admin/auth/token/refresh', {
        refreshToken,
      })
      .then(({ data }) => {
        setAuthTokens({
          accessToken: data.data.accessToken,
          accessTokenExpiresAt: data.data.accessTokenExpiresAt,
          refreshToken: data.data.refreshToken,
          refreshTokenExpiresAt: data.data.refreshTokenExpiresAt,
        });
        return data.data.accessToken;
      })
      .catch(() => {
        clearAuthTokens();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

// The API returns RFC 7807 "Problem Details" bodies
// (https://www.rfc-editor.org/rfc/rfc7807): `title` is a short, generic
// summary ("Invalid email or password"); `detail`, when present, is more
// specific to this particular occurrence and takes priority over `title`
// when both exist. `code` is this API's own extension for a machine-
// readable identifier — not part of the RFC.
type ProblemDetails = {
  type?: string;
  title?: string;
  detail?: string;
  code?: string;
  instance?: string;
  errors?: Array<{ path: string; message: string }>;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ProblemDetails>) => {
    const status = error.response?.status ?? 0;
    const config = error.config as RetriableConfig | undefined;
    // Gate on the refresh token, not the access token — the same
    // reasoning as src/proxy.ts. Checking getAccessToken() here was wrong:
    // an *expired* access token means there's legitimately nothing to
    // attach to the request (so it 401s with no Authorization header at
    // all, same as an unauthenticated request), but a refresh token still
    // means "this session should be silently recoverable." Gating on the
    // access token made that exact case — a normal, routine access-token
    // expiry — get treated like a pre-auth 401 (e.g. wrong password on
    // /admin/auth/login) and skip the refresh entirely.
    if (status === 401 && config && !config._retried && getRefreshToken()) {
      config._retried = true;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        config.headers.set?.('Authorization', `Bearer ${newAccessToken}`);
        return apiClient(config);
      }

      if (typeof window !== 'undefined') {
        // A hard reload, not router.push: this file has no access to
        // Next's router (it's a plain axios module, not a component), and
        // a full reload is what we want on session expiry — it guarantees
        // the React Query cache and all component state are wiped.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = '/login';
      }
    }

    // error.message is axios's own technical string (e.g. "timeout of
    // 15000ms exceeded", "Network Error") — never shown to the user. When
    // there's no response at all (timeout, offline, DNS, CORS), fall back
    // to one of our own friendly messages instead.
    const noResponseMessage =
      error.code === 'ECONNABORTED'
        ? 'The request took too long. Please check your connection and try again.'
        : 'Unable to reach the server. Please check your connection and try again.';

    const normalized: ApiError = {
      message: error.response
        ? (error.response.data?.detail ??
          error.response.data?.title ??
          'Something went wrong. Please try again.')
        : noResponseMessage,
      status,
      code: error.response?.data?.code,
      errors: error.response?.data?.errors,
    };

    return Promise.reject(normalized);
  }
);
