import jsPDF from "jspdf";
import {
  type CalculatorResult,
  formatCurrency,
  formatCurrencyDecimal,
} from "./calculator";

// ─── Brand tokens ───────────────────────────────────────────────────────────
const NAVY   = "#0B1C3D";
const ORANGE = "#E8651A";
const CREAM  = "#F5F5F0";
const BORDER = "#E5E5E0";
const BODY   = "#374151";
const MUTED  = "#6B7280";
const WHITE  = "#FFFFFF";
const GREEN  = "#065F46";

const RED_LIGHT = "#FEF2F2";
const RED_TEXT  = "#991B1B";

// RGB helper
function hex(h: string): [number, number, number] {
  const c = h.replace("#", "");
  return [
    parseInt(c.substring(0, 2), 16),
    parseInt(c.substring(2, 4), 16),
    parseInt(c.substring(4, 6), 16),
  ];
}

const PAGE_W   = 210; // A4 mm
const PAGE_H   = 297;
const MARGIN_L = 18;
const MARGIN_R = 18;
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R;

// ─── Layout engine ──────────────────────────────────────────────────────────
function createDoc() {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  let y = 0;
  let page = 1;

  // ── page overflow guard ──
  function ensureSpace(needed: number) {
    if (y + needed > PAGE_H - 20) {
      doc.addPage();
      page++;
      y = 20;
      drawPageFooter(doc, page);
    }
  }

  function gap(mm = 5) { y += mm; }

  // ── filled rectangle helper ──
  function fillRect(
    x: number, yy: number, w: number, h: number, fillHex: string,
    strokeHex?: string, radius = 0,
  ) {
    doc.setFillColor(...hex(fillHex));
    if (strokeHex) {
      doc.setDrawColor(...hex(strokeHex));
      doc.setLineWidth(0.2);
    }
    if (radius > 0) {
      doc.roundedRect(x, yy, w, h, radius, radius, strokeHex ? "FD" : "F");
    } else {
      doc.rect(x, yy, w, h, strokeHex ? "FD" : "F");
    }
  }

  // ── text helpers ──
  function heading1(text: string) {
    ensureSpace(10);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...hex(NAVY));
    doc.text(text, MARGIN_L, y);
    y += 7;
  }

  function heading2(text: string, accentColor = NAVY) {
    ensureSpace(10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...hex(accentColor));
    doc.text(text.toUpperCase(), MARGIN_L, y);
    // underline rule
    doc.setDrawColor(...hex(BORDER));
    doc.setLineWidth(0.3);
    doc.line(MARGIN_L, y + 1.5, PAGE_W - MARGIN_R, y + 1.5);
    y += 6;
  }

  function body(text: string, indent = 0, color = BODY, size = 9) {
    ensureSpace(6);
    doc.setFontSize(size);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hex(color));
    const lines = doc.splitTextToSize(text, CONTENT_W - indent) as string[];
    for (const line of lines) {
      ensureSpace(5);
      doc.text(line, MARGIN_L + indent, y);
      y += 4.5;
    }
  }

  function bodyBold(text: string, indent = 0, color = BODY) {
    ensureSpace(6);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...hex(color));
    doc.text(text, MARGIN_L + indent, y);
    y += 4.5;
  }

  function kv(label: string, value: string, labelColor = MUTED, valueColor = NAVY) {
    ensureSpace(6);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hex(labelColor));
    doc.text(label, MARGIN_L, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...hex(valueColor));
    doc.text(value, PAGE_W - MARGIN_R, y, { align: "right" });
    y += 4.5;
  }

  function checkpoint(text: string, indent = 4) {
    ensureSpace(6);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hex(BODY));
    // draw checkbox
    doc.setDrawColor(...hex(BORDER));
    doc.setLineWidth(0.3);
    doc.setFillColor(...hex(WHITE));
    doc.rect(MARGIN_L + indent, y - 3, 3, 3, "FD");
    doc.text(text, MARGIN_L + indent + 4.5, y - 0.8);
    y += 4.8;
  }

  function divider(color = BORDER) {
    doc.setDrawColor(...hex(color));
    doc.setLineWidth(0.2);
    doc.line(MARGIN_L, y, PAGE_W - MARGIN_R, y);
    y += 4;
  }

  return {
    doc, get y() { return y; }, set y(v) { y = v; },
    gap, ensureSpace, fillRect,
    heading1, heading2, body, bodyBold, kv, checkpoint, divider,
  };
}

