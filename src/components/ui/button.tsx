'use client';

import type { ButtonHTMLAttributes } from 'react';

export default function Button({
  loading,
  children,
  className,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      disabled={disabled || loading}
      className={`flex w-full items-center cursor-pointer justify-center gap-2 rounded-full bg-linear-to-b from-brand to-brand-dark py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${className ?? ''}`}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </button>
  );
}
