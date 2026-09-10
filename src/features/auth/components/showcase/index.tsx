'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { slides } from './slides';
import ProgressDots from './progress-dots';
import TrustStrip from './trust-strip';

const SLIDE_DURATION = 6000;

export default function AuthShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [paused, index]);

  // `slides` is a fixed, non-empty literal and `index` is always kept in
  // range via `% slides.length`, so this index access can't actually miss.
  const active = slides[index] ?? slides[0]!;
  const ActiveMock = active.mock;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-dvh w-full no-scrollbar overflow-hidden bg-linear-to-br from-brand via-brand-dark to-ink text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-black/20 blur-3xl" />

      <div className="no-scrollbar relative z-10 flex h-full flex-col justify-between gap-6 overflow-y-auto p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-white px-2.5 py-1.5 shadow-sm">
            <Image src="/icons/logo.svg" alt="Vaultly" width={81} height={14} />
          </span>
          <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] font-medium text-white/70">
            Admin Console
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div key={index} className="animate-[fade-slide-in_0.6s_ease]">
            <ActiveMock />
          </div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          <div
            key={`text-${index}`}
            className="animate-[fade-slide-in_0.6s_ease]"
          >
            <span className="text-xs font-semibold tracking-wide text-white/60 uppercase">
              {active.eyebrow}
            </span>
            <h2 className="mt-2 font-gellix text-xl font-semibold text-white sm:text-2xl">
              {active.title}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-white/70">
              {active.description}
            </p>
          </div>

          <ProgressDots
            count={slides.length}
            index={index}
            paused={paused}
            duration={SLIDE_DURATION}
            onSelect={setIndex}
          />
          <TrustStrip />
        </div>
      </div>
    </div>
  );
}
