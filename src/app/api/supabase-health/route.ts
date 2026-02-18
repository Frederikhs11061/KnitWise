import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

/**
 * GET /api/supabase-health
 * Tjekker at Supabase er konfigureret og at forbindelsen virker.
 */
export async function GET() {
  try {
    const supabase = createServerSupabase();
    // Simpel forbindelsestest (kræver ingen tabeller)
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      const hint =
        error.message?.toLowerCase().includes("key") || error.message?.toLowerCase().includes("invalid")
          ? "Brug Legacy anon key fra Supabase: API → fanen 'Legacy anon, service_role API keys' → kopier 'anon public' (starter med eyJ...). Sæt den som NEXT_PUBLIC_SUPABASE_ANON_KEY i Vercel."
          : "Tjek at NEXT_PUBLIC_SUPABASE_URL og NEXT_PUBLIC_SUPABASE_ANON_KEY er sat i Vercel og at du har gen-deployet.";
      return NextResponse.json(
        { ok: false, error: error.message, hint },
        { status: 502 }
      );
    }
    return NextResponse.json({
      ok: true,
      message: "Supabase forbundet",
      session: data.session ? "aktiv" : "ingen session (forventet uden login)",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Ukendt fejl";
    const hint = message.includes("NEXT_PUBLIC_SUPABASE")
      ? "Tilføj NEXT_PUBLIC_SUPABASE_URL og NEXT_PUBLIC_SUPABASE_ANON_KEY i Vercel (Settings → Environment Variables). Brug Legacy anon key fra Supabase → API → 'Legacy anon, service_role API keys'."
      : "Tjek SUPABASE_SETUP.md eller åbn /supabase-status for trin-for-trin hjælp.";
    return NextResponse.json(
      { ok: false, error: message, hint },
      { status: 500 }
    );
  }
}
