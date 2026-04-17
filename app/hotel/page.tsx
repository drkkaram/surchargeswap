import type { Metadata } from "next";
import { Suspense } from "react";
import { CalculatorWithParams } from "@/components/CalculatorWithParams";

export const metadata: Metadata = {
  title: "Surcharge Ban Calculator for Hotels & Accommodation — SurchargeSwap",
  description: "The October 2026 RBA surcharge ban affects hotels, motels, B&Bs, and short-stay accommodation. Calculate your monthly revenue impact and compare processors.",
  alternates: { canonical: "https://surchargeswap.com.au/hotel" },
  openGraph: {
    title: "Surcharge Ban Calculator for Hotels & Accommodation — SurchargeSwap",
    description: "Calculate the October 2026 RBA surcharge ban impact on your hotel or accommodation business. Find cheaper MSF rates.",
    url: "https://surchargeswap.com.au/hotel",
    siteName: "SurchargeSwap",
    type: "website",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SurchargeSwap — RBA Surcharge Ban Calculator' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surcharge Ban Calculator for Hotels & Accommodation — SurchargeSwap",
    description: "Calculate the October 2026 RBA surcharge ban impact on your hotel or accommodation business.",
    images: ['/opengraph-image'],
  },
};

export default function HotelPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#0B1C3D] sm:text-4xl">
          RBA Surcharge Ban Calculator for Hotels &amp; Accommodation
        </h1>
        <p className="mt-4 text-lg text-[#525252]">
          From 1 October 2026, hotels, motels, serviced apartments, and short-stay accommodation businesses can no longer surcharge Visa, Mastercard, or eftpos. With high average transaction values and significant corporate card volumes, accommodation businesses face some of the largest absolute impacts of any sector.
        </p>
        <p className="mt-3 text-base text-[#525252]">
          Enter your monthly card revenue to calculate your exact exposure. Hotels with strong corporate traveller volumes should also note that Amex surcharging remains legal after the ban.
        </p>
        <div className="mt-4 rounded-md border border-[#F59E0B]/30 bg-[#F59E0B]/5 p-4 text-sm text-[#92400E]">
          <strong>Important for accommodation businesses:</strong> Corporate guests and travel bookers often pay with Amex. Amex is exempt from the October 2026 ban — you can continue surcharging Amex. Ensure your property management system (PMS) or payment terminal supports per-network surcharging.
        </div>
      </div>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-[#F5F5F5]" />}>
        <CalculatorWithParams />
      </Suspense>
    </main>
  );
}
