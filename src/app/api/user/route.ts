import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ user: null });
  }
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .single();
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email ?? profile?.email,
      name: profile?.full_name ?? user.email ?? "Bruger",
    },
  });
}
