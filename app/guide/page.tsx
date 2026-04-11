import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'RBA Surcharge Ban 2026: Complete Guide for Australian Businesses | SurchargeSwap',
  description: 'Everything Australian businesses need to know about the October 2026 RBA card surcharge ban. What\'s covered, what\'s not (Amex, BNPL), your three options, and a month-by-month action checklist.',
  openGraph: {
    title: 'The RBA Surcharge Ban: Complete Guide (2026)',
    description: 'Visa, Mastercard and eftpos surcharges banned from 1 October 2026. Amex and BNPL exempt. Here\'s exactly what to do.',
    url: 'https://surchargeswap.com.au/guide',
    siteName: 'SurchargeSwap',
    locale: 'en_AU',
    type: 'article',
  },
  alternates: {
    canonical: 'https://surchargeswap.com.au/guide',
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The RBA Surcharge Ban: A Complete Guide for Australian Businesses (2026)',
  description: 'Everything Australian businesses need to know about the October 2026 RBA card surcharge ban — what\'s covered, what\'s not, and the three options to protect your margins.',
  datePublished: '2026-04-12',
  dateModified: '2026-04-12',
  author: {
    '@type': 'Organization',
    name: 'SurchargeSwap',
    url: 'https://surchargeswap.com.au',
  },
  publisher: {
    '@type': 'Organization',
    name: 'SurchargeSwap',
    url: 'https://surchargeswap.com.au',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://surchargeswap.com.au/guide',
  },
};

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm font-bold text-[#0EA5E9]">
          {number}
        </span>
        <h2 className="text-xl font-semibold tracking-tight text-[#0A0A0A] sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-[#525252]">
        {children}
      </div>
    </section>
  );
}

