# Prompt til Claude Code – Alibi, runde 5: selvhost fontene (lim inn hele denne)

Én oppgave: fjern render-blokkeringen fra Google Fonts ved å selvhoste fontene, og verifiser at Performance-målet på 95+ nås. Følg sporbarhetsreglene i CLAUDE.md som vanlig, og arkiver denne prompten i docs/prompts/.

## 1. Hent fontfilene

- Fonter i bruk i dag: **Limelight** (400) og **Cormorant Garamond** (400, 500, 600 + kursiv 400). Behold nøyaktig disse vektene/stilene – ikke flere.
- Last ned woff2-filene (latin-subset – det dekker æ/ø/å) fra Google Fonts. Praktisk vei: hent CSS-en fra `https://fonts.googleapis.com/css2?...` med en moderne User-Agent, plukk woff2-URL-ene derfra, og last ned filene. Alternativt bruk gwfh.mranftl.com (google-webfonts-helper) sitt API.
- Legg filene i `assets/fonts/` med lesbare navn (f.eks. `limelight-400.woff2`, `cormorant-garamond-400.woff2`, `cormorant-garamond-400-italic.woff2`, osv.).
- Begge fontene er SIL Open Font License. Legg en kort `assets/fonts/LICENSE.txt`-notis om opphav og lisens, og før en linje i DECISIONS om selvhosting-valget.

## 2. Koble om

- Skriv `@font-face`-regler øverst i style.css (eller en egen `css/fonts.css` lastet før style.css): riktig family/weight/style, `font-display: swap`, kun woff2 (dekningen er god nok i 2026).
- Fjern Google Fonts `<link>`-ene og begge preconnect-hintene fra index.html.
- Legg `<link rel="preload" as="font" type="font/woff2" crossorigin>` på de to filene som brukes over folden (Limelight 400 og Cormorant Garamond 400 regular) – ikke preload alle.
- Verifiser at fallback-stacken i CSS-en fortsatt er fornuftig (serif-fallback for Cormorant, cursive/serif for Limelight) så swap-øyeblikket ikke skjemmer.

## 3. Mål og loggfør

- Kjør Lighthouse på nytt med samme oppsett som runde 4 (lokal server, emulert mobil). Før de nye tallene i TODO/CHANGELOG ved siden av de gamle (86 → ny score), og lukk gjeldspunktet om render-blokkerende fonter hvis 95+ nås.
- Sjekk visuelt/i koden at alle fire vekter/stiler faktisk lastes og brukes (ingen faux bold/italic – se etter at nettleseren ikke syntetiserer).
- `node --check` på JS (uendret, men for ordens skyld) og en rask sjekk av at siden fungerer uten nettverkstilgang til Google (fontene skal nå være 100 % lokale).

## 4. Sluttrapport

Kort: nye Lighthouse-tall, total fontvekt i kB, TODO-rader som ble lukket.
