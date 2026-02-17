import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: {
    default:
      "Stitch of Care — Strikkeopskrifter & strikkeberegner",
    template: "%s | Stitch of Care",
  },
  description:
    "Stitch of Care samler håndtegnede strikkeopskrifter og strikkeberegnere til garn-erstatning, maskeantal og garnforbrug. Danske strikkeopskrifter med omtanke.",
  keywords: [
    "strikkeopskrifter",
    "strikkeberegner",
    "danske strikkeopskrifter",
    "masketal beregner",
    "garn erstatning beregner",
    "stitch of care",
  ],
  openGraph: {
    title: "Stitch of Care — Danske strikkeopskrifter & strikkeberegner",
    description:
      "Køb danske strikkeopskrifter og brug vores strikkeberegnere til at vælge garn, beregne maskeantal og undgå at købe for meget garn.",
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
        <header className="border-b border-beige-200 bg-white/95 backdrop-blur-sm sticky top-0 z-20 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 text-forest-800 hover:text-forest-700 transition-colors"
            >
              <Image
                src="/assets/logo.png"
                alt="Stitch of Care logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <Navigation />
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-beige-200 bg-cream-50 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div>
                <h3 className="font-semibold text-charcoal-900 mb-3">Stitch of Care</h3>
                <ul className="space-y-2 text-sm text-charcoal-600">
                  <li>
                    <Link href="/om-os" className="hover:text-charcoal-900">
                      Om os
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-charcoal-900">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal-900 mb-3">Shop</h3>
                <ul className="space-y-2 text-sm text-charcoal-600">
                  <li>
                    <Link href="/opskrifter" className="hover:text-charcoal-900">
                      Alle opskrifter
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools" className="hover:text-charcoal-900">
                      Strikkeberegner
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal-900 mb-3">Juridisk</h3>
                <ul className="space-y-2 text-sm text-charcoal-600">
                  <li>
                    <Link href="/handelsbetingelser" className="hover:text-charcoal-900">
                      Handelsbetingelser
                    </Link>
                  </li>
                  <li>
                    <Link href="/privatlivspolitik" className="hover:text-charcoal-900">
                      Privatlivspolitik
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookiepolitik" className="hover:text-charcoal-900">
                      Cookiepolitik
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal-900 mb-3">Kontakt</h3>
                <p className="text-sm text-charcoal-600">
                  Email: kontakt@stitchofcare.dk
                </p>
              </div>
            </div>
            <div className="pt-8 border-t border-beige-200 text-center text-sm text-charcoal-500">
              <p>© {new Date().getFullYear()} Stitch of Care. Alle rettigheder forbeholdes.</p>
            </div>
          </div>
        </footer>
        <CookieBanner />
      </body>
    </html>
  );
}
