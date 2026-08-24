import Hero from '@/components/sections/Hero';
import Proof from '@/components/sections/Proof';
import Story from '@/components/sections/Story';
import Timeline from '@/components/sections/Timeline';
import Values from '@/components/sections/Values';
import System from '@/components/sections/System';
import Comparison from '@/components/sections/Comparison';
import Pricing from '@/components/sections/Pricing';
import Voices from '@/components/sections/Voices';
import Insights from '@/components/sections/Insights';
import Contact from '@/components/sections/Contact';
import WaveRule from '@/components/ui/WaveRule';

export default function Home() {
  return (
    <>
      <Hero />
      <Proof />
      <section id="story" className="pad-y">
        <div className="shell">
          <Story />
          <Timeline />
          <Values />
        </div>
      </section>
      <WaveRule offset={540} />
      <System />
      <Comparison />
      <Pricing />
      <Voices />
      <Insights />
      <WaveRule offset={300} />
      <Contact />
    </>
  );
}
