import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'RBA Surcharge Ban Enforcement — Who Polices It? | SurchargeSwap',
  description: 'ACCC enforces the October 2026 RBA surcharge ban. Learn about penalties, consumer complaints, and what happens if businesses ignore the rules.',
  openGraph: {
    title: 'RBA Surcharge Ban Enforcement — Who Polices It?',
    description: 'ACCC enforces the October 2026 RBA surcharge ban. Learn about penalties, consumer complaints, and what happens if businesses ignore the rules.',
    url: 'https://surchargeswap.com.au/enforcement-faq',
    siteName: 'SurchargeSwap',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SurchargeSwap — RBA Surcharge Ban Enforcement FAQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RBA Surcharge Ban Enforcement — Who Polices It?',
    description: 'ACCC enforces the October 2026 RBA surcharge ban. Learn about penalties, consumer complaints, and what happens if businesses ignore the rules.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://surchargeswap.com.au/enforcement-faq',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who enforces the RBA surcharge ban?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Australian Competition and Consumer Commission (ACCC) is the primary enforcement body for the surcharge ban from 1 October 2026.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the penalties for breaking the surcharge ban?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Penalties align with Australian Consumer Law enforcement powers, including potential fines and infringement notices for businesses that systematically continue to surcharge after the ban date.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I report a business surcharging after the ban?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consumers can lodge complaints directly with the ACCC through their online complaint form or by calling the ACCC consumer information line. Complaints can be made anonymously.',
      },
    },
    {
      '@type': 'Question',
      name: 'When does ACCC enforcement start?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The ACCC has indicated it will prioritise education and compliance assistance in the initial months following the ban on 1 October 2026, with enforcement action escalating for businesses that fail to comply after the transition period.',
      },
    },
  ],
};

export default function EnforcementFaqPage() {
  return (
    <div className="bg-[#F5F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#0B1C3D] sm:text-4xl">
          RBA Surcharge Ban Enforcement: Who Polices It?
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#525252]">
          Understanding enforcement, complaints, and penalties.
        </p>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-[#525252]">
          <p>
            The Australian Competition and Consumer Commission (ACCC) is the
            primary enforcement body for the surcharge ban. Once the ban takes
            effect on 1 October 2026, the ACCC has authority to investigate
            businesses that continue to apply surcharges on Visa, Mastercard,
            and eftpos transactions.
          </p>
          <p>
            Consumers can lodge complaints directly with the ACCC through their
            online complaint form or by calling the ACCC consumer information
            line. Complaints can be made anonymously. The ACCC investigates
            patterns of non-compliance and may issue infringement notices,
            formal warnings, or seek court-imposed penalties for serious or
            repeated breaches.
          </p>
          <p>
            Penalties for non-compliance are expected to align with existing
            Australian Consumer Law enforcement powers. This includes potential
            fines for businesses that systematically continue to surcharge after
            the ban date. The ACCC has indicated it will prioritise education
            and compliance assistance in the initial months following the ban,
            with enforcement action escalating for businesses that fail to
            comply after the transition period.
          </p>
          <p>
            Businesses should ensure all surcharge signage, POS configurations,
            and online checkout processes are updated before 1 October 2026 to
            avoid inadvertent non-compliance.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="border border-[#E5E5E0] bg-white p-6 rounded-md">
            <p className="text-sm font-semibold text-[#0B1C3D]">
              Calculate your impact
            </p>
            <p className="mt-1 text-sm text-[#525252]">
              See exactly how much the ban will cost your business — and compare processors to offset the loss.
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
              Read the complete guide
            </p>
            <p className="mt-1 text-sm text-[#525252]">
              What&apos;s covered, what&apos;s exempt (Amex, BNPL), and your three options explained.
            </p>
            <Link
              href="/guide"
              className="mt-3 inline-block text-sm font-medium text-[#E8651A] hover:text-[#C4541A]"
            >
              Read the guide &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