// ─── Page header ────────────────────────────────────────────────────────────
function drawPageHeader(ctx: ReturnType<typeof createDoc>, generatedAt: string) {
  const { doc, fillRect } = ctx;

  // Navy header bar
  fillRect(0, 0, PAGE_W, 22, NAVY);

  // Brand name
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hex(WHITE));
  doc.text("SurchargeSwap", MARGIN_L, 13);

  // Report label (right-aligned)
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hex("#94A3B8"));
  doc.text("IMPACT ANALYSIS REPORT", PAGE_W - MARGIN_R, 10, { align: "right" });
  doc.text(generatedAt, PAGE_W - MARGIN_R, 15, { align: "right" });

  ctx.y = 28;
}

// ─── Page footer ────────────────────────────────────────────────────────────
function drawPageFooter(doc: jsPDF, page: number) {
  const footerY = PAGE_H - 8;
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hex(MUTED));
  doc.text("surchargeswap.com.au  ·  Not financial advice. Indicative estimates only.", MARGIN_L, footerY);
  doc.text(`Page ${page}`, PAGE_W - MARGIN_R, footerY, { align: "right" });
}

// ─── Hero impact banner ─────────────────────────────────────────────────────
function drawImpactHero(ctx: ReturnType<typeof createDoc>, result: CalculatorResult) {
  const { doc, fillRect, gap } = ctx;

  const bannerH = 28;
  fillRect(MARGIN_L, ctx.y, CONTENT_W, bannerH, RED_LIGHT, BORDER, 2);

  const midY = ctx.y + bannerH / 2;

  // Left: label
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hex(RED_TEXT));
  doc.text("ESTIMATED MONTHLY HIT", MARGIN_L + 6, midY - 4);

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hex(RED_TEXT));
  doc.text(`-${formatCurrency(result.netMonthlyImpact)}`, MARGIN_L + 6, midY + 4);

  // Right: annual
  const rx = PAGE_W - MARGIN_R - 6;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hex(RED_TEXT));
  doc.text("ANNUAL EQUIVALENT", rx, midY - 4, { align: "right" });
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text(`-${formatCurrency(result.annualImpact)}`, rx, midY + 4, { align: "right" });

  // Vertical divider
  doc.setDrawColor(...hex("#FCA5A5"));
  doc.setLineWidth(0.3);
  const divX = PAGE_W / 2;
  doc.line(divX, ctx.y + 5, divX, ctx.y + bannerH - 5);

  // Effective date note
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...hex(RED_TEXT));
  doc.text("Effective 1 October 2026 — Surcharge Ban (ACCC)", MARGIN_L + 6, ctx.y + bannerH - 3);

  ctx.y += bannerH;
  gap(6);
}

// ─── Inputs summary box ─────────────────────────────────────────────────────
function drawInputsBox(ctx: ReturnType<typeof createDoc>, result: CalculatorResult) {
  const { doc, fillRect, gap } = ctx;
  
  // Bug 1 fix: Calculate dynamic box height based on actual content
  const col1Items = 3; // Monthly revenue, Visa/MC, eftpos
  const col2Items = 4; // Amex, BNPL, Surcharge %, MSF %
  const maxRows = Math.max(col1Items, col2Items);
  const boxH = 5 + 5 + maxRows * 4.5 + 5; // topPad + headerH + rows + bottomPad
  
  fillRect(MARGIN_L, ctx.y, CONTENT_W, boxH, CREAM, BORDER, 2);
  ctx.y += 5;

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hex(NAVY));
  doc.text("YOUR INPUTS", MARGIN_L + 4, ctx.y);
  ctx.y += 5;

  const col1X = MARGIN_L + 4;
  const col2X = MARGIN_L + CONTENT_W / 2 + 4;
  const startY = ctx.y;

  // Column 1
  const inputs1: [string, string][] = [
    ["Monthly card revenue", formatCurrency(result.inputs.monthlyCardRevenue)],
    ["Visa / Mastercard", `${result.inputs.visaMastercardPct}%`],
    ["eftpos", `${result.inputs.eftposPct}%`],
  ];
  for (const [l, v] of inputs1) {
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hex(MUTED));
    doc.text(l, col1X, ctx.y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...hex(NAVY));
    doc.text(v, col1X + CONTENT_W / 2 - 12, ctx.y, { align: "right" });
    ctx.y += 4.5;
  }

  // Column 2
  ctx.y = startY;
  const inputs2: [string, string][] = [
    ["Amex", `${result.inputs.amexPct}%`],
    ["BNPL", `${result.inputs.bnplPct}%`],
    ["Current surcharge", `${result.inputs.currentSurchargePct}%`],
    ["Current MSF", `${result.inputs.currentMsfPct}%`], // Bug 2 fix: Added missing MSF row
  ];
  for (const [l, v] of inputs2) {
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hex(MUTED));
    doc.text(l, col2X, ctx.y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...hex(NAVY));
    doc.text(v, PAGE_W - MARGIN_R - 4, ctx.y, { align: "right" });
    ctx.y += 4.5;
  }

  // Bug 3 fix: Cursor now correctly accounts for all rows (inputs2 now has 4 items)
  const endY = startY + Math.max(inputs1.length, inputs2.length) * 4.5;
  ctx.y = endY + 4; // 4mm bottom padding inside box
  gap(6);
}

