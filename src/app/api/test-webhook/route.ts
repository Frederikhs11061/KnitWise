import { NextRequest, NextResponse } from "next/server";
import { sendPatternEmail } from "@/lib/email";
import { generateOrderNumber } from "@/lib/user";
import { getPatternBySlug } from "@/lib/patterns";

/**
 * Test endpoint: Simulerer en Stripe webhook event uden Stripe.
 * POST /api/test-webhook
 * Body: { email: "din@email.dk", patternSlug: "hygge-sweater" }
 * 
 * Dette tester hele flowet: webhook → email + PDF, uden at Stripe skal sende noget.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, patternSlug = "hygge-sweater" } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Angiv email i body: { email: 'din@email.dk' }" },
        { status: 400 }
      );
    }

    const pattern = getPatternBySlug(patternSlug);
    if (!pattern) {
      return NextResponse.json(
        { error: `Pattern ikke fundet: ${patternSlug}` },
        { status: 400 }
      );
    }

    const orderNumber = generateOrderNumber();
    const purchaseItems = [
      {
        patternSlug: pattern.slug,
        patternName: pattern.name,
        quantity: 1,
        price: pattern.price,
      },
    ];

    console.log("Test webhook: Simulerer checkout.session.completed");
    console.log("Email:", email);
    console.log("Order:", orderNumber);
    console.log("Items:", purchaseItems);

    // Send email (samme som webhook gør)
    await sendPatternEmail({
      email,
      orderNumber,
      items: purchaseItems,
    });

    return NextResponse.json({
      success: true,
      message: "Test webhook kørt - email skulle være sendt",
      email,
      orderNumber,
      pattern: pattern.name,
    });
  } catch (error: any) {
    console.error("Test webhook error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Fejl i test webhook",
        details: error?.stack,
      },
      { status: 500 }
    );
  }
}
