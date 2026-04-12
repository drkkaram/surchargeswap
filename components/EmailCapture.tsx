"use client";

import { useState, useCallback } from "react";
import type { CalculatorResult } from "@/lib/calculator";
import { formatCurrency } from "@/lib/calculator";
import { generateReportPdf } from "@/lib/pdf";

interface EmailCaptureProps {
  result: CalculatorResult;
}

function downloadPdf(result: CalculatorResult) {
  const base64 = generateReportPdf(result);
  const anchor = document.createElement("a");
  anchor.href = `data:application/pdf;base64,${base64}`;
  anchor.download = "surchargeswap-report.pdf";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export function EmailCapture({ result }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "fallback"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownload = useCallback(() => {
    downloadPdf(result);
  }, [result]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const pdfBase64 = generateReportPdf(result);

      const response = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          reportData: result,
          pdfBase64,
        }),
      });

      const data = (await response.json()) as {
        success: boolean;
        error?: string;
      };

      if (data.success) {
        setStatus("sent");
      } else {
        downloadPdf(result);
        setStatus("fallback");
        setErrorMessage(
          "Email failed — your PDF has been downloaded instead."
        );
      }
    } catch {
      downloadPdf(result);
      setStatus("fallback");
      setErrorMessage(
        "Email failed — your PDF has been downloaded instead."
      );
    }
  };

  if (status === "sent") {
    return (
      <div className="border border-[#22C55E]/30 bg-[#22C55E]/5 p-6 rounded-sm">
        <p className="text-sm font-semibold text-[#22C55E]">Report sent</p>
        <p className="mt-1 text-sm text-[#525252]">
          Check your inbox for your SurchargeSwap report with full analysis,
          processor comparison, interchange savings breakdown, and a 3-month
          switchover timeline.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[#E5E5E5] bg-white p-6 rounded-sm">
      <p className="text-base font-semibold text-[#0A0A0A]">
        Get your full analysis as a PDF
      </p>
      <p className="mt-1 text-sm text-[#525252]">
        We&apos;ll email you a PDF copy of your full calculation. No marketing list, no spam &mdash; report delivery only.
      </p>

      <button
        type="button"
        onClick={handleDownload}
        className="mt-4 w-full rounded-md bg-[#0A0A0A] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#525252] sm:w-auto"
      >
        Download PDF directly &darr;
      </button>

      <div className="mt-5 border-t border-[#E5E5E5] pt-5">
        <p className="text-sm text-[#525252]">
          …or email it to yourself &rarr;
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-3 flex gap-3 sm:flex-row flex-col"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            aria-label="Email address for report delivery"
            className="flex-1 rounded-md border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#0A0A0A] placeholder:text-[#525252]/50 focus:border-[#0EA5E9] focus:outline-none focus:ring-1 focus:ring-[#0EA5E9]"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-md bg-[#0EA5E9] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0284C7] disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send my report"}
          </button>
        </form>

        {(status === "error" || status === "fallback") && (
          <p
            className={`mt-2 text-sm ${status === "fallback" ? "text-[#525252]" : "text-[#EF4444]"}`}
          >
            {errorMessage}
          </p>
        )}
      </div>

      <div className="mt-4 border-t border-[#E5E5E5] pt-4">
        <p className="text-xs text-[#525252]">
          <span className="font-medium text-[#0A0A0A]">Coming soon:</span>{" "}
          Ongoing processor rate monitoring — we alert you when a cheaper deal appears.{" "}
          <a href="mailto:waitlist@surchargeswap.com.au?subject=Rate%20Monitor%20Waitlist" className="underline text-[#0EA5E9]">
            Join the waitlist →
          </a>
        </p>
      </div>

      <p className="mt-3 text-xs text-[#525252]">
        Includes: processor comparison, interchange saving breakdown, and a
        3-month switchover timeline. Estimated impact:{" "}
        <span className="font-mono font-semibold">
          {formatCurrency(result.netMonthlyImpact)}
        </span>
        /month.
      </p>
    </div>
  );
}
