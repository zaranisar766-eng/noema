'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import SectionHead from '@/components/ui/SectionHead';
import ArtVisual from './ArtVisual';
import { articles, categories } from '@/lib/content';
import { EASE } from '@/lib/motion';

export default function Insights() {
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? articles : articles.filter(a => a.category === filter);

  return (
    <section id="insights" className="pad-y">
      <div className="shell">
        <SectionHead
          eyebrow="Insights"
          lines={['Notes from', 'the signal.']}
          lede="Study write-ups, engineering post-mortems and the occasional argument with our own marketing. Roughly fortnightly."
        />

        <div role="tablist" aria-label="Filter articles" className="mb-9 flex flex-wrap gap-2">
          {categories.map(c => (
            <button key={c} role="tab" aria-selected={filter === c} onClick={() => setFilter(c)}
              className={clsx(
                'rounded-full border px-[17px] py-2.5 text-[.78rem] capitalize transition-all duration-300 ease-brand',
                filter === c ? 'border-bone bg-bone text-obsidian' : 'edge text-ash hover:edge-2 hover:text-bone'
              )}>
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((a, i) => (
              <motion.article key={a.slug} layout
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-[20px] border edge bg-carbon transition-[transform,border-color] duration-500 ease-brand hover:-translate-y-[7px] hover:edge-2">
                <a href={`/insights/${a.slug}`} className="flex flex-1 flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden border-b edge">
                    <div className="absolute inset-0 transition-transform duration-[900ms] ease-brand group-hover:scale-105">
                      <ArtVisual hue={a.hue} />
                    </div>
                    <span className="absolute left-3.5 top-3.5 z-[3] rounded-full border edge bg-obsidian/60 px-2.5 py-[5px] font-mono text-[.53rem] uppercase tracking-[.18em] text-bone backdrop-blur-md">
                      {a.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-[22px] pb-6">
                    <h3 className="mb-2.5 font-display text-[1.32rem] font-normal leading-tight">{a.title}</h3>
                    <p className="mb-5 flex-1 text-[.84rem] leading-relaxed text-ash">{a.excerpt}</p>
                    <div className="flex items-center justify-between border-t edge pt-[15px] font-mono text-[.58rem] uppercase tracking-[.13em] text-ash">
                      <span>{a.date} · {a.read}</span>
                      <span className="text-aurum transition-transform duration-400 ease-brand group-hover:translate-x-1.5">Read →</span>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
