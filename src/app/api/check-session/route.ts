import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Dynamic import to avoid build errors if Stripe is not installed
async function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }
  const Stripe = (await import("stripe")).default;
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });
}

/**
 * Debug endpoint: Vis hvad der er i en Stripe session.
 * GET /api/check-session?session_id=cs_test_...
 * 
 * Brug dette til at se om session'en har customer_email og metadata når betalingen er gennemført.
 */
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Angiv session_id: ?session_id=cs_test_..." },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe ikke konfigureret" },
        { status: 500 }
      );
    }

    const stripe = await getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer"],
    });

    return NextResponse.json({
      sessionId,
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      customer_details: (session as any).customer_details,
      customer: session.customer,
      metadata: session.metadata,
      mode: session.mode,
      status: session.status,
      amount_total: session.amount_total,
      currency: session.currency,
      created: session.created,
      line_items_count: session.line_items?.data?.length || 0,
      line_items: session.line_items?.data?.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        amount_total: item.amount_total,
      })),
    });
  } catch (error: any) {
    console.error("Error checking session:", error);
    return NextResponse.json(
      {
        error: error?.message || "Fejl",
        details: error?.type || error?.code,
      },
      { status: 500 }
    );
  }
}
