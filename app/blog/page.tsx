import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — SurchargeSwap",
  description:
    "Insights, guides, and updates on the October 2026 RBA card surcharge ban for Australian businesses.",
  alternates: {
    canonical: "https://surchargeswap.com.au/blog",
  },
  openGraph: {
    title: "Blog — SurchargeSwap",
    description:
      "Insights, guides, and updates on the October 2026 RBA card surcharge ban for Australian businesses.",
    url: "https://surchargeswap.com.au/blog",
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
    title: "Blog — SurchargeSwap",
    description:
      "Insights, guides, and updates on the October 2026 RBA card surcharge ban for Australian businesses.",
    images: ["/opengraph-image"],
  },
};

export default function BlogPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl">
          SurchargeSwap Blog
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#525252]">
          In-depth guides and updates on the October 2026 RBA surcharge ban.
        </p>

        <div className="mt-8 border border-[#E5E5E5] bg-white p-8 rounded-sm text-center">
          <p className="text-sm font-semibold text-[#0A0A0A]">
            Articles coming soon
          </p>
          <p className="mt-2 text-sm text-[#525252]">
            In the meantime, read our complete guide to the surcharge ban.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="border border-[#E5E5E5] bg-white p-6 rounded-sm">
            <p className="text-sm font-semibold text-[#0A0A0A]">
              Read the complete guide
            </p>
            <p className="mt-1 text-sm text-[#525252]">
              Everything you need to know about the RBA surcharge ban —
              what&apos;s covered, what&apos;s exempt, and your options.
            </p>
            <Link
              href="/guide"
              className="mt-3 inline-block text-sm font-medium text-[#0EA5E9] hover:text-[#0284C7]"
            >
              Read the complete guide &rarr;
            </Link>
          </div>
          <div className="border border-[#E5E5E5] bg-white p-6 rounded-sm">
            <p className="text-sm font-semibold text-[#0A0A0A]">
              Calculate your impact
            </p>
            <p className="mt-1 text-sm text-[#525252]">
              See exactly how much the surcharge ban will cost your business
              each month.
            </p>
            <Link
              href="/"
              className="mt-3 inline-block rounded-md bg-[#0EA5E9] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0284C7]"
            >
              Use the calculator &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
