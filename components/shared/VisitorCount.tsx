"use client";

import { useEffect, useState } from "react";
import { CountUp } from "./CountUp";

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
    <div
      className="flex items-center gap-4 text-zinc-600"
      style={{
        animation: "reveal-up 500ms var(--ease-out-expo) both",
      }}
    >
      <div className="flex items-center gap-1.5">
        {/* Live indicator */}
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-white"
            style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
            aria-hidden="true"
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="text-xs sm:text-sm">
          <CountUp
            value={stats.visitors}
            format={formatNumber}
            className="font-semibold text-zinc-400"
          />{" "}
          visitors
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs sm:text-sm">
          <CountUp
            value={stats.pageviews}
            format={formatNumber}
            className="font-semibold text-zinc-400"
          />{" "}
          views
        </span>
      </div>
    </div>
  );
};
