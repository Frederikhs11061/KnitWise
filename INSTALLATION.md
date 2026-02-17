# Installation Guide

## 1. Installer dependencies

Før du kan bruge Stripe og email funktionalitet, skal du installere packages:

```bash
npm install stripe resend
```

## 2. Opsæt environment variables

Kopier `.env.example` til `.env.local` og udfyld værdierne:

```bash
cp .env.example .env.local
```

Se `STRIPE_SETUP.md` og `EMAIL_SETUP.md` for detaljerede instruktioner.

## 3. Test lokalt

```bash
npm run dev
```

## 4. Deploy til Vercel

1. Push til GitHub
2. I Vercel dashboard, tilføj environment variables:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `RESEND_API_KEY`
3. Vercel deployer automatisk
