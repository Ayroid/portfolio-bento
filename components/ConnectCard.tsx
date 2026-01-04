"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SocialPreviewCard } from "@/components/SocialPreviewCard";
import { socialProfiles } from "@/lib/social-profiles";

export function ConnectCard() {
  return (
    <div className="group relative flex h-full w-full flex-col p-4 font-mono transition-colors">
      {/* Arrow - Top Right */}
      <svg
        className="absolute top-4 right-4 h-8 w-8 text-white opacity-50 transition-all group-hover:top-3 group-hover:right-3 sm:h-10 sm:w-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M7 17L17 7M17 7H7M17 7V17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Bottom Section - CONNECT Text (Left) & Social Icons (Right) */}
      <div className="flex flex-1 items-end justify-between">
        {/* CONNECT Text - Bottom Left */}
        <span className="text-2xl font-medium text-white sm:text-3xl lg:text-4xl">
          CONNECT
        </span>

        {/* Social Icons - Bottom Right */}
        <div className="flex items-center gap-4 pb-1">
          {socialProfiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <HoverCard
                key={profile.platform}
                openDelay={200}
                closeDelay={100}
              >
                <HoverCardTrigger asChild>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition-colors hover:text-zinc-400"
                    aria-label={profile.platform}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-auto border-0 bg-transparent p-0"
                  side="top"
                  sideOffset={8}
                >
                  <SocialPreviewCard profile={profile} />
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
