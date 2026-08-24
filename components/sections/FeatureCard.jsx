'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import FeatureIcon from './FeatureIcon';
import { fadeUp, VIEWPORT } from '@/lib/motion';

/** Tilts toward the pointer and moves a warm spotlight under it. */
export default function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 22 });
  const sy = useSpring(py, { stiffness: 200, damping: 22 });
  const rotateY = useTransform(sx, [0, 1], [-8, 8]);
  const rotateX = useTransform(sy, [0, 1], [7, -7]);

  const onMove = e => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const r = ref.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    px.set(nx); py.set(ny);
    ref.current.style.setProperty('--mx', `${nx * 100}%`);
    ref.current.style.setProperty('--my', `${ny * 100}%`);
  };

  return (
    <motion.article
      ref={ref}
      variants={fadeUp} custom={index} initial="hidden" whileInView="visible" viewport={VIEWPORT}
      onMouseMove={onMove}
      onMouseLeave={() => { px.set(0.5); py.set(0.5); }}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      className="spotlight group relative overflow-hidden rounded-[20px] border edge bg-carbon px-7 pb-[34px] pt-[30px] transition-[border-color,box-shadow] duration-500 hover:edge-2 hover:shadow-[0_26px_60px_-30px_rgba(0,0,0,.9)]"
    >
      <div className="relative z-[2]" style={{ transform: 'translateZ(28px)' }}>
        <div className="mb-[22px] grid h-[46px] w-[46px] place-items-center rounded-[13px] border edge bg-[rgba(242,237,227,.03)]">
          <FeatureIcon name={feature.icon} />
        </div>
        <h3 className="mb-3 font-display text-[1.55rem] font-normal leading-tight">{feature.title}</h3>
        <p className="text-[.88rem] leading-relaxed text-ash">{feature.body}</p>
        <span className="mt-5 inline-block rounded-full border border-aurum/30 px-2.5 py-[5px] font-mono text-[.56rem] uppercase tracking-[.18em] text-aurum">
          {feature.tag}
        </span>
      </div>
    </motion.article>
  );
}
