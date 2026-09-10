import { IconBadgeCheck, IconClock, IconLock } from '@/components/ui/icons';

const items = [
  { icon: IconLock, label: '256-bit encryption' },
  { icon: IconBadgeCheck, label: 'SOC 2 Type II' },
  { icon: IconClock, label: '99.99% uptime' },
];

export default function TrustStrip() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-sm font-medium text-white/50">
      {items.map(({ icon: Icon, label }) => (
        <span key={label} className="inline-flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5" />
          {label}
        </span>
      ))}
    </div>
  );
}
