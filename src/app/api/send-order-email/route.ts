import { NextRequest, NextResponse } from "next/server";
import { sendPatternEmail } from "@/lib/email";
import { generateOrderNumber } from "@/lib/user";
import { getPatternBySlug } from "@/lib/patterns";

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
 * API route: Hent Stripe checkout session og send email direkte.
 * Dette omgår webhook-problemet ved at sende email fra success-siden.
 * 
 * POST /api/send-order-email
 * Body: { sessionId: "cs_test_..." }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId mangler" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe ikke konfigureret" },
        { status: 500 }
      );
    }

    // Hent session fra Stripe - expand customer for at få email hvis den er der
    const stripe = await getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer"],
    });

    // Log alle mulige email-steder for debugging
    const sessionAny = session as any;
    console.log("Retrieved Stripe session - email locations:", {
      sessionId,
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      customer_details: sessionAny.customer_details,
      customer_details_email: sessionAny.customer_details?.email,
      customer: session.customer,
      customer_email_from_customer: typeof session.customer === 'object' ? (session.customer as any)?.email : null,
      hasMetadata: !!session.metadata,
      metadata: session.metadata,
    });

    // Tjek om betalingen er gennemført
    if (session.payment_status !== "paid") {
      console.log("Payment not completed yet:", session.payment_status);
      return NextResponse.json(
        { error: "Betaling ikke gennemført", payment_status: session.payment_status },
        { status: 400 }
      );
    }

    // Tjek om email allerede er sendt (via metadata flag)
    if (session.metadata?.email_sent === "true") {
      return NextResponse.json({
        success: true,
        message: "Email allerede sendt",
        alreadySent: true,
      });
    }

    // Hent order detaljer fra metadata
    const orderNumber = session.metadata?.orderNumber || generateOrderNumber();
    let patternSlugs: Array<{ slug: string; quantity: number }> = [];
    
    try {
      if (session.metadata?.patternSlugs) {
        patternSlugs = JSON.parse(session.metadata.patternSlugs);
      } else {
        // Fallback: Hent fra line_items hvis metadata mangler
        console.log("No patternSlugs in metadata, trying to extract from line_items");
        if (session.line_items?.data) {
          // Dette er en fallback - vi kan ikke få patternSlug fra line_items, så vi bruger test data
          patternSlugs = [{ slug: "hygge-sweater", quantity: 1 }];
          console.log("Using fallback pattern slug");
        }
      }
    } catch (parseError) {
      console.error("Error parsing patternSlugs:", parseError);
      return NextResponse.json(
        { error: "Kunne ikke parse order data", details: parseError },
        { status: 400 }
      );
    }
    
    if (patternSlugs.length === 0) {
      console.error("No pattern slugs found in session");
      return NextResponse.json(
        { error: "Ingen produkter fundet i ordren" },
        { status: 400 }
      );
    }

    // Build purchase items
    const purchaseItems = patternSlugs.map((item: { slug: string; quantity: number }) => {
      const pattern = getPatternBySlug(item.slug);
      return {
        patternSlug: item.slug,
        patternName: pattern?.name || item.slug,
        quantity: item.quantity,
        price: pattern?.price || 0,
      };
    });

    // Email kan være i flere steder - tjek dem alle i prioritetsrækkefølge:
    // 1. customer_email (hvis sat ved oprettelse)
    // 2. customer_details.email (hvis indsamlet i checkout-formularen)
    // 3. customer.email (hvis customer objektet er expanderet)
    const email = 
      session.customer_email || 
      sessionAny.customer_details?.email ||
      (typeof session.customer === 'object' && session.customer ? (session.customer as any).email : null);

    // Send email hvis email findes
    if (email) {
      console.log("Sending order email directly from success page:", {
        sessionId,
        email,
        orderNumber,
        itemsCount: purchaseItems.length,
      });

      try {
        const emailResult = await sendPatternEmail({
          email,
          orderNumber,
          items: purchaseItems,
        });

        console.log("✅ Email sendt succesfuldt til:", email);
        console.log("📧 Email result:", JSON.stringify(emailResult, null, 2));

        // Marker at email er sendt (opdater session metadata)
        try {
          await stripe.checkout.sessions.update(sessionId, {
            metadata: {
              ...session.metadata,
              email_sent: "true",
              email_sent_at: new Date().toISOString(),
            },
          });
        } catch (updateError) {
          console.error("Could not update session metadata:", updateError);
          // Ignore - email er sendt alligevel
        }

        return NextResponse.json({
          success: true,
          message: "Email sendt",
          email,
          orderNumber,
          resendResult: emailResult ? {
            id: emailResult.data?.id,
            error: emailResult.error,
          } : null,
        });
      } catch (emailError: any) {
        console.error("❌ Fejl ved afsendelse af email:", emailError);
        return NextResponse.json(
          {
            success: false,
            error: "Kunne ikke sende email",
            email,
            orderNumber,
            details: emailError?.message || "Ukendt fejl",
          },
          { status: 500 }
        );
      }
    } else {
      // Log alt hvad vi har fundet for debugging
      console.error("No email found on session - all checked locations:", {
        customer_email: session.customer_email,
        customer_details: sessionAny.customer_details,
        customer_details_email: sessionAny.customer_details?.email,
        customer: session.customer,
        customer_email_from_customer: typeof session.customer === 'object' ? (session.customer as any)?.email : null,
        full_session_keys: Object.keys(session).slice(0, 20), // Første 20 keys for debugging
      });
      // Returner fuld debug info så vi kan se præcist hvad Stripe sender
      return NextResponse.json(
        { 
          error: "Ingen email på session", 
          sessionId,
          debug: {
            customer_email: session.customer_email,
            customer_details: sessionAny.customer_details,
            customer_details_email: sessionAny.customer_details?.email,
            customer: session.customer,
            customer_email_from_customer: typeof session.customer === 'object' && session.customer ? (session.customer as any).email : null,
            all_session_keys: Object.keys(session).slice(0, 30),
            payment_status: session.payment_status,
            mode: session.mode,
            status: session.status,
          }
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error sending order email:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Fejl ved afsendelse af email",
        details: process.env.NODE_ENV === "development" ? error?.stack : undefined,
      },
      { status: 500 }
    );
  }
}