export default function GuidePage() {
  return (
    <div className="bg-[#FAFAFA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl">
          The RBA Surcharge Ban: A Complete Guide for Australian Businesses
          (2026)
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#525252]">
          Everything you need to know about October 2026, what it covers, what
          it doesn&apos;t, and your three options.
        </p>
        <p className="mt-4 text-sm text-[#525252]">
          Last updated: April 2026 &middot; 12 min read
        </p>

        <div className="mt-12 space-y-12">
          <Section number="01" title="What's actually happening">
            <p>
              Following the Reserve Bank of Australia&apos;s Payments System
              Review, the federal government confirmed that card payment
              surcharges will be banned for Visa, Mastercard, and eftpos
              transactions effective 1 October 2026. This means businesses will
              no longer be allowed to pass card processing fees on to customers
              for these three networks.
            </p>
            <p>
              The policy aims to reduce costs for consumers who currently pay
              surcharges averaging 1.1% to 1.5% on card transactions. For
              businesses, this means the merchant service fee (MSF) becomes a
              direct operating cost that must be absorbed, offset through
              payment processor switching, or recovered through price adjustments.
            </p>
            <p>
              The ban applies to all Australian businesses accepting
              in-person and online card payments through Visa, Mastercard, and
              eftpos networks. There is no revenue threshold or small business
              exemption.
            </p>
          </Section>

          <Section number="02" title="Who it affects">
            <p>
              An estimated 436,000 Australian businesses currently apply
              surcharges to card payments. The industries most affected include:
            </p>
            <ul className="list-inside list-disc space-y-1 pl-2">
              <li>
                Hospitality (restaurants, cafes, bars) where margins are already
                thin
              </li>
              <li>
                Retail with high card transaction volumes
              </li>
              <li>
                Professional services (medical, dental, legal) that typically
                surcharge
              </li>
              <li>
                Online businesses and e-commerce stores
              </li>
              <li>
                Trades and services using mobile payment terminals
              </li>
            </ul>
            <p>
              The ban covers three networks: Visa, Mastercard, and eftpos. Two
              notable exclusions apply: American Express and Buy Now Pay Later
              services. These are addressed in detail below.
            </p>
          </Section>

          <Section number="03" title="The Amex exception explained">
            <p>
              American Express is explicitly excluded from the surcharge ban.
              Businesses can continue to apply surcharges to Amex transactions
              after 1 October 2026.
            </p>
            <p>
              This exemption exists because Amex operates as a three-party
              scheme (issuer, acquirer, and network are all Amex) rather than
              the four-party model used by Visa, Mastercard, and eftpos. The
              RBA&apos;s interchange regulation only applies to designated
              four-party schemes.
            </p>
            <p>
              For many businesses, Amex accounts for 5% to 10% of card volume.
              The surcharge you collect on Amex transactions post-ban becomes a
              meaningful offset against the revenue lost from Visa/MC/eftpos
              surcharges.
            </p>
            <p>
              <strong className="text-[#0A0A0A]">Action item:</strong> Review
              your Amex volume and ensure your POS system can apply surcharges
              selectively by card network.
            </p>
          </Section>

          <Section
            number="04"
            title="BNPL (Afterpay, Zip) — what the ban doesn't cover"
          >
            <p>
              Buy Now Pay Later services including Afterpay, Zip, Klarna, and
              Humm are not covered by the October 2026 ban. Businesses can
              continue to surcharge BNPL transactions, though few currently do
              because BNPL providers typically prohibit it in their merchant
              agreements.
            </p>
            <p>
              BNPL is already a significant cost centre for businesses. Typical
              merchant fees range from 3.5% to 6%, with Afterpay averaging
              approximately 4.5%. At these rates, BNPL costs your business 3 to
              4 times more than standard card processing.
            </p>
            <p>
              The RBA has flagged BNPL surcharging as an area under active
              review. Regulatory action is possible but unlikely before 2027.
              For now, BNPL costs remain a separate line item in your payment
              cost analysis.
            </p>
          </Section>

          <Section number="05" title="Your three options">
            <p>
              Every business affected by the ban has three strategic choices:
            </p>
            <div className="space-y-4 pt-2">
              <div className="border-l-2 border-[#0EA5E9] pl-4">
                <p className="font-semibold text-[#0A0A0A]">
                  Option 1: Absorb the cost
                </p>
                <p>
                  Accept the surcharge revenue loss as a new operating expense.
                  Simplest to implement but directly reduces your margin. For a
                  business doing $50,000/month in covered card revenue with a
                  1.5% surcharge, this means losing $675/month ($8,100/year).
                </p>
              </div>
              <div className="border-l-2 border-[#0EA5E9] pl-4">
                <p className="font-semibold text-[#0A0A0A]">
                  Option 2: Switch processors
                </p>
                <p>
                  Move to a cheaper payment processor to reduce your MSF rate.
                  A drop from 1.7% to 1.2% on $50,000/month saves $250/month
                  ($3,000/year). Combined with the RBA&apos;s interchange
                  reduction, savings can be substantial. This requires a
                  one-time effort to switch but delivers ongoing savings.
                </p>
              </div>
              <div className="border-l-2 border-[#0EA5E9] pl-4">
                <p className="font-semibold text-[#0A0A0A]">
                  Option 3: Reprice your products
                </p>
                <p>
                  Increase menu or product prices by your MSF rate (typically
                  1.5% to 2%). A $20 item becomes $20.34. No switching cost and
                  no admin, but carries risk if competitors hold prices flat.
                  Works best for businesses with price-insensitive customers.
                </p>
              </div>
            </div>
            <p>
              Most businesses will use a combination. The{" "}
              <Link
                href="/"
                className="font-medium text-[#0EA5E9] hover:text-[#0284C7]"
              >
                calculator
              </Link>{" "}
              models all three options based on your actual numbers.
            </p>
          </Section>

          <Section number="06" title="How to switch payment processors — step by step">
            <ol className="list-inside list-decimal space-y-2 pl-2">
              <li>
                <strong className="text-[#0A0A0A]">
                  Check your current contract.
                </strong>{" "}
                Review your existing processor agreement for lock-in periods,
                early termination fees, and notice requirements. Most contracts
                require 30 to 90 days notice.
              </li>
              <li>
                <strong className="text-[#0A0A0A]">
                  Compare actual costs.
                </strong>{" "}
                Use the{" "}
                <Link
                  href="/compare"
                  className="font-medium text-[#0EA5E9] hover:text-[#0284C7]"
                >
                  processor comparison
                </Link>{" "}
                or calculator to see real monthly cost differences. Factor in
                monthly fees, terminal costs, and contract length.
              </li>
              <li>
                <strong className="text-[#0A0A0A]">
                  Contact your top 2 choices.
                </strong>{" "}
                Request a formal quote with your specific volume. Published
                rates are standard; many processors negotiate for higher volumes.
              </li>
              <li>
                <strong className="text-[#0A0A0A]">Order equipment early.</strong>{" "}
                Terminal delivery and setup can take 1 to 3 weeks. Plan for
                overlap with your existing terminal so there&apos;s no gap in
                payment acceptance.
              </li>
              <li>
                <strong className="text-[#0A0A0A]">
                  Verify settlement timing.
                </strong>{" "}
                Settlement terms vary from same-day (Tyro, Zeller) to T+2
                (some banks). Ensure the new settlement schedule works with
                your cash flow needs.
              </li>
              <li>
                <strong className="text-[#0A0A0A]">
                  Cancel your old processor.
                </strong>{" "}
                Send written notice within the contract&apos;s required period.
                Return any rented equipment to avoid ongoing charges.
              </li>
            </ol>
          </Section>

          <Section number="07" title="The interchange windfall">
            <p>
              The RBA is simultaneously reducing credit card interchange fees
              from approximately 0.80% to 0.30%. This is separate from the
              surcharge ban but creates an important opportunity.
            </p>
            <p>
              <strong className="text-[#0A0A0A]">Cost-plus processors</strong>{" "}
              (like Tyro and most traditional bank merchant facilities) charge
              you the actual interchange fee plus a fixed margin. When
              interchange drops, your rate drops automatically. At $50,000/month
              in Visa/MC volume, a 0.5% interchange reduction saves you
              $250/month.
            </p>
            <p>
              <strong className="text-[#0A0A0A]">
                Blended flat-rate processors
              </strong>{" "}
              (like Zeller, Square, Stripe) charge a single percentage regardless
              of interchange. The processor keeps the interchange reduction as
              additional margin unless they voluntarily lower their published
              rate.
            </p>
            <p>
              <strong className="text-[#0A0A0A]">The question to ask:</strong>{" "}
              &ldquo;Do you use cost-plus pricing or blended flat rate? Will I
              automatically benefit from the RBA interchange reduction?&rdquo;
            </p>
            <p>
              This is the single most important question you can ask your
              processor before October 2026.
            </p>
          </Section>

          <Section number="08" title="Timeline and action checklist">
            <div className="space-y-4 pt-2">
              <div className="border-l-2 border-[#E5E5E5] pl-4">
                <p className="font-mono text-xs font-bold text-[#0EA5E9]">
                  JUNE 2026
                </p>
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>Calculate your surcharge revenue impact</li>
                  <li>Review your current processor contract terms</li>
                  <li>
                    Run a processor comparison based on your actual volume
                  </li>
                </ul>
              </div>
              <div className="border-l-2 border-[#E5E5E5] pl-4">
                <p className="font-mono text-xs font-bold text-[#0EA5E9]">
                  JULY 2026
                </p>
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>
                    Contact your top 2 processor choices for formal quotes
                  </li>
                  <li>
                    Ask each processor about cost-plus vs flat-rate pricing
                  </li>
                  <li>
                    Give notice to your current processor (if switching)
                  </li>
                </ul>
              </div>
              <div className="border-l-2 border-[#E5E5E5] pl-4">
                <p className="font-mono text-xs font-bold text-[#0EA5E9]">
                  AUGUST 2026
                </p>
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>Order and receive new terminal equipment</li>
                  <li>Test the new processor with live transactions</li>
                  <li>Train staff on new terminal operation</li>
                  <li>
                    Update POS to stop applying surcharges on Visa/MC/eftpos
                  </li>
                </ul>
              </div>
              <div className="border-l-2 border-[#E5E5E5] pl-4">
                <p className="font-mono text-xs font-bold text-[#0EA5E9]">
                  SEPTEMBER 2026
                </p>
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>
                    Complete switchover to new processor (if switching)
                  </li>
                  <li>
                    Remove all surcharge signage for Visa/MC/eftpos
                  </li>
                  <li>
                    Update website and online checkout to remove surcharges
                  </li>
                  <li>
                    Verify Amex surcharging still works correctly (if
                    applicable)
                  </li>
                  <li>
                    Adjust prices if using the repricing strategy
                  </li>
                </ul>
              </div>
            </div>
          </Section>

          <Section number="09" title="Frequently asked questions">
            <div className="space-y-6 pt-2">
              {[
                {
                  q: "Does the ban apply to online businesses?",
                  a: "Yes. The ban covers all Visa, Mastercard, and eftpos transactions whether in-store or online. If you currently add a surcharge at checkout on your website, this must be removed by 1 October 2026.",
                },
                {
                  q: "Can I still surcharge Amex?",
                  a: "Yes. American Express is explicitly excluded from the ban. You can continue to apply surcharges to Amex transactions. Ensure your POS or payment gateway can apply surcharges selectively by card network.",
                },
                {
                  q: "What happens if I keep surcharging after October 2026?",
                  a: "The ACCC will enforce the ban. Penalties for non-compliance include fines and infringement notices. Consumers can lodge complaints directly with the ACCC. See our enforcement FAQ for details.",
                },
                {
                  q: "Will the ban reduce my processing fees?",
                  a: "Not directly. The surcharge ban prevents you from passing fees to customers. However, the RBA is separately reducing interchange fees, which will lower processing costs for businesses on cost-plus pricing.",
                },
                {
                  q: "Is there a small business exemption?",
                  a: "No. The ban applies to all businesses regardless of size or revenue. There is no threshold or exemption for small businesses.",
                },
                {
                  q: "What about Afterpay and Zip surcharges?",
                  a: "BNPL services are not covered by the October 2026 ban. However, most BNPL provider agreements already prohibit merchants from surcharging. Check your BNPL merchant agreement for specific terms.",
                },
                {
                  q: "How much will the interchange reduction save me?",
                  a: "If you use a cost-plus processor, you'll benefit from approximately 0.5% reduction on credit card interchange. On $50,000/month in Visa/MC volume, that's roughly $250/month. Flat-rate processors may not pass on this saving.",
                },
                {
                  q: "Should I switch processors or just absorb the cost?",
                  a: "It depends on your volume and current rate. For most businesses doing over $20,000/month in card revenue, switching to a cheaper processor delivers measurable savings. Use the calculator to compare your specific numbers.",
                },
                {
                  q: "How long does it take to switch processors?",
                  a: "Typically 2 to 6 weeks from decision to live transactions. This includes contract review (1 week), application and approval (3 to 5 days), equipment delivery (1 to 2 weeks), and setup/testing (1 to 2 days).",
                },
                {
                  q: "Can I negotiate a lower rate with my current processor?",
                  a: "Yes. Many processors will negotiate, especially if you can show a competitive quote. Contact your current provider with a formal quote from a competitor and ask them to match or beat it. The worst they can say is no.",
                },
              ].map((faq) => (
                <div key={faq.q}>
                  <p className="font-semibold text-[#0A0A0A]">{faq.q}</p>
                  <p className="mt-1">{faq.a}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="mt-12 border border-[#E5E5E5] bg-white p-6 rounded-sm">
          <p className="text-sm font-semibold text-[#0A0A0A]">
            Ready to calculate your impact?
          </p>
          <p className="mt-1 text-sm text-[#525252]">
            Run your numbers through the calculator to see your exact monthly
            dollar impact, processor comparison, and repricing analysis.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-md bg-[#0EA5E9] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0284C7]"
          >
            Calculate now &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
