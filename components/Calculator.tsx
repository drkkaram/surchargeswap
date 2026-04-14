"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import posthog from "posthog-js";
import { useForm } from "react-hook-form";
import { calculateResult } from "@/lib/calculator";
import type { CalculatorResult } from "@/lib/calculator";
import { OutputImpact } from "./OutputImpact";
import { OutputCompare } from "./OutputCompare";
import { OutputReprice } from "./OutputReprice";
import { EmailCapture } from "./EmailCapture";

interface FormValues {
  monthlyCardRevenue: number;
  visaMastercardPct: number;
  eftposPct: number;
  amexPct: number;
  bnplPct: number;
  currentSurchargePct: number;
  currentMsfPct: number;
}

interface CalculatorProps {
  initialValues?: Partial<FormValues>;
  /** If true, auto-submit the form on mount after populating initialValues */
  autoSubmit?: boolean;
}

const CARD_MIX_PRESETS = [
  { label: "Café", vm: 65, ep: 25, am: 5, bn: 5 },
  { label: "Restaurant", vm: 60, ep: 20, am: 15, bn: 5 },
  { label: "Retail", vm: 70, ep: 20, am: 7, bn: 3 },
  { label: "Custom", vm: null, ep: null, am: null, bn: null },
];

function buildShareUrl(result: CalculatorResult): string {
  if (typeof window === "undefined") return "";
  const p = new URLSearchParams({
    rev: String(result.inputs.monthlyCardRevenue),
    vm: String(result.inputs.visaMastercardPct),
    ep: String(result.inputs.eftposPct),
    am: String(result.inputs.amexPct),
    bn: String(result.inputs.bnplPct),
    sc: String(result.inputs.currentSurchargePct),
    msf: String(result.inputs.currentMsfPct),
  });
  return `${window.location.origin}/?${p.toString()}`;
}

type OutputPath = "impact" | "compare" | "reprice";

function validateForm(data: FormValues): Record<string, string> | null {
  const errors: Record<string, string> = {};

  if (!data.monthlyCardRevenue || data.monthlyCardRevenue <= 0) {
    errors.monthlyCardRevenue = "Enter your monthly card revenue";
  }

  if (data.currentMsfPct < 0) errors.currentMsfPct = "Cannot be negative";
  if (data.currentMsfPct > 10) errors.currentMsfPct = "Cannot exceed 10%";

  const fields: (keyof FormValues)[] = [
    "visaMastercardPct",
    "eftposPct",
    "amexPct",
    "bnplPct",
  ];
  for (const f of fields) {
    const val = data[f];
    if (val < 0) errors[f] = "Cannot be negative";
    if (val > 100) errors[f] = "Cannot exceed 100";
  }

  if (data.currentSurchargePct < 0)
    errors.currentSurchargePct = "Cannot be negative";
  if (data.currentSurchargePct > 10)
    errors.currentSurchargePct = "Cannot exceed 10%";

  return Object.keys(errors).length > 0 ? errors : null;
}

