"use client";

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SocialPreviewCard } from "@/components/SocialPreviewCard";
import { socialProfiles } from "@/lib/social-profiles";

export function ConnectCard() {
	return (
		<div className="h-full w-full font-mono flex flex-col p-4 relative transition-colors group">
			{/* Arrow - Top Right */}
			<svg
				className="absolute top-4 right-4 group-hover:top-3 group-hover:right-3 w-8 h-8 sm:w-10 sm:h-10 text-white opacity-50 transition-all"
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
				<div className="flex gap-4 items-center pb-1">
					{socialProfiles.map((profile) => {
						const Icon = profile.icon;
						return (
							<HoverCard key={profile.platform} openDelay={200} closeDelay={100}>
								<HoverCardTrigger asChild>
									<a
										href={profile.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-white hover:text-zinc-400 transition-colors"
										aria-label={profile.platform}
									>
										<Icon className="w-5 h-5 sm:w-6 sm:h-6" />
									</a>
								</HoverCardTrigger>
								<HoverCardContent
									className="w-auto p-0 border-0 bg-transparent"
									side="top"
									sideOffset={8}
								>
									<SocialPreviewCard profile={profile} />
								</HoverCardContent>
							</HoverCard>
						);
					})}
				</div>
			</div>
		</div>
	);
}
