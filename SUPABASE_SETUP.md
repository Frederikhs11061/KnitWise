# Supabase – 3 skridt

Du skal kun gøre disse 3 ting. Resten er sat op i koden.

---

## Skridt 1: Find dine værdier i Supabase

1. Gå til [supabase.com](https://supabase.com) → dit projekt.
2. Klik på **tandhjulet** (Project Settings) → **API**.
3. Klik på fanen **"Legacy anon, service_role API keys"** (ikke "Publishable key").
4. Kopier disse to:
   - **Project URL** (fx `https://abcdefgh.supabase.co`)
   - **anon public** (den lange nøgle der starter med `eyJ...`)

---

## Skridt 2: Indsæt i Vercel

1. Gå til Vercel → dit projekt → **Settings** → **Environment Variables**.
2. Klik **Add** og opret **to** variabler:

   | Key (navn) | Value (værdi) |
   |------------|----------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Din **Project URL** fra Skridt 1 |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Din **anon public**-nøgle fra Skridt 1 |

3. Vælg **Production**, **Preview** og **Development** ved begge.
4. Klik **Save**.

*(Valgfrit: Hvis du også vil bruge admin-funktioner senere, kan du tilføje `SUPABASE_SERVICE_ROLE_KEY` med værdien **service_role** fra samme fane i Supabase.)*

---

## Skridt 3: Gen-deploy og tjek

1. I Vercel: gå til **Deployments** → klik på **...** ved seneste deploy → **Redeploy** (eller push en lille ændring til GitHub).
2. Når deploy er færdig, åbn i browseren:
   - **https://dit-domain.vercel.app/supabase-status**
3. Du bør se en grøn boks: **"Supabase forbundet"**. Hvis du ser rød fejl, står der præcis hvad du skal rette på samme side.

---

## Lokalt (valgfrit)

Opret filen `.env.local` i projektroden med samme to linjer:

```env
NEXT_PUBLIC_SUPABASE_URL=https://din-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Kør `npm run dev` og åbn **http://localhost:3000/supabase-status** for at tjekke.

---

Det er alt. Når status-siden viser grøn, er Supabase koblet på og klar til brug i koden.
