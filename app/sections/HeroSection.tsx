import React from "react";
import { BentoItem } from "@/app/components/BentoItem";
import { ProfileCard } from "@/app/components/ProfileCard";
import { ExperienceCard } from "@/app/components/ExperienceCard";
import { AboutCard } from "@/app/components/AboutCard";
import { ActionCard } from "@/app/components/ActionCard";
import { ConnectCard } from "@/app/components/ConnectCard";
import { NameCard } from "@/app/components/NameCard";

/**
 * LATTICE STRUCTURE (30 columns × 4 rows)
 * Base row height: 150px
 */

const HeroSection = () => {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)] gap-2"
			style={{
				gridAutoRows: "150px", // Base row height
			}}
		>
			{/* Name Card - 14 cols × 2 rows */}
			<BentoItem
				colSpan={14}
				rowSpan={2}
				className="md:col-span-1 lg:col-span-14 lg:row-span-2"
			>
				<NameCard />
			</BentoItem>

			{/* Profile Picture - 6 cols × 2 rows */}
			<BentoItem
				colSpan={6}
				rowSpan={2}
				className="md:col-span-1 lg:col-span-6 lg:row-span-2"
			>
				<ProfileCard />
			</BentoItem>

			{/* Experience Card - 10 cols × 4 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={4}
				className="md:col-span-2 lg:col-span-10 lg:row-span-4"
			>
				<ExperienceCard />
			</BentoItem>

			{/* About Section - 10 cols × 2 rows */}
			<BentoItem
				colSpan={10}
				rowSpan={2}
				className="md:col-span-1 lg:col-span-10 lg:row-span-2"
			>
				<AboutCard />
			</BentoItem>

			{/* Email Button - 5 cols × 1 row */}
			<BentoItem
				colSpan={5}
				rowSpan={1}
				className="md:col-span-1 lg:col-span-5 lg:row-span-1"
			>
				<ActionCard href="mailto:ayushsk.work@gmail.com" label="EMAIL" />
			</BentoItem>

			{/* Resume Button - 5 cols × 1 row */}
			<BentoItem
				colSpan={5}
				rowSpan={1}
				className="md:col-span-1 lg:col-span-5 lg:row-span-1"
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

			{/* Connect Card - 10 cols × 1 row */}
			<BentoItem
				colSpan={10}
				rowSpan={1}
				className="md:col-span-1 lg:col-span-10 lg:row-span-1"
			>
				<ConnectCard />
			</BentoItem>
		</div>
	);
};

export default HeroSection;
