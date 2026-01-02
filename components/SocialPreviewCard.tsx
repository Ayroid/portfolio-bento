"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { SocialProfile } from "@/lib/social-profiles";

interface LiveStats {
  followers?: number;
  following?: number;
  posts?: number;
}

interface SocialPreviewCardProps {
  profile: SocialProfile;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

// GitHub-style contribution graph banner
function GitHubBanner() {
  const rows = 4;
  const cols = 20;
  const greens = ["#0d1117", "#0e4429", "#006d32", "#26a641", "#39d353"];

  // Generate a pseudo-random pattern that looks like contributions
  const getColor = (row: number, col: number) => {
    const seed = (row * 7 + col * 13) % 100;
    if (seed < 40) return greens[0];
    if (seed < 60) return greens[1];
    if (seed < 75) return greens[2];
    if (seed < 90) return greens[3];
    return greens[4];
  };

  return (
    <div className="w-full h-full bg-[#0d1117] flex items-center justify-center p-3">
      <div className="flex gap-[3px]">
        {Array.from({ length: cols }).map((_, col) => (
          <div key={col} className="flex flex-col gap-[3px]">
            {Array.from({ length: rows }).map((_, row) => (
              <div
                key={row}
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: getColor(row, col) }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Twitter/X style banner with geometric pattern
function TwitterBanner() {
  return (
    <div className="w-full h-full bg-black relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="xgrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xgrid)" />
        </svg>
      </div>
      {/* X logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg viewBox="0 0 24 24" className="w-16 h-16 text-white" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    </div>
  );
}

// LinkedIn style professional blue gradient
function LinkedInBanner() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-linear-to-br from-[#0077b5] via-[#0a66c2] to-[#004182]">
      {/* Network nodes pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="linkedindots" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#linkedindots)" />
        {/* Connection lines */}
        <line x1="15" y1="15" x2="45" y2="45" stroke="white" strokeWidth="0.5" opacity="0.3" />
        <line x1="45" y1="15" x2="75" y2="45" stroke="white" strokeWidth="0.5" opacity="0.3" />
        <line x1="75" y1="15" x2="105" y2="45" stroke="white" strokeWidth="0.5" opacity="0.3" />
        <line x1="135" y1="15" x2="165" y2="45" stroke="white" strokeWidth="0.5" opacity="0.3" />
        <line x1="195" y1="15" x2="225" y2="45" stroke="white" strokeWidth="0.5" opacity="0.3" />
      </svg>
    </div>
  );
}

// Hashnode style tech blog gradient
function HashnodeBanner() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-linear-to-br from-[#2962ff] via-[#3d5afe] to-[#536dfe]">
      {/* Code/blog aesthetic pattern */}
      <div className="absolute inset-0 opacity-15">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hashcode" width="60" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="8" width="25" height="4" rx="2" fill="white" />
              <rect x="30" y="8" width="15" height="4" rx="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hashcode)" />
        </svg>
      </div>
      {/* Hashnode logo hint */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
        <div className="w-10 h-10 rounded-full border-4 border-white" />
      </div>
    </div>
  );
}

function PlatformBanner({ platform }: { platform: SocialProfile["platform"] }) {
  switch (platform) {
    case "github":
      return <GitHubBanner />;
    case "twitter":
      return <TwitterBanner />;
    case "linkedin":
      return <LinkedInBanner />;
    case "hashnode":
      return <HashnodeBanner />;
    default:
      return <div className="w-full h-full bg-linear-to-r from-zinc-800 to-zinc-700" />;
  }
}

export function SocialPreviewCard({ profile }: SocialPreviewCardProps) {
  const [liveStats, setLiveStats] = useState<LiveStats | null>(null);
  const [imageError, setImageError] = useState({
    banner: false,
    profile: false,
  });

  useEffect(() => {
    const fetchLiveStats = async () => {
      if (profile.platform === "github") {
        try {
          const res = await fetch(
            `/api/social/github?username=${profile.username}`
          );
          if (res.ok) {
            const data = await res.json();
            setLiveStats({
              followers: data.followers,
              following: data.following,
              posts: data.public_repos,
            });
          }
        } catch (error) {
          console.error("Failed to fetch GitHub stats:", error);
        }
      } else if (profile.platform === "hashnode") {
        try {
          const res = await fetch(
            `/api/social/hashnode?username=${profile.username}`
          );
          if (res.ok) {
            const data = await res.json();
            setLiveStats({
              followers: data.followers,
              posts: data.posts,
            });
          }
        } catch (error) {
          console.error("Failed to fetch Hashnode stats:", error);
        }
      }
    };

    fetchLiveStats();
  }, [profile.platform, profile.username]);

  const stats = {
    followers: liveStats?.followers ?? profile.stats.followers,
    following: liveStats?.following ?? profile.stats.following,
    posts: liveStats?.posts ?? profile.stats.posts,
  };

  const Icon = profile.icon;

  return (
    <div className="w-72 bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800 shadow-xl">
      {/* Banner */}
      <div className="relative h-20 bg-zinc-800">
        {profile.bannerImage && !imageError.banner ? (
          <Image
            src={profile.bannerImage}
            alt={`${profile.displayName} banner`}
            fill
            className="object-cover"
            onError={() => setImageError((prev) => ({ ...prev, banner: true }))}
          />
        ) : (
          <PlatformBanner platform={profile.platform} />
        )}
      </div>

      {/* Profile Section */}
      <div className="px-4 pb-4">
        {/* Profile Image */}
        <div className="relative -mt-8 mb-2">
          <div className="w-16 h-16 rounded-full border-4 border-zinc-900 overflow-hidden bg-zinc-800">
            {!imageError.profile ? (
              <Image
                src={profile.profileImage}
                alt={profile.displayName}
                width={64}
                height={64}
                className="object-cover"
                onError={() =>
                  setImageError((prev) => ({ ...prev, profile: true }))
                }
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon className="w-8 h-8 text-zinc-500" />
              </div>
            )}
          </div>
        </div>

        {/* Name and Username */}
        <div className="mb-2">
          <div className="flex items-center">
            <span className="font-semibold text-white text-sm">
              {profile.displayName}
            </span>
            {profile.verified && (
              <svg
                className="w-4 h-4 text-blue-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <span className="text-zinc-500 text-xs">@{profile.username}</span>
        </div>

        {/* Bio */}
        <p className="text-zinc-400 text-xs mb-3 line-clamp-2">{profile.bio}</p>

        {/* Stats */}
        <div className="flex gap-4 text-xs">
          {stats.following !== undefined && (
            <div>
              <span className="font-semibold text-white">
                {formatNumber(stats.following)}
              </span>
              <span className="text-zinc-500 ml-1">Following</span>
            </div>
          )}
          {stats.followers !== undefined && (
            <div>
              <span className="font-semibold text-white">
                {formatNumber(stats.followers)}
              </span>
              <span className="text-zinc-500 ml-1">Followers</span>
            </div>
          )}
          {stats.posts !== undefined && profile.stats.postsLabel && (
            <div>
              <span className="font-semibold text-white">
                {formatNumber(stats.posts)}
              </span>
              <span className="text-zinc-500 ml-1">
                {profile.stats.postsLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
