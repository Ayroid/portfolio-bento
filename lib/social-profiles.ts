import { FaXTwitter, FaGithub, FaLinkedin, FaHashnode } from "react-icons/fa6";
import type { IconType } from "react-icons";

export interface SocialProfile {
  platform: "github" | "twitter" | "linkedin" | "hashnode";
  username: string;
  displayName: string;
  bio: string;
  url: string;
  profileImage: string;
  bannerImage?: string;
  icon: IconType;
  stats: {
    followers?: number;
    following?: number;
    posts?: number;
    postsLabel?: string;
  };
  verified?: boolean;
}

export const socialProfiles: SocialProfile[] = [
  {
    platform: "github",
    username: "ayroid",
    displayName: "Ayush ☁️",
    bio: "23 • Engineer",
    url: "https://github.com/ayroid",
    profileImage: "/socials/github_profile.jpg",
    bannerImage: "/socials/github_banner.png",
    icon: FaGithub,
    stats: {
      followers: 53,
      following: 92,
      posts: 54,
      postsLabel: "Repos",
    },
    verified: false,
  },
  {
    platform: "twitter",
    username: "ayroids",
    displayName: "Ayush ☁️",
    bio: "23 • Engineer",
    url: "https://x.com/ayroids",
    profileImage: "/socials/github_profile.jpg",
    bannerImage: "/socials/twitter_banner.png",
    icon: FaXTwitter,
    stats: {
      followers: 1150,
      following: 850,
      posts: 3220,
      postsLabel: "Posts",
    },
    verified: false,
  },
    {
    platform: "linkedin",
    username: "ayroid",
    displayName: "Ayush Singh Kushwah",
    bio: "SWE@YMSLI",
    url: "https://linkedin.com/in/ayroid",
    profileImage: "/socials/linkedin_profile.png",
    bannerImage: "/socials/linkedin_banner.png",
    icon: FaLinkedin,
    stats: {
      followers: 1515,
      postsLabel: "Connections",
    },
    verified: false,
  },
  {
    platform: "hashnode",
    username: "Ayush Singh Kushwah",
    displayName: "Ayroid",
    bio: "Sharing experiences with words",
    url: "https://ayroid.hashnode.dev",
    profileImage: "/socials/hashnode_profile.png",
    bannerImage: "/socials/hashnode_banner.png",
    icon: FaHashnode,
    stats: {
      followers: 4,
      posts: 7,
      postsLabel: "Articles",
    },
    verified: false,
  },
];

export function getSocialProfile(platform: string): SocialProfile | undefined {
  return socialProfiles.find((p) => p.platform === platform);
}
