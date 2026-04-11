import type { Metadata } from "next";
import Link from "next/link";
import { PROCESSORS } from "@/lib/calculator";

export const metadata: Metadata = {
  title: 'Cheapest Payment Processors Australia 2026 — Ranked by Monthly Cost | SurchargeSwap',
  description: 'Compare Zeller, Square, Tyro, Stripe and Pin Payments. Ranked by actual monthly cost for AU hospitality businesses. Rates verified April 2026.',
  openGraph: {
    title: 'Cheapest Payment Processors in Australia 2026',
    description: 'Zeller 1.4%, Tyro ~1.2%, Square 1.6%. Ranked for AU hospitality. Rates verified April 2026.',
    url: 'https://surchargeswap.com.au/compare',
    siteName: 'SurchargeSwap',
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: 'https://surchargeswap.com.au/compare',
  },
};

const processorListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Cheapest Payment Processors Australia 2026',
  description: 'Australian payment processors ranked by cost for hospitality businesses.',
  numberOfItems: 5,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Tyro',
      description: 'Cost-plus pricing, ~1.2% effective rate. Best for high-volume restaurants and cafes.',
      url: 'https://surchargeswap.com.au/compare#tyro',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Zeller',
      description: '1.4% flat rate, no monthly fee, no lock-in. Terminal $199.',
      url: 'https://surchargeswap.com.au/compare#zeller',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Stripe',
      description: '1.5% flat rate, no monthly fee, no lock-in.',
      url: 'https://surchargeswap.com.au/compare#stripe',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Pin Payments',
      description: '1.5% + $0.10 per transaction, online only.',
      url: 'https://surchargeswap.com.au/compare#pin-payments',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Square',
      description: '1.6% flat rate, no monthly fee, terminal from $59.',
      url: 'https://surchargeswap.com.au/compare#square',
    },
  ],
};

const processorDetails: Record<
  string,
  { rateLabel: string; monthlyFee: string; terminal: string }
> = {
  tyro: {
    rateLabel: "~1.2% effective (cost-plus)",
    monthlyFee: "$29/mo",
    terminal: "Included / rental",
  },
  zeller: {
    rateLabel: "1.4% flat",
    monthlyFee: "$0/mo",
    terminal: "$199 (one-off)",
  },
  stripe: {
    rateLabel: "~1.5% flat",
    monthlyFee: "$0/mo",
    terminal: "$99 to $349",
  },
  "pin-payments": {
    rateLabel: "1.5% + $0.10 per txn",
    monthlyFee: "$0/mo",
    terminal: "No terminal (online only)",
  },
  square: {
    rateLabel: "1.6% flat",
    monthlyFee: "$0/mo",
    terminal: "$59 to $399",
  },
};

export default function ComparePage() {
  return (
    <div className="bg-[#FAFAFA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(processorListJsonLd) }}
      />
      {/* Affiliate disclosure */}
      <div className="border-b border-amber-200 bg-amber-50/50">
        <div className="mx-auto max-w-5xl px-6 py-3">
          <p className="text-xs leading-relaxed text-[#525252]">
            <strong className="text-[#0A0A0A]">Affiliate disclosure:</strong>{" "}
            We may earn a referral commission if you switch via our links.
            Rankings are based on lowest cost for average AU hospitality volume.
            Rates verified April 2026.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl">
          Cheapest Payment Processors in Australia 2026
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#525252]">
          Compare Zeller, Square, Tyro, Stripe and Pin Payments. Ranked by
          actual monthly cost for AU hospitality businesses preparing for the
          RBA surcharge ban on 1 October 2026.
        </p>
        <p className="mt-2 text-sm text-[#525252]">
          Want to see costs based on your actual revenue?{" "}
          <Link
            href="/"
            className="font-medium text-[#0EA5E9] hover:text-[#0284C7]"
          >
            Use the calculator &rarr;
          </Link>
        </p>

        <div className="mt-10 space-y-6">
          {PROCESSORS.map((processor, idx) => {
            const details = processorDetails[processor.id];
            return (
              <div
                key={processor.id}
                className="border border-[#E5E5E5] bg-white p-6 rounded-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-[#FAFAFA] font-mono text-sm font-bold text-[#525252]">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h2 className="text-lg font-semibold text-[#0A0A0A]">
                        {processor.name}
                      </h2>
                      <span className="text-sm text-[#525252]">
                        {details.rateLabel}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-[#525252]">
                          Monthly fee
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#0A0A0A]">
                          {details.monthlyFee}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-[#525252]">
                          Terminal
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#0A0A0A]">
                          {details.terminal}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-[#525252]">
                          Contract
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#0A0A0A]">
                          {processor.contract}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-[#525252]">
                          Pricing model
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#0A0A0A]">
                          {processor.pricingModel === "cost-plus"
                            ? "Cost-plus"
                            : "Flat rate"}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-[#525252]">
                      Best for: {processor.bestFor}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={processor.affiliateHref}
                        className="rounded-md bg-[#0EA5E9] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0284C7]"
                      >
                        Switch to {processor.name} &rarr;
                      </a>
                      <Link
                        href="/"
                        className="rounded-md border border-[#E5E5E5] px-5 py-2 text-sm font-medium text-[#525252] transition-colors hover:border-[#525252]/30"
                      >
                        Calculate with my numbers
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 border border-[#E5E5E5] bg-white p-6 rounded-sm">
          <h2 className="text-lg font-semibold text-[#0A0A0A]">
            About this comparison
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#525252]">
            Rates shown are standard published rates as of April 2026. Actual
            rates may vary based on your business volume, industry, and
            negotiated terms. Cost-plus processors like Tyro will automatically
            pass on the RBA&apos;s interchange reduction (from ~0.80% to ~0.30%
            on credit cards), while flat-rate processors may not adjust unless
            they choose to lower their published rate.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#525252]">
            Not financial advice. Indicative rates only. Verify with your
            processor before making decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
