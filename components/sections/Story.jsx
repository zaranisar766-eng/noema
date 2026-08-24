import Reveal from '@/components/ui/Reveal';
import MaskText from '@/components/ui/MaskText';
import Avatar from '@/components/ui/Avatar';
import { founders } from '@/lib/content';

export default function Story() {
  return (
    <div className="grid items-start gap-[clamp(40px,7vw,110px)] lg:grid-cols-2">
      {/* Sticky column — works because Lenis drives real scroll, not a transform. */}
      <div className="lg:sticky lg:top-[120px]">
        <Reveal variant="fade" as="p" className="eyebrow">The thesis</Reveal>
        <h2 className="display mt-5 text-d-lg">
          <MaskText lines={['Attention is the last', 'unmeasured resource.']} />
        </h2>
        <Reveal className="mt-9 flex flex-wrap gap-4">
          {founders.map(f => (
            <div key={f.name} className="flex items-center gap-3">
              <Avatar initials={f.initials} gradient={f.gradient} />
              <div>
                <b className="block text-[.86rem] font-normal">{f.name}</b>
                <span className="block font-mono text-[.58rem] uppercase tracking-[.14em] text-ash">{f.role}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <div>
        <Reveal as="p" className="mb-5 leading-[1.78] text-ash">
          We spent a decade tracking everything downstream of the mind. Steps, heart rate, sleep stages,
          variability — <strong className="font-normal text-bone">all of it a proxy for a thing nobody was measuring directly.</strong>
        </Reveal>
        <Reveal as="p" delay={1} className="mb-5 leading-[1.78] text-ash">
          Mira was running a sleep lab where subjects wore €40,000 of equipment to answer a question their own
          attention could have answered in twelve minutes. Jonas was writing filters for trading systems and slowly
          losing the ability to read a book. In 2021 they took the lab&rsquo;s hardest problem — clean EEG without gel,
          without a technician, without a cable — and made it the whole company.
        </Reveal>
        <Reveal variant="left" as="blockquote"
          className="my-8 border-l border-aurum pl-6 font-display text-[clamp(1.5rem,2.5vw,2.05rem)] leading-[1.28] text-bone">
          Six channels. 256 hertz. Processed on the band and deleted at the end of the session. Nothing leaves your head.
        </Reveal>
        <Reveal as="p" className="mb-5 leading-[1.78] text-ash">
          Four years and eleven prototypes later, NOEMA is 31 grams, charges in a case, and reads a usable frontal
          signal through hair. The training OS does the rest: it watches the signal live and rewrites the protocol
          mid-session, the way a good coach changes the set when your form breaks.
        </Reveal>
        <Reveal as="p" delay={1} className="leading-[1.78] text-ash">
          We are not building a meditation app. We are building the instrument that tells you whether the meditation worked.
        </Reveal>
      </div>
    </div>
  );
}
