import { useEffect, useState } from 'react';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Boot overlay: brand mark + progress line. Auto-dismisses at the cap
 * (820ms + 380ms fade) and unmounts; reduced-motion renders nothing.
 * Fades via opacity only so the page layout is untouched underneath.
 */
export function LoadingExperience() {
  const [reduced] = useState(prefersReducedMotion);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const fadeTimer = window.setTimeout(() => setFading(true), 820);
    const goneTimer = window.setTimeout(() => setGone(true), 820 + 380);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(goneTimer);
    };
  }, [reduced]);

  if (reduced || gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg ${fading ? 'pointer-events-none' : ''}`}
      style={{ opacity: fading ? 0 : 1, transition: 'opacity 380ms ease' }}
    >
      <div className="text-center">
        <p className="text-sm font-medium tracking-[0.45em] text-primary" style={{ fontFamily: 'var(--font-mono)' }}>
          SHAURYA SANYAL
        </p>
        <div className="relative mt-4 h-px w-48 overflow-hidden bg-border/40">
          <div className="load-progress-line absolute inset-0 bg-accent" />
        </div>
        <p className="mt-3 text-[0.65rem] uppercase tracking-[0.3em] text-muted">system initialization</p>
      </div>
    </div>
  );
}