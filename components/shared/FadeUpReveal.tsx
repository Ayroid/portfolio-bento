"use client";

import { useEffect, useRef, useState } from "react";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Observes `ref` and flips to true the first time it enters the viewport.
 *
 * IntersectionObserver invokes its callback once on observe regardless of
 * intersection state, so elements already on screen resolve on the first
 * frame without a separate measurement pass.
 *
 * Reduced motion is handled in globals.css, which collapses every transition
 * duration — the reveal still runs, it just lands instantly.
 */
function useRevealOnScroll(
  ref: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return isVisible;
}

interface FadeUpRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  /** Travel distance in px before settling. */
  distance?: number;
  /** Sets --stagger-step for descendants using the .stagger-in utility. */
  stagger?: number;
}

export function FadeUpReveal({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
  distance = 30,
  stagger,
}: FadeUpRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useRevealOnScroll(ref, {
    threshold: 0.1,
    rootMargin: "50px 0px 50px 0px", // Trigger earlier
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
        ...(stagger !== undefined
          ? ({ "--stagger-step": `${stagger}ms` } as React.CSSProperties)
          : {}),
      }}
    >
      {children}
    </div>
  );
}

/**
 * Scroll-triggered reveal for a single element. Unlike FadeUpReveal this
 * fires per-instance, so a page composed of several Reveals animates section
 * by section as the reader travels down it.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  distance = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useRevealOnScroll(ref, {
    threshold: 0.06,
    rootMargin: "0px 0px -8% 0px",
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
