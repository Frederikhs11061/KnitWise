import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kurv | Stitch of Care",
  description:
    "Din kurv hos Stitch of Care. Betaling og automatisk levering af opskrifter kommer i næste version.",
};

export default function CartPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-charcoal-900 mb-4">Kurv</h1>
      <p className="text-sm text-charcoal-600 mb-4">
        Kurven er ikke helt klar endnu – næste skridt bliver at tilføje
        betaling (Stripe) og automatiske mails med dine opskrifter som PDF.
      </p>
      <p className="text-sm text-charcoal-600">
        Indtil da kan du kigge rundt blandt{" "}
        <Link
          href="/opskrifter"
          className="text-sage-400 hover:text-sage-300 font-medium"
        >
          opskrifterne
        </Link>{" "}
        og afprøve{" "}
        <Link
          href="/tools"
          className="text-sage-400 hover:text-sage-300 font-medium"
        >
          strikkeberegnerne
        </Link>
        .
      </p>
    </div>
  );
}

