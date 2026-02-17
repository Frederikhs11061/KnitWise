# Quick Start: Få Stripe til at virke i produktion

## 🚀 Hurtig Guide (5 minutter)

### 1. Få dit Vercel domæne
- Gå til Vercel → dit projekt → Settings → Domains
- Dit domæne er: `___________________________`

### 2. Opret Stripe Webhook
1. Gå til: https://dashboard.stripe.com/webhooks
2. Klik "Add endpoint"
3. URL: `https://DIT-DOMÆNE/api/webhook` (indsæt dit domæne)
4. Event: `checkout.session.completed`
5. Kopier webhook secret: `whsec_...`

### 3. Tilføj til Vercel
1. Vercel → dit projekt → Settings → Environment Variables
2. Tilføj:
   - Name: `STRIPE_WEBHOOK_SECRET`
   - Value: `whsec_...` (fra trin 2)
   - Environment: ✅ Production ✅ Preview ✅ Development
3. Save

### 4. Redeploy
- Vercel → Deployments → (...) → Redeploy

### 5. Test
- Gå til dit site
- Køb en opskrift med test kort: `4242 4242 4242 4242`
- Tjek Stripe dashboard → Webhooks → "Recent deliveries" for at se om det virker

## ✅ Det er det!

Se `WEBHOOK_SETUP_PRODUCTION.md` for detaljeret guide.
