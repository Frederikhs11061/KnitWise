# VIGTIGT: Redeploy efter Environment Variables

## Problemet
Selvom du har sat environment variables op i Vercel, kan de ikke bruges før du **redeployer**.

## Løsning - Redeploy NU

### Step 1: Gå til Deployments
1. Gå til Vercel → dit projekt
2. Klik på **"Deployments"** tab (øverst)

### Step 2: Find seneste deployment
- Du skulle se en liste af deployments
- Find den seneste (øverst)

### Step 3: Redeploy
1. Klik på de **tre prikker (...)** til højre for den seneste deployment
2. Klik **"Redeploy"**
3. Vælg **"Use existing Build Cache"** (hvis muligt) eller bare klik "Redeploy"
4. **VENT** til deployment er færdig (1-2 minutter)

### Step 4: Test
Efter deployment er færdig:
1. Gå til dit site
2. Hard refresh: Cmd+Shift+R (Mac) eller Ctrl+Shift+R (Windows)
3. Prøv at købe noget igen

## Hvorfor skal jeg redeploy?

Environment variables bliver kun indlæst når Vercel bygger din app. Hvis du tilføjer variables efter en deployment, skal du redeploy for at de træder i kraft.

## Tjek at det virker

Efter redeploy, tjek Vercel logs:
1. Deployments → seneste deployment → Functions → `/api/checkout`
2. Se om der stadig er fejl
3. Hvis der er fejl, send mig fejlbeskederne
