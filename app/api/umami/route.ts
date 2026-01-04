import { NextResponse } from "next/server";

export interface UmamiStats {
  pageviews: number;
  visitors: number;
}

const WEBSITE_ID = "bdeef7dc-e63f-44ca-ad1e-8056f9efdcf5";

export async function GET() {
  const apiKey = process.env.UMAMI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Umami API key not configured" },
      { status: 500 }
    );
  }

  try {
    // Get stats for all time (from site creation to now)
    const startAt = new Date("2020-01-01").getTime();
    const endAt = Date.now();

    const response = await fetch(
      `https://api.umami.is/v1/websites/${WEBSITE_ID}/stats?startAt=${startAt}&endAt=${endAt}`,
      {
        headers: {
          Accept: "application/json",
          "x-umami-api-key": apiKey,
        },
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Umami API error:", response.status, errorText);
      throw new Error(`Umami API error: ${response.status}`);
    }

    const data = await response.json();

    const stats: UmamiStats = {
      pageviews: data.pageviews ?? 0,
      visitors: data.visitors ?? 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Umami API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Umami stats" },
      { status: 500 }
    );
  }
}
