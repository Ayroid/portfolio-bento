import { FaXTwitter, FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";

export type SocialPlatform = "github" | "twitter" | "linkedin" | "hashnode" | "instagram" | "youtube";

export interface SocialProfile {
  platform: SocialPlatform;
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
      followers: 1200,
      following: 950,
      posts: 3350,
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
  // {
  //   platform: "instagram",
  //   username: "ayroids",
  //   displayName: "Ayush ☁️",
  //   bio: "23 • Engineer",
  //   url: "https://www.instagram.com/ayroids/",
  //   profileImage: "/socials/github_profile.jpg",
  //   bannerImage: "/socials/twitter_banner.png",
  //   icon: FaInstagram,
  //   stats: {
  //     posts: 2,
  //     postsLabel: "Posts",
  //   },
  //   verified: false,
  // },
  // {
  //   platform: "youtube",
  //   username: "ayroids",
  //   displayName: "Ayush ☁️",
  //   bio: "Tech, Engineering & More",
  //   url: "https://www.youtube.com/@ayroids",
  //   profileImage: "/socials/github_profile.jpg",
  //   icon: FaYoutube,
  //   stats: {
  //     posts: 1,
  //     postsLabel: "Videos",
  //   },
  //   verified: false,
  // },
];

export function getSocialProfile(
  platform: SocialPlatform
): SocialProfile | undefined {
  return socialProfiles.find((p) => p.platform === platform);
}
