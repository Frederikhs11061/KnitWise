/**
 * Supabase client til brug i browser (Client Components).
 * Brug createServerSupabase() i Server Components og API routes.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function getClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase: Sæt NEXT_PUBLIC_SUPABASE_URL og NEXT_PUBLIC_SUPABASE_ANON_KEY i .env.local og Vercel."
    );
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = getClient();
