import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

// True once the component has hydrated on the client. Gate reads of
// browser-only state (localStorage, matchMedia, "now"...) on this instead
// of `useEffect(() => setX(...), [])` — that pattern is flagged by
// react-hooks/set-state-in-effect as an avoidable extra render;
// useSyncExternalStore gets the same "differs on server vs. client,
// settles after hydration" result as part of React's own hydration pass.
export function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
