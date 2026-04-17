import type { Metadata } from "next";
import { Suspense } from "react";
import { CalculatorWithParams } from "@/components/CalculatorWithParams";

export const metadata: Metadata = {
  title: "Surcharge Ban Calculator for Tradies & Tradespeople — SurchargeSwap",
  description: "The October 2026 RBA surcharge ban affects plumbers, electricians, builders and all tradespeople. Calculate your monthly impact and compare payment processors.",
  alternates: { canonical: "https://surchargeswap.com.au/trades" },
  openGraph: {
    title: "Surcharge Ban Calculator for Tradies & Tradespeople — SurchargeSwap",
    description: "Calculate the October 2026 RBA surcharge ban impact on your trades business. Find cheaper MSF rates.",
    url: "https://surchargeswap.com.au/trades",
    siteName: "SurchargeSwap",
    type: "website",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SurchargeSwap — RBA Surcharge Ban Calculator' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surcharge Ban Calculator for Tradies & Tradespeople — SurchargeSwap",
    description: "Calculate the October 2026 RBA surcharge ban impact on your trades business.",
    images: ['/opengraph-image'],
  },
};

export default function TradesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#0B1C3D] sm:text-4xl">
          RBA Surcharge Ban Calculator for Tradies &amp; Tradespeople
        </h1>
        <p className="mt-4 text-lg text-[#525252]">
          From 1 October 2026, plumbers, electricians, builders, painters, and all tradespeople accepting card payments can no longer add a surcharge for Visa, Mastercard, or eftpos. Many tradies charge a 1–2% surcharge on invoices — that revenue disappears overnight.
        </p>
        <p className="mt-3 text-base text-[#525252]">
          Enter your monthly card revenue to calculate your exact hit. The good news: tradies often have lower card volumes than hospitality, but higher individual invoice values — check where your exposure sits.
        </p>
        <div className="mt-4 rounded-md border border-[#E8651A]/30 bg-[#E8651A]/5 p-4 text-sm text-[#C4541A]">
          <strong>Tip for tradespeople:</strong> If you collect payment via bank transfer (EFT) rather than card terminal or card-on-file, those payments are not affected by the ban. Calculate only your card revenue for an accurate picture.
        </div>
      </div>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-[#F5F5F5]" />}>
        <CalculatorWithParams />
      </Suspense>
    </main>
  );
}
