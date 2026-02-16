import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default:
      "KnitWise — Masketal-beregner til strikning | Masker og garn-værktøjer",
    template: "%s | KnitWise",
  },
  description:
    "Simple strikke-beregnere: masketal, masker, garn-erstatning og garnforbrug. Stop med at gætte på din strikke-matematik.",
  keywords: [
    "masketal beregner strikning",
    "strikke maske beregner",
    "garn erstatning beregner",
    "strikke matematik",
  ],
  openGraph: {
    title: "KnitWise — Simple strikke-matematik værktøjer",
    description:
      "Masketal-beregner, maske-justering, garn-erstatning og forbrugsestimering for strikkere.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body className="font-sans antialiased">
        <header className="border-b border-beige-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-semibold text-charcoal-800 hover:text-charcoal-600 transition-colors"
            >
              KnitWise
            </Link>
            <nav>
              <Link
                href="/tools"
                className="text-charcoal-600 hover:text-charcoal-800 font-medium transition-colors"
              >
                Værktøjer
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
