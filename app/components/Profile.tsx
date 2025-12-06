"use client";
import Image from "next/image";

export function Profile() {
	return (
		<div className="h-full flex flex-col">
			<Image
				src="/profile.jpeg"
				alt="Profile Picture"
				width={300}
				height={200}
				className="mx-auto"
			/>
		</div>
	);
}
