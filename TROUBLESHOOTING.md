# Troubleshooting: Betaling virker ikke

## ✅ Tjekliste

### 1. Er environment variables sat op?
- ✅ STRIPE_SECRET_KEY
- ✅ STRIPE_PUBLISHABLE_KEY  
- ✅ STRIPE_WEBHOOK_SECRET

### 2. Har du redeployed efter at tilføje variables?
**Dette er ofte problemet!**
- Vercel → Deployments → (...) → Redeploy
- Vent til deployment er færdig

### 3. Tjek browser console for fejl
1. Åbn dit site
2. Tryk F12 (eller højreklik → Inspect)
3. Gå til "Console" tab
4. Prøv at købe noget
5. Se om der er røde fejlbeskeder

### 4. Tjek Vercel logs
1. Vercel → dit projekt → Deployments
2. Klik på den seneste deployment
3. Gå til "Functions" tab
4. Klik på `/api/checkout`
5. Se om der er fejl i logs

### 5. Tjek om du er logget ind
- Du skal være logget ind for at købe
- Gå til `/login` og log ind først

### 6. Tjek om kurven har items
- Tilføj en opskrift til kurven først
- Gå til `/kurv` og tjek at der er items

## 🔍 Almindelige fejl

### Fejl: "STRIPE_SECRET_KEY not configured"
- **Løsning:** Tjek at STRIPE_SECRET_KEY er sat op i Vercel og redeploy

### Fejl: "Du skal være logget ind"
- **Løsning:** Gå til `/login` og log ind først

### Fejl: "Din kurv er tom"
- **Løsning:** Tilføj opskrifter til kurven først

### Fejl: CORS eller network error
- **Løsning:** Tjek at dit domæne er korrekt i Stripe webhook URL

## 🚀 Quick Fix

1. **Redeploy i Vercel** (ofte løser det!)
2. **Hard refresh browser:** Cmd+Shift+R (Mac) eller Ctrl+Shift+R (Windows)
3. **Tjek browser console** for fejl
4. **Tjek Vercel logs** for API fejl
