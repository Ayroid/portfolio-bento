import { BentoItem } from "@/components/BentoItem";
import FadeUpReveal from "@/components/FadeUpReveal";
import { BookOpen, Wrench, Youtube } from "lucide-react";

/**
 * LATTICE STRUCTURE (30 columns)
 * Base row height: 50px
 */

const LifeCard = ({
	title,
	description,
	icon: Icon,
	redirectTo,
	redirectTarget = "_self",
}: {
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	redirectTo: string;
	redirectTarget?: "_self" | "_blank";
}) => {
	return (
		<BentoItem
			colSpan={10}
			rowSpan={3}
			className="md:col-span-1 lg:col-span-10"
			redirectTo={redirectTo}
			redirectTarget={redirectTarget}
		>
			<div className="h-full flex flex-col justify-between p-4 sm:p-6">
				<div>
					<Icon className="w-8 h-8 text-white mb-3" />
					<h3 className="text-white font-bold text-xl">{title}</h3>
					<p className="text-zinc-400 text-sm">{description}</p>
				</div>
			</div>
		</BentoItem>
	);
};

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
				<LifeCard
					title="Books & Articles"
					description="What I'm reading and recommend"
					icon={BookOpen}
					redirectTo="/books"
				/>

				{/* Tools Card */}
				<LifeCard
					title="Tools & Resources"
					description="My favorite dev tools and resources"
					icon={Wrench}
					redirectTo="/tools"
				/>

				{/* Recommendations Card */}
				<LifeCard
					title="Recommendations"
					description="My favorite YouTube channels and podcasts"
					icon={Youtube}
					redirectTo="https://www.youtube.com/playlist?list=PLayroidRecs"
					redirectTarget="_blank"
				/>
			</div>
		</FadeUpReveal>
	);
};

export default LifeSection;
