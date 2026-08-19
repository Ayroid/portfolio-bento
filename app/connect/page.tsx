import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Users } from "lucide-react";
import { FadeUpReveal, Separator } from "@/components/shared";
import { socialProfiles } from "@/config/social";

export const metadata: Metadata = {
  title: "Connect | Ayroid",
  description:
    "Connect with me across social platforms. Find me on GitHub, Twitter, LinkedIn, Instagram, and YouTube.",
  openGraph: {
    title: "Connect | Ayroid",
    description:
      "Connect with me across social platforms. Find me on GitHub, Twitter, LinkedIn, Instagram, and YouTube.",
    images: [
      {
        url: "/og_connect.png",
        width: 1200,
        height: 630,
        alt: "Connect with Ayroid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect | Ayroid",
    description:
      "Connect with me across social platforms. Find me on GitHub, Twitter, LinkedIn, Instagram, and YouTube.",
    images: ["/og_connect.png"],
  },
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

export default function ConnectPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <FadeUpReveal>
        <div className="flex flex-col gap-0">
          <div className="relative overflow-hidden border p-12 sm:p-16">
            {/* Corner decorations */}
            <div className="absolute top-3 left-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-700" />
              <div className="h-1.5 w-1.5 bg-zinc-800" />
            </div>
            <div className="absolute top-3 right-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-800" />
              <div className="h-1.5 w-1.5 bg-zinc-700" />
            </div>
            <div className="absolute bottom-3 left-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-800" />
              <div className="h-1.5 w-1.5 bg-zinc-700" />
            </div>
            <div className="absolute right-3 bottom-3 flex gap-1">
              <div className="h-1.5 w-1.5 bg-zinc-700" />
              <div className="h-1.5 w-1.5 bg-zinc-800" />
            </div>
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 3px, currentcolor 4px, currentcolor 4px, transparent 5px)",
              }}
            />
            <div className="relative flex flex-col items-center gap-4">
              <Users className="h-8 w-8 text-zinc-600 sm:h-10 sm:w-10" />
              <h1 className="text-center font-mono text-3xl font-bold tracking-wider text-white sm:text-5xl">
                CONNECT
              </h1>
            </div>
          </div>
          <div className="border border-t-0 p-6">
            <p className="text-center font-sans text-sm text-zinc-400 sm:text-base">
              Find me across the internet. Let&apos;s connect.
            </p>
          </div>
        </div>
      </FadeUpReveal>

      {/* Separator */}
      <FadeUpReveal>
        <Separator />
      </FadeUpReveal>

      {/* Social Cards Grid */}
      <FadeUpReveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {socialProfiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <a
                key={profile.platform}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-4 border border-zinc-800 bg-surface-card p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-sans text-lg font-semibold text-white">
                        {profile.displayName}
                      </h2>
                      <p className="font-sans text-sm text-zinc-500">
                        @{profile.username}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
                </div>

                <p className="font-sans text-sm leading-relaxed text-zinc-400">
                  {profile.bio}
                </p>

                <div className="flex gap-4 text-sm">
                  {profile.stats.followers !== undefined && (
                    <span>
                      <span className="font-semibold text-white">
                        {formatNumber(profile.stats.followers)}
                      </span>
                      <span className="ml-1 text-zinc-500">Followers</span>
                    </span>
                  )}
                  {profile.stats.following !== undefined && (
                    <span>
                      <span className="font-semibold text-white">
                        {formatNumber(profile.stats.following)}
                      </span>
                      <span className="ml-1 text-zinc-500">Following</span>
                    </span>
                  )}
                  {profile.stats.posts !== undefined &&
                    profile.stats.postsLabel && (
                      <span>
                        <span className="font-semibold text-white">
                          {formatNumber(profile.stats.posts)}
                        </span>
                        <span className="ml-1 text-zinc-500">
                          {profile.stats.postsLabel}
                        </span>
                      </span>
                    )}
                </div>
              </a>
            );
          })}
        </div>
      </FadeUpReveal>

      {/* Separator */}
      <FadeUpReveal>
        <Separator />
      </FadeUpReveal>

      {/* Other Pages */}
      <FadeUpReveal>
        <div className="mb-12 flex flex-col gap-4 pt-4">
          <h2 className="text-sm font-medium tracking-wider text-zinc-500 uppercase">
            More About Me
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/work"
              className="group flex items-center justify-between border border-zinc-800 bg-surface-card p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="text-lg font-semibold text-white">Work</span>
              <ExternalLink className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
            <Link
              href="/projects"
              className="group flex items-center justify-between border border-zinc-800 bg-surface-card p-5 transition-all duration-300 hover:border-zinc-700 sm:p-6"
            >
              <span className="text-lg font-semibold text-white">
                Projects
              </span>
              <ExternalLink className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
            </Link>
          </div>
        </div>
      </FadeUpReveal>
    </div>
  );
}
