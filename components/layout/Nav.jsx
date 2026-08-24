'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import Logo from './Logo';
import Magnetic from '@/components/ui/Magnetic';
import { nav, brand } from '@/lib/content';
import useActiveSection from '@/lib/useActiveSection';
import { EASE } from '@/lib/motion';

const NAV_IDS = nav.map(n => n.href);

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 40);
      setHidden(y > 380 && y > last && !open);
      last = y;
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    return () => document.body.classList.remove('is-locked');
  }, [open]);

  // Escape closes the mobile sheet, and Tab is trapped inside it while open.
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key !== 'Tab') return;
      const sheet = document.getElementById('mobile-sheet');
      const items = sheet ? [...sheet.querySelectorAll('a,button')] : [];
      if (!items.length) return;
      const [first, last] = [items[0], items[items.length - 1]];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-[80] border-b border-transparent transition-[transform,background,border-color] duration-500 ease-brand',
          stuck && 'border-b-[rgba(242,237,227,.09)] bg-obsidian/[.66] backdrop-blur-xl backdrop-saturate-150',
          hidden && '-translate-y-full'
        )}
      >
        <div className="shell flex items-center justify-between gap-6 py-[18px]">
          <a href="#hero" className="flex items-center gap-3">
            <Logo />
            <span>
              <b className="block font-display text-[1.42rem] font-normal leading-none tracking-[.06em]">{brand.name}</b>
              <span className="mt-0.5 block font-mono text-[.53rem] uppercase tracking-[.24em] text-ash">Neural Fitness</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Primary">
            {nav.map(item => (
              <a key={item.href} href={item.href}
                aria-current={active === item.href ? 'true' : undefined}
                className={clsx('group relative rounded-full px-3.5 py-2 text-[.83rem] transition-colors hover:text-bone',
                  active === item.href ? 'text-bone' : 'text-ash')}>
                {item.label}
                <span className={clsx(
                  'absolute inset-x-3.5 bottom-1.5 h-px bg-aurum transition-transform duration-500 ease-brand group-hover:origin-left group-hover:scale-x-100',
                  active === item.href ? 'origin-left scale-x-100' : 'origin-right scale-x-0')} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden lg:inline-flex">
              <a href="#contact" className="btn btn-solid btn-sm"><span>Reserve a band</span></a>
            </Magnetic>
            <button
              onClick={() => setOpen(v => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-[42px] w-[42px] flex-col items-center justify-center gap-[5px] rounded-full border edge lg:hidden"
            >
              <i className={clsx('block h-px w-[15px] bg-bone transition-transform duration-400 ease-brand', open && 'translate-y-[3px] rotate-45')} />
              <i className={clsx('block h-px w-[15px] bg-bone transition-opacity', open && 'opacity-0')} />
              <i className={clsx('block h-px w-[15px] bg-bone transition-transform duration-400 ease-brand', open && '-translate-y-[3px] -rotate-45')} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-sheet"
            className="fixed inset-0 z-[79] flex flex-col justify-between bg-obsidian px-[var(--gut)] pb-10 pt-[104px]"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {[...nav, { label: 'Contact', href: '#contact' }].map((item, i) => (
                <motion.a
                  key={item.href} href={item.href} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.12 + i * 0.06 }}
                  className="flex items-baseline justify-between border-b edge py-3.5 font-display text-[clamp(2rem,9vw,3rem)] leading-tight"
                >
                  {item.label}
                  <em className="font-mono text-[.6rem] not-italic tracking-[.2em] text-ash">
                    {String(i + 1).padStart(2, '0')}
                  </em>
                </motion.a>
              ))}
            </nav>
            <div>
              <p className="mb-3.5 font-mono text-[.6rem] uppercase tracking-[.2em] text-ash">Zürich · Lisbon · Remote</p>
              <a href="#contact" onClick={() => setOpen(false)} className="btn btn-solid w-full"><span>Reserve a band</span></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
