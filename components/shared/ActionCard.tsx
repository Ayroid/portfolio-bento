import Link from "next/link";
import TopRightArrow from "@/components/icons/TopRightArrow";

interface ActionCardProps {
  href?: string;
  label: string;
  bgColor?: string;
  hoverBgColor?: string;
  textColor?: string;
  iconColor?: string;
  asDiv?: boolean;
}

export const ActionCard = ({
  href,
  label,
  bgColor,
  hoverBgColor,
  textColor,
  iconColor,
  asDiv = false,
}: ActionCardProps) => {
  const className = `${bgColor} h-full w-full text-2xl sm:text-3xl lg:text-4xl font-medium ${textColor} font-mono flex items-end justify-start p-4 relative ${hoverBgColor} transition-colors group`;

  const content = (
    <>
      {/* Arrow pointing to top-right corner */}
      <TopRightArrow iconColor={iconColor || "text-white"} />
      {label}
    </>
  );

  if (asDiv || !href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
};
