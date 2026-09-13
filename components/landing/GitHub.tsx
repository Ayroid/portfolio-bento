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

const SKELETON_WEEKS = 53;
const LEVELS = [0, 1, 2, 3, 4] as const;

const getLevelColor = (level: number) => {
  const colors: Record<number, string> = {
    0: "bg-white/[0.04]",
    1: "bg-white/15",
    2: "bg-white/30",
    3: "bg-white/50",
    4: "bg-white/75",
  };
  return colors[level] ?? colors[0];
};

// Columns stretch to fill whatever width the page gives the graph.
const Weeks = ({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) => (
  <div
    className="grid gap-[2px]"
    style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
  >
    {children}
  </div>
);

const cell = "aspect-square w-full rounded-[2px]";

const GitHubCard = ({ username }: { username: string }) => {
  const [contributions, setContributions] = useState<ContributionWeek[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contributions");
        return res.json();
      })
      .then((data) => {
        const weeks: ContributionWeek[] = [];
        let week: ContributionDay[] = [];
        let sum = 0;

        data.contributions.forEach((c: APIContribution, i: number) => {
          sum += c.count;
          week.push({ date: c.date, count: c.count, level: c.level });
          if (
            new Date(c.date).getDay() === 6 ||
            i === data.contributions.length - 1
          ) {
            weeks.push({ days: week });
            week = [];
          }
        });

        setContributions(weeks);
        setTotal(sum);
      })
      .catch((error) => console.error("Error fetching contributions:", error))
      .finally(() => setLoading(false));
  }, [username]);

  return (
    <figure
      className="text-[13px] text-neutral-500"
      {...(loading && {
        role: "status",
        "aria-label": "Loading GitHub contributions",
      })}
    >
      {loading ? (
        <Weeks count={SKELETON_WEEKS}>
          {Array.from({ length: SKELETON_WEEKS }).map((_, w) => (
            <div key={w} className="flex flex-col gap-[2px]">
              {Array.from({ length: 7 }).map((_, d) => (
                <div
                  key={d}
                  className={`${cell} animate-pulse bg-white/[0.04]`}
                />
              ))}
            </div>
          ))}
        </Weeks>
      ) : (
        <div
          role="grid"
          aria-label="GitHub contribution graph"
          onMouseOver={(e) => {
            const el = (e.target as HTMLElement).closest<HTMLElement>(
              "[data-date]"
            );
            if (el) setHovered(`${el.dataset.count} on ${el.dataset.date}`);
          }}
          onMouseLeave={() => setHovered(null)}
        >
          <Weeks count={contributions.length}>
            {contributions.map((week, w) => (
              <div key={w} role="row" className="flex flex-col gap-[2px]">
                {week.days.map((day) => (
                  <div
                    key={day.date}
                    role="gridcell"
                    aria-label={`${day.count} contributions on ${day.date}`}
                    data-date={day.date}
                    data-count={day.count}
                    className={`${cell} ${getLevelColor(day.level)} transition-colors hover:bg-white`}
                  />
                ))}
              </div>
            ))}
          </Weeks>
        </div>
      )}

      <figcaption className="mt-3 flex items-center justify-between gap-3">
        <span className="tabular">
          {hovered ?? (
            <>
              <span className="text-neutral-200">
                {loading ? "—" : total.toLocaleString()}
              </span>{" "}
              contributions in the last year
            </>
          )}
        </span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          Less
          {LEVELS.map((level) => (
            <span
              key={level}
              className={`h-2.5 w-2.5 rounded-[2px] ${getLevelColor(level)}`}
            />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
};

export default GitHubCard;
