import Image from "next/image";

export function ProfileCard() {
  return (
    <figure
      className="group relative flex h-full w-full items-center justify-center overflow-hidden"
      aria-label="Profile picture"
    >
      <Image
        src="/profile_animated.png"
        alt="Ayroid's profile picture"
        width={500}
        height={500}
        className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        priority
      />

      {/* Scanline wash that sweeps down over the portrait on hover.
          The travel distance overshoots the tallest layout the card takes. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 -translate-y-full bg-gradient-to-b from-transparent via-white/10 to-transparent transition-transform duration-[1100ms] ease-[var(--ease-out-quint)] group-hover:translate-y-[520px]"
      />
    </figure>
  );
}