export function Calculator({ initialValues, autoSubmit }: CalculatorProps) {
  const [outputPath, setOutputPath] = useState<OutputPath>("impact");
  const [showResult, setShowResult] = useState(false);
  const [includeBnpl, setIncludeBnpl] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [mixError, setMixError] = useState<string | null>(null);
  const cardMixRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    watch,
    getValues,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      monthlyCardRevenue: initialValues?.monthlyCardRevenue ?? 50000,
      visaMastercardPct: initialValues?.visaMastercardPct ?? 70,
      eftposPct: initialValues?.eftposPct ?? 20,
      amexPct: initialValues?.amexPct ?? 8,
      bnplPct: initialValues?.bnplPct ?? 2,
      currentSurchargePct: initialValues?.currentSurchargePct ?? 1.5,
      currentMsfPct: initialValues?.currentMsfPct ?? 1.7,
    },
  });

  // On mount: if initialValues were passed (from URL params), push them into the form
  // and optionally auto-submit so the user sees results immediately.
  useEffect(() => {
    if (!initialValues) return;
    const fields: (keyof FormValues)[] = [
      "monthlyCardRevenue",
      "visaMastercardPct",
      "eftposPct",
      "amexPct",
      "bnplPct",
      "currentSurchargePct",
      "currentMsfPct",
    ];
    fields.forEach((key) => {
      if (initialValues[key] !== undefined) {
        setValue(key, initialValues[key] as number);
      }
    });
    if (autoSubmit && formRef.current) {
      // Small delay to ensure setValue has flushed before submit
      setTimeout(() => {
        formRef.current?.requestSubmit();
      }, 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const watchedValues = watch();
  const cardMixTotal =
    (Number(watchedValues.visaMastercardPct) || 0) +
    (Number(watchedValues.eftposPct) || 0) +
    (Number(watchedValues.amexPct) || 0) +
    (Number(watchedValues.bnplPct) || 0);
  const isMixValid = cardMixTotal === 100;

  const result = useMemo(() => {
    if (!showResult) return null;
    const vals = watchedValues;
    return calculateResult({
      monthlyCardRevenue: Number(vals.monthlyCardRevenue),
      visaMastercardPct: Number(vals.visaMastercardPct),
      eftposPct: Number(vals.eftposPct),
      amexPct: Number(vals.amexPct),
      bnplPct: Number(vals.bnplPct),
      currentSurchargePct: Number(vals.currentSurchargePct),
      currentMsfPct: Number(vals.currentMsfPct),
      includeBnpl,
    });
  }, [showResult, watchedValues, includeBnpl]);

  const handlePresetClick = useCallback(
    (preset: (typeof CARD_MIX_PRESETS)[number]) => {
      setActivePreset(preset.label);
      setMixError(null);
      if (preset.vm !== null) {
        setValue("visaMastercardPct", preset.vm);
        setValue("eftposPct", preset.ep!);
        setValue("amexPct", preset.am!);
        setValue("bnplPct", preset.bn!);
      }
    },
    [setValue]
  );

  const handleCalculate = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const raw = getValues();
      const vals: FormValues = {
        monthlyCardRevenue: Number(raw.monthlyCardRevenue),
        visaMastercardPct: Number(raw.visaMastercardPct),
        eftposPct: Number(raw.eftposPct),
        amexPct: Number(raw.amexPct),
        bnplPct: Number(raw.bnplPct),
        currentSurchargePct: Number(raw.currentSurchargePct),
        currentMsfPct: Number(raw.currentMsfPct),
      };

      // Always validate card mix totals 100% (even when accordion is closed)
      const currentTotal =
        vals.visaMastercardPct +
        vals.eftposPct +
        vals.amexPct +
        vals.bnplPct;
      if (currentTotal !== 100) {
        setMixError(
          `Card mix is currently ${currentTotal}% (needs to add up to 100%)`
        );
        setShowResult(false);
        // Open the accordion so the user can see the error
        setAdvancedOpen(true);
        setTimeout(() => {
          if (cardMixRef.current) {
            cardMixRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 50);
        return;
      }

      const errs = validateForm(vals);
      if (errs) {
        setFormErrors(errs);
        setMixError(null);
        setShowResult(false);
        return;
      }

      setIsCalculating(true);
      setMixError(null);
      setTimeout(() => {
        setFormErrors({});
        setShowResult(true);
        setOutputPath("impact");
        const rev = vals.monthlyCardRevenue;
        const revBracket =
          rev < 25000
            ? "under-25k"
            : rev < 50000
              ? "25k-50k"
              : rev < 100000
                ? "50k-100k"
                : rev < 250000
                  ? "100k-250k"
                  : "over-250k";
        posthog.capture("calculator_result", {
          revenue_bracket: revBracket,
          output_path: "impact",
          vm_pct: vals.visaMastercardPct,
          eftpos_pct: vals.eftposPct,
          amex_pct: vals.amexPct,
          bnpl_pct: vals.bnplPct,
          surcharge_pct: vals.currentSurchargePct,
          msf_pct: vals.currentMsfPct,
        });
        setIsCalculating(false);
        if (typeof window !== "undefined" && window.innerWidth < 768) {
          setTimeout(() => {
            const el = document.getElementById("calculator-output");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }, 50);
    },
    [getValues, advancedOpen]
  );

  const pathOptions: { value: OutputPath; label: string }[] = [
    { value: "impact", label: "My damage" },
    { value: "compare", label: "Switch processor" },
    { value: "reprice", label: "Reprice my menu" },
  ];

  return (
    <div className="space-y-8">
      {/* Form Card */}
      <form
        ref={formRef}
        onSubmit={handleCalculate}
        className="space-y-6 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-7 sm:p-10 shadow-[0_4px_24px_rgba(37,99,235,0.06)]"
      >
        {/* Field 1: Monthly card revenue */}
        <div>
          <label
            htmlFor="monthlyCardRevenue"
            className="block text-sm font-medium text-[#0F172A]"
          >
            Monthly card revenue
          </label>
          <p className="mt-0.5 text-xs text-[#737373]">
            Total card sales per month, not cash. Find it in your{" "}
            <strong className="font-medium text-[#374151]">merchant portal</strong>:{" "}
            Square Dashboard &rsaquo; Reports &rsaquo; Sales,{" "}
            Tyro &rsaquo; Merchant Portal &rsaquo; Transactions,{" "}
            Stripe &rsaquo; Balance &rsaquo; Payouts,{" "}
            or your bank&apos;s EFTPOS statement under &ldquo;Total card sales&rdquo;.
            If you&apos;re not sure, check last month&apos;s merchant fee invoice — your total is usually printed there.
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#6B7280]">
              $
            </span>
            <input
              id="monthlyCardRevenue"
              type="number"
              step="1"
              inputMode="numeric"
              {...register("monthlyCardRevenue", { valueAsNumber: true })}
              className="w-full rounded-md border border-[#E2E8F0] bg-white py-3 pl-7 pr-4 text-base text-[#0F172A] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            />
          </div>
          {formErrors.monthlyCardRevenue && (
            <p className="mt-1.5 text-xs text-[#DC2626]">
              {formErrors.monthlyCardRevenue}
            </p>
          )}
        </div>

        {/* Field 2: MSF */}
        <div>
          <label
            htmlFor="currentMsfPct"
            className="block text-sm font-medium text-[#0F172A]"
          >
            Merchant fee (MSF %)
          </label>
          <p className="mt-0.5 text-xs text-[#737373]">
            The percentage your processor charges <em>you</em> per transaction (not what you charge customers).
            Usually 1.3–1.9%. Find it on your{" "}
            <strong className="font-medium text-[#374151]">monthly merchant fee invoice</strong> — look for
            &ldquo;MSF rate&rdquo;, &ldquo;blended rate&rdquo;, or &ldquo;service fee %&rdquo;.
            Not sure? Log in to your processor&apos;s dashboard:{" "}
            Square &rsaquo; Account &amp; Settings &rsaquo; Pricing,{" "}
            Tyro &rsaquo; Rates &amp; Fees,{" "}
            Stripe &rsaquo; Settings &rsaquo; Pricing.
            If you can&apos;t find it, 1.7% is a safe default.
          </p>
          <div className="relative mt-2">
            <input
              id="currentMsfPct"
              type="number"
              step="0.1"
              inputMode="decimal"
              {...register("currentMsfPct", { valueAsNumber: true })}
              className="w-full rounded-md border border-[#E2E8F0] bg-white py-3 pl-3 pr-8 text-base text-[#0F172A] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#6B7280]">
              %
            </span>
          </div>
          {formErrors.currentMsfPct && (
            <p className="mt-1.5 text-xs text-[#DC2626]">
              {formErrors.currentMsfPct}
            </p>
          )}
        </div>

        {/* Advanced settings accordion */}
        <div className="border-t border-[#E2E8F0] pt-4">
          <button
            type="button"
            onClick={() => setAdvancedOpen(!advancedOpen)}
            className="flex w-full items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#0F172A]"
          >
            <svg
              className={`h-4 w-4 transition-transform ${advancedOpen ? "rotate-90" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            Customise card mix &amp; surcharge rate
            <span className="text-xs font-normal text-[#737373]">
              (uses café defaults if skipped)
            </span>
          </button>

          {advancedOpen && (
            <div className="mt-4 space-y-5">
              {/* Card mix section */}
              <div
                ref={cardMixRef}
                className={`space-y-4 rounded-xl p-5 transition-colors ${
                  mixError
                    ? "border-2 border-[#DC2626] bg-[#FEF2F2]"
                    : "border border-[#E2E8F0] bg-white"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">
                      Card mix
                    </p>
                    <p className="text-xs text-[#737373]">
                      What % of card payments come from each type?
                    </p>
                  </div>
                  <p
                    className={`flex items-center gap-1 font-mono text-sm font-semibold ${
                      isMixValid ? "text-[#16A34A]" : "text-[#DC2626]"
                    }`}
                  >
                    {cardMixTotal}%
                    {isMixValid && (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </p>
                </div>

                {mixError && (
                  <div className="flex items-center gap-2 rounded-md bg-[#DC2626]/10 px-3 py-2">
                    <svg
                      className="h-4 w-4 shrink-0 text-[#DC2626]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                    <p className="text-sm font-medium text-[#DC2626]">
                      {mixError}
                    </p>
                  </div>
                )}

                {/* Presets */}
                <div className="flex flex-wrap gap-2">
                  {CARD_MIX_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                        activePreset === preset.label
                          ? "bg-[#2563EB] text-white"
                          : "border border-[#E2E8F0] bg-white text-[#6B7280] hover:border-[#2563EB] hover:text-[#2563EB]"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      {
                        name: "visaMastercardPct" as const,
                        label: "Visa / Mastercard",
                      },
                      { name: "eftposPct" as const, label: "eftpos" },
                      { name: "amexPct" as const, label: "Amex" },
                      {
                        name: "bnplPct" as const,
                        label: "BNPL (Afterpay / Zip)",
                      },
                    ] as const
                  ).map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm text-[#6B7280]"
                      >
                        {field.label}
                      </label>
                      <div className="relative mt-1">
                        <input
                          id={field.name}
                          type="number"
                          step="1"
                          inputMode="numeric"
                          {...register(field.name, { valueAsNumber: true })}
                          onChange={(e) => {
                            register(field.name, {
                              valueAsNumber: true,
                            }).onChange(e);
                            setActivePreset("Custom");
                            setMixError(null);
                          }}
                          className="w-full rounded-md border border-[#E2E8F0] bg-white py-3 pl-3 pr-8 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]">
                          %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Surcharge rate */}
              <div>
                <label
                  htmlFor="currentSurchargePct"
                  className="block text-sm font-medium text-[#6B7280]"
                >
                  Surcharge rate you currently charge
                </label>
                <p className="mt-0.5 text-xs text-[#737373]">
                  The % surcharge you currently add to customer bills. Usually 1 to 1.5%. This is the revenue you&apos;ll lose when the ban kicks in.
                </p>
                <div className="relative mt-1.5">
                  <input
                    id="currentSurchargePct"
                    type="number"
                    step="0.1"
                    inputMode="decimal"
                    {...register("currentSurchargePct", {
                      valueAsNumber: true,
                    })}
                    className="w-full rounded-md border border-[#E2E8F0] bg-white py-3 pl-3 pr-8 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]">
                    %
                  </span>
                </div>
                {formErrors.currentSurchargePct && (
                  <p className="mt-1 text-xs text-[#DC2626]">
                    {formErrors.currentSurchargePct}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Calculate button — always enabled */}
        <button
          type="submit"
          disabled={isCalculating}
          className="w-full rounded-lg bg-[#2563EB] py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#1D4ED8] disabled:opacity-50"
        >
          <span className={isCalculating ? "animate-pulse" : ""}>
            {isCalculating ? "Calculating..." : "Calculate my impact"}
          </span>
        </button>
      </form>

      {/* Results */}
      {result && (
        <div
          id="calculator-output"
          className="space-y-6 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-7 sm:p-10 shadow-[0_4px_24px_rgba(37,99,235,0.06)]"
        >
          {/* What do you want to do — tabs ABOVE output */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#6B7280]">
              What do you want to do about it?
            </p>
            <div className="flex flex-wrap gap-2">
              {pathOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setOutputPath(opt.value)}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    outputPath === opt.value
                      ? "bg-[#2563EB] text-white"
                      : "border border-[#E2E8F0] bg-white text-[#6B7280] hover:border-[#2563EB] hover:text-[#2563EB]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-[#E2E8F0]" />

          {/* Active output */}
          {outputPath === "impact" && (
            <OutputImpact
              result={result}
              includeBnpl={includeBnpl}
              onToggleBnpl={setIncludeBnpl}
            />
          )}
          {outputPath === "compare" && <OutputCompare result={result} />}
          {outputPath === "reprice" && <OutputReprice result={result} />}

          {/* Email capture */}
          <EmailCapture result={result} />

          {/* Share section */}
          <div className="flex flex-col gap-2 border-t border-[#E2E8F0] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">Share with your accountant</p>
              <p className="mt-0.5 text-xs text-[#6B7280]">
                They&apos;ll see your exact numbers and results.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const url = buildShareUrl(result);
                navigator.clipboard.writeText(url).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                });
              }}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:bg-[#F8FAFC] hover:border-[#CBD5E1]"
            >
              {copied ? (
                <>
                  <svg className="h-4 w-4 text-[#16A34A]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.06a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.5 8.25" />
                  </svg>
                  Copy link
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-[#737373]">
            Estimates only. Actual fees depend on your specific merchant
            agreement and card mix. Verify with your processor before making
            decisions.
          </p>
        </div>
      )}
    </div>
  );
}
