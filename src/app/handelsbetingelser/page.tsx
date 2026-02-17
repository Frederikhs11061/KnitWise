import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handelsbetingelser | Stitch of Care",
  description: "Handelsbetingelser for køb af strikkeopskrifter hos Stitch of Care.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-charcoal-900 mb-8">
        Handelsbetingelser
      </h1>

      <div className="prose prose-sm max-w-none space-y-6 text-charcoal-700">
        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            1. Virksomhedsoplysninger
          </h2>
          <p>
            Stitch of Care er en dansk webshop der sælger digitale
            strikkeopskrifter. Alle priser er angivet i danske kroner (DKK)
            inkl. moms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            2. Produkter og priser
          </h2>
          <p>
            Vi sælger digitale PDF-opskrifter til strikning. Alle priser er
            angivet inkl. dansk moms (25%). Vi forbeholder os retten til at
            ændre priser uden varsel, men priserne på produkter i din kurv er
            låst indtil du gennemfører købet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            3. Bestilling og betaling
          </h2>
          <p>
            Når du bestiller en opskrift, accepterer du at betale den angivne
            pris. Betaling sker via Stripe med kort eller anden betalingsmetode
            som Stripe understøtter. Din opskrift sendes automatisk til din
            email efter betaling er gennemført.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            4. Levering
          </h2>
          <p>
            Da vi sælger digitale produkter, leveres opskrifterne som PDF-filer
            via email umiddelbart efter betaling er gennemført. Hvis du ikke
            modtager din opskrift inden for 24 timer, kontakt venligst vores
            support.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            5. Fortrydelsesret
          </h2>
          <p>
            Ifølge dansk lovgivning har du 14 dages fortrydelsesret ved køb af
            digitale produkter, medmindre du har givet dit eksplicitte samtykke
            til at produktet leveres før fortrydelsesfristens udløb. Da du
            modtager din opskrift umiddelbart efter betaling, anses du for at
            have givet samtykke til øjeblikkelig levering, og fortrydelsesretten
            ophører ved levering.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            6. Ophavsret
          </h2>
          <p>
            Alle opskrifter er beskyttet af ophavsret. Du må ikke videregive,
            sælge eller distribuere opskrifterne til tredjeparter. Du må gerne
            strikke produkterne og sælge de færdige produkter, men ikke selve
            opskriften.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            7. Reklamationsret
          </h2>
          <p>
            Hvis der er fejl i opskriften (f.eks. manglende information eller
            fejl i instruktioner), har du ret til at reklamere inden for 2 år
            efter købet. Kontakt os på kontakt@stitchofcare.dk med din
            ordrenummer og beskrivelse af problemet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            8. Klageadgang
          </h2>
          <p>
            Hvis du har klager over vores produkter eller service, kan du klage
            til Forbrugerombudsmanden eller Forbruger Europa. Du kan også
            kontakte os direkte på kontakt@stitchofcare.dk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            9. Personoplysninger
          </h2>
          <p>
            Vi behandler dine personoplysninger i overensstemmelse med GDPR. Se
            vores{" "}
            <a href="/privatlivspolitik" className="text-rose-400 hover:text-rose-500">
              privatlivspolitik
            </a>{" "}
            for mere information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-charcoal-900 mb-3">
            10. Ændringer
          </h2>
          <p>
            Vi forbeholder os retten til at ændre disse handelsbetingelser. De
            gældende betingelser er altid tilgængelige på denne side.
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
