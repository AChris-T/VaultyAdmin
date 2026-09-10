'use client';

import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react';

export default function OtpField({
  length = 6,
  value,
  onChange,
  error,
}: {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const setDigit = (index: number, digit: string) => {
    const next = value.padEnd(length, ' ').split('');
    next[index] = digit || ' ';
    onChange(next.join('').trimEnd());
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1);
    setDigit(index, digit);
    if (digit && index < length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '');
    onChange(digits.slice(0, length));
    inputsRef.current[Math.min(digits.length, length) - 1]?.focus();
  };

  return (
    <div className="w-full text-left">
      <div className="flex justify-between gap-2" onPaste={handlePaste}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            value={value[i]?.trim() ?? ''}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            inputMode="numeric"
            maxLength={1}
            className={`h-12 w-11 rounded-xl border text-center text-lg font-semibold text-black outline-none transition ${
              error
                ? 'border-red-400 focus:border-red-500'
                : 'border-black/10 focus:border-brand focus:ring-2 focus:ring-brand/15'
            }`}
          />
        ))}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
