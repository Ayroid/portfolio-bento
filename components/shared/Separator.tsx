import React from "react";

export const Separator: React.FC = () => {
  return (
    <div className="relative h-12 w-full overflow-hidden border">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 3px, currentcolor 4px, currentcolor 4px, transparent 5px, transparent 5px)",
        }}
      />
    </div>
  );
};
