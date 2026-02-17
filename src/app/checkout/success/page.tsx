"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { clearCart } from "@/lib/cart";
import { getPurchaseHistory } from "@/lib/user";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // Clear cart after successful payment
      clearCart();
      
      // Send email direkte fra success-siden (workaround hvis webhook ikke virker)
      fetch("/api/send-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("Order email sent:", data);
          } else if (data.alreadySent) {
            console.log("Email already sent previously");
          } else {
            console.error("Failed to send order email:", data);
          }
        })
        .catch((error) => {
          console.error("Error calling send-order-email:", error);
        });
      
      setIsLoading(false);
    } else {
      router.push("/kurv");
    }
  }, [sessionId, router]);

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
          Din betaling er gennemført, og dine opskrifter er sendt til din email.
        </p>
      </div>

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
