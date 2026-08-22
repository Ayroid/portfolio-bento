import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { PageContainer, ScrollProgress } from "@/components/shared";

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
  metadataBase: new URL("https://ayroid.in"),
  title:
    "Ayroid - Full-Stack Engineer | Building Scalable Systems & Clean Interfaces",
  description:
    "Full-stack engineer focused on building scalable systems, clean interfaces, and products that matter.",
  keywords: [
    "full-stack engineer",
    "software developer",
    "web development",
    "scalable systems",
    "clean interfaces",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "portfolio",
    "Ayroid",
  ],
  authors: [{ name: "Ayroid" }],
  openGraph: {
    title:
      "Ayroid - Full-Stack Engineer | Building Scalable Systems & Clean Interfaces",
    description:
      "Full-stack engineer focused on building scalable systems, clean interfaces, and products that matter.",
    url: "https://ayroid.in",
    siteName: "Ayroid",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Ayroid - Full-Stack Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Ayroid - Full-Stack Engineer | Building Scalable Systems & Clean Interfaces",
    description:
      "Full-stack engineer focused on building scalable systems, clean interfaces, and products that matter.",
    images: ["/og_image.png"],
    creator: "@ayroids",
  },
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
        <ScrollProgress />
        <div className="grain relative min-h-screen w-full bg-surface-page py-4 lg:py-12">
          <PageContainer navbar={<Navbar />} footer={<Footer />}>
            {children}
          </PageContainer>
        </div>
      </body>
    </html>
  );
}
