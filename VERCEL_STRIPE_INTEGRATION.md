# Vercel Stripe Integration - Skal jeg bruge det?

## Hvad er Vercel Stripe Integration?

Vercel's Stripe integration i Marketplace er en **valgfri** feature der kan:
- Automatisk synkronisere Stripe keys til Vercel environment variables
- Gøre det nemmere at skifte mellem test/live mode
- Give bedre integration mellem Vercel og Stripe

## Skal jeg bruge det?

**Kort svar: Ikke nødvendigt, men kan være praktisk.**

Du har allerede sat Stripe op manuelt med:
- ✅ Environment variables i Vercel
- ✅ Webhook i Stripe dashboard
- ✅ API routes i din kode

## Hvis du vil bruge det:

1. Gå til Vercel → dit projekt → Settings → Integrations
2. Find "Stripe" i Marketplace
3. Klik "Add Integration"
4. Forbind din Stripe konto
5. Vercel vil automatisk synkronisere keys

**Bemærk:** Dette erstatter ikke din webhook setup - du skal stadig have webhook sat op i Stripe dashboard.

## Anbefaling:

**Brug det IKKE lige nu** - du har allerede alt sat op korrekt. Hvis du senere vil have nemmere management, kan du tilføje det.

**Fokusér i stedet på at få login til at virke!**
