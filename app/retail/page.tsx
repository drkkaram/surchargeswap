import type { Metadata } from "next";
import { Suspense } from "react";
import { CalculatorWithParams } from "@/components/CalculatorWithParams";

export const metadata: Metadata = {
  title: "Surcharge Ban Calculator for Retail Businesses — SurchargeSwap",
  description: "Retail businesses: calculate the true cost of the October 2026 RBA surcharge ban and find the cheapest payment processor for your card volume.",
  alternates: { canonical: "https://surchargeswap.com.au/retail" },
  openGraph: {
    title: "Surcharge Ban Calculator for Retail — SurchargeSwap",
    description: "Calculate the October 2026 RBA surcharge ban impact on your retail business. Find the cheapest payment processor.",
    url: "https://surchargeswap.com.au/retail",
    siteName: "SurchargeSwap",
    type: "website",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SurchargeSwap — RBA Surcharge Ban Calculator' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surcharge Ban Calculator for Retail — SurchargeSwap",
    description: "Calculate the October 2026 RBA surcharge ban impact on your retail business.",
    images: ['/opengraph-image'],
  },
};

export default function RetailPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl">
          RBA Surcharge Ban Calculator for Retail
        </h1>
        <p className="mt-4 text-lg text-[#525252]">
          Australian retail businesses absorbing card surcharges from 1 October 2026 need to act before the deadline. Calculate your monthly impact and see which processor saves you the most.
        </p>
        <p className="mt-3 text-base text-[#525252]">
          Retail businesses typically have a higher eftpos mix than hospitality — adjust the card mix below to match your actual split for a precise estimate.
        </p>
        <div className="mt-4 rounded-sm border border-[#22C55E]/30 bg-[#22C55E]/5 p-4 text-sm text-[#166534]">
          <strong>Retail tip:</strong> If you do significant online sales, compare Stripe (1.5% flat, no lock-in) against Zeller for the full picture.
        </div>
      </div>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-[#F5F5F5]" />}>
        <CalculatorWithParams />
      </Suspense>
    </main>
  );
}
