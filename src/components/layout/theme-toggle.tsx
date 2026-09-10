'use client';

import { useTheme } from 'next-themes';
import { useHydrated } from '@/hooks/use-hydrated';
import { IconMoon, IconSun } from '@/components/ui/icons';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // resolvedTheme is undefined on the server and on the pre-hydration
  // client render — render a neutral placeholder until hydrated instead
  // of guessing, to avoid a hydration mismatch.
  const hydrated = useHydrated();

  const isDark = hydrated && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-surface-muted hover:text-foreground"
    >
      {hydrated ? (
        isDark ? (
          <IconSun className="h-4.5 w-4.5" />
        ) : (
          <IconMoon className="h-4.5 w-4.5" />
        )
      ) : (
        <span className="h-4.5 w-4.5" />
      )}
    </button>
  );
}
