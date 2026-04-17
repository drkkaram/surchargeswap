import type { Metadata } from "next";
import { Suspense } from "react";
import { CalculatorWithParams } from "@/components/CalculatorWithParams";

export const metadata: Metadata = {
  title: "Surcharge Ban Calculator for Gyms & Fitness Studios — SurchargeSwap",
  description: "The October 2026 RBA surcharge ban affects gyms, fitness studios, and personal trainers. Calculate your exact monthly revenue impact and compare processors.",
  alternates: { canonical: "https://surchargeswap.com.au/gym" },
  openGraph: {
    title: "Surcharge Ban Calculator for Gyms & Fitness Studios — SurchargeSwap",
    description: "Calculate the October 2026 RBA surcharge ban impact on your gym or fitness studio. Find cheaper MSF rates.",
    url: "https://surchargeswap.com.au/gym",
    siteName: "SurchargeSwap",
    type: "website",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SurchargeSwap — RBA Surcharge Ban Calculator' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surcharge Ban Calculator for Gyms & Fitness Studios — SurchargeSwap",
    description: "Calculate the October 2026 RBA surcharge ban impact on your gym or fitness studio.",
    images: ['/opengraph-image'],
  },
};

export default function GymPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#0B1C3D] sm:text-4xl">
          RBA Surcharge Ban Calculator for Gyms &amp; Fitness Studios
        </h1>
        <p className="mt-4 text-lg text-[#525252]">
          From 1 October 2026, gyms, yoga studios, PT businesses, and CrossFit boxes can no longer surcharge Visa, Mastercard, or eftpos payments. For businesses collecting memberships and class packs by card, the impact adds up fast across your recurring revenue.
        </p>
        <p className="mt-3 text-base text-[#525252]">
          Enter your monthly card revenue below to see your exact impact. Many fitness businesses find that switching to a lower-MSF processor offsets most or all of the loss.
        </p>
        <div className="mt-4 rounded-md border border-[#E8651A]/30 bg-[#E8651A]/5 p-4 text-sm text-[#C4541A]">
          <strong>Note for membership-based businesses:</strong> If you collect recurring payments via direct debit rather than card terminals, your surcharge exposure may be lower — check your actual card transaction mix before calculating.
        </div>
      </div>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-[#F5F5F5]" />}>
        <CalculatorWithParams />
      </Suspense>
    </main>
  );
}
