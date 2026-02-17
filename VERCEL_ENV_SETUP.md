# Vercel Environment Variables Setup

## ✅ Tjek at disse er sat op i Vercel

Gå til Vercel → dit projekt → Settings → Environment Variables

Du skal have disse 3 variables:

### 1. STRIPE_SECRET_KEY
- **Value:** `sk_test_...` (din Stripe secret key fra Stripe dashboard)
- **Environment:** ✅ Production ✅ Preview ✅ Development

### 2. STRIPE_PUBLISHABLE_KEY  
- **Value:** `pk_test_...` (din Stripe publishable key fra Stripe dashboard)
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