// ─── Processor comparison table ─────────────────────────────────────────────
function drawProcessorTable(ctx: ReturnType<typeof createDoc>, result: CalculatorResult) {
  const { doc, fillRect, gap, ensureSpace } = ctx;

  const cols = {
    rank:     { x: MARGIN_L,      w: 8  },
    name:     { x: MARGIN_L + 8,  w: 48 },
    rate:     { x: MARGIN_L + 56, w: 20 },
    monthly:  { x: MARGIN_L + 76, w: 30 },
    saving:   { x: MARGIN_L + 106, w: 30 },
    annual:   { x: MARGIN_L + 136, w: 38 },
  };

  const rowH = 7;

  // Header row
  ensureSpace(rowH + 2);
  fillRect(MARGIN_L, ctx.y, CONTENT_W, rowH, NAVY, undefined, 0);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hex(WHITE));
  const headers: [keyof typeof cols, string, "left" | "right"][] = [
    ["rank",    "#",           "left"],
    ["name",    "Processor",   "left"],
    ["rate",    "Rate",        "right"],
    ["monthly", "Monthly Cost","right"],
    ["saving",  "You Save/mo", "right"],
    ["annual",  "You Save/yr", "right"],
  ];
  for (const [key, label, align] of headers) {
    const col = cols[key];
    const tx = align === "right" ? col.x + col.w - 1 : col.x + 1;
    doc.text(label, tx, ctx.y + rowH - 2, { align });
  }
  ctx.y += rowH;

  // Data rows
  for (let i = 0; i < result.processorComparison.length; i++) {
    const comp = result.processorComparison[i];
    const isTop = i === 0;
    const rowBg = isTop ? "#EFF6FF" : i % 2 === 0 ? WHITE : CREAM;
    ensureSpace(rowH);
    fillRect(MARGIN_L, ctx.y, CONTENT_W, rowH, rowBg, BORDER, 0);

    doc.setFontSize(8);
    doc.setTextColor(...hex(NAVY));

    // Rank with medal for top
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...hex(isTop ? ORANGE : MUTED));
    doc.text(isTop ? "★" : `${comp.rank}`, cols.rank.x + 1, ctx.y + rowH - 2);

    // Name (+ model badge if top)
    doc.setFont("helvetica", isTop ? "bold" : "normal");
    doc.setTextColor(...hex(NAVY));
    let nameLabel = comp.processor.name;
    if (comp.processor.pricingModel === "interchange-plus" || comp.processor.pricingModel === "cost-plus") {
      nameLabel += " ⬡";
    }
    doc.text(nameLabel, cols.name.x + 1, ctx.y + rowH - 2);

    // Rate
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hex(BODY));
    doc.text(
      `${(comp.processor.rate * 100).toFixed(1)}%`,
      cols.rate.x + cols.rate.w - 1, ctx.y + rowH - 2, { align: "right" }
    );

    // Monthly cost
    doc.text(
      formatCurrency(comp.monthlyCost),
      cols.monthly.x + cols.monthly.w - 1, ctx.y + rowH - 2, { align: "right" }
    );

    // Saving/mo (green if positive)
    if (comp.monthlySaving > 0) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...hex(GREEN));
      doc.text(
        `+${formatCurrency(comp.monthlySaving)}`,
        cols.saving.x + cols.saving.w - 1, ctx.y + rowH - 2, { align: "right" }
      );
    } else {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...hex(MUTED));
      doc.text("—", cols.saving.x + cols.saving.w - 1, ctx.y + rowH - 2, { align: "right" });
    }

    // Annual saving
    if (comp.annualSaving > 0) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...hex(NAVY));
      doc.text(
        `+${formatCurrency(comp.annualSaving)}`,
        cols.annual.x + cols.annual.w - 1, ctx.y + rowH - 2, { align: "right" }
      );
    } else {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...hex(MUTED));
      doc.text("—", cols.annual.x + cols.annual.w - 1, ctx.y + rowH - 2, { align: "right" });
    }

    ctx.y += rowH;
  }

  // legend note below table
  gap(3);
  doc.setFontSize(7);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...hex(MUTED));
  doc.text("⬡ = interchange-plus or cost-plus pricing (true cost transparency).  ★ = recommended option.", MARGIN_L, ctx.y);
  ctx.y += 4;
  gap(4);
}

