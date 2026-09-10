'use client';

import Spinner from '@/components/shared/spinner';
import { useUserFilters } from '../hooks/use-user-filters';
import { useUsersQuery } from '../queries/use-users-query';

export default function UsersList() {
  const { search, setSearch, filters } = useUserFilters();
  const { data, isLoading, isError, error } = useUsersQuery(filters);

  return (
    <div className="w-full max-w-2xl">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users…"
        className="mb-4 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none focus:border-brand"
      />

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner /> Loading users…
        </div>
      )}

      {isError && <p className="text-sm text-red-500">{error.message}</p>}

      {data && data.items.length === 0 && (
        <p className="text-sm text-muted-foreground">No users found.</p>
      )}

      {data && data.items.length > 0 && (
        <ul className="divide-y divide-border rounded-xl border border-border">
          {data.items.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <span className="text-xs font-medium text-muted-foreground uppercase">
                {user.role}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
