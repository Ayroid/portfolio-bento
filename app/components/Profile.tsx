"use client";
import Image from "next/image";
import { useState } from "react";

export function Profile() {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<div
			className="relative h-full w-full cursor-pointer"
			style={{ perspective: "1000px" }}
			onClick={handleFlip}
		>
			<div
				className="relative h-full w-full transition-transform duration-700 ease-in-out"
				style={{
					transformStyle: "preserve-3d",
					transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
				}}
			>
				{/* Front Side */}
				<div
					className="absolute inset-0"
					style={{
						backfaceVisibility: "hidden",
						WebkitBackfaceVisibility: "hidden",
					}}
				>
					<Image
						src="/profile-crop.jpeg"
						alt="Profile Picture"
						fill
						className="object-cover"
					/>
				</div>

				{/* Back Side */}
				<div
					className="absolute inset-0"
					style={{
						backfaceVisibility: "hidden",
						WebkitBackfaceVisibility: "hidden",
						transform: "rotateY(180deg)",
					}}
				>
					<Image
						src="/original-profile.jpg"
						alt="Original Profile Picture"
						fill
						className="object-cover"
					/>
				</div>
			</div>
		</div>
	);
}
