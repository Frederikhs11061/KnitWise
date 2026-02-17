# Email Setup Guide (Resend)

## 1. Opret Resend konto

1. Gå til https://resend.com og opret en konto
2. Verificer din email

## 2. Opsæt domæne (valgfrit)

For at sende fra dit eget domæne:

1. Gå til Domains i Resend dashboard
2. Tilføj dit domæne (f.eks. stitchofcare.dk)
3. Tilføj DNS records som vist i dashboard
4. Vent på verificering (kan tage op til 24 timer)

## 3. Få API key

1. Gå til https://resend.com/api-keys
2. Klik "Create API Key"
3. Giv den et navn (f.eks. "Stitch of Care Production")
4. Kopier API key (starter med `re_`)
5. Tilføj til `.env.local`:

```env
RESEND_API_KEY=re_din_api_key
```

## 4. Installer Resend package

```bash
npm install resend
```

## 5. Test email

Efter opsætning vil emails automatisk blive sendt når betalinger gennemføres.

## Alternativer til Resend

Hvis du ikke vil bruge Resend, kan du også bruge:
- **SendGrid** (gratis tier: 100 emails/dag)
- **Mailgun** (gratis tier: 5000 emails/måned)
- **AWS SES** (meget billigt, kræver AWS setup)

Opdater `src/lib/email.ts` med den service du vælger.
