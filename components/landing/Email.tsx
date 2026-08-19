import { ActionCard } from "@/components/shared";
import { siteConfig } from "@/config";

const Email = () => {
  return (
    <ActionCard
      href={`mailto:${siteConfig.email}`}
      label="EMAIL"
      bgColor="bg-surface-raised"
      hoverBgColor="hover:bg-surface-raised-hover"
      textColor="text-white"
      iconColor="text-white"
    />
  );
};

export default Email;
