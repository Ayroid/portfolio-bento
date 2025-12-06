"use client";

import {
	FaXTwitter,
	FaGithub,
	FaLinkedin,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi2";

export function Socials() {
	const socialIcons = [
		{
			icon: FaXTwitter,
			url: "https://x.com/ayroids",
			label: "Twitter",
		},
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
	];

	return (
		<div className="space-y-4 w-full h-full">
			{/* Large Buttons */}
			<div className="flex gap-3">
				<a
					href="mailto:ayushsk.work@gmail.com"
					className="flex-1 px-6 py-5 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors text-base font-medium flex items-center justify-center gap-2"
				>
					<MdEmail className="text-2xl" />
					<span>Email</span>
				</a>
				<a
					href="https://drive.google.com/file/d/1example"
					target="_blank"
					rel="noopener noreferrer"
					className="flex-1 px-6 py-5 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors text-base font-medium flex items-center justify-center gap-2"
				>
					<HiDocumentText className="text-2xl" />
					<span>Resume</span>
				</a>
			</div>

			{/* Small Social Icons */}
			<div className="flex gap-2 h-full">
				{socialIcons.map((social) => {
					const Icon = social.icon;
					return (
						<a
							key={social.label}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							className="w-10 h-10 flex items-center justify-center hover:bg-zinc-800 rounded-lg transition-colors"
							aria-label={social.label}
						>
							<Icon className="text-lg" />
						</a>
					);
				})}
			</div>
		</div>
	);
}
