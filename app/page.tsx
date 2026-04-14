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
      <section className="relative overflow-hidden bg-[#0F172A] border-b border-[#1E293B]">
        {/* Subtle radial gradient glow behind hero content */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(37,99,235,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28 lg:py-40">
          <div className="flex flex-col items-center text-center">

            {/* Countdown — animate in first */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0ms", animationFillMode: "both" }}>
              <DaysCounter />
            </div>

            {/* RBA pill badge */}
            <div
              className="mt-5 animate-fade-in-up"
              style={{ animationDelay: "80ms", animationFillMode: "both" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                RBA announcement: surcharge ban confirmed for 1 Oct 2026
              </span>
            </div>

            <h1
              className="mt-6 max-w-3xl text-balance font-sans text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in-up"
              style={{ animationDelay: "160ms", animationFillMode: "both" }}
            >
              Australia is banning card surcharges.{" "}
              <span className="text-[#F97316]">Find out what it costs you.</span>
            </h1>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg animate-fade-in-up"
              style={{ animationDelay: "240ms", animationFillMode: "both" }}
            >
              From 1 October 2026, the RBA bans surcharges on Visa, Mastercard and eftpos. Every
              dollar you recovered from customers becomes a cost you absorb. This calculator tells
              you exactly how much, and what to do about it.
            </p>

            <p
              className="mt-4 text-sm text-slate-400 animate-fade-in-up"
              style={{ animationDelay: "300ms", animationFillMode: "both" }}
            >
              <span className="font-semibold text-white">436,000 Australian businesses</span> will
              be affected. Run your numbers before your accountant does.
            </p>

            <div
              className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up"
              style={{ animationDelay: "360ms", animationFillMode: "both" }}
            >
              <a
                href="#calculator"
                className="group relative rounded-xl bg-[#2563EB] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-[#2563EB]/40 active:translate-y-0"
              >
                Calculate now
              </a>
              <a
                href="#how-it-works"
                className="rounded-xl border border-white/20 px-7 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-white/40 hover:text-white"
              >
                See how it works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats bar ─── */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="grid grid-cols-1 gap-0 divide-y divide-[#E2E8F0] text-center sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:text-left">
            <div className="flex flex-col items-center gap-0.5 py-8 sm:items-start sm:py-0 sm:pr-8">
              <p className="font-mono text-4xl font-bold tracking-tight text-[#0F172A]">436,000</p>
              <p className="mt-1 text-sm font-medium text-[#374151]">businesses affected</p>
              <p className="text-xs text-[#94A3B8]">RBA, Mar 2026</p>
            </div>
            <div className="flex flex-col items-center gap-0.5 py-8 sm:items-start sm:py-0 sm:px-8">
              <p className="font-mono text-4xl font-bold tracking-tight text-[#0F172A]">$910M</p>
              <p className="mt-1 text-sm font-medium text-[#374151]">in annual fees absorbed by businesses</p>
              <p className="text-xs text-[#94A3B8]">previously passed to customers</p>
            </div>
            <div className="flex flex-col items-center gap-0.5 py-8 sm:items-start sm:py-0 sm:pl-8">
              <p className="font-mono text-4xl font-bold tracking-tight text-[#0F172A]">1 Oct 2026</p>
              <p className="mt-1 text-sm font-medium text-[#374151]">effective date</p>
              <p className="text-xs text-[#94A3B8]">Visa, Mastercard, eftpos</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="how-it-works" className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-[#2563EB] sm:text-left">
            How it works
          </p>
          <h2 className="text-center text-3xl font-bold tracking-tight text-[#0F172A] sm:text-left sm:text-4xl">
            Get your answer in 60 seconds
          </h2>

          <div className="mt-12 flex flex-col divide-y divide-[#E2E8F0]">
            {[
              {
                n: "01",
                title: "Enter your numbers",
                body: "Your monthly card revenue and current bank fee. Two fields. Ten seconds.",
              },
              {
                n: "02",
                title: "See your impact",
                body: "Monthly and annual cost, broken down by card type. Amex and BNPL are still exempt so they're handled separately.",
              },
              {
                n: "03",
                title: "Take action",
                body: "Compare processors side-by-side, reprice your menu, or share the result with your accountant.",
              },
            ].map(({ n, title, body }, i) => (
              <div
                key={n}
                className="group flex items-start gap-6 py-8 first:pt-0 sm:gap-10"
              >
                <span
                  className="shrink-0 font-mono text-4xl font-bold leading-none text-[#E2E8F0] transition-colors duration-200 group-hover:text-[#2563EB]/20 sm:text-5xl"
                  aria-hidden
                >
                  {n}
                </span>
                <div>
                  <p className="text-base font-semibold text-[#0F172A]">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6B7280]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust bar ─── */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-[#2563EB] sm:text-left">
            Why trust this
          </p>
          <div className="grid gap-10 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              {/* Icon */}
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF]">
                <svg className="h-5 w-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="font-semibold text-[#0F172A]">Free, private, no account</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                Calculations run entirely in your browser. We never see your numbers.
              </p>
            </div>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF]">
                <svg className="h-5 w-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-semibold text-[#0F172A]">Rates verified {RATES_VERIFIED_DATE}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                Processor pricing confirmed against published rates for Tyro, Zeller, Square, and Stripe AU.
              </p>
            </div>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#EFF6FF]">
                <svg className="h-5 w-5 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="font-semibold text-[#0F172A]">RBA-sourced figures</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                Impact data from the RBA Payments System Board Conclusions Paper, March 2026. Not guesswork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Calculator ─── */}
      <section id="calculator" className="bg-[#F8FAFC] scroll-mt-16">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2563EB]">Free calculator</p>
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
              Calculate your impact
            </h2>
            <p className="mt-3 text-sm text-[#6B7280]">
              Runs in your browser. We never store your numbers.
            </p>
            <div className="mt-8 sm:mt-10">
              <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-white" />}>
                <CalculatorWithParams />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
