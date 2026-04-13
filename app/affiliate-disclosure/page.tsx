import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "SurchargeSwap affiliate disclosure. How we earn revenue and how rankings are determined.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl">
          Affiliate Disclosure
        </h1>
        <p className="mt-3 text-sm text-[#525252]">
          Last updated: April 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#525252]">
          <p>
            SurchargeSwap is a free tool. We earn revenue through affiliate
            referral commissions when you switch payment processors via links on
            our site.
          </p>

          <div>
            <h2 className="text-lg font-semibold text-[#0A0A0A]">
              How it works
            </h2>
            <p className="mt-2">
              Our processor comparison and calculator results include links to
              payment processors. These are affiliate links. If you click through
              and switch to a new processor, we may receive a referral commission
              from that processor. This commission is paid by the processor, not
              by you. It does not affect the rate or terms you receive.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#0A0A0A]">
              How rankings are determined
            </h2>
            <p className="mt-2">
              Processor rankings on our comparison page and in calculator results
              are determined solely by lowest monthly cost to the user based on
              published rates. We do not alter rankings based on commission rates
              or commercial relationships. If a processor offers a higher
              commission but a higher rate, it will rank lower.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#0A0A0A]">
              Rate verification
            </h2>
            <p className="mt-2">
              All rates shown are standard published rates verified as of April
              2026. Actual rates may vary based on your business volume,
              industry, and individually negotiated terms. We recommend
              obtaining a formal quote from any processor before making a
              decision.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#0A0A0A]">
              Our commitment
            </h2>
            <p className="mt-2">
              We built SurchargeSwap because 436,000 Australian businesses (RBA Payments System Board, March 2026) need
              clear, unbiased information about the surcharge ban impact. Our
              affiliate model lets us keep the tool free while maintaining
              editorial independence. We will always rank processors by actual
              cost to you, not by what they pay us.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-6 text-center">
        <p className="text-sm text-[#525252]">
          Ready to calculate your surcharge ban impact?
        </p>
        <a
          href="/"
          className="mt-3 inline-block rounded-md bg-[#0A0A0A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#525252]"
        >
          Use the free calculator →
        </a>
      </div>
    </div>
  );
}
