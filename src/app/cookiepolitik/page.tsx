import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookiepolitik | Stitch of Care",
  description: "Cookiepolitik for Stitch of Care - hvordan vi bruger cookies.",
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-charcoal-900 mb-8">
        Cookiepolitik
      </h1>

      <div className="prose prose-sm max-w-none space-y-6 text-charcoal-700">
        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            1. Hvad er cookies?
          </h2>
          <p>
            Cookies er små tekstfiler, der gemmes på din enhed (computer,
            tablet, telefon) når du besøger en hjemmeside. Cookies hjælper
            hjemmesiden med at huske dine præferencer og forbedre din
            oplevelse.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            2. Hvilke cookies bruger vi?
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-2">
                Nødvendige cookies
              </h3>
              <p>
                Disse cookies er nødvendige for at hjemmesiden kan fungere. De
                bruges til at huske din kurv, login-status og andre
                grundlæggende funktioner. Disse cookies kan ikke deaktiveres.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-2">
                Præference cookies
              </h3>
              <p>
                Disse cookies husker dine valg (f.eks. sprog, region) for at
                give dig en bedre oplevelse ved næste besøg.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-2">
                Analyse cookies
              </h3>
              <p>
                Disse cookies hjælper os med at forstå, hvordan besøgende bruger
                hjemmesiden, så vi kan forbedre den. Vi bruger kun disse med dit
                samtykke.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            3. Tredjeparts cookies
          </h2>
          <p>
            Vi bruger følgende tredjepartstjenester, der kan sætte cookies:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Stripe:</strong> For betalingsbehandling (nødvendig)
            </li>
            <li>
              <strong>Vercel Analytics:</strong> For at analysere trafik (kun
              med samtykke)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            4. Hvordan administrerer jeg cookies?
          </h2>
          <p>
            Du kan administrere cookies i din browsers indstillinger. Bemærk at
            hvis du deaktiverer cookies, kan nogle funktioner på hjemmesiden
            ikke fungere korrekt.
          </p>
          <p className="mt-3">
            Du kan også bruge vores cookie-banner til at vælge, hvilke cookies
            du accepterer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            5. Lokal lagring
          </h2>
          <p>
            Ud over cookies bruger vi også localStorage til at gemme din kurv,
            login-status og præferencer. Dette er nødvendigt for at hjemmesiden
            kan fungere korrekt.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            6. Opdateringer
          </h2>
          <p>
            Vi kan opdatere denne cookiepolitik fra tid til anden. Vi vil
            informere dig om væsentlige ændringer via hjemmesiden eller email.
          </p>
        </section>

        <section className="pt-6 border-t border-beige-200">
          <p className="text-sm text-charcoal-500">
            Sidst opdateret: {new Date().toLocaleDateString("da-DK")}
          </p>
        </section>
      </div>
    </div>
  );
}
