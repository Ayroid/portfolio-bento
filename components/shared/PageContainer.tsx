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

  const maxWidth = isNarrow ? "56rem" : "1520px";

  return (
    <div className="w-full">
      <div
        className="mx-auto w-full p-2 transition-all duration-500 ease-initial sm:p-4"
        style={{ maxWidth }}
      >
        {navbar}
      </div>

      <div
        className="mx-auto flex w-full flex-col gap-8 p-2 sm:p-4"
        style={{ maxWidth: isNarrow ? "56rem" : "1520px" }}
      >
        {children}
      </div>

      <div
        className="mx-auto w-full p-2 transition-all duration-500 ease-initial sm:p-4"
        style={{ maxWidth }}
      >
        {footer}
      </div>
    </div>
  );
}
