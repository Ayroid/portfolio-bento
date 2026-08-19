"use client";

import { useEffect, useState } from "react";

interface CountUpProps {
  value: number;
  /** Total roll duration in ms. */
  duration?: number;
  /** Formats the in-flight value; defaults to a localised integer. */
  format?: (n: number) => string;
  className?: string;
}

/**
 * Rolls a number up from zero when it lands, so stats read as live rather
 * than as static text. Honours prefers-reduced-motion by snapping to the
 * final value.
 */
export const CountUp = ({
  value,
  duration = 1100,
  format = (n) => n.toLocaleString(),
  className = "",
}: CountUpProps) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      value <= 0
    ) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // easeOutExpo
      setDisplay(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <span className={`tabular ${className}`}>{format(display)}</span>;
};
