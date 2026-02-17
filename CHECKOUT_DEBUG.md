# Checkout Fejl Debugging Guide

## Hvis du får fejlen "Der opstod en fejl ved oprettelse af checkout"

### 1. Tjek Vercel Environment Variables

Gå til Vercel → dit projekt → Settings → Environment Variables

**Du SKAL have disse 3:**
- ✅ `STRIPE_SECRET_KEY` = `sk_test_...`
- ✅ `STRIPE_PUBLISHABLE_KEY` = `pk_test_...`
- ✅ `STRIPE_WEBHOOK_SECRET` = `whsec_...`

**VIGTIGT:** Efter at tilføje/ændre environment variables skal du **redeploy**!

### 2. Tjek Vercel Logs

1. Gå til Vercel → dit projekt → Deployments
2. Klik på den seneste deployment
3. Gå til "Functions" tab
4. Klik på `/api/checkout`
5. Se fejlbeskederne i logs

**Hvad skal du lede efter:**
- "STRIPE_SECRET_KEY is not configured" → Environment variable mangler
- "Invalid API Key" → Forkert Stripe key
- "Invalid cart item" → Problem med kurv data
- Andre fejl → Kopier hele fejlbeskeden

### 3. Tjek Browser Console

1. Åbn dit site
2. Tryk F12 → Console tab
3. Prøv at købe noget
4. Se fejlbeskederne

**Hvad skal du lede efter:**
- Network errors (rød)
- API response errors
- JavaScript errors

### 4. Almindelige fejl og løsninger

#### Fejl: "Stripe er ikke konfigureret"
**Løsning:** 
- Tjek at `STRIPE_SECRET_KEY` er sat op i Vercel
- Redeploy efter at have tilføjet variable

#### Fejl: "Invalid API Key"
**Løsning:**
- Tjek at Stripe key er korrekt kopieret
- Tjek at der ikke er ekstra mellemrum
- Tjek at du bruger test keys (starter med `sk_test_`)

#### Fejl: "Din kurv er tom"
**Løsning:**
- Tjek at kurven faktisk har items
- Hard refresh browser (Cmd+Shift+R)

#### Fejl: "Ugyldig kurv data"
**Løsning:**
- Tjek browser console for detaljer
- Prøv at tømme kurven og tilføje items igen

### 5. Test lokalt først

```bash
npm run dev
```

Gå til `http://localhost:3000` og test checkout der. Hvis det virker lokalt men ikke på Vercel, er det sandsynligvis environment variables.

### 6. Send mig fejlbeskederne

Hvis intet virker, send mig:
1. Screenshot af Vercel logs (Functions → /api/checkout)
2. Screenshot af browser console (F12 → Console)
3. Hvad sker der når du klikker "Gå til betaling"?
