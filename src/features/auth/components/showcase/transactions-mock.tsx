import MockCard from './mock-card';
import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconChevronRight,
} from '@/components/ui/icons';

const avatarPalette = [
  'bg-sky-400/15 text-sky-300',
  'bg-violet-400/15 text-violet-300',
  'bg-amber-400/15 text-amber-300',
  'bg-rose-400/15 text-rose-300',
];

const statusStyle: Record<string, string> = {
  Completed: 'bg-emerald-400/15 text-emerald-300',
  Pending: 'bg-amber-400/15 text-amber-300',
  Flagged: 'bg-rose-400/15 text-rose-300',
};

const rows = [
  {
    name: 'Adaeze Okonkwo',
    type: 'Transfer',
    amount: '+$2,450.00',
    credit: true,
    status: 'Completed',
  },
  {
    name: 'Chris Ibe',
    type: 'Withdrawal',
    amount: '-$180.00',
    credit: false,
    status: 'Pending',
  },
  {
    name: 'Fatima Sule',
    type: 'Card Payment',
    amount: '-$64.20',
    credit: false,
    status: 'Flagged',
  },
];

export default function TransactionsMock() {
  return (
    <MockCard label="vaultly.app/transactions">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-white/50">
          Recent Activity
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-emerald-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>
      </div>
      <div className="mt-2 divide-y divide-white/10">
        {rows.map((row, i) => (
          <div key={row.name} className="flex items-center gap-3 py-2.5">
            <span className="relative shrink-0">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold ${avatarPalette[i % avatarPalette.length]}`}
              >
                {row.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
              <span
                className={`absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full shadow-[0_0_0_2px_rgba(0,0,0,0.35)] ${row.credit ? 'bg-emerald-400 text-emerald-950' : 'bg-white/80 text-black/70'}`}
              >
                {row.credit ? (
                  <IconArrowDownLeft className="h-2.5 w-2.5" />
                ) : (
                  <IconArrowUpRight className="h-2.5 w-2.5" />
                )}
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {row.name}
              </p>
              <p className="text-[11px] text-white/45">{row.type}</p>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-semibold tabular-nums ${row.credit ? 'text-emerald-300' : 'text-white'}`}
              >
                {row.amount}
              </p>
              <span
                className={`mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium ${statusStyle[row.status]}`}
              >
                {row.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg border border-white/10 py-2 text-[11px] font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
      >
        View all transactions
        <IconChevronRight className="h-3 w-3" />
      </button>
    </MockCard>
  );
}
