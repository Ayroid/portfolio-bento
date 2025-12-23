import { BentoItem } from "@/app/components/BentoItem";
import Navbar from "@/app/sections/Navbar";
import HeroSection from "@/app/sections/HeroSection";
import ProjectSection from "@/app/sections/ProjectSection";
import BlogSection from "@/app/sections/BlogSection";
import StatsSection from "@/app/sections/StatsSection";
import OpenToWorkSection from "./sections/OpenToWorkSection";
import CopySection from "@/app/sections/CopySection";
import ContactSection from "@/app/sections/ContactSection";
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

					{/* Row 5: Stats*/}
					<StatsSection />

					{/* Row 5: ToolBox - Blogs, GitHub Activity, Setup */}
					<CopySection />

					{/* Row 6: CTA Banner */}
					<OpenToWorkSection />

					{/* Row 7: Contact Info + Social Links */}
					<ContactSection />

					{/* Row 8: Footer */}
					<Footer />
				</div>
			</div>
		</div>
	);
}
