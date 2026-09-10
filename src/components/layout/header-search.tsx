'use client';

import { useState } from 'react';
import { IconSearch } from '@/components/ui/icons';

export default function HeaderSearch() {
  const [value, setValue] = useState('');

  return (
    <div className="relative hidden w-full max-w-sm lg:block">
      <IconSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search…"
        className="w-full rounded-xl border border-border bg-surface-muted py-2 pr-3 pl-9 text-sm text-foreground outline-none placeholder:text-muted-foreground "
      />
    </div>
  );
}
