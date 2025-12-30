import Link from "next/link";
import { Folder } from "lucide-react";

export default function ProjectsPage() {
	return (
		<div className="flex flex-col gap-8">
			{/* Placeholder Content */}
			<div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
				<div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
					<Folder className="w-10 h-10 text-zinc-600" />
				</div>
				<div className="text-center max-w-md">
					<h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
						Projects Coming Soon
					</h1>
					<p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
						This dedicated projects showcase is currently under construction.
						Check back soon to see detailed case studies and project breakdowns.
					</p>
				</div>
				<Link
					href="/#projects"
					className="mt-4 px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-lg transition-colors"
				>
					View Projects Preview
				</Link>
			</div>
		</div>
	);
}
