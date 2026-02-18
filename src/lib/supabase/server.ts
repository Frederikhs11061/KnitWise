/**
 * Supabase client til brug på serveren (Server Components, API routes, server actions).
 * - createServerSupabase() bruger anon key (til almindelige læs/skriv med RLS).
 * - createServiceRoleSupabase() bruger service role key (kun server, bypass RLS – til admin).
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export function createServerSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase: Sæt NEXT_PUBLIC_SUPABASE_URL og NEXT_PUBLIC_SUPABASE_ANON_KEY i .env.local og Vercel."
    );
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

/** Kun til server. Bypasser RLS – brug til admin eller backend-jobs. */
export function createServiceRoleSupabase() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Supabase: Sæt NEXT_PUBLIC_SUPABASE_URL og SUPABASE_SERVICE_ROLE_KEY for service role client."
    );
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey);
}
