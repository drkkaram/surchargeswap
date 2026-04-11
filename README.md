# SurchargeSwap

Free surcharge ban impact calculator for Australian businesses.

## What is this?

The RBA bans card surcharges for Visa, Mastercard and eftpos on **1 October 2026**. SurchargeSwap helps 436,000 affected businesses calculate their monthly dollar impact, compare payment processors, and plan their response.

## Features

- **Impact Calculator** — enter your revenue, card mix, surcharge rate, and MSF to see your exact monthly and annual impact
- **Processor Comparison** — compare Tyro, Zeller, Stripe, Pin Payments, and Square ranked by lowest cost
- **Repricing Analysis** — calculate the menu price increase needed to maintain margins
- **Amex Carve-out** — shows recoverable surcharge revenue from exempt Amex transactions
- **BNPL Analysis** — toggleable BNPL cost inclusion (Afterpay/Zip are exempt from the ban)
- **Interchange Module** — explains the RBA interchange reduction and which pricing models benefit
- **PDF Reports** — generate and email a full analysis report via Resend

## Tech Stack

- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS v4
- shadcn/ui
- React Hook Form + Zod
- jsPDF (client-side PDF)
- Resend (email delivery)

## Getting Started

```bash
cp .env.example .env.local
# Add your Resend API key to .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key for email delivery |
| `EMAIL_FROM` | No | Custom from address (must be verified in Resend) |

## Deployment

Designed for Vercel free tier:

```bash
npm run build
```

## License

All rights reserved. © 2026 SurchargeSwap.
