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
