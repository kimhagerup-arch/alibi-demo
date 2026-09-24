# Alibi – runde 17b: myk loop-overgang, ny måling og sammenslåing til main

Følg CLAUDE.md og dev/main-flyten (#32). Kim har sjekket dev-forhåndsvisningen og godkjent
sammenslåing til main i denne runden.

## 0. Før du starter
- Les CLAUDE.md, docs/CHANGELOG.md, docs/TODO.md og docs/DECISIONS.md (særlig #32–#34).
- Stå på `dev`, `git status` rent og alt pushet. Main står på 96e6cf0 (runde 16).

## 1. Myk loop-overgang (på dev)
- Legg inn kort fade fra og til svart (ca. 0,4 s i hver ende) i `tools/lag-hero-film.py`, slik at
  hoppet ved omstart ser tilsiktet ut. Innstillingen skal gjelde alle fremtidige filmer som kjøres
  gjennom skriptet.
- Kjør skriptet på nytt på eksempelfilmen
  (`C:\Users\kimha\Desktop\Business\KOVISION\alibi-lagring\bilder\alibi-radio-eksempel-sh.mp4`).
  Plakaten skal fortsatt være et tydelig bilde (ta den etter fade-in, ikke et svart bilde).
  Vannmerket skal fortsatt være synlig. Filstørrelsen skal ikke øke vesentlig.
- Kjør generatoren med `--sjekk`, filmtestene og testsettet fra runde 16 (47 sjekker).
  Alt skal være OK. Commit og push `dev`.

## 2. Ny Lighthouse-måling på rolig maskin (lokalt)
- Kim har lukket Chrome. Sjekk at CPU-bruken er lav før du måler.
- Mål runde 16-koden (main) og dev om hverandre, median av tre, mobil, begge språk, ren profil.
- **Krav før sammenslåing:** dev ≥ 95 på Performance, 100 på Accessibility og Best Practices, CLS 0.
  Er dev under kravet: **stopp her**, rapporter tallene og hva som koster, og ikke slå sammen.

## 3. Slå sammen til main (kun hvis del 2 er bestått)
- `git checkout main` → `git pull` → `git merge --no-ff dev` → tag `runde-17` →
  `git push origin main --tags`.
- Vent på produksjonsdeploy fra Vercel (automatisk fra main), og kjør hele testsettet
  (47 + filmtestene) mot `alibi-demo.vercel.app`:
  - engelsk på `/`, norsk på `/no/`, noindex på begge
  - språkvelgeren og husket språkvalg
  - døra, skjult meny med `æventyr` og `aeventyr`, 404
  - filmen lastes og starter først etter døra, spiller lydløst i loop med fade, pauseknappen virker
- Kjør Lighthouse (mobil, median av tre) mot `alibi-demo.vercel.app` og
  `alibi-demo.vercel.app/no/` i ren profil. Accessibility skal være 100. Er den ikke det, finn og
  rett auditen som feiler (på dev, deretter ny sammenslåing), før rapporten. Merk: Vercel-
  verktøylinja på dev-forhåndsvisninger påvirker målinger der, så produksjonen er fasit.
- `git checkout dev` → `git merge main` → push `dev`, så grenene står likt.

## 4. Sporbarhet
- CHANGELOG: runde 17 merket som slått sammen, med fade-overgangen og nye Lighthouse-tall.
- DECISIONS #34 oppdatert med fade-overgangen.
- TODO: «Sist verifisert mot koden». Lanseringskravet om lisensiert film står fortsatt åpent.
- PROMPTS.md + arkiver prompten i docs/prompts/.

## 5. Sluttrapport (kort)
- Lighthouse før/etter (median, begge språk, main mot dev lokalt, og produksjonen etter sammenslåing).
- Testresultater mot produksjonen.
- Sammenslått commit, tag `runde-17`, og bekreftelse på at dev = main.
- Hva som står igjen før lansering.
