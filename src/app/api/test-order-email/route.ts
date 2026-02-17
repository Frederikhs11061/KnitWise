import { NextRequest, NextResponse } from "next/server";
import { sendPatternEmail } from "@/lib/email";
import { generateOrderNumber } from "@/lib/user";
import { getPatternBySlug } from "@/lib/patterns";

/**
 * Test endpoint: send the REAL order email (with PDF) without Stripe.
 * GET /api/test-order-email?email=din@email.dk
 * Optional: ?slug=hygge-sweater (default: first pattern)
 * Use this to verify the full email+PDF flow works. Remove or restrict in production.
 */
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  const slug = request.nextUrl.searchParams.get("slug") || "hygge-sweater";

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      {
        error: "Angiv email med ?email=din@email.dk",
        example: "https://stichofcare.vercel.app/api/test-order-email?email=din@email.dk",
      },
      { status: 400 }
    );
  }

  const pattern = getPatternBySlug(slug);
  if (!pattern) {
    return NextResponse.json(
      { error: "Opskrift ikke fundet. Brug fx ?slug=hygge-sweater" },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY er ikke sat i Vercel.", hasResendKey: false },
      { status: 500 }
    );
  }

  const orderNumber = generateOrderNumber();
  const items = [
    {
      patternSlug: pattern.slug,
      patternName: pattern.name,
      quantity: 1,
    },
  ];

  try {
    await sendPatternEmail({
      email,
      orderNumber,
      items,
    });
    return NextResponse.json({
      success: true,
      message: "Ordre-mail (med PDF) sendt til " + email,
      orderNumber,
      pattern: pattern.name,
    });
  } catch (err: any) {
    console.error("test-order-email error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Kunne ikke sende ordre-mail",
      },
      { status: 500 }
    );
  }
}
