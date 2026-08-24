import Reveal from './Reveal';
import MaskText from './MaskText';

/** Shared two-column section header: eyebrow + masked headline, plus a lede slot. */
export default function SectionHead({ eyebrow, lines, lede, children }) {
  return (
    <div className="mb-[clamp(40px,6vw,80px)] grid items-end gap-10 lg:grid-cols-[1fr_minmax(0,540px)]">
      <div>
        <Reveal variant="fade" as="p" className="eyebrow">{eyebrow}</Reveal>
        <h2 className="display mt-[18px] text-d-lg"><MaskText lines={lines} /></h2>
      </div>
      <div className="pb-2">
        {lede && <Reveal as="p" className="lede">{lede}</Reveal>}
        {children}
      </div>
    </div>
  );
}
