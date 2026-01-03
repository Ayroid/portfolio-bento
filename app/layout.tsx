import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Portfolio - Bento Grid",
	description: "A modern portfolio with bento grid layout",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body className={`${geistMono.variable} antialiased`}>
        <SmoothScroll>
				<div className="min-h-screen w-full bg-[#18181b] py-8">
					<div className="w-full max-w-[1520px] mx-auto p-2 sm:p-4">
						<div className="flex flex-col gap-8">
							<Navbar />
							{children}
							<Footer />
						</div>
					</div>
				</div>
        </SmoothScroll>
			</body>
		</html>
	);
}
