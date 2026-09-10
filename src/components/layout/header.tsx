'use client';

import { IconMenu } from '@/components/ui/icons';
import HeaderClock from './header-clock';
import HeaderSearch from './header-search';
import NotificationsMenu from './notifications-menu';
import UserMenu from './user-menu';

export default function Header({
  onOpenMobileMenu,
}: {
  onOpenMobileMenu: () => void;
}) {
  return (
    <header className="flex bg-[#F4F5F9]  justify-between w-full h-16 shrink-0 items-center gap-4 border-b border-border px-4 sm:px-6">
      <div className="w-full">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-muted lg:hidden"
        >
          <IconMenu className="h-5 w-5" />
        </button>
        <div className="flex w-full items-center gap-4">
          <HeaderSearch />
          <HeaderClock />
        </div>
      </div>

      <div className="justify-end w-full flex items-center gap-1.5 sm:gap-3">
        <NotificationsMenu />
        <div className="mx-1 h-6 w-px bg-border" />
        <UserMenu />
      </div>
    </header>
  );
}
