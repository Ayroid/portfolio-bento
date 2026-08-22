"use client";

import { usePathname } from "next/navigation";

function isDetailPage(pathname: string): boolean {
  const detailPatterns = [
    /^\/blogs(\/[^/]+)?$/, // /blogs and /blogs/[slug]
    /^\/projects(\/[^/]+)?$/, // /projects and /projects/[slug]
    /^\/work(\/[^/]+)?$/, // /work and /work/[slug]
    /^\/books$/, // /books
    /^\/tools$/, // /tools
    /^\/recommendations$/, // /recommendations
    /^\/resume$/, // /resume
    /^\/connect$/, // /connect
    /^\/thoughts$/, // /thoughts
  ];
  return detailPatterns.some((pattern) => pattern.test(pathname));
}

interface PageContainerProps {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}

export function PageContainer({
  children,
  navbar,
  footer,
}: PageContainerProps) {
  const pathname = usePathname();
  const isNarrow = isDetailPage(pathname);

  // The thoughts feed is its own site at thoughts.ayroid.in, so it carries no
  // chrome from the main one.
  const isBare = pathname === "/thoughts";

  const maxWidth = isNarrow ? "56rem" : "1520px";

  if (isBare) {
    return (
      <div className="flex w-full flex-col">
        <div
          className="mx-auto flex w-full flex-col px-4 sm:px-4"
          style={{ maxWidth }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div
        className="mx-auto w-full px-4 transition-all duration-500 ease-initial sm:px-4"
        style={{ maxWidth }}
      >
        {navbar}
      </div>

      <div
        className="mx-auto flex w-full flex-col px-4 sm:px-4"
        style={{ maxWidth: isNarrow ? "56rem" : "1520px" }}
      >
        {children}
      </div>

      <div
        className="mx-auto w-full px-4 transition-all duration-500 ease-initial sm:px-4"
        style={{ maxWidth }}
      >
        {footer}
      </div>
    </div>
  );
}
