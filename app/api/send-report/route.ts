import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { formatCurrency } from "@/lib/calculator";

export const dynamic = "force-dynamic";

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

    const textBody = [
      "Your SurchargeSwap Report",
      "========================",
      "",
      `Monthly card revenue: ${formatCurrency(reportData.inputs.monthlyCardRevenue)}`,
      `Card mix: Visa/MC ${reportData.inputs.visaMastercardPct}% | eftpos ${reportData.inputs.eftposPct}% | Amex ${reportData.inputs.amexPct}% | BNPL ${reportData.inputs.bnplPct}%`,
      `Surcharge rate: ${reportData.inputs.currentSurchargePct}%`,
      `MSF rate: ${reportData.inputs.currentMsfPct}%`,
      "",
      "MONTHLY IMPACT",
      `Surcharge revenue lost: -${formatCurrency(reportData.surchargeRevenueLost)}`,
      `Net monthly hit: -${formatCurrency(reportData.netMonthlyImpact)}`,
      `Annual equivalent: -${formatCurrency(reportData.annualImpact)}`,
      "",
      "AMEX (EXEMPT)",
      `Amex revenue: ${formatCurrency(reportData.amexRevenue)}/mo`,
      `Recoverable surcharge: ${formatCurrency(reportData.amexSurchargeRecovery)}/mo`,
      "",
      `Interchange saving (cost-plus): ${formatCurrency(reportData.interchangeSaving)}/mo`,
      "",
      "See the attached PDF for full processor comparison and repricing analysis.",
      "",
      "---",
      "SurchargeSwap — surchargeswap.com.au",
      "Not financial advice. Indicative rates only.",
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send report error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
