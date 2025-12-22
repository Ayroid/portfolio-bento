"use client";

import { useState } from "react";

interface BentoItemProps {
	children?: React.ReactNode;
	className?: string;
	colSpan?: number;
	rowSpan?: number;
	height?: number;
	redirectTo?: string;
}

export const BentoItem = ({
	children,
	className = "",
	colSpan = 1,
	rowSpan = 1,
	height = 80,
	redirectTo,
}: BentoItemProps) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMousePosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	};

	return (
		<div
			className={`bg-transparent rounded-[10px] relative cursor-pointer ${className}`}
			style={{
				gridColumn: `span ${colSpan}`,
				gridRow: `span ${rowSpan}`,
				["--mouse-x" as string]: `${mousePosition.x}px`,
				["--mouse-y" as string]: `${mousePosition.y}px`,
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Hover glow effect */}
			<a href={redirectTo} target="_blank" rel="noopener noreferrer">
				<div
					className="pointer-events-none absolute inset-0 rounded-[10px] opacity-0 transition-opacity duration-500"
					style={{
						background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
						opacity: isHovered ? 1 : 0,
						zIndex: 3,
					}}
				/>

				{/* Border glow effect */}
				<div
					className="pointer-events-none absolute inset-0 rounded-[10px] opacity-0 transition-opacity duration-500"
					style={{
						background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3), transparent 40%)`,
						opacity: isHovered ? 1 : 0,
						zIndex: 1,
					}}
				/>

				{/* Content container */}
				<div
					className={`min-h-${height} bg-[#090909] rounded-[10px] h-full w-full relative overflow-hidden`}
					style={{ zIndex: 2 }}
				>
					<div className="relative z-10 h-full">{children}</div>
				</div>
			</a>
		</div>
	);
};
