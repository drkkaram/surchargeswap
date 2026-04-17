import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About SurchargeSwap | SurchargeSwap",
  description:
    "SurchargeSwap is a free tool helping Australian businesses understand and prepare for the October 2026 RBA card surcharge ban.",
  alternates: {
    canonical: "https://surchargeswap.com.au/about",
  },
  openGraph: {
    title: "About SurchargeSwap | SurchargeSwap",
    description:
      "SurchargeSwap is a free tool helping Australian businesses understand and prepare for the October 2026 RBA card surcharge ban.",
    url: "https://surchargeswap.com.au/about",
    siteName: "SurchargeSwap",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SurchargeSwap — RBA Surcharge Ban Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About SurchargeSwap | SurchargeSwap",
    description:
      "SurchargeSwap is a free tool helping Australian businesses understand and prepare for the October 2026 RBA card surcharge ban.",
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#F5F5F0]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#0B1C3D] sm:text-4xl">
          About SurchargeSwap
        </h1>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-[#525252]">
          <p>
            SurchargeSwap is a free calculator and comparison tool built for
            Australian businesses preparing for the RBA&apos;s card surcharge
            ban, which takes effect on 1 October 2026. From that date,
            businesses will no longer be able to surcharge Visa, Mastercard, or
            eftpos transactions — meaning merchant service fees come straight
            out of your margin.
          </p>
          <p>
            SurchargeSwap is an independent project. We are not affiliated with,
            endorsed by, or funded by any payment processor, bank, or financial
            institution. Where we link to a processor, affiliate relationships
            are clearly disclosed. Our fee estimates use publicly available
            standard rates and are not influenced by commercial partnerships.
          </p>
          <p>
            Our mission is simple: help Australian businesses quantify the
            financial impact of the surcharge ban and compare their options. The
            calculator shows exactly how much revenue you&apos;ll absorb each
            month, and the comparison tool lets you find a processor with lower
            fees to reduce the hit.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="border border-[#E5E5E0] bg-white p-6 rounded-md">
            <p className="text-sm font-semibold text-[#0B1C3D]">
              Calculate your impact
            </p>
            <p className="mt-1 text-sm text-[#525252]">
              See exactly how much the ban will cost your business — and find
              ways to reduce the hit.
            </p>
            <Link
              href="/"
              className="mt-3 inline-block rounded-md bg-[#E8651A] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#C4541A]"
            >
              Open calculator &rarr;
            </Link>
          </div>
          <div className="border border-[#E5E5E0] bg-white p-6 rounded-md">
            <p className="text-sm font-semibold text-[#0B1C3D]">
              Compare processors
            </p>
            <p className="mt-1 text-sm text-[#525252]">
              Side-by-side comparison of Australian payment processors to find
              the lowest fees for your business.
            </p>
            <Link
              href="/compare"
              className="mt-3 inline-block text-sm font-medium text-[#E8651A] hover:text-[#C4541A]"
            >
              Compare processors &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
