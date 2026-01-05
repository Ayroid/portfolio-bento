"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import SocialPreview from "@/components/landing/SocialPreview";
import { socialProfiles } from "@/config/social";
import { TopRightArrow } from "@/components/icons";

const Connect = () => {
  return (
    <section
      className="group relative flex h-full w-full flex-col p-4 font-mono transition-colors"
      aria-labelledby="connect-heading"
    >
      <TopRightArrow iconColor="text-white" />

      <div className="flex flex-1 items-end justify-between">
        <h2
          id="connect-heading"
          className="text-2xl font-medium text-white sm:text-3xl lg:text-4xl"
        >
          CONNECT
        </h2>

        <nav
          className="flex items-center gap-4 pb-1"
          aria-label="Social media links"
        >
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
                    aria-label={`Connect on ${profile.platform}`}
                  >
                    <Icon
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      aria-hidden="true"
                    />
                  </a>
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-auto border-0 bg-transparent p-0"
                  side="top"
                  sideOffset={8}
                >
                  <SocialPreview profile={profile} />
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </nav>
      </div>
    </section>
  );
};

export default Connect;
