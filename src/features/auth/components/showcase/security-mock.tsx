'use client';

import { useState } from 'react';
import MockCard from './mock-card';
import { IconCheck, IconShieldCheck } from '@/components/ui/icons';

const items = [
  'Two-factor authentication enabled',
  'Audit log retention: 12 months',
];

const complianceBadges = ['SOC 2 TYPE II', 'ISO 27001', 'PCI DSS L1'];

export default function SecurityMock() {
  const [require2fa, setRequire2fa] = useState(true);

  return (
    <MockCard label="vaultly.app/security">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
          <IconShieldCheck className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-white">Security Center</p>
          <p className="text-[11px] text-white/45">All systems protected</p>
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 rounded-lg bg-white/5 px-2.5 py-2 text-sm text-white/85"
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] bg-emerald-400 text-emerald-950">
              <IconCheck className="h-3 w-3" />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setRequire2fa((v) => !v)}
        className="mt-3 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"
      >
        <span className="text-left">
          <span className="block text-xs font-medium text-white/85">
            Require 2FA for all admins
          </span>
          <span className="block text-[10px] text-white/40">
            Applies to every operator account
          </span>
        </span>
        <span
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${require2fa ? 'bg-emerald-400' : 'bg-white/20'}`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${require2fa ? 'translate-x-0' : '-translate-x-4'}`}
          />
        </span>
      </button>
      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
        {complianceBadges.map((b) => (
          <span
            key={b}
            className="rounded-md border border-white/10 px-2 py-1 text-[9px] font-medium tracking-wide text-white/45"
          >
            {b}
          </span>
        ))}
      </div>
    </MockCard>
  );
}
