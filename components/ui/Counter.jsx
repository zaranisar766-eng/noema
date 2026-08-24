'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/** Counts up once, when it first enters the viewport. */
export default function Counter({ to, decimals = 0, duration = 1500 }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(to); return; }
    const t0 = performance.now();
    let frame;
    const step = t => {
      const k = Math.min((t - t0) / duration, 1);
      setN(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [seen, to, duration]);

  return <span ref={ref}>{decimals ? n.toFixed(decimals) : Math.round(n)}</span>;
}
