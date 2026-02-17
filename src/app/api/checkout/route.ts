import { NextRequest, NextResponse } from "next/server";
import { generateOrderNumber } from "@/lib/user";

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
  userEmail: string;
  userId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();
    const { cartItems, userEmail, userId } = body;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Email er påkrævet" },
        { status: 400 }
      );
    }

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Din kurv er tom" },
        { status: 400 }
      );
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
      customer_email: userEmail,
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
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Der opstod en fejl ved oprettelse af checkout" },
      { status: 500 }
    );
  }
}
