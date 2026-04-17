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
          "Email failed. Your PDF has been downloaded instead."
        );
      }
    } catch {
      downloadPdf(result);
      setStatus("fallback");
      setErrorMessage(
        "Email failed. Your PDF has been downloaded instead."
      );
    }
  };

  if (status === "sent") {
    return (
      <div className="bg-[#D1FAE5] border-l-4 border-[#16A34A] pl-6 p-6 rounded-md">
        <p className="text-sm font-semibold text-[#065F46]">Report sent</p>
        <p className="mt-1 text-sm text-[#4A5568]">
          Check your inbox for your SurchargeSwap report with full analysis,
          processor comparison, interchange savings breakdown, and a 3-month
          switchover timeline.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setEmail("");
          }}
          className="mt-3 text-xs font-medium text-[#065F46] underline hover:text-[#0B1C3D]"
        >
          Send to another address
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F0] rounded-md border border-[#E5E5E0] p-6">
      <p className="text-base font-semibold text-[#0B1C3D]">
        Get your full analysis as a PDF
      </p>
      <p className="mt-1 text-sm text-[#4A5568]">
        We&apos;ll email you a PDF copy of your full calculation. No marketing list, no spam, report delivery only.
      </p>

      <button
        type="button"
        onClick={handleDownload}
        className="mt-4 w-full rounded-md bg-[#0B1C3D] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#374151] sm:w-auto"
      >
        Download PDF report
      </button>

      <div className="mt-5 border-t border-[#E5E5E0] pt-5">
        <p className="text-sm text-[#4A5568]">
          Or email it to yourself:
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
            className="flex-1 rounded-md border border-[#E5E5E0] bg-white px-4 py-2.5 text-sm text-[#0B1C3D] placeholder:text-[#6B7280] focus:border-[#E8651A] focus:outline-none focus:ring-1 focus:ring-[#E8651A]/30"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-md bg-[#E8651A] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#C4541A] disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send my report"}
          </button>
        </form>

        {(status === "error" || status === "fallback") && (
          <p
            className={`mt-2 text-sm ${status === "fallback" ? "text-[#4A5568]" : "text-[#DC2626]"}`}
          >
            {errorMessage}
          </p>
        )}
      </div>

      <div className="mt-4 border-t border-[#E5E5E0] pt-4">
        <p className="text-xs text-[#4A5568]">
          <span className="font-medium text-[#0B1C3D]">Coming soon:</span>{" "}
          Ongoing processor rate monitoring: we alert you when a cheaper deal appears.{" "}
          <a href="mailto:waitlist@surchargeswap.com.au?subject=Rate%20Monitor%20Waitlist" className="underline text-[#E8651A]">
            Join the waitlist
          </a>
        </p>
      </div>

      <p className="mt-3 text-xs text-[#4A5568]">
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
