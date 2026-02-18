import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Log ind" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ addresses: data || [] });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Log ind" }, { status: 401 });
  }
  const body = await request.json();
  const { label, street, postal_code, city, country } = body || {};
  if (!street || !postal_code || !city) {
    return NextResponse.json({ error: "Udfyld adresse, postnr og by" }, { status: 400 });
  }
  const { data, error } = await supabase
    .from("addresses")
    .insert({
      user_id: user.id,
      label: label || "Hjemme",
      street: String(street).trim(),
      postal_code: String(postal_code).trim(),
      city: String(city).trim(),
      country: country || "DK",
    })
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ address: data });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Log ind" }, { status: 401 });
  }
  const body = await request.json();
  const id = body?.id;
  if (!id) {
    return NextResponse.json({ error: "Mangler id" }, { status: 400 });
  }
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.label !== undefined) updates.label = body.label;
  if (body.street !== undefined) updates.street = body.street;
  if (body.postal_code !== undefined) updates.postal_code = body.postal_code;
  if (body.city !== undefined) updates.city = body.city;
  if (body.country !== undefined) updates.country = body.country;

  const { data, error } = await supabase
    .from("addresses")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ address: data });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Log ind" }, { status: 401 });
  }
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Mangler id" }, { status: 400 });
  }
  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
