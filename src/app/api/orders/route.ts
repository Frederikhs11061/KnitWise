import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ orders: [] });
  }
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ orders: data || [] });
}

/** Gem ordre i Supabase når bruger er logget ind (kaldes fra checkout success). */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: false, message: "Ikke logget ind" });
  }
  const body = await request.json();
  const sessionId = body?.sessionId;
  if (!sessionId) {
    return NextResponse.json({ error: "Mangler sessionId" }, { status: 400 });
  }
  const stripe = (await import("stripe")).default;
  const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-02-24.acacia" });
  const session = await stripeClient.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Betaling ikke gennemført" }, { status: 400 });
  }
  const email = session.customer_email ?? (session.customer_details as { email?: string } | null)?.email ?? "";
  const orderNumber = (session.metadata?.orderNumber as string) || `SOC-${Date.now()}`;
  let items: { patternSlug: string; patternName: string; quantity: number; price: number }[] = [];
  if (session.metadata?.patternSlugs) {
    try {
      const slugs = JSON.parse(session.metadata.patternSlugs as string) as { slug: string; quantity: number }[];
      const { getPatternBySlug } = await import("@/lib/patterns");
      items = slugs.map((p) => {
        const pattern = getPatternBySlug(p.slug);
        return {
          patternSlug: p.slug,
          patternName: pattern?.name ?? p.slug,
          quantity: p.quantity,
          price: pattern?.price ?? 0,
        };
      });
    } catch (_) {}
  }
  const total = session.amount_total ?? 0;

  const { error: insertError } = await supabase.from("orders").insert({
    user_id: user.id,
    stripe_session_id: sessionId,
    order_number: orderNumber,
    email,
    total: Number(total),
    status: "completed",
    items,
  });
  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
