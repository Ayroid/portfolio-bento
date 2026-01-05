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
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export const ActionCard = ({
  href,
  label,
  bgColor,
  hoverBgColor,
  textColor,
  iconColor,
  asDiv = false,
  target = "_self",
}: ActionCardProps) => {
  const className = `${bgColor} min-h-32 lg:min-h-max h-full w-full text-2xl sm:text-3xl lg:text-4xl font-medium ${textColor} font-mono flex items-end justify-start p-4 relative ${hoverBgColor} transition-colors group`;

  const content = (
    <>
      <TopRightArrow iconColor={iconColor || "text-white"} />
      {label}
    </>
  );

  if (asDiv || !href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={href} className={className} target={target}>
      {content}
    </Link>
  );
};
