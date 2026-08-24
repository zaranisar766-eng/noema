'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import NeuralField from '@/components/canvas/NeuralField';
import MaskText from '@/components/ui/MaskText';
import Magnetic from '@/components/ui/Magnetic';
import Counter from '@/components/ui/Counter';
import { readouts } from '@/lib/content';
import { EASE } from '@/lib/motion';

const ENTER = { duration: 1, ease: EASE };

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const auroraA = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const auroraB = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const cardsY  = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section id="hero" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32">
      <NeuralField className="absolute inset-0 z-0 h-full w-full opacity-85" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: 'radial-gradient(120% 90% at 50% 0%, transparent 30%, rgba(5,7,10,.55) 72%, #05070A 100%)' }} />

      <motion.div aria-hidden="true" style={{ y: auroraA }}
        className="pointer-events-none absolute -left-[12vw] top-[8vh] h-[44vw] w-[44vw] rounded-full bg-verdant/30 blur-[90px]" />
      <motion.div aria-hidden="true" style={{ y: auroraB }}
        className="pointer-events-none absolute -right-[8vw] bottom-[2vh] h-[34vw] w-[34vw] rounded-full bg-aurum/[.16] blur-[90px]" />

      <div className="shell relative z-[3] w-full">
        <div className="grid items-end gap-14 xl:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...ENTER, delay: 0.1 }}>
              Neural fitness system · Gen 3
            </motion.p>

            <h1 className="display mt-6 text-d-xl">
              <MaskText animate lines={['Your mind,']} />
              <span className="block overflow-hidden">
                <motion.span className="block pb-[.06em]" initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1.05, ease: EASE, delay: 0.13 }}>
                  in <em className="italic text-aurum">high definition</em>.
                </motion.span>
              </span>
            </h1>

            <motion.p className="lede mt-7 max-w-[50ch]"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...ENTER, delay: 0.35 }}>
              A six-channel dry EEG band and a training OS that adapts to your live signal.
              Focus, calm and recovery stop being feelings you report — and start being numbers you move.
            </motion.p>

            <motion.div className="mt-9 flex flex-wrap items-center gap-3.5"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...ENTER, delay: 0.45 }}>
              <Magnetic>
                <a href="#pricing" className="btn btn-solid">
                  <span>Reserve a band
                    <svg viewBox="0 0 16 16" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 8h12M9 3l5 5-5 5" />
                    </svg>
                  </span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#story" className="btn btn-ghost">
                  <span>
                    <svg viewBox="0 0 16 16" className="h-[15px] w-[15px]" fill="currentColor"><path d="M5 3.5v9l8-4.5-8-4.5Z" /></svg>
                    Watch the film · 2:14
                  </span>
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div style={{ y: cardsY }}
            className="flex w-full gap-3 overflow-x-auto pb-1.5 xl:w-[250px] xl:flex-col xl:overflow-visible [&::-webkit-scrollbar]:hidden"
            initial={{ opacity: 0, scale: 0.955 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...ENTER, delay: 0.55 }}>
            {readouts.map(r => (
              <div key={r.label} className="glass min-w-[200px] flex-none px-[18px] py-4 xl:w-full">
                <div className="flex items-baseline justify-between gap-2.5">
                  <span className="label">{r.label}</span>
                  <span className={`font-mono text-[.58rem] tracking-[.1em] ${r.dir === 'up' ? 'text-verdant-lit' : 'text-pulse'}`}>{r.delta}</span>
                </div>
                <div className="font-display text-[2.05rem] leading-none">
                  <Counter to={r.value} decimals={r.decimals ?? 0} />
                  {r.unit && <span className="ml-1 font-mono text-[.6rem] text-ash">{r.unit}</span>}
                </div>
                <svg viewBox="0 0 200 24" preserveAspectRatio="none" className="mt-2 h-6 w-full" aria-hidden="true">
                  <path d={r.path} fill="none" stroke={r.stroke} strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-6 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-2.5">
        <span className="h-11 w-px animate-cue bg-gradient-to-b from-aurum to-transparent" />
        <span className="font-mono text-[.56rem] uppercase tracking-[.24em] text-ash">Scroll</span>
      </div>
    </section>
  );
}
