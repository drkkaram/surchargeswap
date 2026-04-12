import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostHogProvider } from "@/components/PostHogProvider";

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
    "Free calculator: how much will the RBA surcharge ban cost your business? Oct 2026.",
  metadataBase: new URL("https://surchargeswap.com.au"),
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "SurchargeSwap",
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
      <head>
        {gaId && <link rel="preconnect" href="https://www.googletagmanager.com" />}
        {gaId && <link rel="preconnect" href="https://www.google-analytics.com" />}
      </head>
      <body className="flex min-h-full flex-col bg-[#FAFAFA]">
        <PostHogProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </PostHogProvider>
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
