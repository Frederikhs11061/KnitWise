import Link from "next/link";

/**
 * Custom 404 page — vises når en route ikke findes
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-charcoal-900 mb-2">Side ikke fundet</h1>
      <p className="text-charcoal-600 mb-6 text-center">
        Den side du leder efter findes ikke. Prøv forsiden eller værktøjerne.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-4 py-2 bg-sage-300 text-charcoal-800 font-medium rounded-lg hover:bg-sage-400"
        >
          Forside
        </Link>
        <Link
          href="/tools"
          className="px-4 py-2 border border-beige-300 text-charcoal-700 font-medium rounded-lg hover:bg-cream-100"
        >
          Værktøjer
        </Link>
      </div>
    </div>
  );
}
