"use client";

export function NameCard() {
  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      <div className="flex flex-1 flex-col justify-end space-y-6">
        <div className="flex items-start gap-4">
          <h1 className="font-mono text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            AYUSH
            <br />
            SINGH
            <br />
            KUSHWAH
          </h1>
        </div>
      </div>
    </div>
  );
}
