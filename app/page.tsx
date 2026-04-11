import { Calculator } from "@/components/Calculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'SurchargeSwap — Free RBA Surcharge Ban Calculator for Australian Businesses',
  description: 'Calculate exactly how much the October 2026 RBA card surcharge ban will cost your business. Compare processors, find cheaper rates, and protect your margins.',
  openGraph: {
    title: 'How much will the RBA surcharge ban cost your business?',
    description: 'Free calculator for the 436,000 Australian businesses affected by the October 2026 ban. Calculate your impact, compare processors, and find the cheapest MSF rate.',
    url: 'https://surchargeswap.com.au',
    siteName: 'SurchargeSwap',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SurchargeSwap — RBA Surcharge Ban Calculator',
    description: 'Calculate your October 2026 impact in 60 seconds. Free tool for Australian businesses.',
  },
  alternates: {
    canonical: 'https://surchargeswap.com.au',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SurchargeSwap',
  description: 'Free calculator for the RBA October 2026 card surcharge ban. Calculates business impact and compares payment processors.',
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
      name: 'How can businesses recover the cost without surchargeing?',
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
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20 lg:py-24">
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl lg:text-5xl">
            How much will the surcharge ban cost your business?
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#525252] sm:text-lg">
            RBA bans card surcharges for Visa, Mastercard and eftpos on 1
            October 2026. Calculate your monthly dollar impact in 60 seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#calculator"
              className="rounded-md bg-[#0EA5E9] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0284C7]"
            >
              Calculate now &rarr;
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#525252] transition-colors hover:text-[#0A0A0A]"
            >
              See how it works &darr;
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-4">
          <p className="text-sm text-[#525252]">
            <span className="font-mono font-semibold text-[#0A0A0A]">
              436,000
            </span>{" "}
            businesses affected
          </p>
          <span className="hidden text-[#E5E5E5] sm:inline">&middot;</span>
          <p className="text-sm text-[#525252]">
            <span className="font-mono font-semibold text-[#0A0A0A]">
              $2.4B
            </span>{" "}
            in annual surcharges
          </p>
          <span className="hidden text-[#E5E5E5] sm:inline">&middot;</span>
          <p className="text-sm text-[#525252]">
            <span className="font-mono font-semibold text-[#0A0A0A]">
              Oct 1 2026
            </span>{" "}
            effective date
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white border-b border-[#E5E5E5]">
        <div className="mx-auto max-w-5xl px-6 py-16">
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
                Monthly card revenue, card mix percentages, your current
                surcharge and MSF rates. Takes 30 seconds.
              </p>
            </div>
            <div>
              <p className="font-mono text-sm font-bold text-[#0EA5E9]">02</p>
              <p className="mt-2 text-sm font-semibold text-[#0A0A0A]">
                Choose your analysis
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#525252]">
                See your raw impact, compare processors to find savings, or
                calculate the menu price increase needed to absorb costs.
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

      {/* Calculator */}
      <section id="calculator" className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-[#0A0A0A]">
            Calculate your impact
          </h2>
          <p className="mt-2 text-sm text-[#525252]">
            All calculations run in your browser. We never store your numbers.
          </p>
          <div className="mt-8">
            <Calculator />
          </div>
        </div>
      </section>
    </>
  );
}
