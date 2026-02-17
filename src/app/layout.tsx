import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default:
      "Stitch of Care — Strikkeopskrifter & KnitWise strikkeberegner",
    template: "%s | Stitch of Care",
  },
  description:
    "Stitch of Care samler håndtegnede strikkeopskrifter og KnitWise strikkeberegnere til garn-erstatning, maskeantal og garnforbrug.",
  keywords: [
    "strikkeopskrifter",
    "strikkeberegner",
    "masketal beregner",
    "garn erstatning beregner",
    "stitch of care",
  ],
  openGraph: {
    title: "Stitch of Care — Opskrifter & KnitWise strikkeberegner",
    description:
      "Køb strikkeopskrifter og brug KnitWise strikkeberegnere til at vælge garn, beregne maskeantal og undgå at købe for meget garn.",
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
        <header className="border-b border-beige-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-charcoal-800 hover:text-charcoal-600 transition-colors"
            >
              <span className="h-8 w-8 rounded-full bg-rose-200 border border-rose-300 flex items-center justify-center text-sm font-semibold">
                SC
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-lg font-semibold">Stitch of Care</span>
                <span className="text-xs text-charcoal-500">
                  Strikkeopskrifter & KnitWise beregner
                </span>
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-charcoal-600">
              <Link
                href="/opskrifter"
                className="hover:text-charcoal-900 transition-colors"
              >
                Opskrifter
              </Link>
              <Link
                href="/tools"
                className="hover:text-charcoal-900 transition-colors"
              >
                Strikkeberegner
              </Link>
              <Link
                href="/blog"
                className="hover:text-charcoal-900 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/om-os"
                className="hover:text-charcoal-900 transition-colors"
              >
                Om os
              </Link>
              <Link
                href="/kurv"
                className="ml-4 px-3 py-1.5 rounded-full border border-beige-200 hover:border-charcoal-800 hover:text-charcoal-900 transition-colors"
              >
                Kurv (0)
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
