# Supabase-tabeller til login, ønskeliste, anmeldelser, adresser og ordre

Før profilen, ønskelisten, anmeldelser og adresser virker, skal tabellerne oprettes i Supabase.

## Sådan gør du

1. Gå til [supabase.com](https://supabase.com) → dit projekt.
2. Åbn **SQL Editor** → **New query**.
3. Åbn filen `supabase/migrations/001_tables.sql` i projektet, kopier hele indholdet og indsæt i SQL Editor.
4. Klik **Run**.

Tabellerne `profiles`, `wishlist`, `reviews`, `addresses` og `orders` oprettes, inkl. RLS (Row Level Security) og trigger der opretter en profil automatisk, når en bruger tilmelder sig.

## Efter kørsel

- **Log ind / Opret konto** på `/login` bruger nu Supabase Auth (rigtig e-mail/adgangskode).
- **Ønskeliste**: Hjerte på opskrifter (og under "Ønskeliste" i profilen).
- **Anmeldelser**: På hver opskriftsside kan brugerne anmelde og kommentere (1–5 stjerner).
- **Adresser**: Under "Adresser" i profilen kan brugerne tilføje og slette leveringsadresser.
- **Købshistorik**: Ordre gemmes i Supabase, når en logget bruger gennemfører checkout (og vises under "Købshistorik" i profilen).
