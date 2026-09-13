"use client";

import Image from "next/image";
import { useState } from "react";

// Both portraits have the head top-centre; zooming 2x about 10% down frames the
// whole head (22% clipped the hair).
const crop = "object-cover scale-[2] origin-[50%_10%]";
// The 2x zoom shows the image at twice the 80px box, so request 160px or it blurs.
const sizes = "160px";

// Anime by default; clicking the image swaps to the real photo and back,
// instantly. Both stay mounted so toggling never waits on a load.
export default function Avatar({ name }: { name: string }) {
  const [real, setReal] = useState(false);

  return (
    <button
      type="button"
      aria-label={
        real
          ? `Photo of ${name}. Show illustrated portrait`
          : `Illustrated portrait of ${name}. Show real photo`
      }
      onClick={() => setReal((r) => !r)}
      className="relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-md bg-neutral-900"
    >
      <Image
        src="/anime.jpeg"
        alt=""
        fill
        sizes={sizes}
        priority
        className={`${crop} ${real ? "opacity-0" : "opacity-100"}`}
      />
      <Image
        src="/real.jpeg"
        alt=""
        fill
        sizes={sizes}
        priority
        className={`${crop} ${real ? "opacity-100" : "opacity-0"}`}
      />
    </button>
  );
}
