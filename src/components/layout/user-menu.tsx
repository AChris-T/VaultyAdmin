'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMeQuery } from '@/features/auth/queries/use-me-query';
import { useLogoutMutation } from '@/features/auth/queries/use-logout-mutation';
import {
  IconChevronDown,
  IconLogOut,
  IconSettings,
} from '@/components/ui/icons';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const { data: user } = useMeQuery();
  const logoutMutation = useLogoutMutation();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-lg py-1 pr-2 pl-1.5 transition hover:bg-surface-muted"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
          {initials(user.fullName)}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-medium text-foreground">
            {user.fullName}
          </span>
          <span className="block text-xs font-medium text-muted-foreground capitalize">
            {user.role}
          </span>
        </span>
        <IconChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-border bg-surface p-1.5 shadow-lg">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-surface-muted"
            >
              <IconSettings className="h-4 w-4 text-muted-foreground" />
              Settings
            </Link>

            <div className="my-1.5 h-px bg-border" />

            <button
              type="button"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-foreground transition hover:bg-surface-muted disabled:opacity-60"
            >
              <IconLogOut className="h-4 w-4 text-muted-foreground" />
              {logoutMutation.isPending ? 'Logging out…' : 'Log out'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
