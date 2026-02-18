/**
 * Supabase server client til Server Components, API routes og Server Actions.
 * Bruger cookies så session er tilgængelig på serveren.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase: NEXT_PUBLIC_SUPABASE_URL og NEXT_PUBLIC_SUPABASE_ANON_KEY skal være sat.");
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Kan ske i Server Component – middleware opdaterer session
        }
      },
    },
  });
}

/** Service role client (kun server, bypass RLS). */
export async function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase: SUPABASE_SERVICE_ROLE_KEY skal være sat for service role.");
  }
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key);
}
