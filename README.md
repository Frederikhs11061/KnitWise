# KnitWise

A calm, simple knitting math assistant. Four tools for common pain points:

- **Gauge Adjustment Calculator** — Your gauge doesn't match the pattern? Get the correct stitch count.
- **Stitch Width Calculator** — How wide will X stitches at Y gauge be?
- **Yarn Substitution Calculator** — Using different yarn? Find how many skeins you need (with 10% safety margin).
- **Yarn Usage Estimator** — Estimate meters for sweaters, cardigans, hats, etc. by size and yarn weight.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## Run

**Vigtigt:** Kør fra projektmappen (den der indeholder `package.json`).

```bash
cd vibecoding   # hvis du er i mappen over
npm install
npm run dev
```

Åbn den URL som terminalen viser (typisk [http://localhost:3000](http://localhost:3000)). Hvis port 3000 er optaget, bruges 3001, 3002 osv. — tjek terminalen.

### Får du 404?

1. Tjek at du er i den rigtige mappe: `ls` skal vise `package.json` og `src/`
2. Stop serveren (Ctrl+C) og kør: `rm -rf .next && npm run dev`
3. Prøv både `/` og `/tools` — begge bør virke

## Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout, metadata
│   ├── page.tsx        # Landing page
│   └── tools/
│       └── page.tsx    # Tools page
├── components/
│   ├── ui/             # Input, Card, Select, ResultBox
│   └── tools/          # 4 calculator components
└── lib/
    └── yarnData.ts     # Yarn usage estimates config
```

## Future ready

- Structure supports adding: user accounts, saved projects, PDF export, Stripe
