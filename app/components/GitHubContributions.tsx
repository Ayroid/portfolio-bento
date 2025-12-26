"use client";

import { useEffect, useState } from "react";

interface ContributionDay {
	date: string;
	count: number;
	level: number;
}

interface ContributionWeek {
	days: ContributionDay[];
}

interface APIContribution {
	date: string;
	count: number;
	level: number;
}

export const GitHubContributions = ({ username }: { username: string }) => {
	const [contributions, setContributions] = useState<ContributionWeek[]>([]);
	const [totalContributions, setTotalContributions] = useState(0);
	const [loading, setLoading] = useState(true);
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [selectedYear, setSelectedYear] = useState<number | "last">("last");

	// Generate available years (current year back to when GitHub user was created)
	const currentYear = new Date().getFullYear();
	const availableYears = Array.from(
		{ length: currentYear - 2021 + 1 },
		(_, i) => currentYear - i
	);

	useEffect(() => {
		const fetchContributions = async () => {
			try {
				setLoading(true);
				const yearParam = selectedYear === "last" ? "last" : selectedYear;
				const response = await fetch(
					`https://github-contributions-api.jogruber.de/v4/${username}?y=${yearParam}`
				);

				if (!response.ok) {
					throw new Error("Failed to fetch contributions");
				}

				const data = await response.json();

				// Transform the API data to our format
				const weeks: ContributionWeek[] = [];
				let currentWeek: ContributionDay[] = [];
				let total = 0;

				data.contributions.forEach(
					(contribution: APIContribution, index: number) => {
						const { date, count, level } = contribution;
						total += count;

						currentWeek.push({
							date,
							count,
							level,
						});

						// GitHub API groups by weeks (Sunday-Saturday)
						const dayOfWeek = new Date(date).getDay();
						if (dayOfWeek === 6 || index === data.contributions.length - 1) {
							weeks.push({ days: [...currentWeek] });
							currentWeek = [];
						}
					}
				);

				setContributions(weeks);
				setTotalContributions(total);
				setLoading(false);
				setIsInitialLoad(false);
			} catch (error) {
				console.error("Error fetching contributions:", error);
				setLoading(false);
				setIsInitialLoad(false);
			}
		};

		fetchContributions();
	}, [username, selectedYear]);

	const getLevelColor = (level: number) => {
		switch (level) {
			case 0:
				return "bg-zinc-500/5";
			case 1:
				return "bg-zinc-500/20";
			case 2:
				return "bg-zinc-500/40";
			case 3:
				return "bg-zinc-500/60";
			case 4:
				return "bg-zinc-500/80";
			default:
				return "bg-zinc-500/5";
		}
	};

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const getMonthLabels = () => {
		const labels: { month: string; offset: number }[] = [];
		let lastMonth = -1;

		contributions.forEach((week, weekIndex) => {
			if (week.days[0]) {
				const date = new Date(week.days[0].date);
				const month = date.getMonth();

				if (month !== lastMonth) {
					labels.push({
						month: months[month],
						offset: weekIndex,
					});
					lastMonth = month;
				}
			}
		});

		return labels;
	};

	if (isInitialLoad && loading) {
		return (
			<div className="flex items-center justify-center h-full">
				<div className="animate-pulse text-zinc-500 text-sm">
					Loading contributions...
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 flex min-w-0 w-full h-full gap-2">
			<div className="w-full h-full flex flex-col">
				<div className="mb-2 flex items-center justify-between">
					<p className="text-zinc-400 text-sm">
						<span className="text-white font-semibold">
							{totalContributions}
						</span>{" "}
						contributions in{" "}
						{selectedYear === "last" ? "the last year" : selectedYear}
					</p>
				</div>

				<div className="flex-1 overflow-hidden">
					<div className="inline-flex flex-col gap-1 min-w-full">
						{/* Month labels */}
						<div className="flex gap-[3px] ml-7 mb-4 relative">
							{getMonthLabels().map((label, i) => (
								<div
									key={i}
									className="text-[10px] text-zinc-500 absolute"
									style={{
										left: `${label.offset * 15}px`,
									}}
								>
									{label.month}
								</div>
							))}
						</div>

						{/* Day labels + contribution grid */}
						<div className="flex gap-[3px]">
							{/* Day of week labels */}
							<div className="flex flex-col gap-[3px] justify-around text-[10px] text-zinc-500 pr-1">
								<span className="h-[12.5px]"></span>
								<span className="h-[12.5px]">Mon</span>
								<span className="h-[12.5px]"></span>
								<span className="h-[12.5px]">Wed</span>
								<span className="h-[12.5px]"></span>
								<span className="h-[12.5px]">Fri</span>
								<span className="h-[12.5px]"></span>
							</div>

							{/* Contribution squares */}
							<div className="flex gap-[3px]">
								{contributions.map((week, weekIndex) => (
									<div key={weekIndex} className="flex flex-col gap-[3px]">
										{week.days.map((day, dayIndex) => (
											<div
												key={dayIndex}
												className={`w-[12.5px] h-[12.5px] rounded-xs ${getLevelColor(
													day.level
												)} hover:ring-1 hover:ring-zinc-400 transition-all cursor-pointer group relative`}
												title={`${day.count} contributions on ${day.date}`}
											>
												{/* Tooltip */}
												<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-zinc-700">
													<div className="font-semibold">
														{day.count} contributions
													</div>
													<div className="text-zinc-400">{day.date}</div>
												</div>
											</div>
										))}
									</div>
								))}
							</div>
						</div>

						{/* Legend */}
						<div className="flex items-center gap-2 mt-2 justify-end">
							<span className="text-[10px] text-zinc-500">Less</span>
							<div className="flex gap-[3px]">
								{[0, 1, 2, 3, 4].map((level) => (
									<div
										key={level}
										className={`w-[12.5px] h-[12.5px] rounded-xs ${getLevelColor(
											level
										)}`}
									/>
								))}
							</div>
							<span className="text-[10px] text-zinc-500">More</span>
						</div>
					</div>
				</div>
			</div>
			{/* Year selector */}
			<div className="flex flex-col gap-1">
				<button
					onClick={() => setSelectedYear("last")}
					className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
						selectedYear === "last"
							? "bg-blue-600 text-white"
							: "text-zinc-400 hover:text-white hover:bg-zinc-800"
					}`}
				>
					Current
				</button>
				{availableYears.map((year) => (
					<button
						key={year}
						onClick={() => setSelectedYear(year)}
						className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
							selectedYear === year
								? "bg-blue-600 text-white"
								: "text-zinc-400 hover:text-white hover:bg-zinc-800"
						}`}
					>
						{year}
					</button>
				))}
			</div>
		</div>
	);
};
