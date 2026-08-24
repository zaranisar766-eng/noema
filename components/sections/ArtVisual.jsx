/**
 * Article artwork generated from the post's hue instead of a stock photo:
 * zero image payload, and every card is unmistakably ours.
 */
export default function ArtVisual({ hue }) {
  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`grad-${hue}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`hsl(${hue},42%,16%)`} />
          <stop offset="1" stopColor={`hsl(${(hue + 40) % 360},30%,7%)`} />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#grad-${hue})`} />
      {Array.from({ length: 5 }).map((_, i) => (
        <path key={i}
          d={`M0 ${60 + i * 34} Q 50 ${30 + i * 34} 100 ${62 + i * 34} T 200 ${58 + i * 34} T 300 ${64 + i * 34} T 400 ${56 + i * 34}`}
          fill="none" stroke={`hsl(${hue},55%,${60 - i * 4}%)`} strokeOpacity={0.4 - i * 0.055} strokeWidth="1" />
      ))}
      <circle cx={120 + (hue % 160)} cy={90 + (hue % 70)} r="46" fill={`hsl(${hue},60%,55%)`} opacity=".10" />
    </svg>
  );
}
