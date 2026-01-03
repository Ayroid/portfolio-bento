import HeroSection from "@/sections/HeroSection";
import ProjectSection from "@/sections/ProjectSection";
import BlogSection from "@/sections/BlogSection";
import StatsSection from "@/sections/StatsSection";
import LifeSection from "@/sections/LifeSection";
// import TemplateSection from "@/app/sections/TemplateSection";

export default function Home() {
	return (
		<>
			{/* Rows 1-2: Unified Grid with spanning */}
			<HeroSection />

			{/* Row 3: Featured Work - Projects & Experience */}
			<ProjectSection />

			{/* Row 4: Stats*/}
			<StatsSection />

			{/* Row 5: Life & Personal */}
			<LifeSection />

			{/* Row 6: Blogs */}
			<BlogSection />

			{/* Row 7: Template Section */}
			{/* <TemplateSection /> */}
		</>
	);
}
