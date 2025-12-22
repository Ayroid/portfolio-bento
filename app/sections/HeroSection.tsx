import React from "react";
import { BentoItem } from "@/app/components/BentoItem";
import { ProfileCard } from "@/app/components/ProfileCard";
import { ExperienceCard } from "@/app/components/ExperienceCard";
import { AboutCard } from "@/app/components/AboutCard";
import { ActionCard } from "@/app/components/ActionCard";
import { ConnectCard } from "@/app/components/ConnectCard";
import { NameCard } from "@/app/components/NameCard";

const HeroSection = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)] lg:grid-rows-[repeat(4,2fr)] gap-2 border-b border-green-800 pb-2 mb-2">
			{/* Box 1: Hero Section - Row 1, Column 1 */}
			<BentoItem
				colSpan={14}
				rowSpan={2}
				className="md:col-span-1 lg:col-span-14"
			>
				<NameCard />
			</BentoItem>

			{/* Box 2: Current Role */}
			<BentoItem
				colSpan={6}
				rowSpan={2}
				className="md:col-span-1 lg:col-span-6"
			>
				<ProfileCard />
			</BentoItem>

			{/* Box 3: Quick Stats - Spans 2 rows in Column 3 */}
			<BentoItem
				colSpan={10}
				rowSpan={4}
				className="md:col-span-2 lg:col-span-10 lg:row-span-2"
			>
				<ExperienceCard />
			</BentoItem>

			{/* Box 4: About Section - Row 2, Column 1 */}
			<BentoItem
				colSpan={10}
				rowSpan={2}
				className="md:col-span-1 lg:col-span-10"
			>
				<AboutCard />
			</BentoItem>

			{/* Box 5: Socials - Row 2, Column 2 */}
			<BentoItem
				colSpan={5}
				rowSpan={1}
				className="md:col-span-1 lg:col-span-10"
			>
				<ActionCard href="mailto:ayushsk.work@gmail.com" label="EMAIL" />
			</BentoItem>
			<BentoItem
				colSpan={5}
				rowSpan={1}
				className="md:col-span-1 lg:col-span-10"
			>
				<ActionCard
					href="https://drive.google.com/file/d/1TIDYNaseyA11HRNvMjx8BQuCHbTZGCHK/view?usp=sharing"
					label="RESUME"
					bgColor="bg-[#e5e5e5]"
					hoverBgColor="hover:bg-[#dddddd]"
					textColor="text-black"
					iconColor="text-black"
				/>
			</BentoItem>
			<BentoItem
				colSpan={10}
				rowSpan={1}
				className="md:col-span-1 lg:col-span-10"
			>
				<ConnectCard />
			</BentoItem>
		</div>
	);
};

export default HeroSection;
