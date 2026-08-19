import React from "react";

interface SeparatorProps {
  /** Optional section marker rendered over the hatching, e.g. "01 / PROJECTS". */
  label?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ label }) => {
  return (
    <div className="group relative flex h-12 w-full items-center overflow-hidden border border-zinc-800/90">
      {/* Diagonal hatching that drifts slowly and to the right */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 3px, currentcolor 4px, currentcolor 4px, transparent 5px, transparent 5px)",
          animation: "stripe-drift 3s linear infinite",
        }}
      />

      {label && (
        <span className="relative z-10 ml-4 bg-surface-page px-3 py-1 font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase transition-colors duration-500 group-hover:text-zinc-300 sm:ml-6 sm:text-xs">
          {label}
        </span>
      )}
    </div>
  );
};
