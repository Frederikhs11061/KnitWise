# Email Troubleshooting Guide

## Problem: Ingen email efter køb

### 0. Test om ordre-mailen virker (uden Stripe)

Åbn i browseren (efter deploy):

```
https://stichofcare.vercel.app/api/test-order-email?email=DIN@EMAIL.dk
```

- **Får du mail med PDF** → Ordre-mail + Resend virker. Problemet er at Stripe ikke kalder webhook’en (eller webhook secret matcher ikke).
- **Får du ingen mail** → Tjek Vercel Functions-logs for `/api/test-order-email` og Resend dashboard for fejl.

### 1. Tjek Vercel Logs

1. Gå til Vercel → dit projekt → Deployments
2. Klik på den seneste deployment
3. Gå til "Functions" tab
4. Find `/api/webhook` funktionen
5. Tjek logs for fejl

### 2. Tjek Resend Dashboard

1. Gå til https://resend.com/emails
2. Tjek om emails er blevet sendt
3. Se om der er fejlbeskeder

### 3. Vigtigt: Resend Domæne

Resend kræver at du bruger:
- **Test domæne:** `onboarding@resend.dev` (virker med det samme)
- **Dit eget domæne:** `noreply@stitchofcare.dk` (kræver verificering)

**For at bruge dit eget domæne:**
1. Gå til Resend → Domains
2. Tilføj dit domæne (f.eks. `stitchofcare.dk`)
3. Tilføj DNS records som vist
4. Vent på verificering (op til 24 timer)
5. Opdater `from` i `src/lib/email.ts` til dit domæne

**For nu:** Email funktionen bruger `onboarding@resend.dev` som test domæne.

### 4. Tjek Environment Variable

1. Gå til Vercel → dit projekt → Settings → Environment Variables
2. Tjek at `RESEND_API_KEY` findes
3. Tjek at den er markeret for Production
4. Redeploy hvis du har ændret den

### 5. Test Webhook Manuelt

1. Gå til Stripe → Webhooks
2. Find din webhook
3. Klik på den
4. Scroll ned til "Recent deliveries"
5. Tjek om webhook events modtages
6. Klik på et event for at se detaljer

### 6. Fejl i PDF Generering

Hvis PDF generering fejler, kan det stoppe email sending. Tjek logs for:
- `Error generating PDF`
- `Pattern not found`
- `PDF generation failed`

### 7. Test Email Direkte

Du kan teste email funktionen direkte ved at kalde webhook'en manuelt eller oprette en test endpoint.

## Almindelige Fejl

**"Domain not verified"**
- Brug `onboarding@resend.dev` som test domæne
- Eller verificer dit domæne i Resend

**"Invalid API key"**
- Tjek at API key er korrekt kopieret
- Tjek at den er sat i Vercel
- Redeploy efter at have tilføjet den

**"Email not sent"**
- Tjek Resend dashboard for fejl
- Tjek Vercel logs
- Tjek at webhook modtager events fra Stripe

## Næste Skridt

1. Tjek Vercel logs først
2. Tjek Resend dashboard
3. Verificer at webhook modtager events
4. Test med test domæne (`onboarding@resend.dev`)
