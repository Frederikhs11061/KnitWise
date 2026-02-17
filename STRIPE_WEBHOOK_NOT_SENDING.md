# Problem: Stripe sender ikke events til webhook (men email-funktionen virker)

✅ **Vi ved:**
- Email-funktionen virker perfekt (test-webhook sender mails med PDF)
- Resend virker
- PDF-generering virker
- Problemet er at Stripe ikke sender `checkout.session.completed` events til webhook'en

## Mulige årsager:

### 1. Webhook lytter på forkert event
- I Stripe: Klik "Show" ved "Listening to: 1 event"
- Det **skal** være `checkout.session.completed`
- Hvis det er noget andet, rediger webhook'en og tilføj `checkout.session.completed`

### 2. Test vs Live mode mismatch
- Webhook'en er oprettet i **Test mode**
- Men checkout bruger måske **Live keys** (eller omvendt)
- Tjek: I Stripe dashboard, øverst til højre - er du i **Test mode**?
- Tjek: I Vercel → Environment Variables → `STRIPE_SECRET_KEY` starter med `sk_test_` (test) eller `sk_live_` (live)?
- De skal matche: Test webhook = Test keys, Live webhook = Live keys

### 3. Webhook URL er forkert i Stripe
- I Stripe: Tjek at Endpoint URL er præcist: `https://stichofcare.vercel.app/api/webhook`
- Ingen trailing slash, ingen typo

### 4. Stripe sender events men de fejler (signature verification)
- I Stripe → Webhooks → din webhook → "Event deliveries"
- Hvis der står **Failed 1** efter en testbetaling → Secret matcher ikke
- Kopiér secret igen fra Stripe (Reveal) og opdater i Vercel

### 5. Stripe's nye "Event destinations" vs gamle webhooks
- Hvis du bruger Stripe's nye interface, kan det være du skal oprette webhook'en på en anden måde
- Prøv at slette den gamle og oprette en ny fra bunden

## Test efter fix:

1. Lav en testbetaling (4242...)
2. Gå straks til Stripe → Webhooks → din webhook → "Event deliveries"
3. Der bør stå **Total 1** og status **Succeeded**
4. Tjek din email - du bør have fået ordre-mailen med PDF

## Hvis Event deliveries stadig er Total 0:

Stripe sender slet ikke events. Dette kan være fordi:
- Webhook'en er oprettet i forkert mode (test vs live)
- Webhook'en lytter på forkert event
- Stripe's nye interface har en bug

**Løsning:** Opret webhook'en helt fra bunden:
1. Slet den gamle webhook
2. Opret ny: Developers → Webhooks → Add endpoint
3. URL: `https://stichofcare.vercel.app/api/webhook`
4. Event: `checkout.session.completed`
5. Kopiér ny secret og opdater i Vercel
6. Redeploy
