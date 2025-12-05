'use client';

import { ReactNode, useState } from 'react';

type BentoSize = 0.5 | 1 | 1.5 | 2;

interface BentoBoxProps {
  width: BentoSize;
  height: BentoSize;
  color?: string;
  children?: ReactNode;
  className?: string;
}

const sizeToSpan: Record<BentoSize, string> = {
  0.5: 'col-span-1',
  1: 'col-span-2',
  1.5: 'col-span-3',
  2: 'col-span-4',
};

const heightToSpan: Record<BentoSize, string> = {
  0.5: 'row-span-1',
  1: 'row-span-2',
  1.5: 'row-span-3',
  2: 'row-span-4',
};

const colors = [
  'bg-zinc-900 border-zinc-800',
  'bg-zinc-800 border-zinc-700',
  'bg-black border-zinc-900',
  'bg-zinc-900/90 border-zinc-800',
  'bg-zinc-800/90 border-zinc-700',
  'bg-zinc-900 border-zinc-700',
  'bg-zinc-800 border-zinc-800',
  'bg-black border-zinc-800',
];

export function BentoBox({
  width,
  height,
  color,
  children,
  className = ''
}: BentoBoxProps) {
  const widthClass = sizeToSpan[width];
  const heightClass = heightToSpan[height];
  const [randomColor] = useState(() => colors[Math.floor(Math.random() * colors.length)]);
  const bgColor = color || randomColor;

  return (
    <div
      className={`
        ${widthClass}
        ${heightClass}
        ${bgColor}
        rounded-sm
        border
        p-6
        flex
        flex-col
        justify-between
        hover:scale-[1.02]
        transition-transform
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default BentoBox;
