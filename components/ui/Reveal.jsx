'use client';
import { motion } from 'framer-motion';
import { fadeUp, fadeIn, fadeLeft, scaleIn, VIEWPORT } from '@/lib/motion';

const VARIANTS = { up: fadeUp, fade: fadeIn, left: fadeLeft, scale: scaleIn };

/** Scroll-triggered reveal. `as` lets it wrap any element without extra divs. */
export default function Reveal({ children, variant = 'up', delay = 0, as = 'div', className, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      variants={VARIANTS[variant]}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Tag>
  );
}
