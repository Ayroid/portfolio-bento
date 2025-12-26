import Navbar from "@/app/sections/Navbar";
import HeroSection from "@/app/sections/HeroSection";
import ProjectSection from "@/app/sections/ProjectSection";
import BlogSection from "@/app/sections/BlogSection";
import StatsSection from "@/app/sections/StatsSection";
import Footer from "@/app/sections/Footer";
// import TemplateSection from "@/app/sections/TemplateSection";

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

					{/* Row 4: Stats*/}
					<StatsSection />

					{/* Row 5: Blogs */}
					<BlogSection />

					{/* Row 6: Template Section */}
					{/* <TemplateSection /> */}

					{/* Row 7: Footer with Open to Work & Social Links */}
					<Footer />
				</div>
			</div>
		</div>
	);
}
