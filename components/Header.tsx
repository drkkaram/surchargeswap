"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1E293B] bg-[#0F172A]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-sans text-lg font-bold tracking-wide text-white"
        >
          Surcharge<span className="text-[#F97316]">Swap</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-white"
          >
            Calculator
          </Link>
          <Link
            href="/compare"
            className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-white"
          >
            Compare
          </Link>
          <Link
            href="/guide"
            className="text-sm font-medium text-[#94A3B8] transition-colors hover:text-white"
          >
            Guide
          </Link>
          <Link
            href="/#calculator"
            className="rounded-xl bg-[#2563EB] px-4 py-2 text-sm font-medium text-white shadow-sm shadow-[#2563EB]/20 transition-colors hover:bg-[#1D4ED8]"
          >
            Calculate now
          </Link>
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1 p-2 -mr-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-white transition-transform ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-transform ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#1E293B] px-6 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-[#94A3B8]"
              onClick={() => setMobileOpen(false)}
            >
              Calculator
            </Link>
            <Link
              href="/compare"
              className="text-sm font-medium text-[#94A3B8]"
              onClick={() => setMobileOpen(false)}
            >
              Compare
            </Link>
            <Link
              href="/guide"
              className="text-sm font-medium text-[#94A3B8]"
              onClick={() => setMobileOpen(false)}
            >
              Guide
            </Link>
            <Link
              href="/#calculator"
              className="inline-block rounded-xl bg-[#2563EB] px-4 py-2 text-center text-sm font-medium text-white shadow-sm shadow-[#2563EB]/20"
              onClick={() => setMobileOpen(false)}
            >
              Calculate now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
