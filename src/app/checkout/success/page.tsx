"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { clearCart } from "@/lib/cart";
import { getPatternBySlug } from "@/lib/patterns";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [sessionData, setSessionData] = useState<{ metadata?: { patternSlugs?: string }; payment_status?: string } | null>(null);
  const [emailResponse, setEmailResponse] = useState<{ resendTestLimit?: boolean } | null>(null);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // Clear cart after successful payment
      clearCart();
      
      const checkSession = async () => {
        try {
          const res = await fetch(`/api/check-session?session_id=${sessionId}`);
          const data = await res.json();
          setSessionData(data);
        } catch {
          // Ignorer
        }
      };
      checkSession();

      // Gem ordre i Supabase hvis bruger er logget ind
      fetch("/api/user")
        .then((r) => r.json())
        .then((data) => {
          if (data?.user?.id) {
            return fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId }),
            });
          }
        })
        .catch(() => {});

      // Send email direkte fra success-siden (workaround hvis webhook ikke virker)
      // Vent lidt først - Stripe session kan være lidt langsom med at opdatere payment_status
      const sendEmail = async (retryCount = 0) => {
        try {
          const res = await fetch("/api/send-order-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          });
          
          const data = await res.json();
          setEmailResponse(data);

          if (data.success || data.alreadySent) return;
          if (data.error === "Betaling ikke gennemført" && retryCount < 3) {
            setTimeout(() => sendEmail(retryCount + 1), 2000);
            return;
          } else if (data.resendTestLimit) {
            setEmailResponse(data);
          } else {
            alert(`Kunne ikke sende email automatisk. Fejl: ${data.error || "Ukendt fejl"}`);
          }
        } catch {
          if (retryCount < 2) {
            setTimeout(() => sendEmail(retryCount + 1), 2000);
          } else {
            alert("Kunne ikke kontakte serveren. Prøv at opdatere siden.");
          }
        }
      };
      
      setTimeout(() => sendEmail(), 1000);
      setIsLoading(false);
    } else {
      router.push("/kurv");
    }
  }, [sessionId, router]);

  const orderPatterns = useMemo(() => {
    if (!sessionData?.metadata?.patternSlugs || sessionData.payment_status !== "paid") return [];
    try {
      const arr = JSON.parse(sessionData.metadata.patternSlugs) as Array<{ slug: string; quantity: number }>;
      const seen = new Set<string>();
      return arr.filter((p) => {
        if (seen.has(p.slug)) return false;
        seen.add(p.slug);
        return true;
      });
    } catch {
      return [];
    }
  }, [sessionData]);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-charcoal-600">Behandler din betaling...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="text-3xl font-bold text-charcoal-900 mb-2">
          Tak for dit køb!
        </h1>
        <p className="text-charcoal-600">
          {emailResponse?.resendTestLimit
            ? "Din betaling er gennemført."
            : "Din betaling er gennemført, og dine opskrifter er sendt til din email."}
        </p>
      </div>

      {emailResponse?.resendTestLimit && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Bemærk:</strong> Ordrebekræftelse med opskrifter sendes normalt på mail. Hvis du ikke modtager en mail inden for kort tid, tjek spam-mappen eller kontakt os – så sender vi opskrifterne manuelt.
          </p>
        </div>
      )}

      {sessionId && orderPatterns.length > 0 && (
        <div className="mb-6 p-6 rounded-xl bg-sage-50 border border-sage-200">
          <h2 className="font-semibold text-charcoal-900 mb-3">
            Download dine opskrifter
          </h2>
          <p className="text-sm text-charcoal-600 mb-4">
            Du kan downloade dine strikkeopskrifter som PDF her – eller vent på mailen.
          </p>
          <div className="flex flex-wrap gap-3">
            {orderPatterns.map(({ slug }) => {
              const pattern = getPatternBySlug(slug);
              const filename = `${pattern?.name || slug}.pdf`.replace(/\s+/g, "-");
              const downloadUrl = `/api/order-pdf?session_id=${encodeURIComponent(sessionId!)}&slug=${encodeURIComponent(slug)}`;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={async () => {
                    try {
                      const res = await fetch(downloadUrl);
                      if (!res.ok) {
                        const err = await res.json().catch(() => ({}));
                        alert(err?.error || "Kunne ikke hente PDF. Prøv igen eller tjek din mail.");
                        return;
                      }
                      const blob = await res.blob();
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = filename;
                      a.click();
                      URL.revokeObjectURL(url);
                    } catch {
                      alert("Kunne ikke hente PDF. Tjek din internetforbindelse eller prøv igen.");
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sage-200 text-sage-900 font-medium hover:bg-sage-300 transition-colors"
                >
                  <span>📄</span>
                  {pattern?.name || slug}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-cream-50 border border-beige-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-charcoal-900 mb-3">
          Hvad sker der nu?
        </h2>
        <ul className="space-y-2 text-sm text-charcoal-700">
          <li>✓ Du modtager en email med dine opskrifter som PDF-filer</li>
          <li>✓ Du kan også finde dem i din købshistorik</li>
          <li>✓ Hvis du ikke modtager emailen inden for 24 timer, kontakt support</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/opskrifter"
          className="flex-1 px-6 py-3 rounded-xl bg-rose-400 text-white font-semibold hover:bg-rose-500 transition-colors text-center"
        >
          Se flere opskrifter
        </Link>
        <Link
          href="/profil"
          className="flex-1 px-6 py-3 rounded-xl border border-beige-200 text-charcoal-700 font-semibold hover:bg-cream-50 transition-colors text-center"
        >
          Se købshistorik
        </Link>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-sage-50 border border-sage-200">
        <p className="text-sm text-charcoal-700">
          <strong>Tip:</strong> Opret en konto for at se alle dine køb på ét sted og gemme favoritter.
        </p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-charcoal-600">Behandler din betaling...</p>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
