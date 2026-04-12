"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-tighter text-[#0A0A0A]"
        >
          SurchargeSwap
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-[#525252] transition-colors hover:text-[#0A0A0A]"
          >
            Calculator
          </Link>
          <Link
            href="/compare"
            className="text-sm font-medium text-[#525252] transition-colors hover:text-[#0A0A0A]"
          >
            Compare
          </Link>
          <Link
            href="/guide"
            className="text-sm font-medium text-[#525252] transition-colors hover:text-[#0A0A0A]"
          >
            Guide
          </Link>
          <Link
            href="/#calculator"
            className="rounded-md bg-[#0EA5E9] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0284C7]"
          >
            Calculate now →
          </Link>
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1 p-2 -mr-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-[#0A0A0A] transition-transform ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-[#0A0A0A] transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-[#0A0A0A] transition-transform ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#E5E5E5] px-6 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-[#525252]"
              onClick={() => setMobileOpen(false)}
            >
              Calculator
            </Link>
            <Link
              href="/compare"
              className="text-sm font-medium text-[#525252]"
              onClick={() => setMobileOpen(false)}
            >
              Compare
            </Link>
            <Link
              href="/guide"
              className="text-sm font-medium text-[#525252]"
              onClick={() => setMobileOpen(false)}
            >
              Guide
            </Link>
            <Link
              href="/#calculator"
              className="inline-block rounded-md bg-[#0EA5E9] px-4 py-2 text-center text-sm font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              Calculate now →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
