import { NextResponse } from "next/server";

export interface GitHubStats {
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
  bio: string | null;
  name: string | null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-App",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    const stats: GitHubStats = {
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos,
      avatar_url: data.avatar_url,
      bio: data.bio,
      name: data.name,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 }
    );
  }
}