// ─── 3-phase action plan ─────────────────────────────────────────────────────
function drawActionPlan(ctx: ReturnType<typeof createDoc>, result: CalculatorResult) {
  const { doc, fillRect, checkpoint, gap, ensureSpace } = ctx;

  const phases: { label: string; timing: string; tasks: string[] }[] = [
    {
      label: "Phase 1 — Research",
      timing: "Do this week",
      tasks: [
        "Confirm your current MSF rate on your latest merchant statement",
        "Check your POS supports selective surcharging by card network",
        `Request quotes from the top 2 processors above`,
      ],
    },
    {
      label: "Phase 2 — Application",
      timing: "4–6 weeks out",
      tasks: [
        "Submit merchant application to chosen processor",
        "Arrange terminal delivery and software setup",
        "Brief your accountant on the effective date and cost impact",
        "Test new terminal in a low-risk period",
      ],
    },
    {
      label: "Phase 3 — Go Live",
      timing: "Before 1 October 2026",
      tasks: [
        "Update POS settings — remove Visa/MC/eftpos surcharge",
        result.amexRevenue > 0
          ? `Keep Amex surcharge active — still permitted, worth ${formatCurrency(result.amexSurchargeRecovery)}/mo`
          : "Keep Amex surcharge active if applicable (Amex is exempt from ban)",
        "Train staff on new payment flow",
        "Monitor first merchant statement to confirm new rates",
      ],
    },
  ];

  for (let i = 0; i < phases.length; i++) {
    const ph = phases[i];
    ensureSpace(12 + ph.tasks.length * 5.5);

    // Phase header pill
    fillRect(MARGIN_L, ctx.y, CONTENT_W, 8, i === 2 ? ORANGE : NAVY, undefined, 1);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...hex(WHITE));
    doc.text(ph.label, MARGIN_L + 4, ctx.y + 5.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...hex(i === 2 ? "#FEE2B3" : "#94A3B8"));
    doc.text(ph.timing, PAGE_W - MARGIN_R - 4, ctx.y + 5.5, { align: "right" });
    ctx.y += 10;

    for (const task of ph.tasks) {
      checkpoint(task, 2);
    }
    gap(4);
  }
}

