"use client";

import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function ConnectCard() {
	const socialIcons = [
		{
			icon: FaGithub,
			url: "https://github.com/ayroid",
			label: "GitHub",
		},
		{
			icon: FaLinkedin,
			url: "https://linkedin.com/in/ayroid",
			label: "LinkedIn",
		},
		{
			icon: FaXTwitter,
			url: "https://x.com/ayroids",
			label: "Twitter",
		},
	];

	return (
		<div className="h-full w-full font-mono flex flex-col p-4 relative transition-colors">
			{/* Arrow - Top Right */}
			<svg
				className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 text-white opacity-50"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
			>
				<path
					d="M7 17L17 7M17 7H7M17 7V17"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>

			{/* Bottom Section - CONNECT Text (Left) & Social Icons (Right) */}
			<div className="flex-1 flex items-end justify-between">
				{/* CONNECT Text - Bottom Left */}
				<span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white">
					CONNECT
				</span>

				{/* Social Icons - Bottom Right */}
				<TooltipProvider>
					<div className="flex gap-4 items-center pb-1">
						{socialIcons.map((social) => {
							const Icon = social.icon;
							return (
								<Tooltip key={social.label}>
									<TooltipTrigger asChild>
										<a
											href={social.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-white hover:text-zinc-400 transition-colors"
											aria-label={social.label}
										>
											<Icon className="w-5 h-5 sm:w-6 sm:h-6" />
										</a>
									</TooltipTrigger>
									<TooltipContent>
										<p>{social.label}</p>
									</TooltipContent>
								</Tooltip>
							);
						})}
					</div>
				</TooltipProvider>
			</div>
		</div>
	);
}
