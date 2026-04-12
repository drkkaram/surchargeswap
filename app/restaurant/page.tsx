import type { Metadata } from "next";
import { Calculator } from "@/components/Calculator";

export const metadata: Metadata = {
  title: "Surcharge Ban Calculator for Restaurants — SurchargeSwap",
  description: "Calculate how the October 2026 RBA surcharge ban will affect your restaurant. Find cheaper processor rates and protect your margins.",
  alternates: { canonical: "https://surchargeswap.com.au/restaurant" },
};

export default function RestaurantPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl">
          RBA Surcharge Ban Calculator for Restaurants
        </h1>
        <p className="mt-4 text-lg text-[#525252]">
          The RBA&apos;s 1 October 2026 ban on card surcharges will affect every restaurant accepting Visa, Mastercard, or eftpos. Full-service restaurants with high card volumes face the steepest impact — calculate yours below.
        </p>
        <p className="mt-3 text-base text-[#525252]">
          The calculator pre-fills with typical AU restaurant averages. Enter your own numbers for a precise result.
        </p>
        <div className="mt-4 rounded-sm border border-[#0EA5E9]/30 bg-[#0EA5E9]/5 p-4 text-sm text-[#0369A1]">
          <strong>Restaurant note:</strong> Amex surcharging remains permitted after October 2026. Ensure your POS supports selective surcharging by card network.
        </div>
      </div>
      <Calculator />
    </main>
  );
}
