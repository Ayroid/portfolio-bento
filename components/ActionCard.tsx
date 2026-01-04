import Link from "next/link";

interface ActionCardProps {
  href?: string;
  label: string;
  bgColor?: string;
  hoverBgColor?: string;
  textColor?: string;
  iconColor?: string;
  asDiv?: boolean;
}

export function ActionCard({
  href,
  label,
  bgColor,
  hoverBgColor,
  textColor,
  iconColor,
  asDiv = false,
}: ActionCardProps) {
  const className = `${bgColor} h-full w-full text-2xl sm:text-3xl lg:text-4xl font-medium ${textColor} font-mono flex items-end justify-start p-4 relative ${hoverBgColor} transition-colors group`;

  const content = (
    <>
      {/* Arrow pointing to top-right corner */}
      <svg
        className={`absolute top-4 right-4 h-8 w-8 group-hover:top-3 group-hover:right-3 sm:h-10 sm:w-10 ${iconColor} opacity-50 transition-all`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M7 17L17 7M17 7H7M17 7V17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
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
}
