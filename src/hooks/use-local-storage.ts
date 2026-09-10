'use client';

import { useState } from 'react';
import { useHydrated } from './use-hydrated';

// Resolves the persisted value by adjusting state directly during render
// (React's documented pattern for this — see "You can call the set
// function during rendering" in the useState docs) rather than in a
// useEffect, which react-hooks/set-state-in-effect flags as an avoidable
// extra render for exactly this "read once after hydration" case.
export function useLocalStorage(key: string, initialValue: boolean) {
  const hydrated = useHydrated();
  const [value, setValue] = useState(initialValue);
  const [resolved, setResolved] = useState(false);

  if (hydrated && !resolved) {
    const stored = window.localStorage.getItem(key);
    if (stored !== null) setValue(stored === 'true');
    setResolved(true);
  }

  const setAndPersist = (next: boolean) => {
    window.localStorage.setItem(key, String(next));
    setValue(next);
  };

  return [value, setAndPersist] as const;
}
