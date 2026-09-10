'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import {
  IconApprovals,
  IconChevronLeft,
  IconChevronRight,
  IconHome,
  IconX,
} from '@/components/ui/icons';
import SidebarNavItem from './sidebar-nav-item';

const NAV_ITEMS = [
  { href: '/', label: 'Overview', icon: IconHome },
  { href: '/approvals', label: 'Approvals', icon: IconApprovals },
];

export default function Sidebar({
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const content = (
    <>
      <div
        className={cn(
          'flex items-center bg-[#F4F5F9] border-border border-b gap-2 px-4 py-4.5',
          collapsed && 'justify-center px-0'
        )}
      >
        {collapsed ? (
          <div className="flex items-center gap-3">
            <Image
              src="/icons/Vaultly.svg"
              alt="Vaultly"
              width={30}
              height={10}
            />
            <div onClick={onToggleCollapsed} className="cursor-pointer">
              <IconChevronRight className="h-4 w-4" />
            </div>
          </div>
        ) : (
          <div className="flex justify-between  w-full items-center gap-3">
            <Image
              src="/icons/logo.svg"
              alt="Vaultly"
              width={150}
              height={24}
            />
            <div onClick={onToggleCollapsed} className="cursor-pointer">
              <IconChevronLeft className="h-4 w-4" />
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close menu"
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-muted lg:hidden"
        >
          <IconX className="h-4.5 w-4.5" />
        </button>
      </div>

      <nav className="flex-1 bg-[#F4F5F9] space-y-1 px-3 pt-6">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.href}
            {...item}
            collapsed={collapsed}
            onNavigate={onCloseMobile}
          />
        ))}
      </nav>
    </>
  );

  return (
    <>
      <aside
        className={cn(
          'hidden shrink-0 flex-col border-r border-border bg-surface transition-[width] duration-200 lg:flex',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {content}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onCloseMobile}
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-surface">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
