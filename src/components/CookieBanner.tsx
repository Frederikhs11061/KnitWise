"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("stitch-of-care-cookie-consent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("stitch-of-care-cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("stitch-of-care-cookie-consent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-beige-200 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-charcoal-700">
            Vi bruger cookies til at forbedre din oplevelse og analysere trafik.{" "}
            <Link
              href="/cookiepolitik"
              className="text-rose-400 hover:text-rose-500 underline"
            >
              Læs mere om vores cookiepolitik
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReject}
            className="px-4 py-2 rounded-lg border border-beige-200 text-charcoal-700 hover:bg-cream-50 transition-colors text-sm font-medium"
          >
            Afvis
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-lg bg-rose-400 text-white hover:bg-rose-500 transition-colors text-sm font-medium"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
