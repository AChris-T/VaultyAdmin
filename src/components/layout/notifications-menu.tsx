'use client';

import { useState } from 'react';
import { IconBell } from '@/components/ui/icons';

export default function NotificationsMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-surface-muted hover:text-foreground"
      >
        <IconBell className="h-4.5 w-4.5" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-border bg-surface p-4 shadow-lg">
            <p className="text-sm font-medium text-foreground">
              Notifications
            </p>
            <p className="mt-6 mb-2 text-center text-xs text-muted-foreground">
              You&apos;re all caught up — no notifications yet.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
