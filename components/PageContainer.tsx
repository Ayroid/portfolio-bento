"use client";

import { usePathname } from "next/navigation";

function isDetailPage(pathname: string): boolean {
	const detailPatterns = [
		/^\/blogs\/[^/]+$/, // /blogs/[slug]
		/^\/projects\/[^/]+$/, // /projects/[slug]
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
				className="w-full mx-auto p-2 sm:p-4 transition-all duration-500 ease-initial"
				style={{ maxWidth }}
			>
				{navbar}
			</div>

			{/* Page Content - uses its own width based on page */}
			<div
				className="w-full mx-auto p-2 sm:p-4 gap-8 flex flex-col"
				style={{ maxWidth: isNarrow ? "56rem" : "1520px" }}
			>
				{children}
			</div>

			{/* Footer - animates width */}
			<div
				className="w-full mx-auto p-2 sm:p-4 transition-all duration-500 ease-initial"
				style={{ maxWidth }}
			>
				{footer}
			</div>
		</div>
	);
}
