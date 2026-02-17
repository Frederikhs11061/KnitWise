import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import CartButton from "@/components/CartButton";

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
            <nav className="flex items-center gap-6 text-sm font-medium text-charcoal-700">
              <Link
                href="/opskrifter"
                className="hover:text-forest-800 transition-colors"
              >
                Opskrifter
              </Link>
              <Link
                href="/tools"
                className="hover:text-forest-800 transition-colors"
              >
                Strikkeberegner
              </Link>
              <Link
                href="/blog"
                className="hover:text-forest-800 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/om-os"
                className="hover:text-forest-800 transition-colors"
              >
                Om os
              </Link>
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-full border border-sage-300 hover:border-sage-400 hover:bg-sage-50 transition-colors"
              >
                Log ind
              </Link>
              <CartButton />
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
