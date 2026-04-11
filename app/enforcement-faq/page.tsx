import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'RBA Surcharge Ban Enforcement — Who Polices It? | SurchargeSwap',
  description: 'ACCC enforces the October 2026 RBA surcharge ban. Learn about penalties, consumer complaints, and what happens if businesses ignore the rules.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://surchargeswap.com.au/enforcement-faq',
  },
};

export default function EnforcementFaqPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl">
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

        <div className="mt-8 border border-[#E5E5E5] bg-white p-6 rounded-sm">
          <p className="text-sm font-semibold text-[#0A0A0A]">
            Need to understand the full ban?
          </p>
          <p className="mt-1 text-sm text-[#525252]">
            Read our complete guide covering what&apos;s covered, exemptions,
            and your three options.
          </p>
          <Link
            href="/guide"
            className="mt-3 inline-block text-sm font-medium text-[#0EA5E9] hover:text-[#0284C7]"
          >
            Read the complete guide &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
