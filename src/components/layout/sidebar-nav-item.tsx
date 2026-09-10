'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentType } from 'react';
import { cn } from '@/lib/utils/cn';

export default function SidebarNavItem({
  href,
  label,
  icon: Icon,
  collapsed,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      className={cn(
        'flex items-center gap-3 rounded-xl font-sans px-3 py-2.5 text-sm font-medium transition',
        collapsed && 'justify-center',
        isActive
          ? 'bg-brand/10 text-brand'
          : 'text-muted-foreground hover:bg-surface-muted hover:text-foreground'
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}
