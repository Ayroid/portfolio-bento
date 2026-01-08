"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isPopState = useRef(false);

  // Track browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      isPopState.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // slower deceleration (was 1.2)
      easing: (t) => 1 - Math.pow(1 - t, 4), // quartic ease-out (softer)
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // less aggressive wheel response
      touchMultiplier: 1.5, // slightly less on touch (was 2)
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top on route change (except for back/forward navigation)
  useEffect(() => {
    if (isPopState.current) {
      // Reset flag and don't scroll for back/forward navigation
      isPopState.current = false;
      return;
    }

    // Scroll to top for Link navigation
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
};
