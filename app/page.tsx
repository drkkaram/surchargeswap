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
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'AUD',
  },
  provider: {
    '@type': 'Organization',
    name: 'SurchargeSwap',
    url: 'https://surchargeswap.com.au',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When does the RBA surcharge ban start?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Reserve Bank of Australia (RBA) card surcharge ban takes effect on 1 October 2026, covering Visa, Mastercard and eftpos payments.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ban include Amex (American Express)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. American Express is not covered by the October 2026 ban. Businesses can continue to surcharge Amex payments at the actual cost of acceptance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ban include Afterpay and Zip?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. BNPL providers like Afterpay and Zip are not covered by the October 2026 ban. Surcharges on these services remain permitted.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if a business still charges a surcharge after October 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The ACCC enforces the ban. Businesses that continue to charge surcharges on covered cards face regulatory penalties. Consumers can report violations to the ACCC.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can businesses recover the cost without surcharging?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Businesses have three options: switch to a cheaper payment processor to reduce their MSF rate, absorb the cost, or increase menu/product prices to offset the loss.',
      },
    },
  ],
};

function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd />

      {/* Hero — Dark, urgent, serif headline */}
      <section className="bg-[#0F172A] border-b border-[#1E293B]">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28 lg:py-40">
          <div className="flex flex-col items-center text-center">
            <DaysCounter />
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#E1EAF8] bg-[#EFF6FF]/80 px-4 py-1.5 text-xs font-medium text-[#2563EB] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
              RBA announcement: surcharge ban confirmed for 1 Oct 2026
            </div>
            <h1 className="mt-6 max-w-3xl font-serif italic text-5xl font-normal leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Australia is banning card surcharges. Find out what it costs you.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              From 1 October 2026, the RBA bans surcharges on Visa, Mastercard and eftpos. Every dollar you used to recover from customers becomes a cost you absorb. This calculator tells you exactly how much — and what to do about it.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              <span className="font-semibold text-white">436,000 Australian businesses</span>{" "}
              will be affected. Run your numbers before your accountant does.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#calculator"
                className="rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#2563EB]/25 transition-colors hover:bg-[#1D4ED8]"
              >
                Calculate now
              </a>
              <a
                href="#how-it-works"
                className="rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                See how it works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <p className="font-mono text-3xl font-bold tracking-tight text-[#0F172A]">436,000</p>
              <p className="text-sm font-medium text-[#374151]">businesses affected</p>
              <p className="text-xs text-[#94A3B8]">Source: RBA, Mar 2026</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-mono text-3xl font-bold tracking-tight text-[#0F172A]">$910M</p>
              <p className="text-sm font-medium text-[#374151]">in annual fees eliminated</p>
              <p className="text-xs text-[#94A3B8]">absorbed by businesses</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-mono text-3xl font-bold tracking-tight text-[#0F172A]">1 Oct 2026</p>
              <p className="text-sm font-medium text-[#374151]">effective date</p>
              <p className="text-xs text-[#94A3B8]">Visa, Mastercard, eftpos</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — Upgraded visual treatment */}
      <section id="how-it-works" className="bg-white border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#2563EB]">How it works</p>
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Get your answer in 60 seconds
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#6B7280]">
            No account. No spreadsheet. Just enter two numbers and see exactly what the ban costs you.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF]">
                <span className="font-mono text-sm font-bold text-[#2563EB]">1</span>
              </div>
              <p className="text-base font-semibold text-[#0F172A]">Enter your numbers</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">Your monthly card revenue and bank fee. Two fields. Ten seconds.</p>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF]">
                <span className="font-mono text-sm font-bold text-[#2563EB]">2</span>
              </div>
              <p className="text-base font-semibold text-[#0F172A]">See your impact</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">Monthly and annual cost, broken down. Amex and BNPL treated separately.</p>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF]">
                <span className="font-mono text-sm font-bold text-[#2563EB]">3</span>
              </div>
              <p className="text-base font-semibold text-[#0F172A]">Take action</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">Compare processors, reprice your menu, or share the result with your accountant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#2563EB]">Why trust this</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <p className="font-mono text-2xl font-bold text-[#2563EB]">Free</p>
              <p className="mt-2 text-sm leading-relaxed text-[#374151]">No account. No paywall. Calculations run entirely in your browser — we never see your numbers.</p>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <p className="font-mono text-2xl font-bold text-[#0F172A]">{RATES_VERIFIED_DATE}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#374151]">Processor rates verified against published pricing. Tyro, Zeller, Square, Stripe AU confirmed.</p>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
              <p className="font-mono text-2xl font-bold text-[#0F172A]">RBA-sourced</p>
              <p className="mt-2 text-sm leading-relaxed text-[#374151]">Impact figures from the RBA Payments System Board Conclusions Paper, March 2026.</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-6 py-5">
            <p className="text-sm leading-relaxed text-[#374151]">
              <span className="font-semibold text-[#0F172A]">Built for Australian business owners</span>{" "}after hundreds of r/AusFinance discussions asking the same question: &ldquo;How much will this actually cost me?&rdquo; This tool answers it.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="bg-white scroll-mt-16">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#2563EB]">Free calculator</p>
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Calculate your impact
          </h2>
          <p className="mt-3 text-sm text-[#6B7280]">
            Calculations run in your browser. We never store your numbers.
          </p>
          <div className="mt-8 sm:mt-10">
            <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-[#F8FAFC]" />}>
              <CalculatorWithParams />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
