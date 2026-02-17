import { NextRequest, NextResponse } from "next/server";
import { generateOrderNumber } from "@/lib/user";

// Dynamic import to avoid build errors if Stripe is not installed
async function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!secretKey) {
    console.error("STRIPE_SECRET_KEY is missing from environment variables");
    console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes("STRIPE")));
    throw new Error("STRIPE_SECRET_KEY not configured");
  }
  
  if (!secretKey.startsWith("sk_")) {
    console.error("STRIPE_SECRET_KEY does not look valid (should start with sk_)");
    throw new Error("Invalid STRIPE_SECRET_KEY format");
  }
  
  const Stripe = (await import("stripe")).default;
  return new Stripe(secretKey, {
    apiVersion: "2025-02-24.acacia",
  });
}

interface CheckoutRequest {
  cartItems: Array<{
    patternSlug: string;
    quantity: number;
    pattern: {
      name: string;
      level: string;
      category: string;
      price: number;
    };
  }>;
  userEmail?: string; // Optional - Stripe will collect if not provided
  userId: string;
}

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured - with detailed logging
    const secretKey = process.env.STRIPE_SECRET_KEY;
    console.log("Checking STRIPE_SECRET_KEY:", {
      exists: !!secretKey,
      length: secretKey?.length,
      startsWith: secretKey?.substring(0, 5),
      allStripeVars: Object.keys(process.env).filter(k => k.includes("STRIPE")),
    });
    
    if (!secretKey) {
      console.error("STRIPE_SECRET_KEY is not configured");
      console.error("Available environment variables:", Object.keys(process.env).filter(k => k.includes("STRIPE")));
      return NextResponse.json(
        { error: "Stripe er ikke konfigureret. Tjek environment variables og redeploy." },
        { status: 500 }
      );
    }

    const body: CheckoutRequest = await request.json();
    const { cartItems, userEmail, userId } = body;

    console.log("Checkout request received:", {
      cartItemsCount: cartItems?.length,
      hasUserEmail: !!userEmail,
      userId,
    });

    // Email is optional - Stripe will collect it in checkout if not provided

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Din kurv er tom" },
        { status: 400 }
      );
    }

    // Validate cartItems structure
    for (const item of cartItems) {
      if (!item.pattern || !item.pattern.name || !item.pattern.price) {
        console.error("Invalid cart item:", item);
        return NextResponse.json(
          { error: "Ugyldig kurv data" },
          { status: 400 }
        );
      }
    }

    // Create Stripe checkout session
    const stripe = await getStripe();
    const orderNumber = generateOrderNumber();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "dkk",
          product_data: {
            name: item.pattern.name,
            description: `${item.pattern.level} - ${item.pattern.category}`,
          },
          unit_amount: Math.round(item.pattern.price * 100), // Convert to øre
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${request.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/kurv`,
      // Only set customer_email if provided (logged in user)
      // Otherwise Stripe will collect email in checkout form
      ...(userEmail && { customer_email: userEmail }),
      metadata: {
        userId,
        orderNumber,
        patternSlugs: JSON.stringify(
          cartItems.map((item) => ({
            slug: item.patternSlug,
            quantity: item.quantity,
          }))
        ),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    console.error("Error details:", {
      message: error.message,
      type: error.type,
      code: error.code,
      stack: error.stack,
    });
    
    // Return detailed error for debugging
    const errorMessage = error.message || "Der opstod en fejl ved oprettelse af checkout";
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? {
          type: error.type,
          code: error.code,
          message: error.message,
        } : undefined,
      },
      { status: 500 }
    );
  }
}
