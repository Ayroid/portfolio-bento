import { BentoItem } from "@/components/BentoItem";
import GitHubContributions from "@/components/GitHubContributions";
import BooksCard from "@/components/BooksCard";
import TechStackCard from "@/components/TechStackCard";
import FadeUpReveal from "@/components/FadeUpReveal";

/**
 * LATTICE STRUCTURE (30 columns × 8 rows)
 * Base row height: 50px
 */

const StatsSection = () => {
	return (
		<FadeUpReveal delay={0.1}>
			<div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)]"
				style={{
					gridAutoRows: "50px", // Base row height
				}}
			>
			<BentoItem
				colSpan={10}
				rowSpan={6}
				className="md:col-span-1 lg:col-span-10 lg:row-span-7"
			>
				<TechStackCard />
			</BentoItem>

			<BentoItem
				colSpan={20}
				rowSpan={6}
				className="md:col-span-2 lg:col-span-20 lg:row-span-2"
			>
				<div className="p-4 sm:p-8 h-full">
					<GitHubContributions username="ayroid" />
				</div>
			</BentoItem>

			{/* <BentoItem
				colSpan={30}
				rowSpan={8}
				className="md:col-span-1 lg:col-span-10"
			>
				<BooksCard />
			</BentoItem> */}
			</div>
		</FadeUpReveal>
	);
};

export default StatsSection;
