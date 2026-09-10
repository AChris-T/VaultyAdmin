'use client';

import { useState, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import Header from './header';
import Sidebar from './sidebar';

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useLocalStorage(
    'vaultly.sidebar-collapsed',
    false
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-dvh bg-background text-foreground">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onOpenMobileMenu={() => setMobileOpen(true)} />
        <main className="flex-1  overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
