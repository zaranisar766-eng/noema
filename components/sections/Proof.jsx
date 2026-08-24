import Reveal from '@/components/ui/Reveal';
import Counter from '@/components/ui/Counter';
import { partners, stats } from '@/lib/content';

export default function Proof() {
  const row = [...partners, ...partners];
  return (
    <>
      <section className="mq-mask relative overflow-hidden border-y edge py-6" aria-label="Used by">
        <div className="flex w-max animate-slide gap-0 hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <span key={i}
              className="flex items-center gap-5 whitespace-nowrap px-5 font-mono text-[.74rem] uppercase tracking-[.2em] text-ash opacity-60 transition hover:text-bone hover:opacity-100">
              {name}
              <i className="h-[3px] w-[3px] rounded-full bg-aurum opacity-55" />
            </span>
          ))}
        </div>
      </section>

      <section className="py-[clamp(56px,8vw,110px)]">
        <div className="shell">
          <Reveal className="grid gap-px overflow-hidden rounded-2xl border edge bg-[rgba(242,237,227,.09)] sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(s => (
              <div key={s.label} className="group relative overflow-hidden bg-obsidian px-[26px] py-[30px]">
                <span aria-hidden="true"
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(60% 90% at 50% 110%, rgba(233,184,114,.13), transparent 70%)' }} />
                <b className="relative block font-display text-[clamp(2.1rem,3.6vw,3.1rem)] font-normal leading-none tracking-[-.02em]">
                  <Counter to={s.value} decimals={s.decimals ?? 0} />
                  <sup className="align-super font-mono text-[.42em] text-aurum">{s.suffix}</sup>
                </b>
                <p className="relative mt-2.5 text-[.79rem] leading-snug text-ash">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
