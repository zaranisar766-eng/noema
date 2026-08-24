'use client';
import { motion } from 'framer-motion';
import { maskLine, VIEWPORT } from '@/lib/motion';

/** Each line is clipped by its own wrapper and slides up — used for headlines. */
export default function MaskText({ lines = [], className = '', delay = 0, animate = false }) {
  const trigger = animate ? { animate: 'visible' } : { whileInView: 'visible', viewport: VIEWPORT };
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span className="block pb-[.06em]" variants={maskLine} custom={i + delay} initial="hidden" {...trigger}>
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
