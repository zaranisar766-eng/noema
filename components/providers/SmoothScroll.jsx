'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis drives the real scroll position rather than transforming a wrapper,
 * which keeps `position: sticky` (the Story column) and native anchors working.
 * Disabled entirely for reduced-motion users.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });
    let frame;
    const raf = time => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);

    const onAnchor = e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -70 });
    };
    document.addEventListener('click', onAnchor);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onAnchor);
      lenis.destroy();
    };
  }, []);

  return children;
}
