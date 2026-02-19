-- Test-reviews til at teste reviews-funktionaliteten
-- Kør denne fil i Supabase: SQL Editor → New query → indsæt og Run.
-- 
-- NOTE: Dette kræver at der er mindst én bruger i auth.users.
-- Hvis du ikke har brugere endnu, opret en test-bruger først via signup/login.

-- Først: Find en eksisterende bruger ID (eller brug din egen)
-- SELECT id FROM auth.users LIMIT 1;

-- Indsæt test-reviews (erstatt 'USER_ID_HER' med en faktisk user_id fra auth.users)
-- Hvis du vil indsætte uden user_id, skal du først disable RLS eller bruge service role.

-- Eksempel: Indsæt med en eksisterende user_id
-- INSERT INTO public.reviews (user_id, pattern_slug, rating, comment) VALUES
--   ('USER_ID_HER', 'hygge-sweater', 5, 'Fantastisk opskrift! Jeg har strikket den tre gange nu. Meget tydelig vejledning og perfekt pasform.'),
--   ('USER_ID_HER', 'hygge-sweater', 4, 'God opskrift, men jeg synes ærmerne blev lidt lange. Ellers super god kvalitet.'),
--   ('USER_ID_HER', 'havbrise-cardigan', 5, 'Min favorit! Let og luftig, perfekt til forår og sommer. Anbefaler stærkt.'),
--   ('USER_ID_HER', 'havbrise-cardigan', 5, 'Så flot! Har fået så mange komplimenter. Opskriften er let at følge selv for begyndere.'),
--   ('USER_ID_HER', 'lun-hue', 4, 'Hurtig og nem opskrift. Perfekt til at bruge restgarn. Min datter elsker den!'),
--   ('USER_ID_HER', 'vinter-sweater', 5, 'Varm og behagelig sweater. Har strikket den i uld og den holder rigtig godt.'),
--   ('USER_ID_HER', 'sommer-cardigan', 4, 'Flot design og god pasform. Lidt mere avanceret end jeg troede, men resultatet var det værd.')
-- ON CONFLICT (user_id, pattern_slug) DO NOTHING;

-- Alternativ: Hvis du vil indsætte med forskellige user_id'er (fx hvis du har flere test-brugere)
-- Du kan oprette flere test-brugere og bruge deres ID'er her.
