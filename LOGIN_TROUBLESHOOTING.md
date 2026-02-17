# Login Troubleshooting

## Problem: Kan ikke logge ind

Login bruger localStorage, hvilket kræver at:
1. JavaScript er aktiveret
2. Cookies/localStorage er tilladt
3. Du er på samme domæne

## Test login lokalt:

1. Kør `npm run dev`
2. Gå til `http://localhost:3000/login`
3. Udfyld email og password
4. Klik "Log ind"
5. Du skulle blive redirected til `/profil`

## Hvis det ikke virker:

### 1. Tjek browser console
- Tryk F12 → Console tab
- Se om der er røde fejlbeskeder
- Hvad står der?

### 2. Tjek localStorage
- Tryk F12 → Application tab → Local Storage
- Se om der er en key: `stitch-of-care-user`
- Hvis den er der, er du faktisk logget ind!

### 3. Hard refresh
- Mac: Cmd+Shift+R
- Windows: Ctrl+Shift+R
- Ryd browser cache

### 4. Prøv i incognito/private mode
- Åbn et nyt incognito vindue
- Gå til dit site
- Prøv at logge ind igen

## På Vercel deployment:

Hvis login virker lokalt men ikke på Vercel:

1. **Tjek at koden er deployed:**
   - Vercel → Deployments → Tjek at seneste commit er deployed

2. **Redeploy:**
   - Vercel → Deployments → (...) → Redeploy

3. **Tjek browser console på Vercel site:**
   - Gå til dit Vercel domæne
   - Tryk F12 → Console
   - Prøv at logge ind
   - Se fejlbeskeder

## Quick Fix:

Prøv at oprette en ny konto i stedet for at logge ind:
1. Gå til `/login`
2. Klik "Har du ikke en konto? Opret en her"
3. Udfyld navn, email, password
4. Klik "Opret konto"

## Hvis intet virker:

Send mig:
1. Screenshot af browser console (F12 → Console)
2. Hvad sker der når du klikker "Log ind"?
3. Bliver du redirected eller sker der ingenting?
