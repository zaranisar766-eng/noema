'use client';
import { useEffect, useRef } from 'react';

const SEGMENTS = 42;
const NODES = 6;
const GAP = 0.26; // 26% of the ring is left open — it's a band, not a hoop

/**
 * The Gen 3 band, built from real CSS 3D transforms rather than WebGL.
 * Costs nothing, runs everywhere, and reads as an instrument rather than a render.
 * <BandObject /> (R3F) remains available if you want true materials and lighting.
 */
export default function BandCSS() {
  const stage = useRef(null);
  const band = useRef(null);

  useEffect(() => {
    const R = Math.min(window.innerWidth * 0.29, 150) * 0.92;
    const el = band.current;
    el.querySelectorAll('.seg,.node').forEach(n => n.remove());

    for (let i = 0; i < SEGMENTS; i++) {
      const a = (i / SEGMENTS) * (1 - GAP) * 360 + (GAP * 360) / 2;
      const seg = document.createElement('div');
      seg.className = 'seg';
      seg.style.transform = `rotateY(${a}deg) translateZ(${R}px)`;
      el.appendChild(seg);
    }
    for (let i = 0; i < NODES; i++) {
      const a = (GAP * 360) / 2 + 30 + (i / (NODES - 1)) * ((1 - GAP) * 360 - 60);
      const n = document.createElement('div');
      n.className = 'node';
      n.style.transform = `rotateY(${a}deg) translateZ(${R}px) translateY(9px)`;
      el.appendChild(n);
    }
    const pod = el.querySelector('.pod');
    if (pod) pod.style.transform = `rotateY(${(GAP * 360) / 2 - 14}deg) translateZ(${R}px)`;

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let tx = 0, ty = 0, cx = 0, cy = 0, frame;
    const host = stage.current;
    const move = e => {
      const r = host.getBoundingClientRect();
      tx = ((e.clientY - r.top) / r.height - 0.5) * -16;
      ty = ((e.clientX - r.left) / r.width - 0.5) * 20;
    };
    const out = () => { tx = 0; ty = 0; };
    const loop = () => {
      cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
      host.style.transform = `rotateX(${cx}deg) rotateY(${cy}deg)`;
      frame = requestAnimationFrame(loop);
    };
    host.addEventListener('mousemove', move, { passive: true });
    host.addEventListener('mouseleave', out);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener('mousemove', move);
      host.removeEventListener('mouseleave', out);
    };
  }, []);

  return (
    <div ref={stage} className="band-stage" aria-hidden="true">
      <div ref={band} className="band"><div className="pod" /></div>
    </div>
  );
}
