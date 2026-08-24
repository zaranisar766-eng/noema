'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

const WAVE =
  'M0 22 L60 22 L72 6 L84 38 L96 14 L108 30 L120 22 L170 22 L182 10 L194 34 L206 18 L218 26 L230 22 L340 22';

/** Loading sequence: a waveform fills, then six panels lift like a curtain. */
export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  const path = useRef(null);
  const len = useRef(600);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setGone(true); return; }
    document.body.classList.add('is-locked');
    if (path.current?.getTotalLength) len.current = path.current.getTotalLength();

    let value = 0, target = 0, frame;
    const tick = () => {
      target = Math.min(100, target + Math.random() * 7 + 1.5);
      value += (target - value) * 0.28;
      setPct(value);
      if (value >= 99.4) { setPct(100); setTimeout(() => setGone(true), 340); return; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => { if (gone) document.body.classList.remove('is-locked'); }, [gone]);

  return (
    <AnimatePresence>
      {!gone && [
        <motion.div
          key="pre" role="status" aria-label="Loading NOEMA"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-obsidian"
        >
          <svg viewBox="0 0 40 40" fill="none" className="h-11 w-11 opacity-90" aria-hidden="true">
            <circle cx="20" cy="20" r="15" stroke="#E9B872" strokeWidth="1.2" strokeDasharray="72 24" strokeLinecap="round" />
            <path d="M8 20h24" stroke="#F2EDE3" strokeWidth="1.2" strokeLinecap="round" />
          </svg>

          <div className="h-11 w-[min(340px,62vw)]">
            <svg viewBox="0 0 340 44" preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-hidden="true">
              <path d={WAVE} fill="none" stroke="var(--edge-strong)" strokeWidth="1.25" />
              <path
                ref={path} d={WAVE} fill="none" stroke="var(--aurum)" strokeWidth="1.5"
                style={{
                  strokeDasharray: len.current,
                  strokeDashoffset: len.current * (1 - pct / 100),
                  filter: 'drop-shadow(0 0 6px rgba(233,184,114,.55))',
                }}
              />
            </svg>
          </div>

          <div className="flex w-[min(340px,62vw)] justify-between font-mono text-[.63rem] uppercase tracking-[.2em] text-ash">
            <span>Calibrating signal</span>
            <span className="text-bone">{String(Math.round(pct)).padStart(3, '0')}</span>
          </div>
        </motion.div>,

        <div key="curtain" className="pointer-events-none fixed inset-0 z-[99] grid grid-cols-6" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.i
              key={i} className="block bg-obsidian"
              initial={{ scaleY: 1 }} exit={{ scaleY: 0 }}
              style={{ transformOrigin: 'top' }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.055 }}
            />
          ))}
        </div>,
      ]}
    </AnimatePresence>
  );
}
