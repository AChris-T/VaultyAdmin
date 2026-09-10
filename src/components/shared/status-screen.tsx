import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export default function StatusScreen({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center',
        className
      )}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        {icon}
      </span>
      <div className="space-y-2">
        <h1 className="font-gellix text-2xl font-bold text-foreground">
          {title}
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
