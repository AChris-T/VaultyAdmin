'use client';

import { useState } from 'react';
import MockCard from './mock-card';
import AreaChart from './area-chart';
import { IconArrowUpRight, IconEye, IconEyeOff } from '@/components/ui/icons';

const periods = ['1W', '1M', '3M', '1Y'];
const stats: [string, string][] = [
  ['24', 'Accounts'],
  ['3', 'Pending'],
  ['1', 'Alerts'],
];

export default function OverviewMock() {
  const [hideBalance, setHideBalance] = useState(false);
  const [period, setPeriod] = useState('1M');

  return (
    <MockCard label="vaultly.app/overview">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-medium text-white/50">Total Balance</p>
          <div className="mt-1 flex items-center gap-1.5">
            <p className="text-3xl font-semibold tracking-tight text-white tabular-nums">
              {hideBalance ? '••••••••' : '$482,930.00'}
            </p>
            <button
              type="button"
              onClick={() => setHideBalance((v) => !v)}
              aria-label={hideBalance ? 'Show balance' : 'Hide balance'}
              className="flex h-6 w-6 items-center justify-center rounded-md text-white/40 transition hover:bg-white/10 hover:text-white"
            >
              {hideBalance ? (
                <IconEyeOff className="h-4 w-4" />
              ) : (
                <IconEye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-1 text-[11px] font-medium text-emerald-300">
          <IconArrowUpRight className="h-3 w-3" />
          12.4%
        </span>
      </div>

      <div className="mt-5">
        <AreaChart />
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-white/30">
          <span>Apr</span>
          <span>Sep</span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1">
        {periods.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriod(p)}
            className={`rounded-md px-2 py-1 text-[10px] font-medium transition ${
              period === p
                ? 'bg-white/15 text-white'
                : 'text-white/35 hover:text-white/60'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
        {stats.map(([value, label]) => (
          <div key={label} className="rounded-lg bg-white/5 px-2.5 py-2">
            <p className="text-sm font-semibold text-white tabular-nums">
              {value}
            </p>
            <p className="text-[10px] text-white/45">{label}</p>
          </div>
        ))}
      </div>
    </MockCard>
  );
}
