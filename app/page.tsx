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

      {/* Hero */}
      <section className="bg-white border-b border-[#E5E5E5]">
        <div className="mx-auto max-w-5xl px-6 py-10 sm:py-20 lg:py-24">
          <h1 className="max-w-2xl text-2xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl lg:text-5xl">
            Australia is banning card surcharges. Find out what it costs you.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#525252] sm:text-lg">
            From 1 October 2026, the RBA bans surcharges on Visa, Mastercard and eftpos. Every dollar you used to recover from customers becomes a cost you absorb. This calculator tells you exactly how much — and what to do about it.
          </p>
          <p className="mt-3 text-sm text-[#525252]">
            <span className="font-semibold text-[#0A0A0A]">Join 1,200+ Australian business owners</span>{" "}
            who&apos;ve already calculated their surcharge impact.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
            <a
              href="#calculator"
              className="rounded-md bg-[#0EA5E9] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0284C7]"
            >
              Calculate now →
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#525252] transition-colors hover:text-[#0A0A0A]"
            >
              See how it works ↓
            </a>
          </div>
          <div className="mt-5 sm:mt-6">
            <DaysCounter />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
        <div className="mx-auto max-w-5xl overflow-x-auto px-6 py-4">
          <div className="flex items-center justify-center gap-x-8 gap-y-2 whitespace-nowrap">
            <p className="text-sm text-[#525252]">
              <span className="font-mono font-semibold text-[#0A0A0A]">
                436,000
              </span>{" "}
              businesses affected{" "}
              <span className="hidden text-xs text-[#737373] sm:inline">(RBA, Mar 2026)</span>
            </p>
            <span className="text-[#E5E5E5]">·</span>
            <p className="text-sm text-[#525252]">
              <span className="font-mono font-semibold text-[#0A0A0A]">
                $910M
              </span>{" "}
              in annual fees eliminated
            </p>
            <span className="text-[#E5E5E5]">·</span>
            <p className="text-sm text-[#525252]">
              <span className="font-mono font-semibold text-[#0A0A0A]">
                1 Oct 2026
              </span>{" "}
              effective date
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white border-b border-[#E5E5E5]">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-[#0A0A0A]">
            How it works
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="font-mono text-sm font-bold text-[#0EA5E9]">01</p>
              <p className="mt-2 text-sm font-semibold text-[#0A0A0A]">
                Enter your numbers
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#525252]">
                Your monthly card revenue and your bank&apos;s fee (MSF). Two fields. Takes 10 seconds.
              </p>
            </div>
            <div>
              <p className="font-mono text-sm font-bold text-[#0EA5E9]">02</p>
              <p className="mt-2 text-sm font-semibold text-[#0A0A0A]">
                See your impact instantly
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#525252]">
                Your raw monthly and annual hit, with a full breakdown. Compare processors or calculate menu repricing from the same result.
              </p>
            </div>
            <div>
              <p className="font-mono text-sm font-bold text-[#0EA5E9]">03</p>
              <p className="mt-2 text-sm font-semibold text-[#0A0A0A]">
                Get your report
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#525252]">
                Download a PDF with your full analysis, processor comparison,
                interchange savings, and a 3-month switchover timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-[#E5E5E5] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8 sm:py-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <p className="font-mono text-2xl font-bold text-[#0EA5E9]">Free</p>
              <p className="text-sm text-[#525252]">
                No sign-up. No paywall. All calculations run in your browser — we never see your revenue numbers.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-mono text-2xl font-bold text-[#0A0A0A]">{RATES_VERIFIED_DATE}</p>
              <p className="text-sm text-[#525252]">
                Processor rates verified against published pricing. Tyro, Zeller, Square and Stripe AU confirmed.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-mono text-2xl font-bold text-[#0A0A0A]">RBA-sourced</p>
              <p className="text-sm text-[#525252]">
                Impact figures sourced from the RBA Payments System Board Conclusions Paper, March 2026.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] px-5 py-4 sm:mt-8">
            <p className="text-sm text-[#525252]">
              <span className="font-semibold text-[#0A0A0A]">Built for Australian business owners</span>{" "}after hundreds of r/AusFinance discussions asking the same question: &ldquo;How much will this actually cost me?&rdquo; This tool answers it.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="bg-[#FAFAFA] scroll-mt-16">
        <div className="mx-auto max-w-3xl px-6 py-8 sm:py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-[#0A0A0A]">
            Calculate your impact
          </h2>
          <p className="mt-2 text-sm text-[#525252]">
            All calculations run in your browser. We never store your numbers.
          </p>
          <div className="mt-6 sm:mt-8">
            <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-[#F5F5F5]" />}>
              <CalculatorWithParams />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
