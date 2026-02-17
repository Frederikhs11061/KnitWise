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
    
    // Log all environment variables that contain STRIPE (for debugging)
    const stripeEnvVars = Object.keys(process.env)
      .filter(k => k.toUpperCase().includes("STRIPE"))
      .reduce((acc, key) => {
        acc[key] = process.env[key] ? `${process.env[key]?.substring(0, 10)}...` : "undefined";
        return acc;
      }, {} as Record<string, string>);
    
    console.log("Environment check:", {
      hasSecretKey: !!secretKey,
      secretKeyLength: secretKey?.length,
      secretKeyPrefix: secretKey?.substring(0, 7),
      allStripeVars: stripeEnvVars,
      nodeEnv: process.env.NODE_ENV,
    });
    
    if (!secretKey) {
      const errorDetails = {
        message: "STRIPE_SECRET_KEY is not configured",
        availableStripeVars: Object.keys(process.env).filter(k => k.toUpperCase().includes("STRIPE")),
        nodeEnv: process.env.NODE_ENV,
        allEnvKeys: Object.keys(process.env).slice(0, 20), // First 20 for debugging
      };
      console.error("Stripe configuration error:", errorDetails);
      
      // Return detailed error info to help debug
      return NextResponse.json(
        { 
          error: "Stripe er ikke konfigureret. Tjek environment variables og redeploy.",
          debug: {
            availableStripeVars: Object.keys(process.env).filter(k => k.toUpperCase().includes("STRIPE")),
            nodeEnv: process.env.NODE_ENV,
            hint: "Tjek at STRIPE_SECRET_KEY er sat op i Vercel → Settings → Environment Variables og at du har redeployed",
          },
        },
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
    
    console.log("Creating Stripe checkout session:", {
      orderNumber,
      cartItemsCount: cartItems.length,
      userEmail: userEmail || "will be collected in Stripe form",
      stripeMode: process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_") ? "TEST" : "LIVE",
    });
    
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
      // Brug fast base URL så brugeren altid lander på dit hoveddomæne (fx stichofcare.vercel.app), ikke preview-URL
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || request.headers.get("origin") || "https://stichofcare.vercel.app"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || request.headers.get("origin") || "https://stichofcare.vercel.app"}/kurv`,
      // Only set customer_email if provided (logged in user)
      // Otherwise Stripe will collect email in checkout form
      ...(userEmail && { customer_email: userEmail }),
      // Altid opret customer så email gemmes korrekt i customer_details
      customer_creation: "always",
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

    console.log("Stripe checkout session created:", {
      sessionId: session.id,
      mode: session.mode,
      customer_email: session.customer_email || "will be collected",
      metadata: session.metadata,
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
