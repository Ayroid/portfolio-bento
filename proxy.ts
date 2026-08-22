import { NextResponse, type NextRequest } from "next/server";

/** Host that serves the thoughts feed as a site of its own. */
const THOUGHTS_HOST = "thoughts.ayroid.in";

/**
 * thoughts.ayroid.in is only the feed. Its root rewrites to /thoughts — a
 * rewrite, not a redirect, so the subdomain stays in the address bar — and
 * every other page path bounces back to that root, so none of the main site
 * is reachable under this host.
 *
 * /api is deliberately let through: the like button posts to it from this
 * host, and redirecting a POST would drop it.
 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0];
  if (host !== THOUGHTS_HOST) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/thoughts", request.url));
  }

  if (pathname.startsWith("/api/")) return NextResponse.next();

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  // Only real page requests — skip static assets and the image optimizer.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
