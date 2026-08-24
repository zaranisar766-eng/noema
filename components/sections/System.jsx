import SectionHead from '@/components/ui/SectionHead';
import FeatureCard from './FeatureCard';
import BandCSS from '@/components/canvas/BandCSS';
import Reveal from '@/components/ui/Reveal';
import { features } from '@/lib/content';

export default function System() {
  return (
    <section id="system" className="pad-y">
      <div className="shell">
        <SectionHead
          eyebrow="The system"
          lines={['One band.', "Six things it does", "that a phone can't."]}
          lede="The band reads. The OS decides. Everything below happens between the two, in the twelve minutes you gave it."
        />
        <BandCSS />
        <Reveal variant="fade" className="mb-[clamp(40px,6vw,80px)] mt-6 text-center">
          <b className="block font-display text-[1.5rem] font-normal">NOEMA Gen 3</b>
          <span className="font-mono text-[.6rem] uppercase tracking-[.18em] text-ash">
            31 grams · titanium spine · 14-hour battery
          </span>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {['6 dry channels', '256 Hz sampling', '90 mW on-device', 'IPX4'].map(spec => (
              <span key={spec} className="chip">{spec}</span>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i % 3} />)}
        </div>
      </div>
    </section>
  );
}
