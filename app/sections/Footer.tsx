"use client";

import { BentoItem } from "@/app/components/BentoItem";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

/**
 * LATTICE STRUCTURE (30 columns × 5 rows)
 * Base row height: 50px
 */

const Footer = () => {
	const [userType, setUserType] = useState("");
	const [inquiryType, setInquiryType] = useState("");

	const meetingTypes = {
		recruiter: {
			"Job Opportunity": "job-opportunity",
			"Contract Work": "contract-work",
			"Freelance Project": "freelance-project",
		},
		founder: {
			"Technical Consultation": "technical-consultation",
			"Partnership Discussion": "partnership-discussion",
			"Product Development": "product-development",
		},
		developer: {
			"Collaboration": "collaboration",
			"Open Source": "open-source",
			"Mentorship": "mentorship",
		},
		other: {
			"General Meeting": "general-meeting",
			"Quick Chat": "quick-chat",
		},
	};

	const getCalLink = () => {
		if (!userType || !inquiryType) return null;
		const meetingPurpose =
			meetingTypes[userType as keyof typeof meetingTypes]?.[
				inquiryType as keyof (typeof meetingTypes)[keyof typeof meetingTypes]
			];
		return meetingPurpose ? `https://cal.com/ayroid/${meetingPurpose}` : null;
	};
	const socialLinks = [
		{
			name: "Twitter",
			handle: "@ayroids",
			url: "https://twitter.com/ayroids",
			icon: "𝕏",
		},
		{
			name: "GitHub",
			handle: "@ayroid",
			url: "https://github.com/ayroid",
			icon: "⚡",
		},
		{
			name: "LinkedIn",
			handle: "ayushsk",
			url: "https://linkedin.com/in/ayroid",
			icon: "in",
		},
		{
			name: "Email",
			handle: "ayushsk.work",
			url: "mailto:ayushsk.work@gmail.com",
			icon: "✉",
		},
	];

	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)] gap-2"
			style={{
				gridAutoRows: "50px", // Base row height
			}}
		>
			{/* Open to Work Section - 22 cols × 3 rows */}
			<BentoItem
				colSpan={22}
				rowSpan={3}
				className="md:col-span-1 lg:col-span-22 lg:row-span-3"
			>
				<div className="p-4 sm:p-6 h-full flex flex-col sm:flex-row items-center justify-between gap-2">
					<h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl">
						Let&apos;s Work Together{" "}
						<span className="text-zinc-500 font-normal text-sm sm:text-base">
							• Open to new opportunities and collaborations
						</span>
					</h3>
					<Dialog>
						<DialogTrigger asChild>
							<button className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-black rounded-lg text-sm sm:text-base font-semibold hover:bg-zinc-200 transition-colors whitespace-nowrap">
								Get in Touch
							</button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-md">
							<DialogHeader>
								<DialogTitle>Schedule a Meeting</DialogTitle>
								<DialogDescription>
									Please select your role and inquiry type to get the right
									meeting link.
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-6 py-4">
								<div className="space-y-2">
									<label className="text-sm font-medium text-white">
										I am a...
									</label>
									<Select value={userType} onValueChange={setUserType}>
										<SelectTrigger>
											<SelectValue placeholder="Select your role..." />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="recruiter">Recruiter</SelectItem>
											<SelectItem value="founder">
												Founder / Entrepreneur
											</SelectItem>
											<SelectItem value="developer">Developer</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium text-white">
										What&apos;s your inquiry about?
									</label>
									<Select
										value={inquiryType}
										onValueChange={setInquiryType}
										disabled={!userType}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select inquiry type..." />
										</SelectTrigger>
										<SelectContent>
											{userType &&
												Object.keys(
													meetingTypes[userType as keyof typeof meetingTypes]
												).map((type) => (
													<SelectItem key={type} value={type}>
														{type}
													</SelectItem>
												))}
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="flex gap-3">
								<Button
									className="flex-1"
									disabled={!getCalLink()}
									onClick={() => {
										const link = getCalLink();
										if (link) window.open(link, "_blank");
									}}
								>
									Continue to Booking
								</Button>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</BentoItem>

			{/* Social Media Icons - Each 2 cols × 3 rows */}
			{socialLinks.map((social) => (
				<BentoItem
					key={social.name}
					colSpan={2}
					rowSpan={3}
					className="md:col-span-1 lg:col-span-2 lg:row-span-3"
					redirectTo={social.url}
				>
					<div className="h-full flex items-center justify-center group cursor-pointer">
						<div className="text-center transition-transform group-hover:scale-110">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-900 rounded-full mx-auto mb-1 flex items-center justify-center border border-zinc-800 group-hover:border-zinc-600 transition-colors">
								<span className="text-zinc-500 group-hover:text-zinc-300 text-sm sm:text-base font-bold">
									{social.icon}
								</span>
							</div>
							<p className="text-zinc-600 text-[10px] hidden sm:block">
								{social.name}
							</p>
						</div>
					</div>
				</BentoItem>
			))}

			{/* Footer Credits - 30 cols × 2 rows */}
			<BentoItem
				colSpan={30}
				rowSpan={2}
				className="md:col-span-2 lg:col-span-30 lg:row-span-2"
			>
				<div className="p-4 sm:p-6 flex items-center justify-center">
					<p className="text-zinc-600 text-xs sm:text-sm text-center">
						Designed & Developed by{" "}
						<span className="text-zinc-400 font-bold">
							Ayush Singh Kushwah
						</span>
						<br />© 2025 All rights reserved.
					</p>

				</div>
			</BentoItem>
		</div>
	);
};

export default Footer;
