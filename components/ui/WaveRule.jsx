/** The brand's waveform motif, reused as a section divider. */
export default function WaveRule({ offset = 540 }) {
  const spike = 'l14-9 l12 18 l13-24 l14 30 l12-15 h13 l12 6';
  return (
    <svg className="wave-rule" viewBox="0 0 1440 26" preserveAspectRatio="none" aria-hidden="true">
      <path d={`M0 13 H${offset} ${spike} h20 ${spike} H1440`} />
    </svg>
  );
}
