"use client";

import { BentoItem } from "@/components/BentoItem";
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
import { ActionCard } from "@/components/ActionCard";

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
			Collaboration: "collaboration",
			Mentorship: "mentorship",
		},
		other: {
			"General Meeting": "general-meeting",
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
					<Dialog>
						<DialogTrigger asChild>
							<div className="bg-[#e5e5e5] h-full w-full text-2xl sm:text-3xl lg:text-4xl font-medium text-black font-mono flex items-end justify-start p-4 relative hover:bg-[#dddddd] transition-colors group cursor-pointer">
								<svg
									className="absolute top-4 right-4 group-hover:top-3 group-hover:right-3 w-8 h-8 sm:w-10 sm:h-10 text-black opacity-50 transition-all"
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
								CONTACT
							</div>
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
										You are a...
									</label>
									<Select value={userType} onValueChange={setUserType}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select your role..." />
										</SelectTrigger>
										<SelectContent position="popper" sideOffset={4}>
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
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select inquiry type..." />
										</SelectTrigger>
										<SelectContent position="popper" sideOffset={4}>
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
				</BentoItem>
				<BentoItem colSpan={6} rowSpan={3}>
					<Dialog>
						<DialogTrigger asChild>
							<ActionCard href="/projects" label="PROJECTS" />
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
										You are a...
									</label>
									<Select value={userType} onValueChange={setUserType}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select your role..." />
										</SelectTrigger>
										<SelectContent position="popper" sideOffset={4}>
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
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select inquiry type..." />
										</SelectTrigger>
										<SelectContent position="popper" sideOffset={4}>
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
