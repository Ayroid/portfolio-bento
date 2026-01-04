import {
  HeroSection,
  ProjectSection,
  BlogSection,
  StatsSection,
  LifeSection,
} from "@/components/sections";

import { FadeUpReveal } from "@/components/shared";

export default function Home() {
  return (
    <FadeUpReveal>
      <HeroSection />
      <ProjectSection />
      <StatsSection />
      <LifeSection />
      <BlogSection />
    </FadeUpReveal>
  );
}
