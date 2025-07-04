import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/shared/components/Navbar";
import { Providers } from "@/shared/lib/providers/Providers";
import { Footer } from "@/features/layout/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pear Protocol - Agent-Pear",
  description:
    "Real-time trading signals and analysis for cryptocurrency pairs",
  metadataBase: new URL("https://agent-pear.vercel.app"),
  openGraph: {
    type: "website",
    title: "Pear Protocol - Agent-Pear",
    description:
      "Real-time trading signals and analysis for cryptocurrency pairs",
    siteName: "Agent Pear",
    url: "https://agent-pear.vercel.app",
    images: [
      {
        url: "https://i.ibb.co/ZRRdTJTg/Screenshot-2025-07-04-at-01-58-14.png",
        width: 1200,
        height: 630,
        alt: "Agent Pear - Trading Signals Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pear Protocol - Agent-Pear",
    description:
      "Real-time trading signals and analysis for cryptocurrency pairs",
    images: ["https://i.ibb.co/ZRRdTJTg/Screenshot-2025-07-04-at-01-58-14.png"],
    creator: "@pearprotocol",
  },
  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
    "theme-color": "#080807",
    "msapplication-TileColor": "#080807",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-[#080807] text-white`}
      >
        <Providers>
          <Navbar />
          <div className="mx-auto max-w-[1440px] justify-center flex">
            <main>{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
