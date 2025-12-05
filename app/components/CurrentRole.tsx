'use client';

export function CurrentRole() {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-zinc-500 text-xs uppercase tracking-wider">Currently</span>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-white font-bold text-lg mb-2">
            Founding Frontend Engineer
          </h3>
          <p className="text-zinc-400 text-sm mb-1">
            good day :3
          </p>
          <p className="text-zinc-500 text-xs mb-4">
            United States (Remote)
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Architecting frontend infrastructure for promotional campaign management, leading codebase refactoring initiatives, optimizing API integrations.
          </p>
        </div>

        <div className="mt-4">
          <p className="text-zinc-600 text-xs">August 2025 - Present</p>
        </div>
      </div>
    </div>
  );
}
