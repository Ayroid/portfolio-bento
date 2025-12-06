"use client";
import Image from "next/image";

export function Profile() {
	return (
		<div className="relative h-full w-full">
			<Image
				src="/profile-crop.jpeg"
				alt="Profile Picture"
				fill
				className="object-cover"
			/>
		</div>
	);
}
