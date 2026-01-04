"use client";

import { useEffect, useState } from "react";

interface UmamiStats {
  pageviews: number;
  visitors: number;
}

export const VisitorCount = () => {
  const [stats, setStats] = useState<UmamiStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/umami");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch visitor stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-zinc-600">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-zinc-600" />
        <span className="text-xs sm:text-sm">Loading stats...</span>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 text-zinc-600">
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
        <span className="text-xs sm:text-sm">
          <span className="font-semibold text-zinc-400">
            {formatNumber(stats.visitors)}
          </span>{" "}
          visitors
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs sm:text-sm">
          <span className="font-semibold text-zinc-400">
            {formatNumber(stats.pageviews)}
          </span>{" "}
          views
        </span>
      </div>
    </div>
  );
};
