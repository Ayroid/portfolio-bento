import { NextResponse } from "next/server";

export interface HashnodeStats {
  followers: number;
  posts: number;
  name: string | null;
  bio: string | null;
  profilePicture: string | null;
}

const HASHNODE_API = "https://gql.hashnode.com";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  const query = `
    query GetUser($username: String!) {
      user(username: $username) {
        name
        bio {
          text
        }
        profilePicture
        followersCount
        posts(pageSize: 1, page: 1) {
          totalDocuments
        }
      }
    }
  `;

  try {
    const response = await fetch(HASHNODE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Hashnode API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0]?.message || "Hashnode API error");
    }

    const user = data.data?.user;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const stats: HashnodeStats = {
      followers: user.followersCount || 0,
      posts: user.posts?.totalDocuments || 0,
      name: user.name,
      bio: user.bio?.text || null,
      profilePicture: user.profilePicture,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Hashnode API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Hashnode stats" },
      { status: 500 }
    );
  }
}
