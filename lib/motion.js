// Shared Framer Motion variants. Import these instead of redefining transitions
// in every component — it keeps the whole site on one motion curve.

export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden:  { opacity: 0, y: 38 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: i * 0.08 } }),
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (i = 0) => ({ opacity: 1, transition: { duration: 0.9, ease: EASE, delay: i * 0.08 } }),
};

export const fadeLeft = {
  hidden:  { opacity: 0, x: -34 },
  visible: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 1, ease: EASE, delay: i * 0.08 } }),
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.955 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 1, ease: EASE, delay: i * 0.08 } }),
};

export const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

// Word/line mask reveal — the wrapper clips, the child slides up from 105%.
export const maskLine = {
  hidden:  { y: '105%' },
  visible: (i = 0) => ({ y: '0%', transition: { duration: 1.05, ease: EASE, delay: i * 0.13 } }),
};

export const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' };
