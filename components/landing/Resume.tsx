import ActionCard from "@/components/shared/ActionCard";
import { siteConfig } from "@/config";

const Resume = () => {
  return (
    <ActionCard
      href={siteConfig.resumeUrl}
      label="RESUME"
      bgColor="bg-accent"
      hoverBgColor="hover:bg-accent-hover"
      textColor="text-accent-foreground"
      iconColor="text-accent-foreground"
    />
  );
};

export default Resume;
