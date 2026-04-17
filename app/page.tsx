import { Suspense } from "react";
import { CalculatorWithParams } from "@/components/CalculatorWithParams";
import { DaysCounter } from "@/components/DaysCounter";
import { RATES_VERIFIED_DATE } from "@/lib/calculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'SurchargeSwap — Free RBA Surcharge Ban Calculator for Australian Businesses',
  description: 'Calculate exactly how much the 1 October 2026 RBA card surcharge ban will cost your business. Compare processors, find cheaper rates, and protect your margins.',
  openGraph: {
    title: 'How much will the RBA surcharge ban cost your business?',
    description: 'Free calculator for the 436,000 Australian businesses affected by the October 2026 ban. Calculate your impact, compare processors, and find the cheapest MSF rate.',
    url: 'https://surchargeswap.com.au',
    siteName: 'SurchargeSwap',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SurchargeSwap — RBA Surcharge Ban Calculator for Australian Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SurchargeSwap — RBA Surcharge Ban Calculator',
    description: 'Calculate your 1 October 2026 impact in 60 seconds. Free tool for Australian businesses.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://surchargeswap.com.au',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SurchargeSwap',
  description: 'Free calculator for the RBA 1 October 2026 card surcharge ban. Calculates business impact and compares payment processors.',
  url: 'https://surchargeswap.com.au',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
  provider: { '@type': 'Organization', name: 'SurchargeSwap', url: 'https://surchargeswap.com.au' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When does the RBA surcharge ban start?',
      acceptedAnswer: { '@type': 'Answer', text: 'The RBA card surcharge ban takes effect on 1 October 2026, covering Visa, Mastercard and eftpos payments.' },
    },
    {
      '@type': 'Question',
      name: 'Does the ban include Amex (American Express)?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. American Express is not covered by the October 2026 ban. Businesses can continue to surcharge Amex payments at the actual cost of acceptance.' },
    },
    {
      '@type': 'Question',
      name: 'Does the ban include Afterpay and Zip?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. BNPL providers like Afterpay and Zip are not covered by the October 2026 ban. Surcharges on these services remain permitted.' },
    },
    {
      '@type': 'Question',
      name: 'What happens if a business still charges a surcharge after October 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'The ACCC enforces the ban. Businesses that continue to charge surcharges on covered cards face regulatory penalties.' },
    },
    {
      '@type': 'Question',
      name: 'How can businesses recover the cost without surcharging?',
      acceptedAnswer: { '@type': 'Answer', text: 'Businesses have three options: switch to a cheaper payment processor, absorb the cost, or increase menu/product prices to offset the loss.' },
    },
  ],
};

function JsonLd() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd />

      {/* ─── Hero ─── */}
      <section className="bg-white border-b border-[#E5E5E0]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">

          {/* Left: countdown-led hero */}
          <div className="order-1 flex flex-col gap-5">
            <DaysCounter />

            <div className="flex flex-col gap-3">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] font-normal text-[#0B1C3D] leading-[1.08] tracking-tight max-w-xl">
                Your surcharge stops working on{" "}
                <span className="text-[#E8651A]">1 October.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#4A5568] leading-relaxed max-w-lg">
                Every card payment after that date comes out of your profit — not your customer&apos;s pocket. Find out exactly how much you&apos;ll lose.
              </p>
            </div>

            {/* Stats — moved inline with hero for immediate impact */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-1">
              <div>
                <p className="font-mono text-2xl font-bold text-[#0B1C3D]">436,000</p>
                <p className="text-xs text-[#6B7280] mt-0.5">businesses affected</p>
              </div>
              <div className="hidden sm:block w-px bg-[#E5E5E0]" />
              <div>
                <p className="font-mono text-2xl font-bold text-[#0B1C3D]">$910M</p>
                <p className="text-xs text-[#6B7280] mt-0.5">in fees shifting to businesses annually</p>
              </div>
            </div>

            <a
              href="#calculator"
              className="inline-flex items-center self-start px-6 py-3.5 bg-[#E8651A] text-white font-semibold text-sm rounded-md hover:bg-[#C4541A] transition-colors"
            >
              Calculate my impact →
            </a>

            <p className="text-xs text-[#9CA3AF]">
              Free · No sign-up · Runs in your browser · Rates sourced from the RBA, March 2026
            </p>
          </div>

          {/* Right: calculator */}
          <div className="order-2" id="calculator">
            <Suspense fallback={<div className="h-64 animate-pulse rounded-md bg-[#F5F5F0]" />}>
              <CalculatorWithParams />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="how-it-works" className="bg-[#F5F5F0] border-b border-[#E5E5E0]">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-[#E8651A] sm:text-left">
            How it works
          </p>
          <h2 className="font-serif text-center text-3xl font-normal tracking-tight text-[#0B1C3D] sm:text-left sm:text-4xl">
            Your answer in 60 seconds
          </h2>

          <div className="mt-12 flex flex-col divide-y divide-[#E5E5E0]">
            {[
              {
                n: "01",
                title: "Enter two numbers",
                body: "Your monthly card revenue and the fee your bank currently charges you per transaction. That's it.",
              },
              {
                n: "02",
                title: "See the damage",
                body: "Monthly and annual cost, broken down by card type. Amex and BNPL are still exempt — shown separately.",
              },
              {
                n: "03",
                title: "Take action",
                body: "Switch to a cheaper processor, reprice your menu, or send the result directly to your accountant.",
              },
            ].map(({ n, title, body }) => (
              <div
                key={n}
                className="group flex items-start gap-6 py-8 first:pt-0 sm:gap-10"
              >
                <span
                  className="shrink-0 font-mono text-4xl font-bold leading-none text-[#0B1C3D]/20 transition-colors duration-200 group-hover:text-[#E8651A]/30 sm:text-5xl"
                  aria-hidden
                >
                  {n}
                </span>
                <div>
                  <p className="text-base font-semibold text-[#0B1C3D]">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4A5568]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Source attribution strip ─── */}
      <section className="border-b border-[#E5E5E0] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 text-sm text-[#4A5568]">
            <div className="flex items-center gap-3">
              <svg className="h-4 w-4 shrink-0 text-[#E8651A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Impact figures from the <strong className="text-[#0B1C3D]">RBA Payments System Board, March 2026</strong></span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[#E5E5E0] shrink-0" />
            <div className="flex items-center gap-3">
              <svg className="h-4 w-4 shrink-0 text-[#E8651A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Processor rates verified {RATES_VERIFIED_DATE} — Tyro, Zeller, Square, Stripe AU</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[#E5E5E0] shrink-0" />
            <div className="flex items-center gap-3">
              <svg className="h-4 w-4 shrink-0 text-[#E8651A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>No sign-up · Runs in your browser · No affiliation with any processor</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
