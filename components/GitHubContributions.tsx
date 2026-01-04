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

const GitHubContributions = ({ username }: { username: string }) => {
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

        // Transform the API data to our format
        const weeks: ContributionWeek[] = [];
        let currentWeek: ContributionDay[] = [];
        let total = 0;

        data.contributions.forEach(
          (contribution: APIContribution, index: number) => {
            const { date, count, level } = contribution;
            total += count;

            currentWeek.push({
              date,
              count,
              level,
            });

            // GitHub API groups by weeks (Sunday-Saturday)
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

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-zinc-500/5";
      case 1:
        return "bg-zinc-500/20";
      case 2:
        return "bg-zinc-500/40";
      case 3:
        return "bg-zinc-500/60";
      case 4:
        return "bg-zinc-500/80";
      default:
        return "bg-zinc-500/5";
    }
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getMonthLabels = () => {
    const labels: { month: string; offset: number }[] = [];
    let lastMonth = -1;

    contributions.forEach((week, weekIndex) => {
      if (week.days[0]) {
        const date = new Date(week.days[0].date);
        const month = date.getMonth();

        if (month !== lastMonth) {
          labels.push({
            month: months[month],
            offset: weekIndex,
          });
          lastMonth = month;
        }
      }
    });

    return labels;
  };

  if (isInitialLoad && loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse text-sm text-zinc-500">
          Loading contributions...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <h3 className="mb-2 text-base font-bold text-white sm:mb-3 sm:text-lg">
        {totalContributions}{" "}
        <span className="text-zinc-400"> contributions in the last year</span>
      </h3>

      <div className="flex-1">
        <div className="inline-flex min-w-full flex-col gap-1">
          {/* Month labels */}
          <div className="relative mb-4 ml-7 flex gap-[3px]">
            {getMonthLabels().map((label, i) => (
              <div
                key={i}
                className="absolute text-[10px] text-zinc-500"
                style={{
                  left: `${label.offset * 15}px`,
                }}
              >
                {label.month}
              </div>
            ))}
          </div>

          {/* Day labels + contribution grid */}
          <div className="flex gap-[3px]">
            {/* Day of week labels */}
            <div className="flex flex-col justify-around gap-[3px] pr-1 text-[10px] text-zinc-500">
              <span className="h-[12.5px]"></span>
              <span className="h-[12.5px]">Mon</span>
              <span className="h-[12.5px]"></span>
              <span className="h-[12.5px]">Wed</span>
              <span className="h-[12.5px]"></span>
              <span className="h-[12.5px]">Fri</span>
              <span className="h-[12.5px]"></span>
            </div>

            {/* Contribution squares */}
            <div className="flex gap-[3px]">
              {contributions.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.days.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`h-3.5 w-3.5 ${getLevelColor(
                        day.level
                      )} group relative cursor-pointer transition-all hover:ring-1 hover:ring-zinc-400`}
                      title={`${day.count} contributions on ${day.date}`}
                    >
                      {/* Tooltip */}
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="font-semibold">
                          {day.count} contributions
                        </div>
                        <div className="text-zinc-400">{day.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-2 flex items-center justify-end gap-2">
            <span className="text-[10px] text-zinc-500">Less</span>
            <div className="flex gap-[3px]">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-3.5 w-3.5 ${getLevelColor(level)}`}
                />
              ))}
            </div>
            <span className="text-[10px] text-zinc-500">More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubContributions;
