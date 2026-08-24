'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import Magnetic from '@/components/ui/Magnetic';
import Avatar from '@/components/ui/Avatar';
import { voices, trustChips } from '@/lib/content';
import { EASE } from '@/lib/motion';

const AUTOPLAY = 6800;

export default function Voices() {
  const [i, setI] = useState(0);
  const timer = useRef(null);
  const touchX = useRef(0);

  const go = useCallback(n => setI((n + voices.length) % voices.length), []);

  const restart = useCallback(() => {
    clearInterval(timer.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer.current = setInterval(() => setI(v => (v + 1) % voices.length), AUTOPLAY);
  }, []);

  useEffect(() => { restart(); return () => clearInterval(timer.current); }, [restart]);

  return (
    <section id="voices" className="pad-y overflow-hidden border-y edge bg-carbon"
      onMouseEnter={() => clearInterval(timer.current)} onMouseLeave={restart}
      onKeyDown={e => {
        if (e.key === 'ArrowRight') { go(i + 1); restart(); }
        if (e.key === 'ArrowLeft')  { go(i - 1); restart(); }
      }}>
      <div className="shell">
        <SectionHead
          eyebrow="Voices"
          lines={['What eight weeks', 'actually changed.']}
          lede="Every quote below is paired with the owner's real focus-index movement over their first eight weeks. We publish the flat ones too."
        />

        <Reveal variant="scale" className="mt-3 overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${i * 100}%` }}
            transition={{ duration: 0.85, ease: EASE }}
            onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 46) { go(dx < 0 ? i + 1 : i - 1); restart(); }
            }}
          >
            {voices.map(v => (
              <div key={v.name} className="w-full flex-none p-1.5">
                <figure className="glass m-0 rounded-[22px] p-[clamp(30px,4.4vw,54px)]">
                  <span aria-hidden="true" className="block font-display text-[3.6rem] leading-[.6] text-aurum opacity-50">&ldquo;</span>
                  <blockquote className="my-5 mb-7 font-display text-[clamp(1.32rem,2.5vw,2.05rem)] font-normal leading-[1.34] tracking-[-.01em]">
                    {v.quote}
                  </blockquote>
                  <figcaption className="flex flex-wrap items-center gap-3.5">
                    <Avatar initials={v.initials} gradient={v.gradient} size={46} />
                    <div>
                      <b className="block text-[.92rem] font-normal">{v.name}</b>
                      <span className="mt-0.5 block font-mono text-[.58rem] uppercase tracking-[.14em] text-ash">{v.role}</span>
                    </div>
                    <div className="ml-auto text-right">
                      <b className="block font-display text-[1.5rem] font-normal text-aurum">{v.delta}</b>
                      <span className="font-mono text-[.55rem] uppercase tracking-[.14em] text-ash">Focus index · 8wk</span>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </motion.div>
        </Reveal>

        <div className="mt-7 flex items-center gap-3">
          {[['Previous', -1, 'M10 3L5 8l5 5'], ['Next', 1, 'M6 3l5 5-5 5']].map(([label, dir, d]) => (
            <Magnetic key={label} strength={0.4}>
              <button aria-label={`${label} testimonial`} onClick={() => { go(i + dir); restart(); }}
                className="grid h-[46px] w-[46px] place-items-center rounded-full border edge transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-obsidian">
                <svg viewBox="0 0 16 16" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
              </button>
            </Magnetic>
          ))}

          <div className="ml-2 flex gap-[7px]">
            {voices.map((v, k) => (
              <button key={v.name} aria-label={`Go to testimonial ${k + 1}`} onClick={() => { go(k); restart(); }}
                className={`h-0.5 rounded-sm transition-all duration-400 ${k === i ? 'w-[38px] bg-aurum' : 'w-[22px] bg-[rgba(242,237,227,.16)]'}`} />
            ))}
          </div>

          <span className="ml-auto font-mono text-[.66rem] tracking-[.16em] text-ash">
            {String(i + 1).padStart(2, '0')} / {String(voices.length).padStart(2, '0')}
          </span>
        </div>

        <Reveal className="mt-11 flex flex-wrap gap-3">
          {trustChips.map(chip => (
            <span key={chip} className="chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="#E9B872" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                className="h-[13px] w-[13px] flex-none" aria-hidden="true"><path d="M4 12.5 9 17.5 20 6.5" /></svg>
              {chip}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
