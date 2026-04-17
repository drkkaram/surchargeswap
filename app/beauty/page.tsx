import type { Metadata } from "next";
import { Suspense } from "react";
import { CalculatorWithParams } from "@/components/CalculatorWithParams";

export const metadata: Metadata = {
  title: "Surcharge Ban Calculator for Salons & Beauty — SurchargeSwap",
  description: "The October 2026 RBA surcharge ban will directly hit salons, barbers, and spas. Calculate your exact monthly impact and find a lower-cost processor.",
  alternates: { canonical: "https://surchargeswap.com.au/beauty" },
  openGraph: {
    title: "Surcharge Ban Calculator for Salons & Beauty — SurchargeSwap",
    description: "Calculate the October 2026 RBA surcharge ban impact on your salon or beauty business. Find cheaper MSF rates.",
    url: "https://surchargeswap.com.au/beauty",
    siteName: "SurchargeSwap",
    type: "website",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SurchargeSwap — RBA Surcharge Ban Calculator' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surcharge Ban Calculator for Salons & Beauty — SurchargeSwap",
    description: "Calculate the October 2026 RBA surcharge ban impact on your salon or beauty business.",
    images: ['/opengraph-image'],
  },
};

export default function BeautyPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#0B1C3D] sm:text-4xl">
          RBA Surcharge Ban Calculator for Salons &amp; Beauty Businesses
        </h1>
        <p className="mt-4 text-lg text-[#525252]">
          From 1 October 2026, hair salons, barbers, nail bars, and spas can no longer surcharge Visa, Mastercard, or eftpos payments. Beauty businesses run on tight margins — that surcharge revenue going away is real profit disappearing from every transaction.
        </p>
        <p className="mt-3 text-base text-[#525252]">
          Enter your monthly card revenue below for your exact impact, then compare processors to find a lower MSF rate and reduce the hit.
        </p>
        <div className="mt-4 rounded-md border border-[#F59E0B]/30 bg-[#F59E0B]/5 p-4 text-sm text-[#92400E]">
          <strong>Tip for beauty businesses:</strong> Many salons have higher Amex volumes from corporate clients — Amex surcharging remains permitted after October 2026, so ensure your terminal is configured to surcharge Amex only.
        </div>
      </div>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-[#F5F5F5]" />}>
        <CalculatorWithParams />
      </Suspense>
    </main>
  );
}
