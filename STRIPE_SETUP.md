# Stripe Setup Guide

## 💰 Priser - Hvad koster Stripe?

**Ingen månedligt abonnement!** Stripe er helt gratis at oprette og teste.

- ✅ **Test mode:** 100% gratis - uendeligt antal test betalinger
- ✅ **Ingen oprettelsesgebyr**
- ✅ **Ingen månedligt gebyr**
- 💳 **Kun gebyr ved faktiske betalinger:**
  - Danske/EU kort: **1,5% + 1,80 kr** per transaktion
  - Eksempel: 100 kr køb = 1,50 kr + 1,80 kr = **3,30 kr i gebyr**
  - Du modtager: **96,70 kr**

Du betaler altså kun når kunder faktisk køber noget. Test er helt gratis!

## 1. Opret Stripe konto

1. Gå til https://stripe.com og opret en konto
2. Vælg "Danmark" som land
3. Udfyld virksomhedsoplysninger
4. **Du kan starte med test mode med det samme - ingen betaling nødvendig!**

## 2. Få API keys

1. Gå til https://dashboard.stripe.com/apikeys
2. Kopier din **Secret key** (starter med `sk_test_` i test mode)
3. Kopier din **Publishable key** (starter med `pk_test_` i test mode)
4. Tilføj dem til `.env.local`:

```env
STRIPE_SECRET_KEY=sk_test_din_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_din_publishable_key
```

## 3. Opsæt Webhook

1. Gå til https://dashboard.stripe.com/webhooks
2. Klik "Add endpoint"
3. Endpoint URL: `https://dit-domæne.dk/api/webhook`
4. Vælg event: `checkout.session.completed`
5. Kopier **Signing secret** (starter med `whsec_`)
6. Tilføj til `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_din_webhook_secret
```

## 4. Test lokalt med Stripe CLI

For at teste webhooks lokalt:

1. Installer Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3000/api/webhook`
4. Kopier webhook secret fra output og brug den i `.env.local`

## 5. Test betalinger

- Brug test kort: `4242 4242 4242 4242`
- Udløbsdato: fremtidig dato
- CVC: ethvert 3-cifret tal
- ZIP: ethvert 5-cifret tal

## 6. Gå live

Når du er klar til produktion:

1. Skift til "Live mode" i Stripe dashboard
2. Opdater API keys i `.env.local` med live keys
3. Opdater webhook URL til dit produktionsdomæne
4. Test med rigtige kort (små beløb først!)

**Bemærk:** Du betaler først gebyrer når du går live og modtager rigtige betalinger. Test mode er helt gratis!

## 7. Hvornår betaler jeg?

- **Test mode:** Aldrig - helt gratis
- **Live mode:** Først når kunder faktisk betaler
- **Gebyr:** 1,5% + 1,80 kr per dansk/EU kort betaling
- **Penge på konto:** Stripe sender penge til din bankkonto automatisk (typisk 2-7 dage)
