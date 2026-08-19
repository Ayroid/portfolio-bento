import {
  HeroSection,
  ProjectSection,
  BlogSection,
  StatsSection,
  LifeSection,
} from "@/components/sections";

import { Reveal } from "@/components/shared";

const sections = [
  HeroSection,
  ProjectSection,
  StatsSection,
  LifeSection,
  BlogSection,
];

export default function Home() {
  // Each section reveals on its own as the reader reaches it, rather than the
  // whole page fading in as one block.
  return (
    <>
      {sections.map((Section, i) => (
        <Reveal key={i}>
          <Section />
        </Reveal>
      ))}
    </>
  );
}
