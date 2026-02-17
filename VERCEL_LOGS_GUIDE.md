# Hvor finder jeg logs i Vercel?

## Metode 1: Via Deployment (anbefalet)

1. Gå til Vercel → dit projekt
2. Klik på **"Deployments"** tab
3. Klik på den seneste deployment (den øverste)
4. Scroll ned til **"Runtime Logs"** eller **"Build Logs"**
5. Se fejlbeskederne der

## Metode 2: Via Real-time Logs

1. Gå til Vercel → dit projekt
2. Klik på **"Logs"** tab (hvis tilgængelig)
3. Se real-time logs

## Metode 3: Via Functions (hvis tilgængelig)

1. Gå til Vercel → dit projekt → **Deployments**
2. Klik på seneste deployment
3. Scroll ned - der skulle være en sektion med **"Functions"** eller **"Serverless Functions"**
4. Klik på `/api/checkout` hvis den vises

## Hvis du ikke kan finde logs:

1. **Tjek browser console:**
   - Åbn dit site
   - Tryk F12 → Console tab
   - Prøv at købe noget
   - Se fejlbeskederne

2. **Tjek Network tab:**
   - F12 → Network tab
   - Prøv at købe noget
   - Find `/api/checkout` request
   - Klik på den og se "Response" tab
   - Se fejlbeskeden der

## Send mig:

1. Screenshot af browser console (F12 → Console) når du prøver at købe
2. Screenshot af Network tab → `/api/checkout` → Response
3. Eller kopier fejlbeskederne fra Vercel logs hvis du kan finde dem
