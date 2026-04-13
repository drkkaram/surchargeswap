"use client";

import type { CalculatorResult } from "@/lib/calculator";
import { formatCurrency } from "@/lib/calculator";
import { BNPLToggle } from "./BNPLToggle";

interface OutputImpactProps {
  result: CalculatorResult;
  includeBnpl: boolean;
  onToggleBnpl: (value: boolean) => void;
}

export function OutputImpact({
  result,
  includeBnpl,
  onToggleBnpl,
}: OutputImpactProps) {
  const totalMonthly = includeBnpl
    ? result.netMonthlyImpact + result.bnplMsfCost
    : result.netMonthlyImpact;
  const totalAnnual = totalMonthly * 12;

  return (
    <div className="space-y-6">
      {/* Hero number - dominant, unmissable */}
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-[#374151]">
          Your monthly impact{includeBnpl ? " (incl. BNPL)" : ""}
        </p>
        <p className="mt-2 font-mono text-5xl font-bold tracking-tight text-[#DC2626] sm:text-6xl">
          -{formatCurrency(totalMonthly)}
          <span className="text-2xl sm:text-3xl">/mo</span>
        </p>
        <p className="mt-2 text-lg text-[#374151] sm:text-xl">
          That&apos;s{" "}
          <span className="font-mono font-semibold text-[#DC2626]">
            -{formatCurrency(totalAnnual)}
          </span>{" "}
          per year
        </p>
        {totalMonthly === 0 && (
          <p className="mt-3 text-sm font-medium text-[#16A34A]">
            ✓ No surcharge revenue to lose: your card fees are already fully absorbed.
          </p>
        )}
      </div>

      {/* Breakdown */}
      <div className="space-y-3 rounded-xl bg-slate-50 p-5 border-0">
        <p className="text-xs font-medium uppercase tracking-widest text-[#374151]">
          Breakdown
        </p>
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-[#374151]">
            Surcharge revenue you&apos;ll stop collecting
          </p>
          <p className="font-mono text-base font-semibold text-[#DC2626]">
            -{formatCurrency(result.surchargeRevenueLost)}
          </p>
        </div>
        <div className="mt-3 border-t border-[#E2E8F0] pt-3">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[#6B7280]">
            Context
          </p>
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-[#374151]">
              MSF you continue paying (not new, was offset by surcharge)
            </p>
            <p className="font-mono text-base font-semibold text-[#6B7280]">
              {formatCurrency(result.msfToAbsorb)}/mo
            </p>
          </div>
          <p className="mt-1 text-xs text-[#6B7280]">
            This fee existed before the ban. Your surcharge covered it. This is shown for context only. It is not included in your impact figure above.
          </p>
        </div>

        {includeBnpl && (
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-[#374151]">BNPL MSF cost (ongoing)</p>
            <p className="font-mono text-base font-semibold text-[#DC2626]">
              -{formatCurrency(result.bnplMsfCost)}
            </p>
          </div>
        )}
      </div>

      <p className="text-xs italic text-[#374151]">
        Estimates based on your inputs. Actual impact depends on your merchant
        agreement. Verify with your processor.
      </p>

      <div className="rounded-xl bg-slate-50 p-5 border-0">
        <p className="text-sm font-semibold text-[#0F172A]">
          Amex surcharging: still permitted
        </p>
        <p className="mt-1 text-sm leading-relaxed text-[#374151]">
          American Express operates as a three-party scheme and is not
          designated by the RBA under the surcharge ban. The October 2026 ban
          does not apply to Amex. You can continue surcharging Amex
          transactions regardless of your business size.{" "}
          <span className="text-xs text-[#6B7280]">
            (As confirmed in the RBA Conclusions Paper, March 2026. Check{" "}
            <a
              href="https://www.rba.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              rba.gov.au
            </a>{" "}
            for updates.)
          </span>
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#374151]">
          Ensure your POS supports selective surcharging by card network. Your
          recoverable Amex surcharge:{" "}
          <span className="font-mono font-semibold text-[#16A34A]">
            {formatCurrency(result.amexSurchargeRecovery)}
          </span>
          /mo (based on{" "}
          <span className="font-mono font-semibold text-[#0F172A]">
            {formatCurrency(result.amexRevenue)}
          </span>
          /mo Amex revenue).
        </p>
      </div>

      {result.inputs.monthlyCardRevenue >= 500000 && (
        <div className="rounded-xl border border-[#A855F7]/30 bg-[#A855F7]/5 p-5">
          <p className="text-sm font-semibold text-[#7C3AED]">
            High-volume business? Let us handle the switch.
          </p>
          <p className="mt-1 text-sm text-[#374151]">
            Running $500K+/month in card revenue means a processor switch is
            worth thousands per year. We offer a $299 concierge service: we
            handle the application, merchant setup, and switchover timeline for
            you.
          </p>
          <a
            href="mailto:concierge@surchargeswap.com.au?subject=Concierge%20Switch%20Enquiry"
            className="mt-3 inline-block rounded-md bg-[#7C3AED] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#6D28D9]"
          >
            Enquire about concierge switching
          </a>
        </div>
      )}

      <hr className="border-[#E2E8F0]" />

      <BNPLToggle
        bnplRevenue={result.bnplRevenue}
        bnplMsfCost={result.bnplMsfCost}
        includeBnpl={includeBnpl}
        onToggle={onToggleBnpl}
      />
    </div>
  );
}
