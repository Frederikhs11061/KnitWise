# Stitch of Care

En dansk webshop for strikkeopskrifter kombineret med praktiske strikkeberegnere. Stitch of Care hjælper strikkere med at finde de rigtige opskrifter, vælge garn og undgå fejlkøb.

## Features

### Webshop
- **Strikkeopskrifter** - Køb digitale PDF-opskrifter
- **Filtrering & sortering** - Filtrer efter sværhedsgrad, kategori og søg
- **Kurv** - Funktionel indkøbskurv klar til Stripe integration
- **Login** - Brugerkonti (klar til integration med Clerk eller lignende)

### Strikkeberegnere
- **Masketal-beregner** - Juster masketal når din strikkefasthed afviger
- **Maskebredde-beregner** - Beregn bredde ud fra masker og strikkefasthed
- **Garn-erstatning (simpel)** - Find antal nøgler ved garnskifte
- **Avanceret garn-erstatning** - Justering for strikkefasthed med prisberegning
- **Garn-sammenligning** - Sammenlign to garner side-om-side
- **Garnforbrugs-estimator** - Estimer garnforbrug for forskellige projekter

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS 3
- LocalStorage (cart management)

## Run

**Vigtigt:** Kør fra projektmappen (den der indeholder `package.json`).

```bash
cd vibecoding   # hvis du er i mappen over
npm install
npm run dev
```

Åbn den URL som terminalen viser (typisk [http://localhost:3000](http://localhost:3000)).

### Får du 404?

1. Tjek at du er i den rigtige mappe: `ls` skal vise `package.json` og `src/`
2. Stop serveren (Ctrl+C) og kør: `rm -rf .next && npm run dev`
3. Prøv både `/` og `/tools` — begge bør virke

## Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout med navigation
│   ├── page.tsx             # Landing page
│   ├── opskrifter/          # Webshop
│   │   ├── page.tsx         # Opskrifter oversigt med filtre
│   │   └── [slug]/          # Opskrift detalje side
│   ├── tools/               # Strikkeberegnere
│   │   └── page.tsx
│   ├── blog/                # Blog sektion
│   ├── om-os/               # Om os side
│   ├── login/               # Login/opret konto
│   └── kurv/                # Indkøbskurv
├── components/
│   ├── ui/                  # Reusable UI komponenter
│   ├── tools/               # Beregner komponenter
│   ├── CartButton.tsx       # Kurv knap med item count
│   └── AddToCartButton.tsx  # Tilføj til kurv knap
└── lib/
    ├── patterns.ts          # Opskrift data og filtre/sortering
    ├── cart.ts              # Kurv management (localStorage)
    └── yarnData.ts          # Garnforbrug data
```

## Design

Stitch of Care bruger et skandinavisk design med:
- Bløde, neutrale farver (beige, rose, sage)
- Mørk grøn accent fra logo (forest)
- Rose accent til CTA knapper
- Generøs spacing og læsbar typografi
- Mobile-first responsivt design

## Næste skridt

- [ ] Stripe integration for betaling
- [ ] Email levering af PDF-opskrifter efter køb
- [ ] Authentication integration (Clerk eller lignende)
- [ ] Produktbilleder upload
- [ ] SEO optimering
- [ ] Analytics integration

## Deployment

Projektet er sat op til deployment på Vercel:
1. Push til GitHub
2. Vercel deployer automatisk fra `main` branch
3. Custom domain kan tilføjes i Vercel dashboard
