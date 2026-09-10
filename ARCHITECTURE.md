# Architecture

Feature-based Next.js App Router codebase. This doc explains where things go
and why, so new code lands in the right place without re-deriving the rules.

## Folder map

```
src/
  app/                  Routes only (layouts, pages, providers). Thin.
  components/
    ui/                 Style-only primitives: Button, icons.
      form/              Form-specific primitives: TextField, PasswordField,
                         OtpField, Checkbox.
                         No feature imports, no data fetching.
    shared/              Composed from ui/, used by 2+ features (Spinner, etc).
    layout/              The app shell: DashboardShell, Sidebar, Header, and
                         their pieces. Unlike ui/, layout/ is allowed to
                         import from features/ (e.g. UserMenu uses
                         features/auth's useMeQuery) — it's app-shell
                         composition, the same tier as app/ itself, not a
                         style-only primitive.
  features/
    <name>/
      components/       Feature UI. Can be client or server components.
      hooks/             Non-query state hooks local to this feature.
      api/               Axios calls only. No React in this folder.
      queries/           React Query hooks (useXQuery/useXMutation) + key factory.
      types/             Domain types.
      schemas/           zod schemas — the source of truth for a shape;
                         types are inferred from these where the shape is
                         validated at a boundary (forms, API responses).
  lib/
    axios/               The one Axios instance + interceptors + token storage.
    react-query/         QueryClient factory + generic query-key factory.
    utils/               Framework-agnostic helpers (cn, etc).
  hooks/                 Hooks with zero feature knowledge (useDebounce).
  types/                 Types with zero feature knowledge (ApiError, Paginated<T>).
  config/                env.ts (validated env access) + constants.ts.
  styles/                globals.css.
public/                  Static assets. Must stay at repo root (Next requirement).
```

## Rules of thumb

- **A file only imports "inward or sideways," never "outward."**
  `lib` and `components/ui` know nothing about `features`. A feature can
  import from `lib`, `components/ui`, `components/shared`, `hooks`, `types`,
  `config` — never from another feature's internals. If two features need
  the same thing, promote it to `lib`, `components/shared`, or `hooks`.

- **`app/` stays thin.** A `page.tsx` composes feature components and sets
  metadata; it doesn't hold `useState`, fetch logic, or form handling. That
  lives in `features/<name>/components/`. This is also the client/server
  boundary: pages default to server components unless they need
  interactivity, and only the leaf component that needs `useState`/handlers
  gets `'use client'` (see `features/auth/components/login-form.tsx`).

- **Axios calls never appear inside components.** `features/<name>/api/*.ts`
  is the only place that imports `@/lib/axios/instance`. Components call a
  `queries/` hook, never the api layer directly — that's what makes the data
  layer swappable/testable independent of the UI.

- **Query keys come from `createQueryKeys`** (`lib/react-query/query-key-factory.ts`),
  one call per feature (see `features/users/queries/users.keys.ts`). This is
  what keeps `invalidateQueries({ queryKey: usersKeys.lists() })` correct as
  the feature grows — no hand-typed key arrays scattered across hooks.

- **`schemas/` validates boundaries, not everything.** Use zod where data
  crosses a trust boundary: an API response (`usersResponseSchema.parse`) or
  a form submission (`loginSchema.safeParse`). Internal props don't need it.

## Adding a new feature

1. `src/features/<name>/{components,hooks,api,queries,types,schemas}`
2. `schemas/<name>.schema.ts` — zod shape(s) + inferred types for anything
   crossing a boundary.
3. `api/<name>.api.ts` — thin functions wrapping `apiClient`, typed return.
4. `queries/<name>.keys.ts` — `createQueryKeys('<name>')`.
5. `queries/use-<x>-query.ts` / `use-<x>-mutation.ts` — wrap the api
   functions with `useQuery`/`useMutation`, using the key factory.
6. `components/*.tsx` — consume the query hooks. `'use client'` only where
   state/handlers are actually needed.
7. Wire it into `app/` with a thin page.

`features/users/` is a complete reference implementation of this flow, wired
end-to-end against the real API at `NEXT_PUBLIC_API_URL`.

## API error contract

