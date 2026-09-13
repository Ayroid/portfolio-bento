import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Lets list titles glide into the detail page heading via <ViewTransition>.
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        // Photos on thoughts pulled from X are referenced at their source.
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
