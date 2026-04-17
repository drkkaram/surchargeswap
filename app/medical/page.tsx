import type { Metadata } from "next";
import { Suspense } from "react";
import { CalculatorWithParams } from "@/components/CalculatorWithParams";

export const metadata: Metadata = {
  title: "Surcharge Ban Calculator for Medical & Allied Health — SurchargeSwap",
  description: "The October 2026 RBA surcharge ban affects dentists, physios, GPs, and allied health providers. Calculate your monthly revenue impact and compare processors.",
  alternates: { canonical: "https://surchargeswap.com.au/medical" },
  openGraph: {
    title: "Surcharge Ban Calculator for Medical & Allied Health — SurchargeSwap",
    description: "Calculate the October 2026 RBA surcharge ban impact on your medical or allied health practice. Find cheaper MSF rates.",
    url: "https://surchargeswap.com.au/medical",
    siteName: "SurchargeSwap",
    type: "website",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SurchargeSwap — RBA Surcharge Ban Calculator' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surcharge Ban Calculator for Medical & Allied Health — SurchargeSwap",
    description: "Calculate the October 2026 RBA surcharge ban impact on your medical or allied health practice.",
    images: ['/opengraph-image'],
  },
};

export default function MedicalPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#0B1C3D] sm:text-4xl">
          RBA Surcharge Ban Calculator for Medical &amp; Allied Health Practices
        </h1>
        <p className="mt-4 text-lg text-[#525252]">
          From 1 October 2026, dentists, physiotherapists, chiropractors, optometrists, psychologists, and other healthcare providers can no longer surcharge Visa, Mastercard, or eftpos payments. With gap payments typically ranging from $50–$300+, the surcharge revenue across a full appointment book adds up quickly.
        </p>
        <p className="mt-3 text-base text-[#525252]">
          Enter your monthly card revenue to see your exact impact. Medical practices often have higher-than-average Amex volumes — note that Amex remains surchargeable after October 2026.
        </p>
        <div className="mt-4 rounded-md border border-[#10B981]/30 bg-[#10B981]/5 p-4 text-sm text-[#065F46]">
          <strong>Note for health practices:</strong> Payments via HICAPS, Medicare, or private health insurance funds are not card transactions and are not affected by the ban. The ban only applies to patient-facing card payments (Visa, Mastercard, eftpos). Amex surcharging remains permitted.
        </div>
      </div>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-[#F5F5F5]" />}>
        <CalculatorWithParams />
      </Suspense>
    </main>
  );
}
