import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import type { IconType } from "react-icons";

export type SocialPlatform =
  | "github"
  | "twitter"
  | "linkedin"
  | "hashnode"
  | "instagram"
  | "youtube";

export interface SocialProfile {
  platform: SocialPlatform;
  username: string;
  displayName: string;
  url: string;
  icon: IconType;
  stats: {
    followers?: number;
    following?: number;
    posts?: number;
    postsLabel?: string;
  };
}

export const socialProfiles: SocialProfile[] = [
  {
    platform: "github",
    username: "ayroid",
    displayName: "Ayush ☁️",
    url: "https://github.com/ayroid",
    icon: FaGithub,
    stats: {
      followers: 53,
      following: 92,
      posts: 54,
      postsLabel: "Repos",
    },
  },
  {
    platform: "twitter",
    username: "ayroids",
    displayName: "Ayush ☁️",
    url: "https://x.com/ayroids",
    icon: FaXTwitter,
    stats: {
      followers: 1200,
      following: 950,
      posts: 3350,
      postsLabel: "Posts",
    },
  },
  {
    platform: "linkedin",
    username: "ayroid",
    displayName: "Ayush Singh Kushwah",
    url: "https://linkedin.com/in/ayroid",
    icon: FaLinkedin,
    stats: {
      followers: 1515,
      postsLabel: "Connections",
    },
  },
];
