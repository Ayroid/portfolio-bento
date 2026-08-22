const NAME_LINES = ["AYUSH", "SINGH", "KUSHWAH"] as const;

export function NameCard() {
  return (
    <header className="flex h-full flex-col p-6 sm:p-8">
      <div className="flex flex-1 flex-col justify-end space-y-6">
        {/* Availability marker */}
        <p
          className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.22em] text-zinc-500 uppercase sm:text-xs"
          style={{
            animation: "reveal-up 600ms var(--ease-out-expo) 700ms both",
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-white"
              style={{ animation: "pulse-ring 2s ease-out infinite" }}
              aria-hidden="true"
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Software Engineer
        </p>

        <hgroup className="flex items-start gap-4">
          <h1 className="font-mono text-5xl font-bold text-white sm:text-6xl">
            {/* Each line rises out of its own clipping mask, one after the next */}
            {NAME_LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden py-0.5">
                <span
                  className="block"
                  style={{
                    animation: `name-line-rise 900ms var(--ease-out-expo) ${
                      120 + i * 110
                    }ms both`,
                  }}
                >
                  {line}
                  {i === NAME_LINES.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="ml-2 inline-block h-[0.78em] w-[0.09em] translate-y-[0.02em] bg-white align-baseline"
                      style={{
                        animation:
                          "caret-blink 1.1s step-end 1.4s infinite both",
                      }}
                    />
                  )}
                </span>
              </span>
            ))}
          </h1>
        </hgroup>
      </div>
    </header>
  );
}
