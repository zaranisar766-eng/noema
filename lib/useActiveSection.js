'use client';
import { useEffect, useState } from 'react';

/** Returns the id of the section currently occupying the middle of the viewport. */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const targets = ids.map(id => document.querySelector(id)).filter(Boolean);
    if (!targets.length) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, [ids]);

  return active;
}
