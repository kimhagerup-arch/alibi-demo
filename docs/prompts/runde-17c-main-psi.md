# Alibi – runde 17c: slå sammen til main og mål med PageSpeed Insights

Følg CLAUDE.md og dev/main-flyten (#32). Kim godkjenner sammenslåing i denne runden.

## 0. Bakgrunn og nytt målekrav
Runde 17b målte main og dev likt under samme forhold (89/89 engelsk, 89/93 norsk). De lave
tallene skyldes at laptopen gikk på batteri med nedklokket CPU, ikke koden. Lokal Lighthouse
er derfor ikke pålitelig som absolutt gulv på denne maskinen. Nytt krav:
- **Før sammenslåing (relativt):** dev skal ikke være dårligere enn main målt under like forhold.
  Dette er oppfylt i 17b. Du trenger ikke måle lokalt på nytt.
- **Etter sammenslåing (absolutt):** PageSpeed Insights mot produksjonen, se del 2.

Stå på `dev`, `git status` rent og alt pushet (bbe5eea eller nyere).

## 1. Slå sammen til main
- Kjør generatoren med `--sjekk` (i synk).
- `git checkout main` → `git pull` → `git merge --no-ff dev` → tag `runde-17` →
  `git push origin main --tags`.
- Vent på produksjonsdeploy fra Vercel (automatisk fra main), og kjør hele testsettet
  (47 + filmtestene) mot `alibi-demo.vercel.app`:
  - engelsk på `/`, norsk på `/no/`, noindex på begge
  - språkvelgeren og husket språkvalg
  - døra, skjult meny med `æventyr` og `aeventyr`, 404
  - filmen lastes og starter først etter døra, spiller lydløst i loop med fade, pauseknappen virker

## 2. Mål med PageSpeed Insights (Googles servere)
- Bruk PSI-API-et uten nøkkel, f.eks.
  `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=<URL>&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo`
  for `https://alibi-demo.vercel.app/` og `https://alibi-demo.vercel.app/no/`,
  3 kjøringer hver, mobil. Rapporter median for Performance, Accessibility og Best Practices,
  og LCP, TBT og CLS.
- Krav: Performance ≥ 95, Accessibility 100, Best Practices 100, CLS 0.
  (SEO er lav på grunn av noindex. Det er forventet.)
- **Er et krav ikke oppfylt:** ikke rull tilbake. Rapporter tallene og den eller de auditene som
  trekker ned, med forslag til tiltak. Det tas i egen runde.
- Får du ikke kontakt med PSI-API-et: skriv det i rapporten. Kim måler da selv på
  pagespeed.web.dev.

## 3. Rydd opp
- `git checkout dev` → `git merge main` → push `dev`, så grenene står likt.

## 4. Sporbarhet
- CHANGELOG: runde 17 og 17b merket som slått sammen, med PSI-tallene. Legg inn ny regel i
  CLAUDE.md: absolutt ytelsesmåling gjøres med PageSpeed Insights mot deployet side. Lokal
  Lighthouse brukes bare til å sammenligne main og dev under like forhold.
- DECISIONS: ny beslutning om målemetoden.
- TODO: lukk punktet om at sammenslåingen venter på måling. «Sist verifisert».
- PROMPTS.md + arkiver prompten.

## 5. Kort sluttrapport
- Sammenslått commit, tag `runde-17`, dev = main.
- Testresultater mot produksjonen.
- PSI-tall (median, begge språk).
