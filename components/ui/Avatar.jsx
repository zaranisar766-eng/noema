export default function Avatar({ initials, gradient, size = 42 }) {
  return (
    <span
      aria-hidden="true"
      className="grid flex-none place-items-center rounded-full font-mono font-medium text-obsidian"
      style={{ width: size, height: size, background: gradient, fontSize: size * 0.32 }}
    >
      {initials}
    </span>
  );
}
