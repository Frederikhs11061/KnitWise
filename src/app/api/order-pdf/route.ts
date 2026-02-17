import { NextRequest, NextResponse } from "next/server";

async function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY not configured");
  const Stripe = (await import("stripe")).default;
  return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" });
}

/**
 * GET /api/order-pdf?session_id=cs_xxx&slug=hygge-sweater
 * Returnerer PDF for én opskrift hvis session er betalt og slug er i ordren.
 */
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");
    const slug = request.nextUrl.searchParams.get("slug");

    if (!sessionId || !slug) {
      return NextResponse.json(
        { error: "Mangler session_id eller slug" },
        { status: 400 }
      );
    }

    const stripe = await getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Betaling ikke gennemført" },
        { status: 403 }
      );
    }

    let patternSlugs: Array<{ slug: string; quantity: number }> = [];
    if (session.metadata?.patternSlugs) {
      try {
        patternSlugs = JSON.parse(session.metadata.patternSlugs);
      } catch {
        return NextResponse.json({ error: "Ugyldig ordre-data" }, { status: 400 });
      }
    }

    const allowed = patternSlugs.some((p) => p.slug === slug);
    if (!allowed) {
      return NextResponse.json(
        { error: "Opskriften findes ikke i denne ordre" },
        { status: 403 }
      );
    }

    const { generatePatternPDF } = await import("@/lib/pdf");
    const buffer = await generatePatternPDF(slug);
    if (!buffer || buffer.length < 100) {
      console.error("order-pdf: PDF buffer for slug", slug, "is empty or too small:", buffer?.length);
      return NextResponse.json(
        { error: "Kunne ikke generere PDF – buffer tom" },
        { status: 500 }
      );
    }
    const { getPatternBySlug } = await import("@/lib/patterns");
    const pattern = getPatternBySlug(slug);
    const filename = `${pattern?.name || slug}.pdf`.replace(/\s+/g, "-");

    const body = new Uint8Array(buffer.length);
    body.set(buffer);
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(body.length),
      },
    });
  } catch (error: any) {
    console.error("order-pdf error:", error);
    return NextResponse.json(
      { error: error?.message || "Kunne ikke hente PDF" },
      { status: 500 }
    );
  }
}
