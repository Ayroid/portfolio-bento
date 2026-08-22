import { NextResponse, type NextRequest } from "next/server";

/** Host that should serve the thoughts feed at its root. */
const THOUGHTS_HOST = "thoughts.ayroid.in";

/**
 * Serves /thoughts at the root of thoughts.ayroid.in. It's a rewrite, not a
 * redirect, so the subdomain stays in the address bar. The page is still
 * reachable at ayroid.in/thoughts.
 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0];

  if (host === THOUGHTS_HOST && request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/thoughts", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Only real page requests — skip static assets and the image optimizer.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
