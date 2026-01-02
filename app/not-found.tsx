import Link from "next/link";
import { BentoItem } from "@/components/BentoItem";

export default function NotFound() {
	return (
		<div className="min-h-[calc(100vh-300px)] flex items-center justify-center">
			<div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)] gap-2 w-full"
				style={{
					gridAutoRows: "35px",
				}}
			>
				{/* Main 404 Message */}
				<BentoItem
					colSpan={30}
					rowSpan={8}
					className="md:col-span-2 lg:col-span-30"
					height={280}
				>
					<div className="h-full flex flex-col items-center justify-center p-8 text-center">
						<h1 className="text-8xl sm:text-9xl font-bold text-yellow-400 font-mono mb-4">
							404
						</h1>
						<p className="text-xl sm:text-2xl text-zinc-300 mb-2">
							Page Not Found
						</p>
						<p className="text-sm sm:text-base text-zinc-500 max-w-md">
							Oops! The page you&apos;re looking for seems to have wandered off into
							the void.
						</p>
					</div>
				</BentoItem>

				{/* Navigation Cards */}
				<BentoItem
					colSpan={10}
					rowSpan={6}
					className="md:col-span-1 lg:col-span-10"
					height={210}
				>
					<Link
						href="/"
						className="h-full flex flex-col items-center justify-center p-6 group"
					>
						<div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-4 group-hover:bg-yellow-400/20 transition-colors">
							<svg
								className="w-8 h-8 text-yellow-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
							Home
						</h3>
						<p className="text-sm text-zinc-400 text-center">
							Return to the main page
						</p>
					</Link>
				</BentoItem>

				<BentoItem
					colSpan={10}
					rowSpan={6}
					className="md:col-span-1 lg:col-span-10"
					height={210}
				>
					<Link
						href="/blogs"
						className="h-full flex flex-col items-center justify-center p-6 group"
					>
						<div className="w-16 h-16 rounded-full bg-blue-400/10 flex items-center justify-center mb-4 group-hover:bg-blue-400/20 transition-colors">
							<svg
								className="w-8 h-8 text-blue-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
							Blogs
						</h3>
						<p className="text-sm text-zinc-400 text-center">
							Read my latest articles
						</p>
					</Link>
				</BentoItem>

				<BentoItem
					colSpan={10}
					rowSpan={6}
					className="md:col-span-2 lg:col-span-10"
					height={210}
				>
					<Link
						href="/projects"
						className="h-full flex flex-col items-center justify-center p-6 group"
					>
						<div className="w-16 h-16 rounded-full bg-green-400/10 flex items-center justify-center mb-4 group-hover:bg-green-400/20 transition-colors">
							<svg
								className="w-8 h-8 text-green-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
							Projects
						</h3>
						<p className="text-sm text-zinc-400 text-center">
							Check out my work
						</p>
					</Link>
				</BentoItem>
			</div>
		</div>
	);
}
