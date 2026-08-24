import Reveal from '@/components/ui/Reveal';
import { values } from '@/lib/content';

export default function Values() {
  return (
    <div className="mt-[clamp(60px,9vw,120px)] grid gap-px border-y edge bg-[rgba(242,237,227,.09)] lg:grid-cols-3">
      {values.map((v, i) => (
        <Reveal key={v.n} delay={i} className="group relative overflow-hidden bg-obsidian px-[30px] pb-[42px] pt-[38px]">
          <span className="font-mono text-[.62rem] uppercase tracking-[.2em] text-aurum">{v.n}</span>
          <h4 className="mb-3 mt-4 font-display text-[1.55rem] font-normal leading-tight">{v.title}</h4>
          <p className="text-[.88rem] leading-relaxed text-ash">{v.body}</p>
          <span aria-hidden="true"
            className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-aurum transition-transform duration-700 ease-brand group-hover:scale-x-100" />
        </Reveal>
      ))}
    </div>
  );
}
