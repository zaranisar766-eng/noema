'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import MaskText from '@/components/ui/MaskText';
import Magnetic from '@/components/ui/Magnetic';
import Field from './Field';
import { brand } from '@/lib/content';
import { EASE } from '@/lib/motion';

const EMAIL = /\S+@\S+\.\S+/;

export default function Contact() {
  const [state, setState] = useState('idle'); // idle | sending | done
  const [errors, setErrors] = useState({});
  const [news, setNews] = useState({ value: '', message: '', ok: true });

  const submit = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = {};
    if (!String(data.get('name') || '').trim()) next.name = true;
    if (!EMAIL.test(String(data.get('email') || ''))) next.email = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    setState('sending');
    // Swap for a real endpoint: await fetch('/api/reserve', { method:'POST', body: data })
    await new Promise(r => setTimeout(r, 800));
    setState('done');
    e.target.reset();
  };

  const subscribe = () => {
    if (!EMAIL.test(news.value)) { setNews(n => ({ ...n, ok: false, message: 'Enter a valid email address.' })); return; }
    setNews({ value: '', ok: true, message: "You're on the list — first issue lands Thursday." });
  };

  return (
    <section id="contact" className="pad-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[14vw] top-[10%] h-[40vw] w-[40vw] rounded-full bg-aurum/[.14] blur-[90px]" />

      <div className="shell">
        <div className="grid items-start gap-[clamp(40px,6vw,90px)] lg:grid-cols-2">
          <div>
            <Reveal variant="fade" as="p" className="eyebrow">Reserve</Reveal>
            <h2 className="display mb-6 mt-5 text-d-lg"><MaskText lines={['Get on the', 'Gen 3 list.']} /></h2>
            <Reveal as="p" className="lede">
              Tell us how you&rsquo;d use it. Bands ship in the order reservations are placed, and we&rsquo;ll tell you
              your position in the queue in the confirmation.
            </Reveal>

            <Reveal as="form" onSubmit={submit} noValidate className="mt-9 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Full name" autoComplete="name" error={errors.name} required />
                <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email} required />
              </div>

              <div className="field">
                <select id="use" name="use" defaultValue="For myself">
                  {['For myself', 'For a clinic or practice', 'For a sports science team', 'For a studio or workplace', 'Research collaboration']
                    .map(o => <option key={o}>{o}</option>)}
                </select>
                <label htmlFor="use">How you&rsquo;d use it</label>
                <span className="bar" />
              </div>

              <Field as="textarea" id="message" label="Anything we should know" rows={3} />

              <div className="mt-2.5 flex flex-wrap items-center gap-[18px]">
                <Magnetic>
                  <button type="submit" className="btn btn-solid" disabled={state === 'sending'}>
                    <span>
                      {state === 'sending' ? 'Reserving…' : state === 'done' ? 'Reserved ✓' : 'Place reservation'}
                      {state === 'idle' && (
                        <svg viewBox="0 0 16 16" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 8h12M9 3l5 5-5 5" />
                        </svg>
                      )}
                    </span>
                  </button>
                </Magnetic>
                <p className="max-w-[30ch] text-[.74rem] leading-snug text-ash">
                  No charge today. We take payment when your band is boxed.
                </p>
                {state === 'done' && (
                  <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}
                    role="status" className="flex items-center gap-2.5 text-[.82rem] text-verdant-lit">
                    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12.5 9 17.5 20 6.5" />
                    </svg>
                    Reserved — check your inbox for your queue position.
                  </motion.span>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="glass rounded-[22px] px-[30px] py-8">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#E9B872" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12h3l2-6 4 12 3-9 2 3h4" />
              </svg>
              <h3 className="mb-2 mt-3.5 font-display text-[1.5rem] font-normal">The Signal</h3>
              <p className="mb-6 text-[.85rem] leading-relaxed text-ash">
                One study, one chart, one thing we got wrong. Fortnightly. 24,800 readers and no growth-hacking.
              </p>
              <div className="flex gap-2.5 border-b edge pb-2.5">
                <input type="email" aria-label="Email for newsletter" placeholder="you@company.com"
                  value={news.value} onChange={e => setNews(n => ({ ...n, value: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && subscribe()}
                  className="flex-1 bg-transparent text-[.9rem] font-light text-bone placeholder:text-ash focus:outline-none" />
                <button onClick={subscribe}
                  className="inline-flex items-center gap-2 border-b border-aurum/30 pb-[3px] text-[.85rem] text-aurum transition-[border-color,gap] duration-300 hover:gap-3.5 hover:border-aurum">
                  Subscribe →
                </button>
              </div>
              {news.message && (
                <p role="status" className={`mt-3.5 text-[.7rem] ${news.ok ? 'text-verdant-lit' : 'text-pulse'}`}>{news.message}</p>
              )}
            </div>

            <dl className="mt-8 grid gap-px border-y edge bg-[rgba(242,237,227,.09)]">
              {[
                ['General', brand.email],
                ['Clinics & labs', 'labs@noema.systems'],
                ['Press', 'press@noema.systems'],
                ['Studio', brand.address],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-5 bg-obsidian py-[18px]">
                  <dt className="font-mono text-[.6rem] uppercase tracking-[.18em] text-ash">{k}</dt>
                  <dd className="m-0 text-right text-[.9rem]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
