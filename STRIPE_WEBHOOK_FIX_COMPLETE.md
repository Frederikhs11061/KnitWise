# Komplet Guide: Få Stripe Webhook til at virke

## ✅ Vi ved:
- Email-funktionen virker perfekt (test-webhook sender mails med PDF)
- Test API key bruges
- Webhook lytter på `checkout.session.completed`
- Men Stripe sender ikke events ved rigtige køb

## 🔧 Løsning: Opret webhook'en helt fra bunden

### Trin 1: Slet den gamle webhook

1. Gå til **Stripe Dashboard** → **Developers** → **Webhooks** (eller **Workbench** → **Webhooks**)
2. Find din webhook "Stitch of Care - Checkout Webhook"
3. Klik på den → **Edit destination** (eller tre prikker → Delete)
4. **Slet den** helt

### Trin 2: Opret ny webhook (korrekt metode)

**VIGTIGT:** I Stripe's nye interface kan der være forskel på "Event destinations" og "Webhooks". Vi skal bruge **Webhooks**.

1. Gå til **Stripe Dashboard** → **Developers** → **Webhooks**
2. Klik **"+ Add endpoint"** (eller **"Add destination"**)
3. **Endpoint URL:** `https://stichofcare.vercel.app/api/webhook`
   - Tjek for typo: `stichofcare` (ikke stitchofcare)
   - Ingen trailing slash
   - `https://` ikke `http://`
4. **Events to send:** 
   - Klik på event-listen
   - Søg efter `checkout.session.completed`
   - **Vælg den** (marker checkbox)
   - **Ingen andre events** - kun denne ene
5. Klik **"Add endpoint"** eller **"Save"**

### Trin 3: Kopiér den nye webhook secret

Lige efter oprettelse:
- Stripe viser **"Signing secret"** (starter med `whsec_`)
- **Kopiér den med det samme** (den vises kun én gang)
- Hvis du misser den: Klik på webhook'en → **Signing secret** → **Reveal**

### Trin 4: Opdater Vercel

1. **Vercel** → dit projekt → **Settings** → **Environment Variables**
2. Find **STRIPE_WEBHOOK_SECRET**
3. **Slet den gamle** (hvis den findes)
4. **Tilføj ny:**
   - Name: `STRIPE_WEBHOOK_SECRET`
   - Value: `whsec_...` (den nye secret du kopierede)
   - Environments: ✅ Production ✅ Preview ✅ Development
5. **Save**

### Trin 5: Redeploy

1. **Vercel** → **Deployments**
2. Klik tre prikker ved seneste deployment → **Redeploy**
3. Vent til deployment er færdig

### Trin 6: Test

1. Lav en **testbetaling** (4242..., gennemfør hele vejen)
2. Gå straks til **Stripe** → **Webhooks** → din nye webhook → **Event deliveries**
3. Der bør nu stå **Total 1** og status **Succeeded** ✅
4. Tjek din email - du bør have fået ordre-mailen med PDF

## 🔍 Hvis det stadig ikke virker

### Tjek at webhook'en er aktiv

I Stripe → din webhook:
- Der bør stå **"Active"** badge
- Hvis der står "Inactive" eller lignende, aktiver den

### Tjek at du er i Test mode

- I Stripe dashboard, øverst til højre: **Test mode** skal være slået til
- Når du laver testbetaling, skal checkout-URL'en indeholde `cs_test_` (ikke `cs_live_`)

### Tjek Vercel logs efter testbetaling

1. **Vercel** → **Deployments** → seneste → **Functions** → `/api/webhook`
2. Se om der kommer nye logs lige efter testbetalingen
3. Hvis der kommer logs → Webhook bliver kaldt, men noget fejler
4. Hvis der ikke kommer logs → Stripe sender stadig ikke events

### Prøv at manuelt trigger webhook'en fra Stripe

I Stripe → din webhook:
- Klik **"Send test events"** (hvis muligt)
- Eller brug Stripe CLI: `stripe trigger checkout.session.completed`
- Se om der kommer en delivery i "Event deliveries"

## 📝 Checklist

- [ ] Gammel webhook slettet
- [ ] Ny webhook oprettet med korrekt URL
- [ ] Event: `checkout.session.completed` valgt
- [ ] Ny webhook secret kopieret
- [ ] STRIPE_WEBHOOK_SECRET opdateret i Vercel
- [ ] Redeployed i Vercel
- [ ] Testbetaling lavet
- [ ] Event deliveries viser Total 1, Succeeded
- [ ] Email modtaget med PDF
