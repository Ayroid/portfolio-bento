import { ActionCard } from "@/components/shared";
import { siteConfig } from "@/config";

const Email = () => {
  return (
    <ActionCard
      href={`mailto:${siteConfig.email}`}
      label="EMAIL"
      bgColor="bg-[#1a1a1a]"
      hoverBgColor="hover:bg-[#222222]"
      textColor="text-white"
      iconColor="text-white"
    />
  );
};

export default Email;
