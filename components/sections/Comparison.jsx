import Reveal from '@/components/ui/Reveal';
import { comparison } from '@/lib/content';

const Tick = ({ yes }) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    className={`h-[17px] w-[17px] flex-none ${yes ? 'stroke-aurum' : 'stroke-ash opacity-40'}`} aria-hidden="true">
    {yes ? <path d="M4 12.5 9 17.5 20 6.5" /> : <path d="M6 6l12 12M18 6L6 18" />}
  </svg>
);

export default function Comparison() {
  return (
    <section className="shell pb-[clamp(40px,6vw,80px)]">
      <Reveal className="overflow-hidden rounded-[20px] border edge">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[660px] border-collapse">
            <caption className="px-[22px] pb-1.5 pt-5 text-left font-mono text-[.72rem] uppercase tracking-[.14em] text-ash">
              How it differs
            </caption>
            <thead>
              <tr>
                <th scope="col" className="border-b edge bg-[rgba(242,237,227,.022)] px-[22px] py-[17px] text-left font-mono text-[.6rem] font-medium uppercase tracking-[.18em] text-ash">
                  Capability
                </th>
                {comparison.columns.map((c, i) => (
                  <th key={c} scope="col"
                    className={`border-b edge bg-[rgba(242,237,227,.022)] px-[22px] py-[17px] text-left font-mono text-[.6rem] font-medium uppercase tracking-[.18em] ${i === 0 ? 'text-aurum' : 'text-ash'}`}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map(row => (
                <tr key={row.label} className="transition-colors last:[&>td]:border-b-0 hover:bg-[rgba(242,237,227,.022)]">
                  <td className="w-[38%] border-b edge px-[22px] py-[17px] text-[.86rem] text-bone">{row.label}</td>
                  {row.cells.map(([yes, text], i) => (
                    <td key={i} className={`border-b edge px-[22px] py-[17px] text-[.86rem] ${i === 0 ? 'bg-aurum/[.045]' : ''}`}>
                      <span className="flex items-center gap-2.5 text-ash"><Tick yes={!!yes} />{text}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
