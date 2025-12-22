"use client";

import { FaBuilding } from "react-icons/fa";

export function ExperienceCard() {
	const experiences = [
		{
			title: "Associate Software Engineer",
			company: "Yamaha Motor Solutions India",
			location: "Faridabad, India",
			period: "July 2025 - Present",
			description: "Managing SAP BASIS operations including system configuration, monitoring, and performance tuning. Maintaining HANA/NetWeaver systems and managing integrations with SAP Datasphere and Cloud ALM.",
		},
		{
			title: "Software Engineering Intern",
			company: "Yamaha Motor Solutions India",
			location: "Faridabad, India",
			period: "January 2025 - June 2025",
			description: "Supported SAP system setup, monitoring, and user management. Assisted with routine BASIS maintenance, database backups, and software component updates.",
		},
		{
			title: "Software Developer Intern",
			company: "OrganicGrow",
			location: "Remote",
			period: "August 2024 - December 2024",
			description: "Led development of a GenAI-based automated content editing tool for social media, enabling post creation to scheduling within seconds for 100+ clients. Optimized platform performance with modern tech stack.",
		},
	];

	return (
		<div className="p-6 sm:p-8 h-full">
			<h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
				Experience
			</h2>
			<div className="space-y-6">
				{experiences.map((exp, index) => (
					<div
						key={index}
						className="border-b border-zinc-800 pb-1 last:pb-0 last:border-b-0"
					>
						<div className="flex items-start justify-between">
							<div>
								<h3 className="text-white font-bold text-lg">{exp.title}</h3>
								<div className="flex items-end justify-between gap-2">
									<div className="flex items-center gap-2">
										<FaBuilding className="text-zinc-400 text-sm" />
										<p className="text-zinc-400 text-sm">{exp.company}</p>
									</div>
									<div>
										<p className="text-zinc-500 text-sm">{exp.location}</p>
									</div>
								</div>
							</div>
							<span className="text-zinc-600 text-xs whitespace-nowrap ml-2">
								{exp.period}
							</span>
						</div>

						<p className="text-zinc-500 text-sm mb-3 leading-relaxed">
							{exp.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
