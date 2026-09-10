import {
  AUTH_REFRESH_TOKEN_STORAGE_KEY,
  AUTH_TOKEN_STORAGE_KEY,
} from '@/config/constants';

// Tokens are stored as (non-httpOnly) cookies rather than localStorage so
// the server-side Proxy (src/proxy.ts) can read auth state before a page
// renders. A real backend would set these as httpOnly cookies on the
// login/refresh response instead; client-set cookies are the pragmatic
// equivalent while there's no backend issuing them.
//
// The access token is short-lived and sent on every API request (see
// lib/axios/instance.ts). The refresh token is long-lived and only ever
// sent to `/admin/auth/token/refresh` — it's also what Proxy checks for route
// access, since gating on the short-lived access token would bounce users
// to /login every time it naturally expires instead of letting the silent
// refresh in instance.ts renew it first.

const ACCESS_TOKEN_FALLBACK_MAX_AGE = 60 * 15; // 15 minutes
const REFRESH_TOKEN_FALLBACK_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1] ?? '') : null;
}

function writeCookie(name: string, value: string, maxAgeSeconds: number): void {
  if (typeof document === 'undefined') return;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; max-age=0`;
}

// Both the verify-login and token-refresh responses give an exact ISO
// expiry; the fallback below only matters if a caller is ever missing one.
function maxAgeFromExpiry(expiresAt: string | undefined, fallbackSeconds: number): number {
  if (!expiresAt) return fallbackSeconds;
  const seconds = Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000);
  return seconds > 0 ? seconds : fallbackSeconds;
}

export function getAccessToken(): string | null {
  return readCookie(AUTH_TOKEN_STORAGE_KEY);
}

export function setAccessToken(token: string, expiresAt?: string): void {
  writeCookie(
    AUTH_TOKEN_STORAGE_KEY,
    token,
    maxAgeFromExpiry(expiresAt, ACCESS_TOKEN_FALLBACK_MAX_AGE)
  );
}

export function getRefreshToken(): string | null {
  return readCookie(AUTH_REFRESH_TOKEN_STORAGE_KEY);
}

export function setRefreshToken(token: string, expiresAt?: string): void {
  writeCookie(
    AUTH_REFRESH_TOKEN_STORAGE_KEY,
    token,
    maxAgeFromExpiry(expiresAt, REFRESH_TOKEN_FALLBACK_MAX_AGE)
  );
}

export function setAuthTokens(tokens: {
  accessToken: string;
  accessTokenExpiresAt?: string;
  refreshToken: string;
  refreshTokenExpiresAt?: string;
}): void {
  setAccessToken(tokens.accessToken, tokens.accessTokenExpiresAt);
  setRefreshToken(tokens.refreshToken, tokens.refreshTokenExpiresAt);
}

export function clearAuthTokens(): void {
  deleteCookie(AUTH_TOKEN_STORAGE_KEY);
  deleteCookie(AUTH_REFRESH_TOKEN_STORAGE_KEY);
}
