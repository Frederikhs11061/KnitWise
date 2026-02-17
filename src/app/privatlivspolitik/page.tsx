import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privatlivspolitik | Stitch of Care",
  description: "Privatlivspolitik for Stitch of Care - hvordan vi behandler dine personoplysninger.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-charcoal-900 mb-8">
        Privatlivspolitik
      </h1>

      <div className="prose prose-sm max-w-none space-y-6 text-charcoal-700">
        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            1. Indledning
          </h2>
          <p>
            Stitch of Care respekterer dit privatliv og er forpligtet til at
            beskytte dine personoplysninger. Denne privatlivspolitik forklarer,
            hvordan vi indsamler, bruger og beskytter dine oplysninger i
            overensstemmelse med GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            2. Dataansvarlig
          </h2>
          <p>
            Stitch of Care er dataansvarlig for behandlingen af dine
            personoplysninger. Du kan kontakte os på kontakt@stitchofcare.dk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            3. Hvilke oplysninger indsamler vi?
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Kontaktoplysninger:</strong> Navn, email-adresse når du
              opretter en konto eller foretager et køb
            </li>
            <li>
              <strong>Betalingsoplysninger:</strong> Betalingsoplysninger
              behandles af Stripe og gemmes ikke på vores servere
            </li>
            <li>
              <strong>Brugerdata:</strong> Købshistorik, gemte opskrifter,
              præferencer
            </li>
            <li>
              <strong>Tekniske data:</strong> IP-adresse, browser-type, enhed
              (via cookies)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            4. Hvordan bruger vi dine oplysninger?
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>At behandle og levere dine ordrer</li>
            <li>At sende dig opskrifter via email</li>
            <li>At kommunikere med dig om din ordre</li>
            <li>At forbedre vores service og hjemmeside</li>
            <li>At sende dig marketing (kun hvis du har givet samtykke)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            5. Retsgrundlag
          </h2>
          <p>
            Vi behandler dine personoplysninger på baggrund af:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Kontrakt:</strong> For at opfylde vores aftale med dig
              (levere opskrifter)
            </li>
            <li>
              <strong>Samtykke:</strong> For marketing og cookies (du kan
              tilbagekalde når som helst)
            </li>
            <li>
              <strong>Legitim interesse:</strong> For at forbedre vores service
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            6. Deling af oplysninger
          </h2>
          <p>
            Vi deler ikke dine personoplysninger med tredjeparter, undtagen:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Stripe:</strong> For betalingsbehandling (de overholder
              PCI DSS standarder)
            </li>
            <li>
              <strong>Email-tjenester:</strong> For at sende dig opskrifter
            </li>
            <li>
              <strong>Hosting:</strong> Vercel (vores hosting provider)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            7. Opbevaring
          </h2>
          <p>
            Vi opbevarer dine oplysninger så længe det er nødvendigt for at
            opfylde formålet:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Købshistorik: 5 år (bogføringslovgivning)</li>
            <li>Kontodata: Indtil du sletter din konto</li>
            <li>Marketing samtykke: Indtil du tilbagekalder det</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            8. Dine rettigheder
          </h2>
          <p>Du har ret til at:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Få indsigt i dine personoplysninger</li>
            <li>Rette forkerte oplysninger</li>
            <li>Slette dine oplysninger</li>
            <li>Begrænse behandlingen</li>
            <li>Dataportabilitet</li>
            <li>Gøre indsigelse mod behandling</li>
            <li>Tilbagekalde samtykke</li>
          </ul>
          <p className="mt-3">
            Kontakt os på kontakt@stitchofcare.dk for at udøve dine rettigheder.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            9. Cookies
          </h2>
          <p>
            Vi bruger cookies til at forbedre din oplevelse. Se vores{" "}
            <a href="/cookiepolitik" className="text-rose-400 hover:text-rose-500">
              cookiepolitik
            </a>{" "}
            for mere information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            10. Sikkerhed
          </h2>
          <p>
            Vi tager sikkerhed alvorligt og bruger industristandarder til at
            beskytte dine oplysninger, herunder SSL/TLS kryptering og sikker
            hosting.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            11. Klageadgang
          </h2>
          <p>
            Hvis du har klager over vores behandling af dine personoplysninger,
            kan du klage til Datatilsynet:{" "}
            <a
              href="https://www.datatilsynet.dk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-400 hover:text-rose-500"
            >
              www.datatilsynet.dk
            </a>
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
