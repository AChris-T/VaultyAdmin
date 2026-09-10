import Image from 'next/image';
import React from 'react';
import AuthShowcase from '@/features/auth/components/showcase';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="flex max-h-[100vh] flex-col text-black font-gellix lg:flex-row">
      <div className="hidden lg:flex lg:flex-1">
        <AuthShowcase />
      </div>
      <div className="no-scrollbar flex flex-1 flex-col items-center justify-center gap-8 overflow-y-auto px-6 py-10">
        <Image
          src={'/icons/Vaultly.svg'}
          alt="logo"
          width={105}
          height={24}
          className="mb-2 object-cover"
        />
        {children}
        <p className="text-xs font-medium font-gellix text-[#4F4F4F]">
          © 2026 Vaultly. All rights reserved.
        </p>
      </div>
    </div>
  );
}
