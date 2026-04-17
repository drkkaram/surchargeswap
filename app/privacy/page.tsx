import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SurchargeSwap privacy policy. How we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#F5F5F0]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-[#0B1C3D] sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-[#525252]">
          Last updated: April 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#525252]">
          <div>
            <h2 className="font-serif text-lg font-normal text-[#0B1C3D]">
              What we collect
            </h2>
            <p className="mt-2">
              The SurchargeSwap calculator runs entirely in your browser. We do
              not store your financial inputs (revenue, card mix, rates) on our
              servers. Your calculation data never leaves your device unless you
              choose to send yourself a report via email.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-normal text-[#0B1C3D]">
              Email reports
            </h2>
            <p className="mt-2">
              If you request a PDF report, we collect your email address solely
              to deliver the report. We use Resend as our email delivery
              provider. Your email address is not added to any marketing list,
              sold, or shared with third parties. We do not send marketing
              emails. The only email you will receive is your requested report.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-normal text-[#0B1C3D]">
              Analytics
            </h2>
            <p className="mt-2">
              We use privacy-respecting analytics to understand how people use
              the tool. This includes page views, calculator usage counts, and
              general geographic region. We do not track individual users, use
              cookies for advertising, or create user profiles.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-normal text-[#0B1C3D]">
              Affiliate links
            </h2>
            <p className="mt-2">
              Our processor comparison pages contain affiliate links. When you
              click these links, the destination processor may set cookies to
              attribute your visit to SurchargeSwap. We earn a referral
              commission if you complete a switch. This does not affect the
              rates or terms offered to you.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-normal text-[#0B1C3D]">
              Your rights
            </h2>
            <p className="mt-2">
              Under the Australian Privacy Act 1988, you have the right to
              access, correct, or request deletion of any personal information
              we hold. Since we hold minimal data (email addresses for report
              recipients only), contact us at privacy@surchargeswap.com.au to
              exercise these rights.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-normal text-[#0B1C3D]">Contact</h2>
            <p className="mt-2">
              For privacy-related inquiries: privacy@surchargeswap.com.au
            </p>
          </div>
        </div>
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
