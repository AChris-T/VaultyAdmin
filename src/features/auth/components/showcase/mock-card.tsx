import type { ReactNode } from 'react';

export default function MockCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/6 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/3 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 truncate font-mono text-[10px] text-white/35">
          {label}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
