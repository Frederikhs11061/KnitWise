# Fix: "Stripe er ikke konfigureret" Fejl

## Problemet
Fejlen "Stripe er ikke konfigureret" betyder at `STRIPE_SECRET_KEY` ikke er tilgængelig i Vercel deployment.

## Løsning - Step by Step

### 1. Tjek Environment Variables i Vercel

1. Gå til https://vercel.com
2. Find dit projekt
3. Gå til **Settings** → **Environment Variables**
4. Tjek at du har disse 3:

   ✅ **STRIPE_SECRET_KEY**
   - Value: `sk_test_51T1rrgA1OXnUPMsQe1oELeUUBxyDoXIYqMPj8vE284bbFoIWSdR8JsaDyCIhG26UJfTkWkx6cdwYbUxjUnMgVrLV0028mm4kSq`
   - Environment: ✅ Production ✅ Preview ✅ Development

   ✅ **STRIPE_PUBLISHABLE_KEY**
   - Value: `pk_test_51T1rrgA1OXnUPMsQHXFWJjl1DY1xsEVmnb2VhJVK23pV1iyKm9ZLNuz9xUElp47c4VkHyc6c8oQfapcd3c2lXiof00KUPTpY47`
   - Environment: ✅ Production ✅ Preview ✅ Development

   ✅ **STRIPE_WEBHOOK_SECRET**
   - Value: Den du kopierede fra Stripe (starter med `whsec_`)
   - Environment: ✅ Production ✅ Preview ✅ Development

### 2. Hvis de mangler - Tilføj dem

1. Klik **"Add New"**
2. Udfyld:
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** `sk_test_51T1rrgA1OXnUPMsQe1oELeUUBxyDoXIYqMPj8vE284bbFoIWSdR8JsaDyCIhG26UJfTkWkx6cdwYbUxjUnMgVrLV0028mm4kSq`
   - **Environment:** Marker alle tre (Production, Preview, Development)
3. Klik **"Save"**
4. Gentag for de andre to variables

### 3. VIGTIGT: Redeploy!

**Environment variables træder først i kraft efter redeploy!**

1. Gå til **Deployments** tab
2. Find den seneste deployment
3. Klik på de tre prikker (...) til højre
4. Klik **"Redeploy"**
5. Vent til deployment er færdig (1-2 minutter)

### 4. Test igen

Efter redeploy:
1. Gå til dit site
2. Tilføj opskrift til kurven
3. Gå til kurv
4. Klik "Gå til betaling"
5. Du skulle nu blive redirected til Stripe checkout ✅

## Hvis det stadig ikke virker

Tjek Vercel logs:
1. Deployments → seneste deployment → Functions → `/api/checkout`
2. Se om der er fejlbeskeder
3. Send mig fejlbeskederne
