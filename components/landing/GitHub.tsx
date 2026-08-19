"use client";

import { useEffect, useState } from "react";
import { CountUp } from "@/components/shared/CountUp";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface APIContribution {
  date: string;
  count: number;
  level: number;
}

const SKELETON_WEEKS = 52;
const SKELETON_DAYS = 7;
const LEVELS = [0, 1, 2, 3, 4] as const;

const getLevelColor = (level: number) => {
  const colors: Record<number, string> = {
    0: "bg-zinc-500/5",
    1: "bg-zinc-500/20",
    2: "bg-zinc-500/40",
    3: "bg-zinc-500/60",
    4: "bg-zinc-500/80",
  };
  return colors[level] ?? colors[0];
};

const Legend = ({ isLoading }: { isLoading: boolean }) => (
  <figcaption className="mt-2 flex items-center justify-end gap-1.5 sm:gap-2">
    <span
      className={`text-[9px] sm:text-[10px] ${isLoading ? "text-zinc-600" : "text-zinc-500"}`}
    >
      Less
    </span>
    <div className="flex gap-0.5 sm:gap-[3px]" aria-hidden="true">
      {LEVELS.map((level) => (
        <div
          key={level}
          className={`h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 ${isLoading ? "bg-zinc-800" : getLevelColor(level)}`}
        />
      ))}
    </div>
    <span
      className={`text-[9px] sm:text-[10px] ${isLoading ? "text-zinc-600" : "text-zinc-500"}`}
    >
      More
    </span>
  </figcaption>
);

const ContributionCell = ({
  day,
  delay,
}: {
  day: ContributionDay;
  delay: number;
}) => (
  <div
    role="gridcell"
    aria-label={`${day.count} contributions on ${day.date}`}
    className={`h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 ${getLevelColor(day.level)} group relative cursor-pointer transition-transform duration-200 ease-[var(--ease-spring)] hover:scale-[1.6] hover:bg-white hover:ring-1 hover:ring-white`}
    style={{
      animation: `pop-in 380ms var(--ease-out-expo) ${delay}ms both`,
    }}
    title={`${day.count} contributions on ${day.date}`}
  >
    <div
      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
      role="tooltip"
    >
      <p className="font-semibold">{day.count} contributions</p>
      <time className="text-zinc-400">{day.date}</time>
    </div>
  </div>
);

const SkeletonGrid = () => (
  <div className="flex gap-0.5 sm:gap-[3px]" aria-hidden="true">
    {Array.from({ length: SKELETON_WEEKS }).map((_, weekIndex) => (
      <div key={weekIndex} className="flex flex-col gap-0.5 sm:gap-[3px]">
        {Array.from({ length: SKELETON_DAYS }).map((_, dayIndex) => (
          <div
            key={dayIndex}
            className="h-2.5 w-2.5 animate-pulse bg-zinc-800 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"
          />
        ))}
      </div>
    ))}
  </div>
);

const ContributionGrid = ({
  contributions,
}: {
  contributions: ContributionWeek[];
}) => (
  <div
    className="flex gap-0.5 sm:gap-[3px]"
    role="grid"
    aria-label="GitHub contribution graph"
  >
    {contributions.map((week, weekIndex) => (
      <div
        key={weekIndex}
        className="flex flex-col gap-0.5 sm:gap-[3px]"
        role="row"
      >
        {week.days.map((day, dayIndex) => (
          <ContributionCell
            key={dayIndex}
            day={day}
            // Diagonal wave: later weeks and later weekdays start later.
            delay={weekIndex * 11 + dayIndex * 14}
          />
        ))}
      </div>
    ))}
  </div>
);

const GitHubCard = ({ username }: { username: string }) => {
  const [contributions, setContributions] = useState<ContributionWeek[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contributions");
        }

        const data = await response.json();

        const weeks: ContributionWeek[] = [];
        let currentWeek: ContributionDay[] = [];
        let total = 0;

        data.contributions.forEach(
          (contribution: APIContribution, index: number) => {
            const { date, count, level } = contribution;
            total += count;

            currentWeek.push({ date, count, level });

            const dayOfWeek = new Date(date).getDay();
            if (dayOfWeek === 6 || index === data.contributions.length - 1) {
              weeks.push({ days: [...currentWeek] });
              currentWeek = [];
            }
          }
        );

        setContributions(weeks);
        setTotalContributions(total);
        setLoading(false);
        setIsInitialLoad(false);
      } catch (error) {
        console.error("Error fetching contributions:", error);
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchContributions();
  }, [username]);

  const isLoading = isInitialLoad && loading;

  return (
    <section
      className="flex h-full flex-col"
      {...(isLoading
        ? { role: "status", "aria-label": "Loading GitHub contributions" }
        : { "aria-labelledby": "github-contributions-heading" })}
    >
      <h3
        id={isLoading ? undefined : "github-contributions-heading"}
        className="mb-2 text-sm font-bold text-white sm:mb-6 sm:text-base md:text-lg"
      >
        {isLoading ? (
          <span className="inline-block h-4 w-12 animate-pulse rounded bg-zinc-700 sm:h-5 sm:w-16" />
        ) : (
          <CountUp value={totalContributions} />
        )}{" "}
        <span className="text-xs text-zinc-400 sm:text-sm md:text-base">
          contributions in the last year
        </span>
      </h3>

      <figure className="flex-1 overflow-hidden">
        <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800 hover:scrollbar-thumb-zinc-700 md:scrollbar-none overflow-x-auto overflow-y-hidden pb-2 md:pb-0 lg:overflow-x-hidden">
          <div className="inline-flex min-w-full flex-col gap-1">
            {isLoading ? (
              <SkeletonGrid />
            ) : (
              <ContributionGrid contributions={contributions} />
            )}

            <Legend isLoading={isLoading} />
          </div>
        </div>
      </figure>
    </section>
  );
};

export default GitHubCard;
