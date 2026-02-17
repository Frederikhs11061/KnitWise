# Sådan får du webhook’en til at virke (Stripe kalder ikke / secret matcher ikke)

Ordre-mail + PDF virker (test-order-email), så problemet er at **Stripe enten ikke sender til webhook’en, eller at webhook secret i Vercel ikke matcher**.

## Trin 1: Hent det rigtige webhook secret i Stripe (Test mode)

1. Gå til **Stripe Dashboard** og slå **Test mode** til (øverst til højre).
2. Gå til **Developers** → **Webhooks** (eller Workbench → Webhooks).
3. Klik på din webhook: **"Stitch of Care - Checkout Webhook"**.
4. Find **"Signing secret"** og klik **Reveal** (øje-ikon).
5. **Kopier hele værdien** (starter med `whsec_`). Ingen mellemrum foran eller bagved.

## Trin 2: Opdater Vercel så secret matcher

1. Gå til **Vercel** → dit projekt → **Settings** → **Environment Variables**.
2. Find **STRIPE_WEBHOOK_SECRET**.
3. Klik **Edit** og **erstat værdien** med den du lige kopierede fra Stripe.
4. Gem (Save).

Vigtigt:
- Navnet skal være præcist: `STRIPE_WEBHOOK_SECRET` (store bogstaver, understreg).
- Værdien skal være **præcis** den fra Stripe (hele strengen, ingen ekstra mellemrum).

## Trin 3: Redeploy

1. Vercel → **Deployments**.
2. Klik på de tre prikker (**...**) ved den seneste deployment.
3. Vælg **Redeploy**.
4. Vent til deployment er færdig.

## Trin 4: Tjek at webhook’en bliver kaldt

**A) Send test-event fra Stripe**

1. I Stripe: På webhook-siden, klik **"Send test events"**.
2. Vælg event: **checkout.session.completed** → Send.
3. Under **"Event deliveries"**: Der bør nu stå **Total 1** (og status Succeeded, hvis secret matcher).
4. Hvis der står **Failed**: Secret matcher stadig ikke – dobbelttjek trin 1–3.

**B) Lav en rigtig testbetaling**

1. Gå til dit site, tilføj en opskrift i kurven, gå til betaling.
2. Brug testkort **4242 4242 4242 4242**, udløb fx 12/30, CVC 123.
3. Udfyld email (fx din egen) og gennemfør betalingen.
4. Tjek **Event deliveries** igen – der bør være en ny delivery med status Succeeded.
5. Tjek din indbakke – du bør have fået ordre-mailen med PDF.

## Hvis secret allerede matcher – andre årsager

1. **Hvilket event lytter webhook’en på?**  
   I Stripe: på webhook-siden, klik **"Show"** ved **"Listening to: 1 event"**.  
   Det **skal** være **`checkout.session.completed`**. Hvis det er et andet event (fx `payment_intent.succeeded`), får du ikke køb-events. Rediger webhook’en og tilføj/tilvælg **checkout.session.completed**.

2. **Står der Total 0 eller Failed efter en testbetaling?**  
   Lav en testbetaling (4242...) og gå straks til Stripe → Webhooks → din webhook → **Event deliveries**.  
   - **Total 0** → Stripe sender slet ikke. Tjek at du er i **Test mode** i Stripe (øverst til højre) både ved køb og ved webhook. Tjek at checkout-URL’en indeholder `cs_test_` (test session).  
   - **Failed 1** → Vores endpoint returnerer fejl (fx 400 pga. signature). Tjek Vercel Functions-logs for `/api/webhook`.  
   - **Total 1, Succeeded** → Webhook kører, men vi sender måske ikke mail (fx `customer_email` mangler). Tjek Vercel-logs for "Webhook: no customer_email".

3. **Er webhook-URL’en nåbar?**  
   Åbn i browseren: `https://stichofcare.vercel.app/api/webhook`  
   Du bør få JSON med `ok: true` og `hasWebhookSecret: true`. Hvis siden ikke loader eller giver fejl, kan Stripe ikke nå endpointet.

4. **Samme Stripe-konto overalt?**  
   De Stripe API-nøgler der ligger i Vercel (test keys) skal være fra **samme** Stripe-konto som den, hvor webhook’en er oprettet. Hvis du har flere konti, kan det være, at checkout bruger konto A og webhook er i konto B.

## Hvis det stadig fejler

- **Event deliveries: Total 0** efter testbetaling → Stripe sender ikke. Tjek at du er i **Test mode** i Stripe når du betaler, og at webhook’en også er oprettet i Test mode.
- **Event deliveries: Failed 1** → Signature verification fejler. Secret i Vercel matcher ikke. Kopiér secret igen fra Stripe (Reveal), sæt det ind i Vercel, redeploy.
- **Total 1, Succeeded, men ingen mail** → Kig i Vercel → Deployments → seneste → **Functions** → `/api/webhook` og se logs (fx "Webhook: no customer_email" eller fejl fra sendPatternEmail).
