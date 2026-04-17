import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for SurchargeSwap — the free surcharge ban impact calculator for Australian businesses.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl font-normal tracking-tight text-[#0B1C3D] sm:text-4xl">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-[#525252]">
        surchargeswap.com.au &mdash; Last updated: April 2026 &mdash; Governing
        law: New South Wales, Australia
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#525252]">
        <section>
          <h2 className="font-serif text-base font-normal text-[#0B1C3D]">
            1. About This Site
          </h2>
          <p className="mt-2">
            SurchargeSwap is a free comparison tool that helps Australian
            businesses estimate and compare payment processor fees. We are not a
            financial adviser, bank, or payment processor.
          </p>
          <p className="mt-2">By using this site, you agree to these terms.</p>
        </section>

        <section>
          <h2 className="font-serif text-base font-normal text-[#0B1C3D]">
            2. Information Only — Not Financial Advice
          </h2>
          <p className="mt-2">
            Everything on this site is{" "}
            <strong className="text-[#0B1C3D]">general information</strong>,
            not financial, legal, or business advice.
          </p>
          <p className="mt-2">
            The fee calculator generates{" "}
            <strong className="text-[#0B1C3D]">estimates only</strong>, based
            on the inputs you provide and publicly available standard rates.
            Your actual fees will depend on your specific merchant agreement,
            card mix, transaction types, and any rates you&apos;ve negotiated
            directly with a processor.
          </p>
          <p className="mt-2">
            <strong className="text-[#0B1C3D]">
              Before making any decision about changing your payment processor,
              contact the providers directly and confirm current pricing.
            </strong>
          </p>
        </section>

        <section>
          <h2 className="font-serif text-base font-normal text-[#0B1C3D]">
            3. No Warranty on Fee Accuracy
          </h2>
          <p className="mt-2">
            Payment processor fees change frequently. We do our best to keep
            fee data current, but we make{" "}
            <strong className="text-[#0B1C3D]">no guarantee</strong> that the
            information on this site is accurate, complete, or up to date at
            the time you read it.
          </p>
          <p className="mt-2">SurchargeSwap accepts no liability for:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Decisions made based on fee estimates shown on this site</li>
            <li>
              Losses arising from reliance on pricing data that has since
              changed
            </li>
            <li>
              Inaccuracies in our comparison of processor features or terms
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-base font-normal text-[#0B1C3D]">
            4. Affiliate Relationships
          </h2>
          <p className="mt-2">
            SurchargeSwap may earn a referral fee when you click a link to a
            payment processor and subsequently sign up for their service. These
            relationships are disclosed on our{" "}
            <a
              href="/affiliate-disclosure"
              className="text-[#0B1C3D] underline underline-offset-2 hover:text-[#525252]"
            >
              Affiliate Disclosure
            </a>{" "}
            page.
          </p>
          <p className="mt-2">
            Affiliate relationships do{" "}
            <strong className="text-[#0B1C3D]">not</strong> influence the fee
            estimates shown in the calculator — all estimates use published
            standard rates. We do not rank or recommend processors based on
            commission rates.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-base font-normal text-[#0B1C3D]">
            5. RBA Regulatory Information
          </h2>
          <p className="mt-2">
            We provide information about the Reserve Bank of Australia&apos;s
            card surcharge reforms as a convenience. This information is sourced
            from public RBA materials and may not reflect the most current
            regulatory position.
          </p>
          <p className="mt-2">
            <strong className="text-[#0B1C3D]">
              Do not rely on this site for legal compliance advice.
            </strong>{" "}
            If you need to understand your obligations under the surcharge ban,
            consult the{" "}
            <a
              href="https://www.rba.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0B1C3D] underline underline-offset-2 hover:text-[#525252]"
            >
              RBA&apos;s official guidance
            </a>{" "}
            or seek independent legal advice.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-base font-normal text-[#0B1C3D]">
            6. Your Obligations
          </h2>
          <p className="mt-2">By using this site, you agree to:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Use it for lawful purposes only</li>
            <li>
              Not attempt to scrape, copy, or republish our fee data
              commercially
            </li>
            <li>
              Not misuse the email report feature (e.g. submitting false email
              addresses or using it to spam others)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-base font-normal text-[#0B1C3D]">
            7. Privacy
          </h2>
          <p className="mt-2">
            When you request an email report, we collect your email address to
            deliver it. We don&apos;t sell your data or share it with payment
            processors for marketing purposes. See our full{" "}
            <a
              href="/privacy"
              className="text-[#0B1C3D] underline underline-offset-2 hover:text-[#525252]"
            >
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-base font-normal text-[#0B1C3D]">
            8. Limitation of Liability
          </h2>
          <p className="mt-2">
            To the maximum extent permitted by law, SurchargeSwap and its
            operators are not liable for any direct, indirect, or consequential
            loss arising from your use of this site.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-base font-normal text-[#0B1C3D]">
            9. Governing Law
          </h2>
          <p className="mt-2">
            These terms are governed by the laws of New South Wales, Australia.
            Any disputes will be subject to the jurisdiction of the courts of
            New South Wales.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-base font-normal text-[#0B1C3D]">
            10. Contact
          </h2>
          <p className="mt-2">
            Questions about these terms? Contact us at:{" "}
            <a
              href="mailto:contact@surchargeswap.com.au"
              className="text-[#0B1C3D] underline underline-offset-2 hover:text-[#525252]"
            >
              contact@surchargeswap.com.au
            </a>
          </p>
        </section>

        <p className="border-t border-[#E5E5E0] pt-6 text-xs text-[#525252]">
          SurchargeSwap is an independent comparison service. We are not
          affiliated with any payment processor.
        </p>
      </div>

      <div className="mt-12 rounded-lg border border-[#E5E5E0] bg-[#F5F5F0] p-6 text-center">
        <p className="text-sm text-[#525252]">
          Ready to calculate your surcharge ban impact?
        </p>
        <a
          href="/"
          className="mt-3 inline-block rounded-md bg-[#0B1C3D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#525252]"
        >
          Use the free calculator →
        </a>
      </div>
    </div>
  );
}