The backend returns [RFC 7807 Problem Details](https://www.rfc-editor.org/rfc/rfc7807)
error bodies, not `{ message }`:

```json
{
  "type": "https://vaultly.dev/problems/auth-invalid-credentials",
  "title": "Invalid email or password",
  "status": 401,
  "code": "AUTH_INVALID_CREDENTIALS",
  "instance": "b97c58f7-6c12-4a9b-9852-8b4b21d0ce8e"
}
```

`lib/axios/instance.ts`'s response interceptor is the **only** place that
reads this shape — it normalizes every rejection into `ApiError`
(`types/api.ts`) before anything else sees it, preferring `detail` (specific
to this occurrence) over `title` (a generic category) when both are present,
per the RFC's own semantics. Nothing downstream — mutations, the global
toast in `mutationCache.onError`, `error.tsx` — ever touches a raw response
body; they all consume `ApiError.message`. If the API adds a validation-error
shape later (e.g. an `invalid-params` array), extend the normalization here,
not at each call site.

## Config & environment

`src/config/env.ts` is the only file allowed to read `process.env` for
app config — it validates with zod at import time and fails fast with a
clear error if a required var is missing or malformed. Everything else
imports `{ env }` from there, never `process.env` directly. Env files
(`.env.local`, `.env.example`) live at the repo root, not under `src/`, per
Next.js convention.

## Auth

Two tokens, two lifetimes: a short-lived **access token** sent on every API
request, and a long-lived **refresh token** used only to mint new access
tokens. Both live in `lib/axios/token-storage.ts` as (non-httpOnly) cookies,
not `localStorage` — they have to be cookies because `src/proxy.ts` (the
route guard, below) runs server-side and can only read cookies. A real
backend would set these as `httpOnly` cookies on the login/refresh response
instead of the client setting them itself; swapping to that just means
editing `token-storage.ts` — nothing else touches the cookies directly.

`lib/axios/instance.ts` wires the two together:

- The request interceptor attaches the access token to every request.
- On a `401`, the response interceptor calls `/admin/auth/token/refresh`
  with the refresh token, retries the original request with the new access
  token, and — critically — **shares one in-flight refresh promise** across
  every request that fails at the same time, so a burst of concurrent 401s
  triggers exactly one refresh call, not one per request.
- That endpoint **rotates** the refresh token — the response carries a new
  `refreshToken`/`refreshTokenExpiresAt` alongside the new access token,
  and the old refresh token is invalidated server-side. `refreshAccessToken`
  in `instance.ts` must save both via `setAuthTokens(...)`, not just the
  access token — saving only the access token means the session breaks
  after exactly one silent refresh, since the next one retries against a
  refresh token the server already invalidated.
- If the refresh itself fails (refresh token expired/invalid), it clears
  both tokens and hard-reloads to `/login` — a real `router.push` isn't
  available here (this is a plain module, not a component), and a full
  reload is actually correct on session expiry: it guarantees the React
  Query cache and all component state get wiped, not left stale.

`src/proxy.ts` is Next's route guard (the `middleware.ts` convention was
renamed to `proxy.ts` in v16 — see `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`).
It runs before every page navigation (matcher excludes `/api`, `_next`, and
any request for a file, so static assets like `/icons/*.svg` are never
gated): no **refresh** token cookie + not `/login` → redirect to
`/login?from=<path>`; refresh token cookie present + on `/login` → redirect
to `/`. It deliberately checks the refresh token, not the access token —
gating on the short-lived one would bounce users to `/login` every ~15
minutes when it naturally expires, instead of letting the silent refresh in
`instance.ts` renew it first. Add new public routes to the `PUBLIC_PATHS`
array at the top of that file.

## Dashboard shell

`app/(dashboard)/` is a route group wrapping every authenticated page in
`DashboardShell` (`components/layout/`) — sidebar + header + `<main>`. It's
a route group, not a URL segment, so `/` and `/users` are unaffected; adding
a new dashboard page means adding it under `(dashboard)/` and, if it needs
nav, an entry in `NAV_ITEMS` in `components/layout/sidebar.tsx`.

**Sidebar collapse** persists via `hooks/use-local-storage.ts`, which
resolves the stored value by adjusting state directly during render (React's
documented pattern for this) rather than in a `useEffect` — the effect-based
"bootstrap from a browser API" pattern is flagged by the
`react-hooks/set-state-in-effect` ESLint rule as an avoidable extra render.
The same reasoning applies to `hooks/use-hydrated.ts` (built on
`useSyncExternalStore`) and everywhere a component needs a browser-only
value (`ThemeToggle`, `HeaderClock`): render nothing (or a neutral
placeholder) until hydrated, then read the real value directly in the
render body — never `useEffect(() => setX(browserValue), [])`.

**The signed-in admin's profile** (`UserMenu`) comes from
`features/auth/queries/use-me-query.ts` (`GET /admin/auth/me`), not a
localStorage snapshot — it's a normal React Query hook, so it's always
fresh and needs no hydration gating of its own.
`use-verify-login-mutation.ts` seeds that same query's cache
(`queryClient.setQueryData(meQueryKey, data.admin)`) with the profile the
login response already includes, so the header shows it instantly instead
of waiting on a redundant fetch right after redirecting to `/`. Logging out
must explicitly `queryClient.removeQueries({ queryKey: meQueryKey })` —
unlike a full reload, a client-side `router.push('/login')` doesn't clear
the QueryClient, so a stale cached profile would otherwise survive into the
next login.

**Dark mode** is `next-themes` (`attribute="class"`), wired in
`app/providers.tsx`; `<html>` needs `suppressHydrationWarning` (see
`app/layout.tsx`) because `next-themes` sets the class via a pre-hydration
script. Tailwind's dark variant is redefined in `styles/globals.css` as
`@custom-variant dark (&:where(.dark, .dark *))` so it matches that class
instead of only `prefers-color-scheme`; light/dark values for
`background`/`foreground`/`surface`/`surface-muted`/`border`/
`muted-foreground` live in `:root` and `.dark` there. Any new UI in the
dashboard should use those tokens (`bg-surface`, `text-muted-foreground`,
etc.), not hardcoded `black`/`white`/`gray-*`, or it won't adapt to dark
mode — see `features/users/components/users-list.tsx` for the pattern.