// ─── Side-by-side stat boxes ─────────────────────────────────────────────────
function drawStatBoxes(ctx: ReturnType<typeof createDoc>, stats: { label: string; value: string; sub?: string; accent?: boolean }[]) {
  const { doc, fillRect, gap, ensureSpace } = ctx;
  const n = stats.length;
  const boxW = (CONTENT_W - (n - 1) * 3) / n;
  const boxH = 18;
  ensureSpace(boxH + 4);

  for (let i = 0; i < n; i++) {
    const s = stats[i];
    const bx = MARGIN_L + i * (boxW + 3);
    fillRect(bx, ctx.y, boxW, boxH, s.accent ? "#FFF7ED" : CREAM, BORDER, 2);

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hex(MUTED));
    doc.text(s.label.toUpperCase(), bx + boxW / 2, ctx.y + 5, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...hex(s.accent ? ORANGE : NAVY));
    doc.text(s.value, bx + boxW / 2, ctx.y + 13, { align: "center" });

    if (s.sub) {
      doc.setFontSize(6.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...hex(MUTED));
      doc.text(s.sub, bx + boxW / 2, ctx.y + 17, { align: "center" });
    }
  }

  ctx.y += boxH;
  gap(5);
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function generateReportPdf(result: CalculatorResult): string {
  const ctx = createDoc();
  const { doc, gap, heading2, body, kv, divider } = ctx;

  const now = new Date();
  const generatedAt = now.toLocaleDateString("en-AU", {
    day: "numeric", month: "long", year: "numeric",
  });

  // ── PAGE 1 ──────────────────────────────────────────────────────────────
  drawPageHeader(ctx, generatedAt);
  drawPageFooter(doc, 1);

  // Impact hero banner
  drawImpactHero(ctx, result);

  // Inputs box
  drawInputsBox(ctx, result);

  // Monthly breakdown section
  heading2("Monthly Impact Breakdown");

  kv("Covered card revenue",    formatCurrency(result.coveredCardRevenue) + "/mo");
  kv("Surcharge revenue lost",  `-${formatCurrency(result.surchargeRevenueLost)}/mo`, MUTED, "#991B1B");
  kv("Net monthly hit",         `-${formatCurrency(result.netMonthlyImpact)}/mo`,     MUTED, "#991B1B");
  kv("Annual equivalent",       `-${formatCurrency(result.annualImpact)}/yr`,          MUTED, "#991B1B");
  gap(6);

  // Offset opportunities
  heading2("Offset Opportunities");

  drawStatBoxes(ctx, [
    {
      label: "Amex Surcharge Recovery",
      value: `${formatCurrency(result.amexSurchargeRecovery)}/mo`,
      sub: `on ${formatCurrency(result.amexRevenue)}/mo Amex volume`,
      accent: true,
    },
    {
      label: "Interchange Saving",
      value: `${formatCurrency(result.interchangeSaving)}/mo`,
      sub: "switching to cost-plus pricing",
    },
    {
      label: "Repricing Offset",
      value: `+${result.requiredPriceIncreasePct.toFixed(2)}%`,
      sub: "required price increase",
    },
  ]);

  // Amex detail
  if (result.amexRevenue > 0) {
    body(
      `Amex is exempt from the surcharge ban. You can continue surcharging Amex at ${result.inputs.currentSurchargePct}% after October 2026, ` +
      `recovering ${formatCurrency(result.amexSurchargeRecovery)}/mo (${formatCurrency(result.amexSurchargeRecovery * 12)}/yr).`,
      0, BODY
    );
    gap(3);
  }

  // BNPL
  if (result.inputs.includeBnpl && result.bnplRevenue > 0) {
    body(
      `BNPL volume: ${formatCurrency(result.bnplRevenue)}/mo at ~4.5% MSF = ${formatCurrency(result.bnplMsfCost)}/mo absorbed cost.`,
      0, BODY
    );
    gap(3);
  }

  // Repricing
  body(
    `To fully offset the monthly impact through price increases: +${result.requiredPriceIncreasePct.toFixed(2)}% across all items. ` +
    `A $20.00 item → ${formatCurrencyDecimal(20 * (1 + result.requiredPriceIncreasePct / 100))}. ` +
    `A $5.00 item → ${formatCurrencyDecimal(5 * (1 + result.requiredPriceIncreasePct / 100))}.`,
    0, BODY
  );
  gap(6);

  // ── PAGE 2 ──────────────────────────────────────────────────────────────
  ctx.ensureSpace(60);

  heading2("Processor Comparison");
  drawProcessorTable(ctx, result);

  // Top pick callout
  const top = result.processorComparison[0];
  if (top) {
    const { doc: d, fillRect } = ctx;
    ctx.ensureSpace(20);
    fillRect(MARGIN_L, ctx.y, CONTENT_W, 16, "#EFF6FF", "#BFDBFE", 2);
    d.setFontSize(8);
    d.setFont("helvetica", "bold");
    d.setTextColor(...hex(NAVY));
    d.text(`★ Recommended: ${top.processor.name}`, MARGIN_L + 4, ctx.y + 6);
    d.setFont("helvetica", "normal");
    d.setFontSize(7.5);
    d.setTextColor(...hex(BODY));
    const topNote = top.monthlySaving > 0
      ? `Saves you ${formatCurrency(top.monthlySaving)}/mo (${formatCurrency(top.annualSaving)}/yr) vs your current setup. ${top.processor.bestFor}`
      : `${top.processor.bestFor}`;
    const topNoteLines = d.splitTextToSize(topNote, CONTENT_W - 8) as string[];
    d.text(topNoteLines, MARGIN_L + 4, ctx.y + 12);
    const calloutH = Math.max(18, 10 + topNoteLines.length * 4.5);
    ctx.y += calloutH;
    gap(5);
  }

  // Action plan
  heading2("Your 3-Phase Switchover Plan", ORANGE);
  drawActionPlan(ctx, result);

  // ── Disclaimer ──────────────────────────────────────────────────────────
  gap(4);
  divider();
  doc.setFontSize(7);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...hex(MUTED));
  const disclaimer =
    "This report is for informational purposes only and does not constitute financial, legal, or tax advice. " +
    "All figures are estimates based on the inputs provided. Processor rates are indicative and subject to change — " +
    "verify current rates directly with each provider before making any decisions. " +
    "Generated by SurchargeSwap — surchargeswap.com.au";
  const disclaimerLines = doc.splitTextToSize(disclaimer, CONTENT_W) as string[];
  for (const line of disclaimerLines) {
    ctx.ensureSpace(4);
    doc.text(line, MARGIN_L, ctx.y);
    ctx.y += 3.5;
  }

  return doc.output("datauristring").split(",")[1];
}
