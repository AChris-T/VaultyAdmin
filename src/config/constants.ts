export const AUTH_TOKEN_STORAGE_KEY = 'vaultly.auth.token';
export const AUTH_REFRESH_TOKEN_STORAGE_KEY = 'vaultly.auth.refresh_token';

export const QUERY_DEFAULTS = {
  staleTimeMs: 60_000,
  gcTimeMs: 5 * 60_000,
  retry: 1,
} as const;

export const DEFAULT_PAGE_SIZE = 20;
