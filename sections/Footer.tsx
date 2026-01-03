"use client";

import { BentoItem } from "@/components/BentoItem";
import { ActionCard } from "@/components/ActionCard";

/**
 * LATTICE STRUCTURE (30 columns × 5 rows)
 * Base row height: 50px
 */

const Footer = () => {
	return (
		<>
			<div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)]"
				style={{
					gridAutoRows: "50px", // Base row height
				}}
			>
				{/* Open to Work Section - 22 cols × 3 rows */}
				<BentoItem colSpan={18} rowSpan={3}>
					<div className="h-full flex flex-col justify-end p-6 sm:p-8 items-start">
						<h3 className="text-3xl font-semibold text-white">
							Let’s build something real
						</h3>
						<p className="text-zinc-500 text-xl max-w-xl">
							Open to full-time roles, contracts, and serious collaborations.
						</p>
					</div>
				</BentoItem>
				<BentoItem colSpan={6} rowSpan={3}>
					<ActionCard
						href="https://cal.com/ayroid/general-meeting"
						label="CONTACT"
						bgColor="bg-white"
						hoverBgColor="hover:bg-[#dddddd]"
						textColor="text-black"
						iconColor="text-black"
					/>
				</BentoItem>
				<BentoItem colSpan={6} rowSpan={3}>
					<ActionCard
						href="/projects"
						label="PROJECT"
						bgColor="bg-[#1a1a1a]"
						hoverBgColor="hover:bg-[#222222]"
						textColor="text-white"
						iconColor="text-white"
					/>
				</BentoItem>
			</div>

			{/* Footer Credits - Plain centered text */}
			<div className="mt-8 flex items-center justify-center">
				<p className="text-zinc-600 text-xs sm:text-sm text-center">
					Designed & Developed by{" "}
					<span className="text-zinc-400 font-bold">Ayush Singh Kushwah</span>
					<br />© 2026 All rights reserved.
				</p>
			</div>
		</>
	);
};

export default Footer;
