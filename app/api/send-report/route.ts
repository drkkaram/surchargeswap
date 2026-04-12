import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { formatCurrency } from "@/lib/calculator";

export const dynamic = "force-dynamic";

// Simple in-memory rate limiter: max 3 requests per IP per 60 seconds
const ipRequestMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

function pruneRateLimitMap() {
  if (ipRequestMap.size < 500) return;
  const now = Date.now();
  for (const [key, val] of ipRequestMap) {
    if (now > val.resetAt) ipRequestMap.delete(key);
  }
}

const requestSchema = z.object({
  email: z.string().email("Invalid email address"),
  reportData: z.object({
    inputs: z.object({
      monthlyCardRevenue: z.number(),
      visaMastercardPct: z.number(),
      eftposPct: z.number(),
      amexPct: z.number(),
      bnplPct: z.number(),
      currentSurchargePct: z.number(),
      currentMsfPct: z.number(),
      includeBnpl: z.boolean(),
    }),
    coveredCardRevenue: z.number(),
    surchargeRevenueLost: z.number(),
    msfToAbsorb: z.number(),
    netMonthlyImpact: z.number(),
    annualImpact: z.number(),
    amexRevenue: z.number(),
    amexSurchargeRecovery: z.number(),
    bnplRevenue: z.number(),
    bnplMsfCost: z.number(),
    interchangeSaving: z.number(),
    processorComparison: z.array(
      z.object({
        processor: z.object({
          id: z.string(),
          name: z.string(),
          rate: z.number(),
          monthlyFee: z.number(),
          terminalCost: z.number(),
          contract: z.string(),
          bestFor: z.string(),
          affiliateHref: z.string(),
          pricingModel: z.enum(["flat", "cost-plus", "interchange-plus"]),
          lastVerified: z.string(),
        }),
        monthlyCost: z.number(),
        monthlySaving: z.number(),
        annualSaving: z.number(),
        rank: z.number(),
      })
    ),
    requiredPriceIncreasePct: z.number(),
    annualRepriceRevenue: z.number(),
  }),
  pdfBase64: z.string(),
});

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    // Prune stale rate limit entries to prevent memory leaks
    pruneRateLimitMap();

    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body: unknown = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid request data" },
        { status: 400 }
      );
    }

    const { email, reportData, pdfBase64 } = parsed.data;

    const subject = `Your SurchargeSwap Report — estimated impact ${formatCurrency(reportData.netMonthlyImpact)}/month`;

    const top3 = reportData.processorComparison.slice(0, 3);
    const processorLines = top3.map((c, i) => {
      const saving = c.monthlySaving > 0 ? ` — saves ${formatCurrency(c.monthlySaving)}/mo` : "";
      const lockIn = c.processor.contract.toLowerCase().includes("12 month") ? " [12-month lock-in]" : "";
      return `  ${i + 1}. ${c.processor.name} (~${(c.processor.rate * 100).toFixed(1)}%${lockIn})${saving}`;
    }).join("\n");

    const textBody = [
      "YOUR SURCHARGESWAP ANALYSIS",
      "===========================",
      "",
      `Prepared for: ${email}`,
      `Monthly card revenue: ${formatCurrency(reportData.inputs.monthlyCardRevenue)}`,
      "",
      "EXECUTIVE SUMMARY",
      `-----------------`,
      `From 1 October 2026, your estimated monthly hit: -${formatCurrency(reportData.netMonthlyImpact)}`,
      `Annual equivalent: -${formatCurrency(reportData.annualImpact)}`,
      "",
      "TOP 3 PROCESSOR OPTIONS (ranked by savings)",
      "--------------------------------------------",
      processorLines,
      "",
      "AMEX — STILL PERMITTED",
      "----------------------",
      `You can continue surcharging Amex after October 2026.`,
      `Your recoverable Amex surcharge: ${formatCurrency(reportData.amexSurchargeRecovery)}/mo`,
      `(Based on ${formatCurrency(reportData.amexRevenue)}/mo Amex revenue at ${reportData.inputs.currentSurchargePct}% surcharge)`,
      "",
      "YOUR 3-PHASE SWITCHOVER CHECKLIST",
      "----------------------------------",
      "PHASE 1 — Research (Do this week)",
      "  [ ] Confirm your current MSF rate on your latest merchant statement",
      "  [ ] Check your POS provider supports selective surcharging by card network",
      "  [ ] Request quotes from top 2 processors above",
      "",
      "PHASE 2 — Application (4–6 weeks out from switch)",
      "  [ ] Submit merchant application to chosen processor",
      "  [ ] Arrange terminal delivery / software setup",
      "  [ ] Brief your accountant on the effective date and cost impact",
      "  [ ] Test new terminal in a low-risk period",
      "",
      "PHASE 3 — Go Live (before 1 October 2026)",
      "  [ ] Update POS surcharging settings (remove Visa/MC/eftpos surcharge)",
      "  [ ] Keep Amex surcharge active if applicable",
      "  [ ] Train staff on new payment flow",
      "  [ ] Monitor first merchant statement to confirm new rates are applied",
      "",
      "INTERCHANGE SAVING OPPORTUNITY",
      "-------------------------------",
      `Switching to cost-plus/interchange-plus pricing could save an additional`,
      `${formatCurrency(reportData.interchangeSaving)}/mo on Visa/Mastercard transactions.`,
      `Ask your new processor about interchange-plus pricing when applying.`,
      "",
      "---",
      "Generated by SurchargeSwap — surchargeswap.com.au",
      "Not financial advice. Estimates based on your inputs. Verify rates with your processor.",
      "The attached PDF contains your full processor comparison table.",
    ].join("\n");

    let resend: Resend;
    try {
      resend = getResendClient();
    } catch {
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 503 }
      );
    }

    const { error } = await resend.emails.send({
      from:
        process.env.EMAIL_FROM ??
        "SurchargeSwap <reports@surchargeswap.com.au>",
      to: email,
      subject,
      text: textBody,
      attachments: [
        {
          filename: "surchargeswap-report.pdf",
          content: pdfBase64,
          contentType: "application/pdf",
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Add to Resend Contacts audience
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      try {
        await resend.contacts.create({
          audienceId,
          email,
          unsubscribed: false,
        });
      } catch (contactErr) {
        console.error("Resend contact create failed:", contactErr);
      }
    }

    // PostHog: track email capture with anonymised business profile
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (posthogKey) {
      try {
        const { PostHog } = await import("posthog-node");
        const ph = new PostHog(posthogKey, {
          host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
          flushAt: 1,
          flushInterval: 0,
        });
        const rev = reportData.inputs.monthlyCardRevenue;
        const revBracket =
          rev < 25000 ? "under-25k" :
          rev < 50000 ? "25k-50k" :
          rev < 100000 ? "50k-100k" :
          rev < 250000 ? "100k-250k" : "over-250k";
        ph.capture({
          distinctId: email,
          event: "email_captured",
          properties: {
            revenue_bracket: revBracket,
            net_monthly_impact: Math.round(reportData.netMonthlyImpact),
            annual_impact: Math.round(reportData.annualImpact),
            top_processor: reportData.processorComparison[0]?.processor.id ?? "unknown",
            top_processor_saving: Math.round(reportData.processorComparison[0]?.monthlySaving ?? 0),
            msf_pct: reportData.inputs.currentMsfPct,
            surcharge_pct: reportData.inputs.currentSurchargePct,
          },
        });
        await ph.shutdown();
      } catch (phErr) {
        console.error("PostHog email_captured event failed:", phErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send report error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
