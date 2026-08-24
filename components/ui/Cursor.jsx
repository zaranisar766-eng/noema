'use client';
import { useEffect, useRef, useState } from 'react';

/** Two-part cursor: an instant dot and a lagging ring that swells over targets. */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);

    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, frame;

    const move = e => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px,${my}px)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      frame = requestAnimationFrame(loop);
    };
    const over = e => {
      const hit = e.target.closest('a,button,input,select,textarea,[data-cursor]');
      if (ring.current) ring.current.dataset.grow = String(!!hit);
    };
    const leave = () => { if (ring.current) ring.current.style.opacity = '0'; };
    const enter = () => { if (ring.current) ring.current.style.opacity = '1'; };

    addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over);
    addEventListener('mouseleave', leave);
    addEventListener('mouseenter', enter);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      removeEventListener('mouseleave', leave);
      removeEventListener('mouseenter', enter);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={dot} className="cur" aria-hidden="true" />
      <div ref={ring} className="cur-ring" data-grow="false" aria-hidden="true" />
    </>
  );
}
