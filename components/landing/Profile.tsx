import Image from "next/image";

export function ProfileCard() {
  return (
    <figure
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      aria-label="Profile picture"
    >
      <Image
        src="/profile_animated.png"
        alt="Ayroid's profile picture"
        width={500}
        height={500}
        className="h-auto w-full"
        priority
      />
    </figure>
  );
}
