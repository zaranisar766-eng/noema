'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import Magnetic from '@/components/ui/Magnetic';
import Counter from '@/components/ui/Counter';
import { plans } from '@/lib/content';
import { EASE } from '@/lib/motion';

export default function Pricing() {
  const [period, setPeriod] = useState('mo');

  return (
    <section id="pricing" className="pb-[clamp(84px,12vw,180px)] pt-[clamp(40px,6vw,80px)]">
      <div className="shell">
        <SectionHead eyebrow="Plans" lines={['Pick the depth,', 'not the tier.']}>
          <Reveal as="p" className="lede mb-6">
            Band included on Core and Lab. Cancel any time — you keep the hardware after 12 months.
          </Reveal>
          <Reveal variant="fade" className="flex items-center">
            <div role="tablist" aria-label="Billing period"
              className="relative inline-flex items-center gap-1 rounded-full border edge bg-carbon p-1">
              {[['mo', 'Monthly'], ['yr', 'Annual']].map(([key, label]) => (
                <button key={key} role="tab" aria-selected={period === key} onClick={() => setPeriod(key)}
                  className={clsx('relative z-[2] rounded-full px-[18px] py-2 text-[.78rem] transition-colors duration-300',
                    period === key ? 'text-obsidian' : 'text-ash')}>
                  {period === key && (
                    <motion.span layoutId="pricing-thumb" transition={{ duration: 0.5, ease: EASE }}
                      className="absolute inset-0 -z-10 rounded-full bg-aurum" />
                  )}
                  {label}
                </button>
              ))}
            </div>
            <span className="ml-2.5 font-mono text-[.56rem] uppercase tracking-[.14em] text-verdant-lit">Save 20%</span>
          </Reveal>
        </SectionHead>

        <div className="mx-auto grid max-w-[520px] items-start gap-4 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i}
              className={clsx(
                'relative overflow-hidden rounded-[22px] border edge px-[30px] pb-[34px] pt-8 transition-[transform,border-color] duration-500 ease-brand hover:-translate-y-1.5 hover:edge-2',
                plan.featured ? 'plan-feat border-aurum/30 bg-gradient-to-b from-[#161B22] to-[#0B0F14]' : 'bg-carbon'
              )}>
              {plan.badge && (
                <span className="absolute right-5 top-5 rounded-full bg-aurum px-[11px] py-[5px] font-mono text-[.53rem] uppercase tracking-[.18em] text-obsidian">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-display text-[1.5rem] font-normal">{plan.name}</h3>
              <p className="mb-6 mt-2 min-h-[2.6em] text-[.82rem] text-ash">{plan.who}</p>

              <div className="flex items-baseline gap-1.5">
                <b className="font-display text-[3.1rem] font-normal leading-none tracking-[-.02em]">
                  $<motion.span key={period + plan.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE }} className="inline-block">
                    <Counter to={plan[period]} duration={420} />
                  </motion.span>
                </b>
                <span className="font-mono text-[.66rem] tracking-[.1em] text-ash">{plan.unit}</span>
              </div>

              <hr className="my-6 border-0 border-t edge" />

              <ul className="mb-7 flex list-none flex-col gap-3 p-0">
                {plan.perks.map(perk => (
                  <li key={perk} className="flex gap-2.5 text-[.85rem] leading-snug text-ash">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#E9B872" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                      className="mt-[3px] h-[15px] w-[15px] flex-none" aria-hidden="true"><path d="M4 12.5 9 17.5 20 6.5" /></svg>
                    {perk}
                  </li>
                ))}
              </ul>

              <Magnetic className="w-full">
                <a href="#contact" className={clsx('btn w-full', plan.featured ? 'btn-solid' : 'btn-ghost')}>
                  <span>{plan.cta}</span>
                </a>
              </Magnetic>
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade" as="p" className="mt-7 text-center font-mono text-[.6rem] uppercase tracking-[.12em] text-ash">
          Prices in USD · VAT calculated at checkout · Band ships in 3–5 weeks
        </Reveal>
      </div>
    </section>
  );
}
