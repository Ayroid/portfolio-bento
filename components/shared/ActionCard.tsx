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
  // Light tiles need a dark sheen to be visible, and vice versa.
  const isLightTile = /bg-white|bg-accent(?!-)/.test(bgColor ?? "");

  const className = [
    bgColor,
    "sheen",
    isLightTile ? "sheen-dark" : "",
    "min-h-32 lg:min-h-max h-full w-full text-2xl sm:text-3xl lg:text-4xl font-medium",
    textColor,
    "font-mono flex items-end justify-start p-4 relative group",
    hoverBgColor,
    "transition-colors duration-300",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <TopRightArrow iconColor={iconColor || "text-white"} />
      <span className="relative z-[2] inline-block transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
        {label}
      </span>
      {/* Hairline that draws itself under the label on hover */}
      <span
        aria-hidden="true"
        className="absolute bottom-3 left-4 z-[2] h-px w-0 bg-current opacity-40 transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover:w-[calc(100%-2rem)]"
      />
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
