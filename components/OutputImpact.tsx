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

  // Show the Amex-callout whenever the business has ANY Amex volume (not an
  // arbitrary >5% threshold) so businesses with small but non-zero Amex share
  // still see the recovery opportunity.
  const hasAmexRevenue = result.inputs.amexPct > 0;
  const hasBnplRevenue = result.bnplRevenue > 0;

  return (
    <div className="space-y-6">
      {/* Hero number - dominant, unmissable */}
      <div className="text-center" aria-live="polite">
        <p className="text-xs font-medium uppercase tracking-widest text-[#4A5568]">
          Your monthly impact{includeBnpl ? " (incl. BNPL)" : ""}
        </p>
        <p className="mt-2 font-mono text-5xl font-bold tracking-tight text-[#DC2626] sm:text-6xl">
          -{formatCurrency(totalMonthly)}
          <span className="text-2xl sm:text-3xl">/mo</span>
        </p>
        <p className="mt-2 text-lg text-[#4A5568] sm:text-xl">
          That&apos;s{" "}
          <span className="font-mono font-semibold text-[#DC2626]">
            -{formatCurrency(totalAnnual)}
          </span>{" "}
          per year
        </p>
        {totalMonthly === 0 && (
          <p className="mt-3 text-sm font-medium text-[#16A34A]">
            No surcharge revenue to lose: your card fees are already fully absorbed.
          </p>
        )}
      </div>

      {/* Amex callout — positive framing: Amex IS still permitted */}
      {hasAmexRevenue && (
        <div
          className="mt-3 rounded-md border border-[#E8651A]/30 bg-[#FFF8F4] p-4 text-sm text-[#0B1C3D]"
          role="note"
          aria-label="Amex surcharging still permitted"
        >
          <p className="font-semibold text-[#E8651A] mb-1">Amex revenue detected — you can still surcharge it.</p>
          <p className="text-sm text-[#4A5568]">
            American Express is not covered by the October 2026 ban. You can continue surcharging Amex at your actual cost of acceptance. Your recoverable Amex surcharge:{" "}
            <span className="font-mono font-semibold text-[#16A34A]">{formatCurrency(result.amexSurchargeRecovery)}/mo</span>.
          </p>
        </div>
      )}

      {/* Breakdown */}
      <div className="space-y-3 rounded-md bg-[#F5F5F0] border border-[#E5E5E0] p-5">
        <p className="text-xs font-medium uppercase tracking-widest text-[#4A5568]">
          Breakdown
        </p>
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-[#4A5568]">
            Surcharge revenue you&apos;ll stop collecting
          </p>
          <p className="font-mono text-base font-semibold text-[#DC2626]">
            -{formatCurrency(result.surchargeRevenueLost)}
          </p>
        </div>
        <div className="mt-3 border-t border-[#E5E5E0] pt-3">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[#6B7280]">
            Context
          </p>
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-[#4A5568]">
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
            <p className="text-sm text-[#4A5568]">BNPL MSF cost (ongoing)</p>
            <p className="font-mono text-base font-semibold text-[#DC2626]">
              -{formatCurrency(result.bnplMsfCost)}
            </p>
          </div>
        )}
      </div>

      <p className="text-xs italic text-[#4A5568]">
        Estimates based on your inputs. Actual impact depends on your merchant
        agreement. Verify with your processor.
      </p>

      {!hasAmexRevenue && (
        <div className="rounded-md bg-[#F5F5F0] border border-[#E5E5E0] p-5">
          <p className="text-sm font-semibold text-[#0B1C3D]">
            Amex surcharging: still permitted
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#4A5568]">
            American Express is a three-party scheme, not covered by the October 2026 ban. You can continue surcharging Amex at your actual cost.{" "}
            <a
              href="https://www.rba.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#E8651A] hover:text-[#C4541A]"
            >
              RBA Conclusions Paper, March 2026
            </a>.
          </p>
        </div>
      )}

      {result.inputs.monthlyCardRevenue >= 500000 && (
        <div className="rounded-md border border-[#E8651A]/30 bg-[#FFF8F4] p-5">
          <p className="text-sm font-semibold text-[#E8651A]">
            High-volume business? Let us handle the switch.
          </p>
          <p className="mt-1 text-sm text-[#4A5568]">
            Running $500K+/month in card revenue means a processor switch is
            worth thousands per year. We offer a $299 concierge service: we
            handle the application, merchant setup, and switchover timeline for
            you.
          </p>
          <a
            href="mailto:concierge@surchargeswap.com.au?subject=Concierge%20Switch%20Enquiry"
            className="mt-3 inline-block rounded-md bg-[#E8651A] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#C4541A]"
          >
            Enquire about concierge switching
          </a>
        </div>
      )}

      {hasBnplRevenue && (
        <>
          <hr className="border-[#E5E5E0]" />
          <BNPLToggle
            bnplRevenue={result.bnplRevenue}
            bnplMsfCost={result.bnplMsfCost}
            includeBnpl={includeBnpl}
            onToggle={onToggleBnpl}
          />
        </>
      )}
    </div>
  );
}
