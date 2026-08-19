"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { SocialProfile } from "@/config/social";

interface LiveStats {
  followers?: number;
  following?: number;
  posts?: number;
}

interface SocialPreviewProps {
  profile: SocialProfile;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

const GitHubBanner = () => {
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
    <div className="flex h-full w-full items-center justify-center bg-[#0d1117] p-3">
      <div className="flex gap-[3px]">
        {Array.from({ length: cols }).map((_, col) => (
          <div key={col} className="flex flex-col gap-[3px]">
            {Array.from({ length: rows }).map((_, row) => (
              <div
                key={row}
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: getColor(row, col) }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const TwitterBanner = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="xgrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#333"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#xgrid)" />
        </svg>
      </div>
      {/* X logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg
          viewBox="0 0 24 24"
          className="h-16 w-16 text-white"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
    </div>
  );
};

const LinkedInBanner = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-[#0077b5] via-[#0a66c2] to-[#004182]">
      {/* Network nodes pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="linkedindots"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="15" cy="15" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#linkedindots)" />
        {/* Connection lines */}
        <line
          x1="15"
          y1="15"
          x2="45"
          y2="45"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <line
          x1="45"
          y1="15"
          x2="75"
          y2="45"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <line
          x1="75"
          y1="15"
          x2="105"
          y2="45"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <line
          x1="135"
          y1="15"
          x2="165"
          y2="45"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <line
          x1="195"
          y1="15"
          x2="225"
          y2="45"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>
    </div>
  );
};

function PlatformBanner({ platform }: { platform: SocialProfile["platform"] }) {
  switch (platform) {
    case "github":
      return <GitHubBanner />;
    case "twitter":
      return <TwitterBanner />;
    case "linkedin":
      return <LinkedInBanner />;
    default:
      return (
        <div className="h-full w-full bg-linear-to-r from-zinc-800 to-zinc-700" />
      );
  }
}

const SocialPreview = ({ profile }: SocialPreviewProps) => {
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
    <article
      className="w-72 overflow-hidden rounded-sm border border-zinc-800 bg-surface-card shadow-xl"
      aria-label={`${profile.displayName}'s ${profile.platform} profile`}
    >
      <header className="relative h-20 bg-zinc-800">
        {profile.bannerImage && !imageError.banner ? (
          <Image
            src={profile.bannerImage}
            alt=""
            fill
            className="object-cover"
            onError={() => setImageError((prev) => ({ ...prev, banner: true }))}
            aria-hidden="true"
          />
        ) : (
          <PlatformBanner platform={profile.platform} />
        )}
      </header>

      <section className="px-4 pb-4">
        <figure className="relative -mt-8 mb-2">
          <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-zinc-900 bg-zinc-800">
            {!imageError.profile ? (
              <Image
                src={profile.profileImage}
                alt={`${profile.displayName}'s profile picture`}
                width={64}
                height={64}
                className="object-cover"
                onError={() =>
                  setImageError((prev) => ({ ...prev, profile: true }))
                }
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Icon className="h-8 w-8 text-zinc-500" aria-hidden="true" />
              </div>
            )}
          </div>
        </figure>

        <hgroup className="mb-2">
          <h3 className="flex items-center">
            <span className="text-sm font-semibold text-white">
              {profile.displayName}
            </span>
            {profile.verified && (
              <svg
                className="h-4 w-4 text-blue-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="Verified account"
                role="img"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </h3>
          <p className="text-xs text-zinc-500">@{profile.username}</p>
        </hgroup>

        <p className="mb-3 line-clamp-2 text-xs text-zinc-400">{profile.bio}</p>

        <dl className="flex gap-4 text-xs">
          {stats.following !== undefined && (
            <div>
              <dt className="sr-only">Following</dt>
              <dd>
                <span className="font-semibold text-white">
                  {formatNumber(stats.following)}
                </span>
                <span className="ml-1 text-zinc-500" aria-hidden="true">
                  Following
                </span>
              </dd>
            </div>
          )}
          {stats.followers !== undefined && (
            <div>
              <dt className="sr-only">Followers</dt>
              <dd>
                <span className="font-semibold text-white">
                  {formatNumber(stats.followers)}
                </span>
                <span className="ml-1 text-zinc-500" aria-hidden="true">
                  Followers
                </span>
              </dd>
            </div>
          )}
          {stats.posts !== undefined && profile.stats.postsLabel && (
            <div>
              <dt className="sr-only">{profile.stats.postsLabel}</dt>
              <dd>
                <span className="font-semibold text-white">
                  {formatNumber(stats.posts)}
                </span>
                <span className="ml-1 text-zinc-500" aria-hidden="true">
                  {profile.stats.postsLabel}
                </span>
              </dd>
            </div>
          )}
        </dl>
      </section>
    </article>
  );
};

export default SocialPreview;
