interface ActionButtonProps {
	href: string;
	label: string;
	bgColor?: string;
	hoverBgColor?: string;
	textColor?: string;
	iconColor?: string;
}

export function ActionButton({
	href,
	label,
	bgColor = "bg-[#1a1a1a]",
	hoverBgColor = "hover:bg-[#222222]",
	textColor = "text-white",
	iconColor = "text-white",
}: ActionButtonProps) {
	return (
		<a
			href={href}
			className={`${bgColor} h-full w-full text-2xl sm:text-3xl lg:text-4xl font-medium ${textColor} font-mono flex items-end justify-start p-4 relative ${hoverBgColor} transition-colors`}
		>
			{/* Arrow pointing to top-right corner */}
			<svg
				className={`absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 ${iconColor} opacity-50`}
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
		</a>
	);
}
