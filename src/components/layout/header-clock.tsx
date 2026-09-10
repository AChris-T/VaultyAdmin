'use client';

import { useEffect, useReducer } from 'react';
import { useHydrated } from '@/hooks/use-hydrated';

function readLocation(): string {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone; // e.g. "Africa/Lagos"
  return zone.replace(/_/g, ' '); // e.g. "America/New_York" -> "America/New York"
}

function readTime(): string {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function HeaderClock() {
  const hydrated = useHydrated();
  const [, forceTick] = useReducer((c: number) => c + 1, 0);

  useEffect(() => {
    const timer = setInterval(forceTick, 30_000);
    return () => clearInterval(timer);
  }, []);

  if (!hydrated) return null;

  return (
    <div className="hidden h-7 w-fit shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#E4F4EC] px-3 font-sans text-sm font-medium whitespace-nowrap text-[#0E6B49] md:flex">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0E6B49] opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0E6B49]" />
      </span>
      {readLocation()}
      <span>·</span>
      {readTime()}
    </div>
  );
}
