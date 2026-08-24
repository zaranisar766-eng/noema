const PATHS = {
  wave:   <path d="M3 12h3l2-6 4 12 3-9 2 3h4" />,
  adapt:  <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8" /><circle cx="12" cy="12" r="3" /></>,
  bars:   <path d="M4 20V10M10 20V4M16 20v-8M22 20v-5" />,
  audio:  <><path d="M3 12a9 9 0 0 1 18 0" /><path d="M3 12v3a2 2 0 0 0 2 2h1v-7H5a2 2 0 0 0-2 2Z" /><path d="M21 12v3a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z" /></>,
  brain:  <><path d="M12 2a5 5 0 0 1 5 5v1a4 4 0 0 1 0 8v1a5 5 0 0 1-10 0v-1a4 4 0 0 1 0-8V7a5 5 0 0 1 5-5Z" /><path d="M12 8v8" /></>,
  people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
};

export default function FeatureIcon({ name, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#E9B872" strokeWidth="1.3"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
