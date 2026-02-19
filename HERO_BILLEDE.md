# Hero-billede til forsiden

Hero-sektionen bruger nu et baggrundsbillede som i Lovable-designet.

## Billede der skal tilføjes:

- **Sti:** `/public/assets/hero-knitting.jpg`
- **Beskrivelse:** Et varmt, indbydende flat lay billede med yarn, strikkepinde og strikket tøj (ligesom i Lovable-designet)
- **Størrelse:** Anbefalet minimum 1920x1080px (eller større)
- **Format:** JPG eller WebP

## Hvis billede mangler:

Hvis `/public/assets/hero-knitting.jpg` ikke findes, vil hero-sektionen vise en gradient overlay i stedet (fallback).

## Tilføj billede:

1. Opret mappen hvis den ikke findes: `public/assets/`
2. Tilføj dit hero-billede som `hero-knitting.jpg`
3. Billedet vil automatisk blive brugt i hero-sektionen

## Alternativ:

Hvis du vil bruge et andet billede, opdater stien i `src/app/page.tsx` linje hvor der står:
```tsx
src="/assets/hero-knitting.jpg"
```
