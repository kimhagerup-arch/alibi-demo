# Alibi – runde 16: rette engelsk, ytelse, koble Vercel til GitHub og slå sammen til main

Følg CLAUDE.md, inkludert dev/main-flyten (#32) og sporbarhetsreglene.
Les CLAUDE.md, docs/CHANGELOG.md, docs/TODO.md og docs/DECISIONS.md (#30–#32).
Neste ledige rundenummer (trolig 16). Stå på `dev`, `git status` rent – ellers stopp.

Rekkefølge: 1–3 gjøres på `dev`. Del 4 (sammenslåing) gjøres **bare** hvis alle
kontrollene i del 3 er bestått. Feiler noe: stopp før del 4 og rapporter.

## 1. Oversettelser (endres i `tekst/en.json` / `tekst/meny.json`, deretter kjør generatoren)

| Nå | Skal bli |
|---|---|
| Menypunktene «The story · The house · The menu …» | Kort form i navigasjonen: **Story · House · Menu · Find us · Practical** (tilsvarende for evt. andre punkter). Seksjonsoverskriftene beholder bestemt form («The story» osv.). |
| «Alta · the cellar · since tonight» | **«Alta · the cellar · tonight»** |
| «The house's own» | **«House special»** |
| «a little rude» | **«a little cheeky»** – sjekk først at den norske kilden er «litt frekk» e.l.; er den noe annet, velg nærmeste naturlige engelske og rapporter |
| «The lime wedge stopped by the flame on the way» | **«The lime wedge passes through the flame on its way in»** |
| «Mannsverk strawberry» | **«Mannsverk Farm strawberries»** (jordbær fra Mannsverk Gård) – oppdater ordlista i `meny.json` |

Behold uendret: «Eat upstairs. Nightclub next door. Talk here.», «Cellars keep their own
hours», 404-teksten, «Directions in Google Maps», «Atmosphere photos».
Lukk lanseringskravet om engelsk tekstkontroll i TODO for disse punktene. Delingsbildet med
norsk tekst står fortsatt i backlog.

## 2. Ytelse

Performance falt fra 97 til 95 på begge språk i runde 15. Det er på grensa av kravet.
- Finn årsaken med Lighthouse-detaljene (sannsynlige kandidater: nytt inline-skript i
  `<head>`, JSON med tekster i `<head>`, større HTML, språkvelgeren, render-blokkering).
- Rett det uten å fjerne funksjonalitet. Mål: **97 eller bedre på begge språk**, CLS fortsatt ≤ 0,012.
- Kjør Lighthouse minst 3 ganger per side og rapporter median, slik at vi ikke jager støy.
  Hvis 97 ikke lar seg nå uten å ofre noe, rapporter hva som koster hva, og stopp før del 4.

## 3. Koble Vercel til GitHub og kontroller

1. Prøv å koble prosjektet til repoet med `vercel git connect` (repo `kimhagerup-arch/alibi-demo`).
   Produksjonsgren skal være `main`. Klarer du det ikke fra CLI, gå videre og skriv i rapporten
   nøyaktig hva Kim må gjøre i dashboardet (Settings → Git → Connect → repo, produksjonsgren `main`).
2. Kjør generatoren med `--sjekk` (skal være i synk), push `dev`, og kontroller dev-forhåndsvisningen:
   - Endringene fra del 1 synes på engelsk side, norsk side er uendret.
   - Språkflyt med tom lagring: `/` engelsk → velg norsk → `/no/` → `/` sender til `/no/` → velg engelsk → blir på `/`.
   - Skjult meny med `æventyr` og `aeventyr`, dør, lyd, «Walk straight in», 404.
   - Ingen horisontal rulling på 375 px, headerhøyde uendret.
3. Skjermbilder av endrede steder (1440 og 375) i
   `C:\Users\kimha\Desktop\Business\KOVISION\alibi-skjermbilder\runde-16\`.

## 4. Slå sammen til main (kun hvis del 3 er bestått)

- Tag slutten av runde 15 med `runde-15` på dens siste commit (fra CHANGELOG), hvis ikke gjort.
- `git checkout main` → `git pull` → `git merge --no-ff dev` → tag `runde-16` → `git push origin main --tags`.
- Publisering: er Vercel nå koblet til GitHub, skjer produksjonsdeploy automatisk fra `main`.
  Hvis ikke: deploy produksjon fra `main` med `vercel --prod`, som tidligere.
- Kontroller `alibi-demo.vercel.app` etterpå: `/` viser engelsk, `/no/` norsk, begge med noindex,
  og språkvelgeren virker.
- Gå tilbake til `dev` (`git checkout dev`, `git merge main`) så grenene står likt.

## 5. Sporbarhet

- CHANGELOG: runde 16, og fjern «ikke slått sammen til main» fra runde 15.
- DECISIONS: oppdater #32 med om Vercel nå er koblet til GitHub.
- TODO: oppdater «Sist verifisert», lukk punktet om Vercel-kobling hvis gjort.
- PROMPTS.md + arkiver prompten.
- Sluttrapport: oversettelsene som ble endret, årsak til ytelsesfallet og ny Lighthouse (median
  for begge språk), status for Vercel–GitHub-koblingen, bekreftelse på at main er sammenslått og
  at alibi-demo.vercel.app viser engelsk først, og hvor skjermbildene ligger.
