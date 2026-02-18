import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** POST: Tilføj en liste af slugs til brugerens ønskeliste (til merge fra localStorage ved login). */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Log ind" }, { status: 401 });
  }
  const body = await request.json();
  const slugs = body?.slugs;
  if (!Array.isArray(slugs)) {
    return NextResponse.json({ error: "Mangler slugs (array)" }, { status: 400 });
  }
  const valid = slugs.filter((s) => typeof s === "string" && s.trim());
  for (const slug of valid) {
    await supabase.from("wishlist").upsert(
      { user_id: user.id, pattern_slug: slug.trim() },
      { onConflict: "user_id,pattern_slug" }
    );
  }
  return NextResponse.json({ ok: true });
}
