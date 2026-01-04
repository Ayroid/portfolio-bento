"use client";

import { usePathname } from "next/navigation";

function isDetailPage(pathname: string): boolean {
  const detailPatterns = [
    /^\/blogs(\/[^/]+)?$/, // /blogs and /blogs/[slug]
    /^\/projects(\/[^/]+)?$/, // /projects and /projects/[slug]
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

  // Use wide width until mounted, then use the actual width
  const maxWidth = isNarrow ? "56rem" : "1520px";

  return (
    <div className="w-full">
      {/* Navbar - animates width */}
      <div
        className="mx-auto w-full p-2 transition-all duration-500 ease-initial sm:p-4"
        style={{ maxWidth }}
      >
        {navbar}
      </div>

      {/* Page Content - uses its own width based on page */}
      <div
        className="mx-auto flex w-full flex-col gap-8 p-2 sm:p-4"
        style={{ maxWidth: isNarrow ? "56rem" : "1520px" }}
      >
        {children}
      </div>

      {/* Footer - animates width */}
      <div
        className="mx-auto w-full p-2 transition-all duration-500 ease-initial sm:p-4"
        style={{ maxWidth }}
      >
        {footer}
      </div>
    </div>
  );
}
