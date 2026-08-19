"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";

interface BentoItemProps {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  height?: number;
  redirectTo?: string;
  redirectTarget?: string;
  /** Disables the cursor spotlight + corner brackets (e.g. for solid CTA tiles) */
  plain?: boolean;
}

/** Small L-bracket that ticks into place when the cell is hovered. */
const CornerBracket = ({ position }: { position: string }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute z-30 h-2 w-2 opacity-0 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover/bento:opacity-100 ${position}`}
  />
);

export const BentoItem = ({
  children,
  className = "",
  colSpan = 1,
  rowSpan = 1,
  height = 80,
  redirectTo,
  redirectTarget = "_blank",
  plain = false,
}: BentoItemProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const frame = useRef<number | null>(null);

  // Throttle to one update per animation frame — the spotlight repaints a
  // large gradient, so raw mousemove gets expensive on big cells.
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      setMousePosition({ x, y });
    });
  }, []);

  const content = (
    <div
      className="relative h-full w-full overflow-hidden border border-zinc-800/90 bg-surface-card transition-colors duration-500 group-hover/bento:border-zinc-700"
      style={{ minHeight: `${height}px` }}
    >
      {!plain && (
        <>
          {/* Soft interior spotlight following the cursor */}
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.055), transparent 42%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* 1px border that lights up where the cursor is.
              The mask punches out the interior so only the rim renders. */}
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
            style={{
              background: `radial-gradient(280px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.55), transparent 65%)`,
              opacity: isHovered ? 1 : 0,
              padding: "1px",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              maskComposite: "exclude",
            }}
          />
        </>
      )}

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );

  return (
    <div
      className={`group/bento relative bg-transparent transition-[z-index] ${className}`}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
      onMouseMove={plain ? undefined : handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!plain && (
        <>
          <CornerBracket position="top-0 left-0 border-t border-l border-white/70 -translate-x-px -translate-y-px group-hover/bento:translate-x-0.5 group-hover/bento:translate-y-0.5" />
          <CornerBracket position="top-0 right-0 border-t border-r border-white/70 translate-x-px -translate-y-px group-hover/bento:-translate-x-0.5 group-hover/bento:translate-y-0.5" />
          <CornerBracket position="bottom-0 left-0 border-b border-l border-white/70 -translate-x-px translate-y-px group-hover/bento:translate-x-0.5 group-hover/bento:-translate-y-0.5" />
          <CornerBracket position="bottom-0 right-0 border-b border-r border-white/70 translate-x-px translate-y-px group-hover/bento:-translate-x-0.5 group-hover/bento:-translate-y-0.5" />
        </>
      )}

      {redirectTo ? (
        <Link
          href={redirectTo}
          target={redirectTarget}
          rel="noopener noreferrer"
          className="block h-full"
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
};
