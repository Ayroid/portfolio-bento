import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { PageContainer } from "@/components/PageContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="bdeef7dc-e63f-44ca-ad1e-8056f9efdcf5"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <div className="min-h-screen w-full bg-[#18181b] py-8">
            <PageContainer navbar={<Navbar />} footer={<Footer />}>
              {children}
            </PageContainer>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
