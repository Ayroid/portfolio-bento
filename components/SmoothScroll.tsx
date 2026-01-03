"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1, // slower deceleration (was 1.2)
			easing: (t) => 1 - Math.pow(1 - t, 4), // quartic ease-out (softer)
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
			wheelMultiplier: 0.8, // less aggressive wheel response
			touchMultiplier: 1.5, // slightly less on touch (was 2)
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
}
