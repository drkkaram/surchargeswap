import type { Metadata } from "next";
import { Calculator } from "@/components/Calculator";

export const metadata: Metadata = {
  title: "Surcharge Ban Calculator for Cafes — SurchargeSwap",
  description: "The October 2026 RBA surcharge ban will hit cafes hard. Calculate your exact monthly impact and compare payment processors for hospitality businesses.",
  alternates: { canonical: "https://surchargeswap.com.au/cafe" },
};

export default function CafePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl">
          RBA Surcharge Ban Calculator for Cafes
        </h1>
        <p className="mt-4 text-lg text-[#525252]">
          From 1 October 2026, Australian cafes can no longer surcharge Visa, Mastercard, or eftpos payments. For a typical cafe doing $80,000/month in card revenue at a 1.5% surcharge, that&apos;s over <strong>$1,200/month absorbed directly into margin</strong>.
        </p>
        <p className="mt-3 text-base text-[#525252]">
          Use the calculator below to see your exact impact — and compare processors to find a cheaper MSF rate that reduces the hit.
        </p>
        <div className="mt-4 rounded-sm border border-[#F59E0B]/30 bg-[#F59E0B]/5 p-4 text-sm text-[#92400E]">
          <strong>Tip for cafes:</strong> Tyro&apos;s cost-plus pricing typically saves hospitality businesses the most — but factor in the 12-month lock-in before switching.
        </div>
      </div>
      <Calculator />
    </main>
  );
}
