import { BentoItem } from "@/app/components/BentoItem";
import Navbar from "@/app/sections/Navbar";
import HeroSection from "@/app/sections/HeroSection";
import ProjectSection from "@/app/sections/ProjectSection";
import BlogSection from "@/app/sections/BlogSection";
import CopySection from "@/app/sections/CopySection";
import Footer from "@/app/sections/Footer";

export default function Home() {
	return (
		<div className="min-h-screen w-full bg-black py-8">
			<div className="w-full max-w-[1520px] mx-auto p-2 sm:p-4">
				<div className="flex flex-col gap-2 ">
					{/* Full Width Header - Navigation */}

					<Navbar />

					{/* Rows 1-2: Unified Grid with spanning */}
					<HeroSection />

					{/* Row 3: Featured Work - Projects & Experience */}
					<ProjectSection />

					{/* Row 4: Blogs */}
          <BlogSection />


					{/* Row 5: ToolBox - Blogs, GitHub Activity, Setup */}
          <CopySection />

					{/* Row 6: CTA Banner */}
					<BentoItem>
						<div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col sm:flex-row items-center justify-between gap-2">
							<div>
								<h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">
									Let&apos;s Work Together
								</h3>
								<p className="text-zinc-500 text-sm sm:text-base">
									Open to new opportunities and collaborations
								</p>
							</div>
							<a
								href="mailto:ramxcodes@gmail.com"
								className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-black rounded-lg text-sm sm:text-base font-semibold hover:bg-zinc-200 transition-colors whitespace-nowrap"
							>
								Get in Touch
							</a>
						</div>
					</BentoItem>

					{/* Row 7: Contact Info + Social Links */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
						{/* Contact Info */}
						<BentoItem className="h-auto min-h-[280px] sm:h-[400px] lg:h-[547px]">
							<div className="p-4 sm:p-6 h-full flex flex-col">
								<h3 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6">
									Contact
								</h3>
								<div className="space-y-3 sm:space-y-4 flex-1">
									<div>
										<p className="text-zinc-500 text-xs mb-1">Email</p>
										<a
											href="mailto:ramxcodes@gmail.com"
											className="text-white text-sm sm:text-base hover:text-zinc-300 transition-colors break-all"
										>
											ramxcodes@gmail.com
										</a>
									</div>
									<div>
										<p className="text-zinc-500 text-xs mb-1">GitHub</p>
										<a
											href="https://github.com/ramxcodes"
											target="_blank"
											rel="noopener noreferrer"
											className="text-white text-sm sm:text-base hover:text-zinc-300 transition-colors"
										>
											github.com/ramxcodes
										</a>
									</div>
									<div>
										<p className="text-zinc-500 text-xs mb-1">LinkedIn</p>
										<a
											href="https://linkedin.com/in/ramxcodes"
											target="_blank"
											rel="noopener noreferrer"
											className="text-white text-sm sm:text-base hover:text-zinc-300 transition-colors"
										>
											linkedin.com/in/ramxcodes
										</a>
									</div>
								</div>
							</div>
						</BentoItem>

						{/* Social Links Grid */}
						<BentoItem className="h-auto min-h-[200px] md:col-span-2">
							<div className="p-4 sm:p-6">
								<h3 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6">
									Connect
								</h3>
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 ">
									{[
										{
											name: "Twitter",
											handle: "@ramxcodes",
											url: "https://twitter.com/ramxcodes",
										},
										{
											name: "YouTube",
											handle: "@ramxcodes",
											url: "https://youtube.com/@ramxcodes",
										},
										{
											name: "Instagram",
											handle: "@ramxcodes",
											url: "https://instagram.com/ramxcodes",
										},
										{
											name: "Medium",
											handle: "ramxcodes",
											url: "https://medium.com/@ramxcodes",
										},
									].map((social) => (
										<a
											key={social.name}
											href={social.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-center hover:scale-105 transition-transform"
										>
											<div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-900 rounded-full mx-auto mb-2 flex items-center justify-center border border-zinc-800 hover:border-zinc-700">
												<span className="text-zinc-600 text-xs font-bold">
													{social.name[0]}
												</span>
											</div>
											<p className="text-zinc-500 text-xs">{social.name}</p>
											<p className="text-zinc-700 text-xs">{social.handle}</p>
										</a>
									))}
								</div>
							</div>
						</BentoItem>
					</div>

					{/* Row 8: Footer */}
					<Footer />
				</div>
			</div>
		</div>
	);
}
