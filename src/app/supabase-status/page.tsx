"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Status = { ok: true; message: string } | { ok: false; error: string; hint?: string };

export default function SupabaseStatusPage() {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/supabase-health")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setStatus({ ok: true, message: data.message });
        else setStatus({ ok: false, error: data.error, hint: data.hint });
      })
      .catch(() => setStatus({ ok: false, error: "Kunne ikke hente svar fra serveren.", hint: "Kører du npm run dev?" }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-beige-200 p-8 text-center">
        <h1 className="text-xl font-semibold text-charcoal-900 mb-6">
          Supabase-status
        </h1>

        {loading && (
          <p className="text-charcoal-600">Tjekker forbindelse...</p>
        )}

        {!loading && status?.ok && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <p className="text-green-700 font-medium">{status.message}</p>
            <p className="text-sm text-charcoal-500 mt-2">
              Du behøver ikke gøre mere her.
            </p>
          </>
        )}

        {!loading && status && !status.ok && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-red-600">✕</span>
            </div>
            <p className="text-red-700 font-medium">{status.error}</p>
            {status.hint && (
              <p className="text-sm text-charcoal-600 mt-2">{status.hint}</p>
            )}
            <div className="mt-6 text-left bg-cream-50 rounded-lg p-4 text-sm text-charcoal-700">
              <p className="font-medium mb-2">Gør sådan her:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Åbn Supabase → dit projekt → <strong>Project Settings</strong> (tandhjul) → <strong>API</strong>.</li>
                <li>Klik fanen <strong>Legacy anon, service_role API keys</strong>.</li>
                <li>Kopier <strong>Project URL</strong> og <strong>anon public</strong>-nøglen (den lange der starter med eyJ...).</li>
                <li>I Vercel → Settings → Environment Variables: tilføj <strong>NEXT_PUBLIC_SUPABASE_URL</strong> og <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong> med de værdier. Gen-deploy.</li>
              </ol>
            </div>
          </>
        )}

        <Link
          href="/"
          className="inline-block mt-6 text-sm text-sage-700 hover:underline"
        >
          ← Tilbage til forsiden
        </Link>
      </div>
    </div>
  );
}
