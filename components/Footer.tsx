import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#E5E5E5] bg-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="font-mono text-sm font-bold tracking-tighter text-[#0A0A0A]">
              SurchargeSwap
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#525252]">
              Free surcharge impact calculator for Australian businesses
              preparing for the RBA ban on 1 October 2026.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0A0A0A]">Tools</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <Link href="/" className="text-sm text-[#525252] hover:text-[#0A0A0A]">Surcharge Calculator</Link>
              <Link href="/compare" className="text-sm text-[#525252] hover:text-[#0A0A0A]">Processor Comparison</Link>
            </nav>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0A0A0A]">Industries</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <Link href="/cafe" className="text-sm text-[#525252] hover:text-[#0A0A0A]">Cafes</Link>
              <Link href="/restaurant" className="text-sm text-[#525252] hover:text-[#0A0A0A]">Restaurants</Link>
              <Link href="/retail" className="text-sm text-[#525252] hover:text-[#0A0A0A]">Retail</Link>
            </nav>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0A0A0A]">Resources</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <Link href="/guide" className="text-sm text-[#525252] hover:text-[#0A0A0A]">Complete Guide</Link>
              <Link href="/enforcement-faq" className="text-sm text-[#525252] hover:text-[#0A0A0A]">Enforcement FAQ</Link>
            </nav>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0A0A0A]">Contact</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <a href="mailto:hello@surchargeswap.com.au" className="text-sm text-[#525252] hover:text-[#0A0A0A]">hello@surchargeswap.com.au</a>
              <a href="mailto:concierge@surchargeswap.com.au" className="text-sm text-[#525252] hover:text-[#0A0A0A]">Concierge service</a>
            </nav>
          </div>
          <div>
            <p className="text-sm font-medium text-[#0A0A0A]">Legal</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <Link href="/privacy" className="text-sm text-[#525252] hover:text-[#0A0A0A]">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-[#525252] hover:text-[#0A0A0A]">Terms of Use</Link>
              <Link href="/affiliate-disclosure" className="text-sm text-[#525252] hover:text-[#0A0A0A]">Affiliate Disclosure</Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-[#E5E5E5] pt-6">
          <p className="text-xs leading-relaxed text-[#525252]">
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
