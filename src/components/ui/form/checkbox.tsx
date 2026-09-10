'use client';

import { IconCheck } from '../icons';

export default function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-black/70">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border transition ${
          checked
            ? 'border-brand bg-brand text-white'
            : 'border-black/20 bg-white text-transparent'
        }`}
      >
        <IconCheck className="h-2.5 w-2.5" />
      </span>
      {label}
    </label>
  );
}
