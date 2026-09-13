import type { Metadata } from "next";
import { Mail } from "lucide-react";
import {
  PageHeader,
  Section,
  row,
  rowTitle,
} from "@/components/shared/Section";
import { siteConfig } from "@/config";
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

const rowClass = `${row} grid-cols-[minmax(0,1fr)_auto] items-baseline`;

export default function ConnectPage() {
  return (
    <>
      <PageHeader
        title="Connect"
        description="Find me across the internet. Let's connect."
      />

      <Section label="elsewhere">
        {socialProfiles.map(({ platform, url, icon: Icon, ...profile }) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={rowClass}
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <Icon className="h-4 w-4 shrink-0 text-neutral-400" />
              <span className={rowTitle}>{profile.displayName}</span>
              <span className="truncate text-neutral-500">
                @{profile.username}
              </span>
            </span>
            <span className="text-neutral-500 tabular-nums">
              {profile.stats.followers !== undefined
                ? `${formatNumber(profile.stats.followers)} followers`
                : profile.stats.posts !== undefined &&
                  `${formatNumber(profile.stats.posts)} ${profile.stats.postsLabel ?? "posts"}`}
            </span>
          </a>
        ))}
        <a href={`mailto:${siteConfig.email}`} className={rowClass}>
          <span className="flex min-w-0 items-center gap-2.5">
            <Mail className="h-4 w-4 shrink-0 text-neutral-400" />
            <span className={rowTitle}>Email</span>
            <span className="truncate text-neutral-500">
              {siteConfig.email}
            </span>
          </span>
          <span className="text-neutral-600">↗</span>
        </a>
      </Section>
    </>
  );
}
