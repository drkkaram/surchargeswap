import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Surcharge Ban FAQ — SurchargeSwap",
  description:
    "Answers to the most common questions about the October 2026 RBA card surcharge ban for Australian businesses.",
  alternates: {
    canonical: "https://surchargeswap.com.au/faq",
  },
  openGraph: {
    title: "Surcharge Ban FAQ — SurchargeSwap",
    description:
      "Answers to the most common questions about the October 2026 RBA card surcharge ban for Australian businesses.",
    url: "https://surchargeswap.com.au/faq",
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
    title: "Surcharge Ban FAQ — SurchargeSwap",
    description:
      "Answers to the most common questions about the October 2026 RBA card surcharge ban for Australian businesses.",
    images: ["/opengraph-image"],
  },
};

const faqs = [
  {
    question: "What is the RBA surcharge ban?",
    answer:
      "From 1 October 2026, businesses in Australia will be prohibited from adding surcharges to Visa, Mastercard, and eftpos card payments. The ban is part of the Reserve Bank of Australia\u2019s reform of the payments system. American Express and buy now, pay later (BNPL) services are exempt.",
  },
  {
    question: "When does the surcharge ban start?",
    answer:
      "The surcharge ban takes effect on 1 October 2026. From that date, no business may apply a surcharge to Visa, Mastercard, or eftpos transactions.",
  },
  {
    question: "Does the ban apply to Amex?",
    answer:
      'No. American Express is exempt from the surcharge ban. Amex is not classified as a \u201cdesignated payment system\u201d under the RBA framework, so businesses may continue to surcharge Amex transactions after October 2026.',
  },
  {
    question: "Does the ban apply to BNPL (Afterpay, Zip)?",
    answer:
      "No. Buy now, pay later services such as Afterpay and Zip are also exempt from the ban. Businesses may continue to surcharge BNPL transactions.",
  },
  {
    question:
      "What happens if I keep surcharging after October 2026?",
    answer:
      "The Australian Competition and Consumer Commission (ACCC) will enforce the ban. Businesses that continue to surcharge Visa, Mastercard, or eftpos payments after 1 October 2026 may face infringement notices, formal warnings, and potential fines under Australian Consumer Law.",
  },
  {
    question: "How much will the ban cost my business?",
    answer:
      "It depends on your monthly card revenue, current surcharge rate, and processor fees. Use our free calculator to get a precise estimate for your business.",
    linkText: "Calculate your impact \u2192",
    linkHref: "/",
  },
  {
    question: "What can I do to offset the cost?",
    answer:
      "You have three main options: switch to a payment processor with lower fees, adjust your pricing to absorb the cost, or negotiate a better rate with your current provider. Our processor comparison tool can help you find cheaper alternatives.",
    linkText: "Compare processors \u2192",
    linkHref: "/compare",
  },
  {
    question: "Is this different for small businesses?",
    answer:
      "No. The surcharge ban applies equally to all businesses in Australia regardless of size, revenue, or industry. Small businesses and large enterprises are subject to the same rules from 1 October 2026.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl">
          Surcharge Ban FAQ
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#525252]">
          Common questions about the October 2026 RBA card surcharge ban for
          Australian businesses.
        </p>

        <div className="mt-8 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h2 className="text-base font-semibold text-[#0A0A0A]">
                {faq.question}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#525252]">
                {faq.answer}
              </p>
              {faq.linkHref && (
                <Link
                  href={faq.linkHref}
                  className="mt-1 inline-block text-sm font-medium text-[#0EA5E9] hover:text-[#0284C7]"
                >
                  {faq.linkText}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="border border-[#E5E5E5] bg-white p-6 rounded-sm">
            <p className="text-sm font-semibold text-[#0A0A0A]">
              Calculate your impact
            </p>
            <p className="mt-1 text-sm text-[#525252]">
              See exactly how much the ban will cost your business — and compare
              processors to offset the loss.
            </p>
            <Link
              href="/"
              className="mt-3 inline-block rounded-md bg-[#0EA5E9] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0284C7]"
            >
              Open calculator &rarr;
            </Link>
          </div>
          <div className="border border-[#E5E5E5] bg-white p-6 rounded-sm">
            <p className="text-sm font-semibold text-[#0A0A0A]">
              Compare processors
            </p>
            <p className="mt-1 text-sm text-[#525252]">
              Side-by-side comparison of Australian payment processors to find
              the lowest fees.
            </p>
            <Link
              href="/compare"
              className="mt-3 inline-block text-sm font-medium text-[#0EA5E9] hover:text-[#0284C7]"
            >
              Compare processors &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
