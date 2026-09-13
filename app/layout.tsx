import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { PageContainer } from "@/components/shared";

// Both are variable fonts, so every weight comes from a single file.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayroid.in"),
  title:
    "Ayroid - Software Engineer | Building Scalable Systems & Clean Interfaces",
  description:
    "Software Engineer focused on building scalable systems, clean interfaces, and products that matter.",
  keywords: [
    "software engineer",
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
      "Ayroid - Software Engineer | Building Scalable Systems & Clean Interfaces",
    description:
      "Software Engineer focused on building scalable systems, clean interfaces, and products that matter.",
    url: "https://ayroid.in",
    siteName: "Ayroid",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "Ayroid - Software Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Ayroid - Software Engineer | Building Scalable Systems & Clean Interfaces",
    description:
      "Software Engineer focused on building scalable systems, clean interfaces, and products that matter.",
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
    <html lang="en">
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
        <div className="bg-surface-page min-h-screen w-full">
          <PageContainer navbar={<Navbar />} footer={<Footer />}>
            {children}
          </PageContainer>
        </div>
      </body>
    </html>
  );
}
