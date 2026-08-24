import { brand, footerColumns } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t edge pb-8 pt-[clamp(50px,7vw,80px)]">
      <div className="shell">
        <p aria-hidden="true" className="stroke-text mb-10 select-none font-display text-[clamp(4rem,19vw,17rem)] leading-[.8] tracking-[-.03em]">
          {brand.name}
        </p>

        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <h2 className="mb-4 font-mono text-[.58rem] font-medium uppercase tracking-[.2em] text-ash">{brand.tagline}</h2>
            <p className="mb-[18px] max-w-[34ch] text-[.85rem] leading-relaxed text-ash">
              A neural fitness system built in Zürich. Six channels, on-device, deleted when you&rsquo;re done.
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-verdant-lit" />
              <span className="font-mono text-[.58rem] uppercase tracking-[.12em] text-ash">Gen 3 shipping · 3–5 weeks</span>
            </p>
          </div>

          {footerColumns.map(col => (
            <div key={col.title}>
              <h2 className="mb-4 font-mono text-[.58rem] font-medium uppercase tracking-[.2em] text-ash">{col.title}</h2>
              {col.links.map(([label, href]) => (
                <a key={label} href={href}
                  className="block py-1.5 text-[.85rem] text-ash transition-[color,transform] duration-300 ease-brand hover:translate-x-1 hover:text-bone">
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-between gap-5 border-t edge pt-6 font-mono text-[.6rem] uppercase tracking-[.12em] text-ash">
          <span>© {new Date().getFullYear()} {brand.name} Systems AG</span>
          <span>Privacy · Terms · Accessibility</span>
          <span>Made in Zürich &amp; Lisbon</span>
        </div>
      </div>
    </footer>
  );
}
