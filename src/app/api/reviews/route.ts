import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const limit = request.nextUrl.searchParams.get("limit");
  const supabase = await createClient();
  
  let query = supabase
    .from("reviews")
    .select("id, pattern_slug, rating, comment, created_at")
    .order("created_at", { ascending: false });
  
  if (slug) {
    query = query.eq("pattern_slug", slug);
  }
  
  if (limit) {
    const limitNum = parseInt(limit, 10);
    if (!isNaN(limitNum) && limitNum > 0) {
      query = query.limit(limitNum);
    }
  }
  
  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ reviews: data || [] });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Log ind for at anmelde" }, { status: 401 });
  }
  const body = await request.json();
  const slug = body?.slug;
  const rating = body?.rating;
  const comment = body?.comment ?? "";
  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "Mangler slug" }, { status: 400 });
  }
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating skal være 1-5" }, { status: 400 });
  }
  const { error } = await supabase.from("reviews").upsert(
    {
      user_id: user.id,
      pattern_slug: slug.trim(),
      rating,
      comment: String(comment).trim().slice(0, 2000),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,pattern_slug" }
  );
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
