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
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(30,2fr)] gap-2"
				style={{
					gridAutoRows: "50px", // Base row height
				}}
			>
				{/* Open to Work Section - 22 cols × 3 rows */}
				<div className="col-span-4"></div>
				<BentoItem colSpan={30} rowSpan={4}>
					<div className="h-full flex flex-col justify-between p-6 sm:p-8 items-center">
						<div className="space-y-2 flex flex-col items-center text-center">
							<h3 className="text-2xl sm:text-3xl font-semibold text-white">
								Let’s build something real
							</h3>
							<p className="text-zinc-500 text-sm sm:text-base max-w-xl">
								Open to full-time roles, contracts, and serious collaborations.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-3 mt-6">
							<Dialog>
								<DialogTrigger asChild>
									<button className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition">
										Schedule a Call
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
															meetingTypes[
																userType as keyof typeof meetingTypes
															]
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

							<a
								href="/projects"
								className="px-6 py-3 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition text-center"
							>
								View My Work
							</a>
						</div>

						<div className="mt-6 text-xs text-zinc-600">
							Recruiters • Founders • Developers
						</div>
					</div>
				</BentoItem>

				<div className="col-span-4"></div>
			</div>

			{/* Footer Credits - Plain centered text */}
			<div className="mt-8 flex items-center justify-center">
				<p className="text-zinc-600 text-xs sm:text-sm text-center">
					Designed & Developed by{" "}
					<span className="text-zinc-400 font-bold">Ayush Singh Kushwah</span>
					<br />© 2025 All rights reserved.
				</p>
			</div>
		</>
	);
};

export default Footer;
