# Webhook Setup til Produktion - Step-by-Step Guide

## ✅ Trin 1: Få dit Vercel domæne

1. Gå til https://vercel.com og log ind
2. Find dit projekt "stitch-of-care" (eller hvad det hedder)
3. Gå til "Settings" → "Domains"
4. Find dit produktionsdomæne (f.eks. `stitch-of-care.vercel.app` eller dit custom domain)
5. **Skriv domænet ned:** `___________________________`

## ✅ Trin 2: Opsæt Webhook i Stripe Dashboard

1. Gå til https://dashboard.stripe.com/webhooks
2. Klik på **"Add endpoint"** knappen (øverst til højre)
3. I "Endpoint URL" indtast:
   ```
   https://DIT-DOMÆNE-HER/api/webhook
   ```
   (Erstat `DIT-DOMÆNE-HER` med domænet fra trin 1)
   
   Eksempel:
   - Hvis dit domæne er `stitch-of-care.vercel.app` → `https://stitch-of-care.vercel.app/api/webhook`
   - Hvis dit domæne er `stitchofcare.dk` → `https://stitchofcare.dk/api/webhook`

4. Under "Events to send", vælg:
   - ✅ `checkout.session.completed`
   
5. Klik **"Add endpoint"**

6. **VIGTIGT:** Kopier **Signing secret** (starter med `whsec_`)
   - Den vises lige efter du har oprettet webhook
   - **Skriv den ned her:** `___________________________`

## ✅ Trin 3: Tilføj Webhook Secret til Vercel

1. Gå tilbage til Vercel dashboard
2. Find dit projekt → "Settings" → "Environment Variables"
3. Klik "Add New"
4. Tilføj følgende:

   **Name:** `STRIPE_WEBHOOK_SECRET`
   **Value:** `whsec_...` (den du kopierede fra Stripe)
   **Environment:** ✅ Production ✅ Preview ✅ Development

5. Klik "Save"

## ✅ Trin 4: Redeploy (hvis nødvendigt)

1. I Vercel dashboard, gå til "Deployments"
2. Klik på de tre prikker (...) på den seneste deployment
3. Klik "Redeploy"
4. Vent til deployment er færdig (1-2 minutter)

## ✅ Trin 5: Test Webhook

1. Gå til Stripe dashboard → Webhooks
2. Find din nye webhook endpoint
3. Klik på den
4. Scroll ned til "Recent deliveries"
5. Foretag en test betaling på dit site
6. Du skulle se en ny delivery i listen med status "Succeeded" ✅

## ✅ Test Betaling Flow

1. Gå til dit site (dit Vercel domæne)
2. Log ind (eller opret konto)
3. Tilføj en opskrift til kurven
4. Gå til kurv og klik "Gå til betaling"
5. Brug test kort:
   - **Kort:** `4242 4242 4242 4242`
   - **Udløbsdato:** `12/25` (eller fremtidig dato)
   - **CVC:** `123`
   - **ZIP:** `12345`
6. Efter betaling skulle du:
   - Blive redirected til `/checkout/success`
   - Se købet i din profil under "Købshistorik"
   - Modtage email (hvis Resend er sat op)

## 🔍 Troubleshooting

**Webhook fejler:**
- Tjek at URL er korrekt (inkl. `https://`)
- Tjek at webhook secret er korrekt i Vercel
- Tjek Stripe dashboard → Webhooks → "Recent deliveries" for fejlbeskeder

**Betaling virker men køb gemmes ikke:**
- Tjek at webhook er sat op korrekt
- Tjek browser console for fejl
- Tjek Vercel logs (Deployments → klik på deployment → "Functions" tab)

**Email sendes ikke:**
- Tjek at `RESEND_API_KEY` er sat op i Vercel
- Tjek Resend dashboard for fejl
- Email fungerer kun hvis Resend er sat op (se EMAIL_SETUP.md)

## 📝 Checklist

- [ ] Har fundet Vercel domæne
- [ ] Har oprettet webhook i Stripe dashboard
- [ ] Har kopieret webhook secret
- [ ] Har tilføjet `STRIPE_WEBHOOK_SECRET` til Vercel environment variables
- [ ] Har redeployed (hvis nødvendigt)
- [ ] Har testet betaling flow
- [ ] Har verificeret webhook modtager events i Stripe dashboard
