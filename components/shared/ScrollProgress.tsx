"use client";

import { useEffect, useState } from "react";

/**
 * Hairline reading-progress bar pinned to the top of the viewport.
 * Driven by rAF-throttled scroll so it stays smooth alongside Lenis.
 */
export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-white/70"
        style={{
          width: `${progress}%`,
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
};
