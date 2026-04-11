import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SurchargeSwap — Free Surcharge Ban Impact Calculator for Australian Businesses",
    template: "%s | SurchargeSwap",
  },
  description:
    "Calculate how much the RBA surcharge ban will cost your business. Compare payment processors and find the cheapest rate. Free tool for 436,000 affected AU businesses.",
  metadataBase: new URL("https://surchargeswap.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "SurchargeSwap",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#FAFAFA]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
