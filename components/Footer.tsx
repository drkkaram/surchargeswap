import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#1E293B] bg-[#0F172A]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="font-sans text-sm font-bold tracking-wide text-white">
              Surcharge<span className="text-[#F97316]">Swap</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Free surcharge impact calculator for Australian businesses
              preparing for the RBA ban on 1 October 2026.
            </p>
          </div>
          <div>
            <p className="text-slate-200 text-xs uppercase tracking-widest">Tools</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Surcharge Calculator</Link>
              <Link href="/compare" className="text-sm text-slate-400 hover:text-white transition-colors">Processor Comparison</Link>
            </nav>
          </div>
          <div>
            <p className="text-slate-200 text-xs uppercase tracking-widest">Industries</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <Link href="/cafe" className="text-sm text-slate-400 hover:text-white transition-colors">Cafes</Link>
              <Link href="/restaurant" className="text-sm text-slate-400 hover:text-white transition-colors">Restaurants</Link>
              <Link href="/retail" className="text-sm text-slate-400 hover:text-white transition-colors">Retail</Link>
            </nav>
          </div>
          <div>
            <p className="text-slate-200 text-xs uppercase tracking-widest">Resources</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <Link href="/guide" className="text-sm text-slate-400 hover:text-white transition-colors">Complete Guide</Link>
              <Link href="/enforcement-faq" className="text-sm text-slate-400 hover:text-white transition-colors">Enforcement FAQ</Link>
            </nav>
          </div>
          <div>
            <p className="text-slate-200 text-xs uppercase tracking-widest">Contact</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <a href="mailto:hello@surchargeswap.com.au" className="text-sm text-slate-400 hover:text-white transition-colors">hello@surchargeswap.com.au</a>
              <a href="mailto:concierge@surchargeswap.com.au" className="text-sm text-slate-400 hover:text-white transition-colors">Concierge service</a>
            </nav>
          </div>
          <div>
            <p className="text-slate-200 text-xs uppercase tracking-widest">Legal</p>
            <nav className="mt-2 flex flex-col gap-1.5">
              <Link href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Use</Link>
              <Link href="/affiliate-disclosure" className="text-sm text-slate-400 hover:text-white transition-colors">Affiliate Disclosure</Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t border-[#1E293B] pt-6">
          <p className="text-xs leading-relaxed text-slate-500">
            Not financial advice. Indicative rates only, verify with your
            processor before making decisions. Surcharge laws vary by state,
            consult a payment specialist. &copy; 2026 SurchargeSwap. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
