# Fix: Environment Variables vises ikke i Production

## Problemet
Test endpoint (`/api/test-env`) viser at der er **INGEN** Stripe environment variables i production:
```json
{
  "stripeVars": {},
  "hasSecretKey": false,
  "hasPublishableKey": false,
  "hasWebhookSecret": false,
  "allEnvKeys": []
}
```

## Løsning - Step by Step

### 1. Tjek Environment Variables i Vercel

1. Gå til Vercel → dit projekt → **Settings** → **Environment Variables**
2. Tjek at du har disse 3 med **PRÆCIST** disse navne (case-sensitive):
   - `STRIPE_SECRET_KEY` (ikke `stripe_secret_key` eller `Stripe_Secret_Key`)
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`

### 2. Tjek Environment Settings

For **hver** environment variable skal du have markeret:
- ✅ **Production** (vigtigst!)
- ✅ Preview
- ✅ Development

**Hvis Production ikke er markeret, vil de ikke være tilgængelige i production!**

### 3. Slet og Tilføj Igen (hvis nødvendigt)

Hvis de allerede findes men ikke virker:

1. **Slet** de gamle environment variables
2. **Tilføj** dem igen fra bunden:
   - Name: `STRIPE_SECRET_KEY`
   - Value: `sk_test_51T1rrgA1OXnUPMsQe1oELeUUBxyDoXIYqMPj8vE284bbFoIWSdR8JsaDyCIhG26UJfTkWkx6cdwYbUxjUnMgVrLV0028mm4kSq`
   - Environment: ✅ Production ✅ Preview ✅ Development
3. Gentag for de andre to

### 4. VIGTIGT: Redeploy!

**Environment variables træder først i kraft efter redeploy!**

1. Gå til **Deployments** tab
2. Find den seneste deployment
3. Klik på de tre prikker (...) → **Redeploy**
4. Vent til deployment er færdig

### 5. Test Igen

Efter redeploy:
1. Gå til `https://dit-domæne.vercel.app/api/test-env`
2. Den skulle nu vise:
   ```json
   {
     "hasSecretKey": true,
     "hasPublishableKey": true,
     "hasWebhookSecret": true,
     "stripeVars": {
       "STRIPE_SECRET_KEY": "sk_test_51...",
       "STRIPE_PUBLISHABLE_KEY": "pk_test_51...",
       "STRIPE_WEBHOOK_SECRET": "whsec_..."
     }
   }
   ```

### 6. Test Checkout

Hvis test endpoint viser at variables er tilgængelige:
1. Gå til dit site
2. Prøv at købe noget
3. Det skulle virke nu! ✅

## Hvis det stadig ikke virker

Send mig screenshot af:
1. Vercel → Settings → Environment Variables (så jeg kan se hvordan de er sat op)
2. Resultatet fra `/api/test-env` efter redeploy
