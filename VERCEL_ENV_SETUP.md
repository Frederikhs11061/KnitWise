# Vercel Environment Variables Setup

## ✅ Tjek at disse er sat op i Vercel

Gå til Vercel → dit projekt → Settings → Environment Variables

Du skal have disse 3 variables:

### 1. STRIPE_SECRET_KEY
- **Value:** `sk_test_51T1rrgA1OXnUPMsQe1oELeUUBxyDoXIYqMPj8vE284bbFoIWSdR8JsaDyCIhG26UJfTkWkx6cdwYbUxjUnMgVrLV0028mm4kSq`
- **Environment:** ✅ Production ✅ Preview ✅ Development

### 2. STRIPE_PUBLISHABLE_KEY  
- **Value:** `pk_test_51T1rrgA1OXnUPMsQHXFWJjl1DY1xsEVmnb2VhJVK23pV1iyKm9ZLNuz9xUElp47c4VkHyc6c8oQfapcd3c2lXiof00KUPTpY47`
- **Environment:** ✅ Production ✅ Preview ✅ Development

### 3. STRIPE_WEBHOOK_SECRET
- **Value:** Den du kopierede fra Stripe (starter med `whsec_`)
- **Environment:** ✅ Production ✅ Preview ✅ Development

## 🔧 Hvis de mangler:

1. Gå til Vercel → dit projekt → Settings → Environment Variables
2. Klik "Add New" for hver manglende variable
3. Udfyld Name og Value (se ovenfor)
4. Marker alle environments
5. Klik "Save"
6. **VIGTIGT:** Gå til Deployments → Redeploy den seneste deployment

## ✅ Efter opdatering:

1. Redeploy i Vercel
2. Vent til deployment er færdig
3. Test betaling igen
