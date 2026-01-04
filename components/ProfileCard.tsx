"use client";
import Image from "next/image";

export function ProfileCard() {
  return (
    <div
      className="relative h-full max-h-96 w-full cursor-pointer"
      style={{ perspective: "1000px" }}
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
          alt="Profile Picture"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
