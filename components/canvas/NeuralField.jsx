'use client';
import { useEffect, useRef } from 'react';

/**
 * The hero's live signal field: drifting nodes, proximity links, pointer
 * repulsion, and pulses that travel between random node pairs.
 *
 * Deliberately 2D canvas rather than WebGL — it costs ~2KB instead of ~600KB,
 * runs on a low-end phone, and this particular effect gains nothing from a
 * third dimension. The 3D budget is spent on <BandObject /> instead.
 */
export default function NeuralField({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, nodes = [], pulses = [], frame = null;
    const mouse = { x: -9999, y: -9999 };
    const lerp = (a, b, t) => a + (b - a) * t;

    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density = W < 700 ? 13000 : 9000;
      const count = Math.max(28, Math.min(110, Math.round((W * H) / density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.5 + 0.7, phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = t => {
      ctx.clearRect(0, 0, W, H);
      const LINK = W < 700 ? 108 : 142;

      for (const p of nodes) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -40) p.x = W + 40; if (p.x > W + 40) p.x = -40;
        if (p.y < -40) p.y = H + 40; if (p.y > H + 40) p.y = -40;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 28900) { const d = Math.sqrt(d2) || 1, f = ((170 - d) / 170) * 0.55; p.x += (dx / d) * f; p.y += (dy / d) * f; }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(233,184,114,${(1 - d / LINK) * 0.2})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      for (const p of nodes) {
        const breathe = (Math.sin(t * 0.0013 + p.phase) + 1) * 0.5;
        const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const near = md < 190 ? 1 - md / 190 : 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + near * 1.5, 0, 6.2832);
        ctx.fillStyle = near > 0.25
          ? `rgba(242,237,227,${0.35 + near * 0.5})`
          : `rgba(233,184,114,${0.22 + breathe * 0.34})`;
        ctx.fill();
      }

      if (Math.random() < 0.018 && pulses.length < 5 && nodes.length > 2) {
        const a = nodes[(Math.random() * nodes.length) | 0];
        const b = nodes[(Math.random() * nodes.length) | 0];
        if (a !== b) pulses.push({ a, b, t: 0 });
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pu = pulses[i]; pu.t += 0.014;
        if (pu.t >= 1) { pulses.splice(i, 1); continue; }
        const x = lerp(pu.a.x, pu.b.x, pu.t), y = lerp(pu.a.y, pu.b.y, pu.t);
        const fade = Math.sin(pu.t * Math.PI);
        ctx.beginPath(); ctx.arc(x, y, 2.1, 0, 6.2832);
        ctx.fillStyle = `rgba(63,168,144,${fade * 0.85})`; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, 7, 0, 6.2832);
        ctx.fillStyle = `rgba(63,168,144,${fade * 0.12})`; ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    const still = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of nodes) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = 'rgba(233,184,114,.3)'; ctx.fill();
      }
    };

    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onOut = () => { mouse.x = mouse.y = -9999; };

    size();
    if (reduced) still(); else frame = requestAnimationFrame(draw);

    // Stop painting when the hero scrolls out of view.
    const io = new IntersectionObserver(([entry]) => {
      if (reduced) return;
      if (entry.isIntersecting) { if (!frame) frame = requestAnimationFrame(draw); }
      else if (frame) { cancelAnimationFrame(frame); frame = null; }
    }, { threshold: 0 });
    io.observe(canvas);

    addEventListener('resize', size, { passive: true });
    const host = canvas.parentElement;
    host.addEventListener('mousemove', onMove, { passive: true });
    host.addEventListener('mouseleave', onOut);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      io.disconnect();
      removeEventListener('resize', size);
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onOut);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
