import { type NextRequest, NextResponse } from "next/server";
import { PROCESSORS } from "@/lib/calculator";
import { PostHog } from "posthog-node";

function getPostHogClient(): PostHog | null {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;
  return new PostHog(key, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ processor: string }> }
) {
  const { processor: processorId } = await params;
  const proc = PROCESSORS.find((p) => p.id === processorId);

  if (!proc) {
    return NextResponse.redirect(new URL("/compare", request.url));
  }

  const ph = getPostHogClient();
  if (ph) {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "anonymous";
    const referer = request.headers.get("referer") ?? "";
    ph.capture({
      distinctId: `anon-${ip}`,
      event: "affiliate_click",
      properties: {
        processor_id: processorId,
        processor_name: proc.name,
        referer,
        $ip: ip,
      },
    });
    await ph.shutdown();
  }

  return NextResponse.redirect(proc.affiliateHref, { status: 302 });
}
