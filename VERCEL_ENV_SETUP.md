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

### 3. STRIPE_WEBHOOK_S
ECRET
- **Value:** Den du kopierede fra Stripe (starter med `whsec_`)
- **Environment:** ✅ Production ✅ Preview ✅ Development

## 🔧 VIGTIGT: Opret dem direkte på projektet!

Hvis du har problemer med at linke environment variables, er det bedst at **slette de gamle og oprette dem direkte på projektet**.

### Sådan gør du det:

1. Gå til Vercel → dit projekt → Settings → Environment Variables
2. **Slet de eksisterende** (hvis de findes):
   - Klik på "..." ved hver variable
   - Vælg "Delete"
   - Bekræft sletning
3. **Opret dem på ny direkte på projektet:**
   - Klik "Add New"
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** Din Stripe secret key (`sk_test_...`)
   - **Environments:** ✅ Production ✅ Preview ✅ Development
   - **Link to Projects:** Vælg dit projekt (skal automatisk være valgt, da du er på projektet)
   - Klik "Save"
4. **Gentag for de andre 2:**
   - `STRIPE_PUBLISHABLE_KEY` (value: `pk_test_...`)
   - `STRIPE_WEBHOOK_SECRET` (value: `whsec_...`)
5. **VIGTIGT:** Gå til Deployments → Redeploy den seneste deployment

## ✅ Efter opdatering:

1. Redeploy i Vercel
2. Vent til deployment er færdig
3. Test betaling igen
