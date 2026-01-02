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

	const content = (
		<>
			{/* Hover glow effect */}
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
				style={{
					background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
					opacity: isHovered ? 1 : 0,
					zIndex: 3,
				}}
			/>

			{/* Border glow effect */}
			<div
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
				style={{
					background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3), transparent 40%)`,
					opacity: isHovered ? 1 : 0,
					zIndex: 1,
				}}
			/>

			{/* Content container */}
			<div
				className="bg-[#18181b] h-full w-full relative overflow-hidden border"
				style={{
					zIndex: 2,
					minHeight: `${height}px`
				}}
			>
				<div className="relative z-10 h-full">{children}</div>
			</div>
		</>
	);

	return (
		<div
			className={`bg-transparent relative cursor-pointer ${className}`}
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
			{redirectTo ? (
				<a href={redirectTo} target="_blank" rel="noopener noreferrer">
					{content}
				</a>
			) : (
				content
			)}
		</div>
	);
};
