/** Aperture ring broken by a baseline — an eye, a signal at rest, and the letter O. */
export default function Logo({ size = 22, className = '' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="15" stroke="#E9B872" strokeWidth="1.6" strokeDasharray="72 24" strokeLinecap="round" />
      <path d="M8 20h24" stroke="#F2EDE3" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
