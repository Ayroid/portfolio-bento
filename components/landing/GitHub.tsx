"use client";

import { useEffect, useState } from "react";

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
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
  <figcaption className="mt-2 flex items-center justify-end gap-2">
    <span className={`text-[10px] ${isLoading ? "text-zinc-600" : "text-zinc-500"}`}>Less</span>
    <div className="flex gap-[3px]" aria-hidden="true">
      {LEVELS.map((level) => (
        <div
          key={level}
          className={`h-3.5 w-3.5 ${isLoading ? "bg-zinc-800" : getLevelColor(level)}`}
        />
      ))}
    </div>
    <span className={`text-[10px] ${isLoading ? "text-zinc-600" : "text-zinc-500"}`}>More</span>
  </figcaption>
);

const ContributionCell = ({ day }: { day: ContributionDay }) => (
  <div
    role="gridcell"
    aria-label={`${day.count} contributions on ${day.date}`}
    className={`h-3.5 w-3.5 ${getLevelColor(day.level)} group relative cursor-pointer transition-all hover:ring-1 hover:ring-zinc-400`}
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
  <div className="flex gap-[3px]" aria-hidden="true">
    {Array.from({ length: SKELETON_WEEKS }).map((_, weekIndex) => (
      <div key={weekIndex} className="flex flex-col gap-[3px]">
        {Array.from({ length: SKELETON_DAYS }).map((_, dayIndex) => (
          <div key={dayIndex} className="h-3.5 w-3.5 animate-pulse bg-zinc-800" />
        ))}
      </div>
    ))}
  </div>
);

const ContributionGrid = ({ contributions }: { contributions: ContributionWeek[] }) => (
  <div className="flex gap-[3px]" role="grid" aria-label="GitHub contribution graph">
    {contributions.map((week, weekIndex) => (
      <div key={weekIndex} className="flex flex-col gap-[3px]" role="row">
        {week.days.map((day, dayIndex) => (
          <ContributionCell key={dayIndex} day={day} />
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

  const getMonthLabels = () => {
    const labels: { month: string; offset: number }[] = [];
    let lastMonth = -1;

    contributions.forEach((week, weekIndex) => {
      if (week.days[0]) {
        const month = new Date(week.days[0].date).getMonth();
        if (month !== lastMonth) {
          labels.push({ month: MONTHS[month], offset: weekIndex });
          lastMonth = month;
        }
      }
    });

    return labels;
  };

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
        className="mb-2 text-base font-bold text-white sm:mb-3 sm:text-lg"
      >
        {isLoading ? (
          <span className="inline-block h-5 w-16 animate-pulse rounded bg-zinc-700" />
        ) : (
          totalContributions
        )}{" "}
        <span className="text-zinc-400">contributions in the last year</span>
      </h3>

      <figure className="flex-1">
        <div className="inline-flex min-w-full flex-col gap-1">
          <div className="relative mb-1 flex h-4" aria-hidden="true">
            {isLoading
              ? MONTHS.map((month, i) => (
                  <span
                    key={i}
                    className="absolute text-[10px] text-zinc-600"
                    style={{ left: `${i * (52 / 12) * 17}px` }}
                  >
                    {month}
                  </span>
                ))
              : getMonthLabels().map((label, i) => (
                  <time
                    key={i}
                    className="absolute text-[10px] text-zinc-500"
                    style={{ left: `${label.offset * 17}px` }}
                  >
                    {label.month}
                  </time>
                ))}
          </div>

          {isLoading ? <SkeletonGrid /> : <ContributionGrid contributions={contributions} />}

          <Legend isLoading={isLoading} />
        </div>
      </figure>
    </section>
  );
};

export default GitHubCard;
