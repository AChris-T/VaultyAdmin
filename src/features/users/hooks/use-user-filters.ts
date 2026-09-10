'use client';

import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import type { UsersFilters } from '../types/user';

export function useUserFilters() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  const filters = useMemo<UsersFilters>(
    () => ({ search: debouncedSearch || undefined, page }),
    [debouncedSearch, page]
  );

  return { search, setSearch, page, setPage, filters };
}
