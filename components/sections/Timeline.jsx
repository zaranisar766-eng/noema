'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import MaskText from '@/components/ui/MaskText';
import { timeline } from '@/lib/content';

/** The spine is a scroll-linked fill — the chronology is real, so the order carries meaning. */
export default function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 72%', 'end 60%'] });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="mt-[clamp(70px,10vw,140px)]">
      <Reveal variant="fade" as="p" className="eyebrow">Build log</Reveal>
      <h3 className="display mb-12 mt-[18px] text-d-md">
        <MaskText lines={['Eleven prototypes, in order.']} />
      </h3>

      <ol ref={ref} className="relative list-none pl-12 sm:pl-16">
        <div aria-hidden="true" className="absolute bottom-1.5 left-3.5 top-1.5 w-0.5 overflow-hidden sm:left-[26px]">
          <span className="absolute inset-0 bg-[rgba(242,237,227,.09)]" />
          <motion.span style={{ height }}
            className="absolute left-0 top-0 w-full bg-gradient-to-b from-aurum to-verdant-lit shadow-[0_0_12px_rgba(233,184,114,.5)]" />
        </div>

        {timeline.map((item, i) => (
          <Reveal as="li" key={item.year} delay={i * 0.4} className="group relative pb-11 last:pb-0">
            <span aria-hidden="true"
              className="absolute -left-[37px] top-1.5 h-[11px] w-[11px] rounded-full border edge-2 bg-obsidian transition-all duration-500 ease-brand group-hover:border-aurum group-hover:bg-aurum group-hover:shadow-[0_0_0_5px_rgba(233,184,114,.13)] sm:-left-[45px]" />
            <span className="font-mono text-[.68rem] tracking-[.2em] text-aurum">{item.year}</span>
            <h4 className="my-2 font-display text-[1.42rem] font-normal">{item.title}</h4>
            <p className="max-w-[44ch] text-[.9rem] leading-relaxed text-ash">{item.body}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
