import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { SmoothScroll, PageContainer } from "@/components/shared";

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
  title: "Ayroid",
  description: "Ayroid's part on the web",
  openGraph: {
    title: "Ayush Singh Kushwah",
    description: "Portfolio, projects, and writings by Ayush Singh Kushwah.",
    url: "https://ayroid.in",
    siteName: "Ayroid",
    images: [
      {
        url: "https://ayroid.in/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Singh Kushwah",
    description: "Portfolio, projects, and writings by Ayush Singh Kushwah.",
    images: ["https://ayroid.in/og-image.png"],
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
        <SmoothScroll>
          <div className="min-h-screen w-full bg-[#18181b] py-4 lg:py-12">
            <PageContainer navbar={<Navbar />} footer={<Footer />}>
              {children}
            </PageContainer>
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
