import { BentoItem } from "@/components/BentoItem";

/**
 * LATTICE STRUCTURE (30 columns × variable rows)
 * Base row height: 50px
 */

const TemplateSection = () => {
  return (
    <div
      className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)]"
      style={{
        gridAutoRows: "50px", // Base row height
      }}
    >
      <BentoItem
        colSpan={20}
        rowSpan={3}
        className="md:col-span-2 lg:col-span-20 lg:row-span-4"
      >
        <div className="p-4 sm:p-6">
          <h3 className="mb-3 text-base font-bold text-white sm:text-lg">
            Blogs
          </h3>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <div className="flex-1">
              <h4 className="mb-1 text-sm font-semibold text-white">
                Go in Me
              </h4>
              <p className="text-xs text-zinc-500">Exploring Go programming</p>
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-sm font-semibold text-white">
                My Winter Arc
              </h4>
              <p className="text-xs text-zinc-500">
                Personal development journey
              </p>
            </div>
          </div>
        </div>
      </BentoItem>

      <BentoItem
        colSpan={10}
        rowSpan={5}
        className="md:col-span-1 lg:col-span-10 lg:row-span-10"
      >
        <div className="p-4 sm:p-6">
          <h3 className="mb-2 font-bold text-white sm:mb-3">Pasandida Aurat</h3>
          <p className="mb-2 text-sm text-zinc-400">Dating Platform</p>
          <p className="mb-3 text-xs text-zinc-600 sm:mb-4">
            Emphasizing authentic connections (in development)
          </p>
          <div className="flex flex-wrap gap-2">
            {["Next.js", "Dating", "Social", "MVP"].map((tag) => (
              <span
                key={tag}
                className="rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </BentoItem>

      <BentoItem
        colSpan={10}
        rowSpan={7}
        className="md:col-span-1 lg:col-span-10 lg:row-span-16"
      >
        <div className="flex h-full flex-col p-4 sm:p-6">
          <h3 className="mb-2 text-base font-bold text-white sm:mb-3 sm:text-lg">
            GitHub Activity
          </h3>
          <div className="mb-3 space-y-2 sm:mb-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <p className="text-xs text-zinc-400">
                1,000+ contributions this year
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <p className="text-xs text-zinc-400">
                Active open source contributor
              </p>
            </div>
          </div>
          <div className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 p-2 sm:p-3">
            <div className="grid grid-cols-12 gap-1">
              {Array.from({ length: 84 }).map((_, i) => {
                const intensity = (i * 7 + i * 3) % 5;
                const colors = [
                  "bg-zinc-800",
                  "bg-green-900",
                  "bg-green-700",
                  "bg-green-600",
                  "bg-green-500",
                ];
                return (
                  <div
                    key={i}
                    className={`h-2 rounded-sm ${colors[intensity]}`}
                  ></div>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-zinc-600">Contribution activity</p>
          </div>
        </div>
      </BentoItem>

      <BentoItem
        colSpan={10}
        rowSpan={2}
        className="md:col-span-2 lg:col-span-10 lg:row-span-2"
      >
        <div className="flex items-center justify-center p-4 sm:p-6">
          <p className="text-center text-xs text-zinc-600">
            Technologies I work with
          </p>
        </div>
      </BentoItem>

      <BentoItem
        colSpan={10}
        rowSpan={5}
        className="md:col-span-2 lg:col-span-10 lg:row-span-14"
      >
        <div className="flex h-full flex-col p-4 sm:p-6">
          <h3 className="mb-3 text-base font-bold text-white sm:mb-4 sm:text-lg">
            All Technologies
          </h3>
          <div className="flex-1 space-y-3 overflow-auto">
            <div>
              <p className="mb-2 text-xs text-zinc-500 uppercase">Languages</p>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "JavaScript", "Go"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs text-zinc-500 uppercase">Tools</p>
              <div className="flex flex-wrap gap-2">
                {["Git", "Docker", "Vercel", "AWS"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BentoItem>

      <BentoItem
        colSpan={10}
        rowSpan={5}
        className="md:col-span-1 lg:col-span-10 lg:row-span-10"
      >
        <div className="p-4 sm:p-6">
          <h3 className="mb-3 text-base font-bold text-white sm:mb-4 sm:text-lg">
            Setup
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-lg sm:text-xl">👓</span>
              <div>
                <h4 className="mb-1 text-xs font-semibold text-white sm:text-sm">
                  Wears Used
                </h4>
                <p className="text-xs text-zinc-500">
                  Glasses, Watch, Airpods Max
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg sm:text-xl">💻</span>
              <div>
                <h4 className="mb-1 text-xs font-semibold text-white sm:text-sm">
                  VSCode / Cursor Setup
                </h4>
                <p className="text-xs text-zinc-500">
                  One Dark Pro theme with custom extensions
                </p>
              </div>
            </div>
          </div>
        </div>
      </BentoItem>
    </div>
  );
};

export default TemplateSection;
