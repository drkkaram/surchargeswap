import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#1E293B] bg-[#0F172A]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Top grid — brand + nav columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand — takes 2 cols on mobile, 3 on sm, 1 on lg */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="font-sans text-sm font-bold tracking-wide text-white">
              Surcharge<span className="text-[#F97316]">Swap</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Free surcharge impact calculator for Australian businesses
              preparing for the RBA ban on 1 Oct 2026.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Tools</p>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/" className="text-sm text-slate-400 transition-colors hover:text-white">Surcharge Calculator</Link>
              <Link href="/compare" className="text-sm text-slate-400 transition-colors hover:text-white">Processor Comparison</Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Industries</p>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/cafe" className="text-sm text-slate-400 transition-colors hover:text-white">Cafes</Link>
              <Link href="/restaurant" className="text-sm text-slate-400 transition-colors hover:text-white">Restaurants</Link>
              <Link href="/retail" className="text-sm text-slate-400 transition-colors hover:text-white">Retail</Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Resources</p>
            <nav className="mt-3 flex flex-col gap-2">
              <Link href="/guide" className="text-sm text-slate-400 transition-colors hover:text-white">Complete Guide</Link>
              <Link href="/enforcement-faq" className="text-sm text-slate-400 transition-colors hover:text-white">Enforcement FAQ</Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Contact</p>
            <nav className="mt-3 flex flex-col gap-2">
              <a
                href="mailto:hello@surchargeswap.com.au"
                className="break-all text-sm text-slate-400 transition-colors hover:text-white"
              >
                hello@surchargeswap.com.au
              </a>
              <a
                href="mailto:concierge@surchargeswap.com.au"
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                Concierge service
              </a>
              <Link href="/privacy" className="text-sm text-slate-400 transition-colors hover:text-white">Privacy</Link>
              <Link href="/terms" className="text-sm text-slate-400 transition-colors hover:text-white">Terms</Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-[#1E293B] pt-6">
          <p className="text-xs leading-relaxed text-slate-600">
            Not financial advice. Indicative rates only — verify with your processor before making decisions.
            Surcharge laws vary by state; consult a payment specialist. &copy; 2026 SurchargeSwap.
          </p>
        </div>
      </div>
    </footer>
  );
}
