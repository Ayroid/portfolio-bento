"use client";

// import {
// 	FaXTwitter,
// 	FaGithub,
// 	FaLinkedin,
// 	FaPaperPlane,
// } from "react-icons/fa6";
// import { MdEmail } from "react-icons/md";
// import { HiDocumentText } from "react-icons/hi2";

export function HeroSection() {
	return (
		<div className="p-6 sm:p-8 h-full flex flex-col">
			<div className="flex-1 flex flex-col justify-end space-y-6">
				<div className="flex items-start gap-4">
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-mono">
						AYUSH
						<br />
						SINGH
						<br />
						KUSHWAH
					</h1>
				</div>

				{/* <div className="flex flex-wrap gap-3">
					<a
						href="https://drive.google.com/file/d/1example"
						target="_blank"
						rel="noopener noreferrer"
						className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors text-sm font-medium flex items-center gap-2"
					>
						<HiDocumentText className="text-lg" />
						<span>Resume</span>
					</a>
					<a
						href="https://linkedin.com/in/ramxcodes"
						target="_blank"
						rel="noopener noreferrer"
						className="px-4 py-2 bg-white text-black rounded-lg
            hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-2"
					>
						<FaPaperPlane className="text-lg" />
						<span>Get in touch</span>
					</a>
				</div>

				<div className="flex flex-wrap">
					{[
						{
							icon: MdEmail,
							url: "mailto:ayushsk.work@gmail.com",
							label: "Email",
						},
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
					].map((social) => {
						const Icon = social.icon;
						return (
							<a
								key={social.label}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 flex items-center justify-center hover:text-gray-400"
								aria-label={social.label}
							>
								<Icon className="text-lg " />
							</a>
						);
					})}
				</div> */}
			</div>
		</div>
	);
}
