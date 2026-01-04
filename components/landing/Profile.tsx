import Image from "next/image";

export function ProfileCard() {
  return (
    <figure
      className="relative h-full max-h-96 w-full cursor-pointer"
      style={{ perspective: "1000px" }}
      aria-label="Profile picture"
    >
      <div
        className="absolute inset-0"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <Image
          src="/profile_animated.png"
          alt="Ayroid's profile picture"
          fill
          className="object-cover"
        />
      </div>
    </figure>
  );
}
