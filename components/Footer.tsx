import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#E2E8F0] bg-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="font-mono text-sm font-bold tracking-tighter text-[#0F172A]">
              SurchargeSwap
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#374151]">
              Free surcharge impact calculator for Australian businesses
              preparing for the RBA ban on 1 October 2026.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0F172A]">Tools</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <Link href="/" className="text-sm text-[#374151] hover:text-[#0F172A]">Surcharge Calculator</Link>
              <Link href="/compare" className="text-sm text-[#374151] hover:text-[#0F172A]">Processor Comparison</Link>
            </nav>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0F172A]">Industries</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <Link href="/cafe" className="text-sm text-[#374151] hover:text-[#0F172A]">Cafes</Link>
              <Link href="/restaurant" className="text-sm text-[#374151] hover:text-[#0F172A]">Restaurants</Link>
              <Link href="/retail" className="text-sm text-[#374151] hover:text-[#0F172A]">Retail</Link>
            </nav>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0F172A]">Resources</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <Link href="/guide" className="text-sm text-[#374151] hover:text-[#0F172A]">Complete Guide</Link>
              <Link href="/enforcement-faq" className="text-sm text-[#374151] hover:text-[#0F172A]">Enforcement FAQ</Link>
            </nav>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0F172A]">Contact</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <a href="mailto:hello@surchargeswap.com.au" className="text-sm text-[#374151] hover:text-[#0F172A]">hello@surchargeswap.com.au</a>
              <a href="mailto:concierge@surchargeswap.com.au" className="text-sm text-[#374151] hover:text-[#0F172A]">Concierge service</a>
            </nav>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0F172A]">Legal</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <Link href="/privacy" className="text-sm text-[#374151] hover:text-[#0F172A]">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-[#374151] hover:text-[#0F172A]">Terms of Use</Link>
              <Link href="/affiliate-disclosure" className="text-sm text-[#374151] hover:text-[#0F172A]">Affiliate Disclosure</Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-[#E2E8F0] pt-6">
          <p className="text-xs leading-relaxed text-[#374151]">
            Not financial advice. Indicative rates only &mdash; verify with your
            processor before making decisions. Surcharge laws vary by state;
            consult a payment specialist. &copy; 2026 SurchargeSwap. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
