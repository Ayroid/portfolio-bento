import React from "react";
import { BentoItem } from "@/components/BentoItem";
import { ActionCard } from "@/components/ActionCard";
import FadeUpReveal from "@/components/FadeUpReveal";
import { BookOpen, Wrench, Youtube, Coffee } from "lucide-react";

/**
 * LATTICE STRUCTURE (30 columns)
 * Base row height: 50px
 */

const LifeSection = () => {
	return (
		<FadeUpReveal delay={0.5}>
			<div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)]"
				style={{
					gridAutoRows: "50px",
				}}
			>
				{/* Section Header */}
				<BentoItem
					colSpan={30}
					rowSpan={2}
					className="md:col-span-2 lg:col-span-30"
				>
					<div className="h-full flex flex-col justify-center p-4 sm:p-6">
						<h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
							Beyond Code
						</h2>
						<p className="text-zinc-400 text-sm sm:text-base">
							Books, tools, and things that inspire me
						</p>
					</div>
				</BentoItem>

				{/* Books Card */}
				<BentoItem
					colSpan={10}
					rowSpan={4}
					className="md:col-span-1 lg:col-span-10 overflow-hidden group"
					redirectTo="/books"
				>
					<div className="h-full flex flex-col justify-between p-4 sm:p-6">
						<div>
							<BookOpen className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
							<h3 className="text-white font-bold text-lg mb-2">
								Reading List
							</h3>
							<p className="text-zinc-400 text-sm">
								Books I'm reading and recommend
							</p>
						</div>
						<div className="text-xs text-zinc-500">→ Explore</div>
					</div>
				</BentoItem>

				{/* Tools Card */}
				<BentoItem
					colSpan={10}
					rowSpan={4}
					className="md:col-span-1 lg:col-span-10 overflow-hidden group"
					redirectTo="/tools"
				>
					<div className="h-full flex flex-col justify-between p-4 sm:p-6">
						<div>
							<Wrench className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
							<h3 className="text-white font-bold text-lg mb-2">
								Tools & Setup
							</h3>
							<p className="text-zinc-400 text-sm">
								Software and tools I use daily
							</p>
						</div>
						<div className="text-xs text-zinc-500">→ Explore</div>
					</div>
				</BentoItem>

				{/* Recommendations Card */}
				<BentoItem
					colSpan={10}
					rowSpan={4}
					className="md:col-span-1 lg:col-span-10 overflow-hidden group"
					redirectTo="/recommendations"
				>
					<div className="h-full flex flex-col justify-between p-4 sm:p-6">
						<div>
							<Youtube className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
							<h3 className="text-white font-bold text-lg mb-2">
								Recommendations
							</h3>
							<p className="text-zinc-400 text-sm">
								YouTube channels, podcasts, and more
							</p>
						</div>
						<div className="text-xs text-zinc-500">→ Explore</div>
					</div>
				</BentoItem>
			</div>
		</FadeUpReveal>
	);
};

export default LifeSection;
