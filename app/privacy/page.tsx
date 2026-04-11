import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SurchargeSwap privacy policy. How we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-[#0A0A0A] sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-[#525252]">
          Last updated: April 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#525252]">
          <div>
            <h2 className="text-lg font-semibold text-[#0A0A0A]">
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
            <h2 className="text-lg font-semibold text-[#0A0A0A]">
              Email reports
            </h2>
            <p className="mt-2">
              If you request a PDF report, we collect your email address solely
              to deliver the report. We use Resend as our email delivery
              provider. Your email address is not added to any marketing list,
              sold, or shared with third parties. We may send a single follow-up
              email with additional resources relevant to the surcharge ban.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#0A0A0A]">
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
            <h2 className="text-lg font-semibold text-[#0A0A0A]">
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
            <h2 className="text-lg font-semibold text-[#0A0A0A]">
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
            <h2 className="text-lg font-semibold text-[#0A0A0A]">Contact</h2>
            <p className="mt-2">
              For privacy-related inquiries: privacy@surchargeswap.com.au
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
