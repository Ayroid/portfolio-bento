import { FileText } from "lucide-react";

export default function BlogsPage() {
	return (
		<div className="flex flex-col gap-8">
			{/* Placeholder Content */}
			<div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
				<div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
					<FileText className="w-10 h-10 text-zinc-600" />
				</div>
				<div className="text-center max-w-md">
					<h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
						Blogs Coming Soon
					</h1>
					<p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
						This dedicated blogs page is currently under construction. In the
						meantime, you can check out my articles on{" "}
						<a
							href="https://ayroid.hashnode.dev/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:text-blue-300 underline transition-colors"
						>
							Hashnode
						</a>
						.
					</p>
				</div>
				<a
					href="https://ayroid.hashnode.dev/"
					target="_blank"
					rel="noopener noreferrer"
					className="mt-4 px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-lg transition-colors"
				>
					Visit My Blog
				</a>
			</div>
		</div>
	);
}
