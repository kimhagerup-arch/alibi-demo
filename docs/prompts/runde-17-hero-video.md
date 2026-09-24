# Alibi – runde 17: hero-video med autoavspilling i loop (på dev)

Følg CLAUDE.md, inkludert dev/main-flyten (#32), sporbarhetsreglene, bilderegelen og
kvalitetsgulvet (WCAG AA, Lighthouse 95+, ingen runtime-avhengigheter).

## 0. Før du starter

- Les CLAUDE.md, docs/CHANGELOG.md, docs/TODO.md og docs/DECISIONS.md (særlig #31–#33).
- Stå på `dev` og kontroller at den står likt med main (96e6cf0 eller nyere).
  `git status` rent – ellers stopp. Neste ledige rundenummer (trolig 17).
- **CSS:** rediger bare `css/style.css`, og kjør generatoren så `css/style.min.css` og sidene
  bygges på nytt (#33). Tekster i `tekst/*.json`, struktur i `tools/mal.html`.
- Kilde: `C:\Users\kimha\Desktop\Business\KOVISION\alibi-lagring\bilder\alibi-radio-eksempel-sh.mp4`
  (H.264, 960×540, 25 fps, 8,2 s, sort-hvitt, uten lyd, ca. 514 kB). Kopier inn i repoet.
- **Dette er en eksempelfilm.** Det er en forhåndsvisning fra Envato med synlig vannmerke,
  brukt for å vise kunden muligheten. **Vannmerket skal ikke fjernes, beskjæres bort eller
  dekkes til.** Filmen må lisensieres eller byttes med eget materiale før lansering.
  Bruk ikke `alibi_sort_hvitt_med_logo.mp4` fra samme mappe.

## 1. Plassering

- Filmen erstatter «Film kommer»-plassholderen i hero-feltet (P3) på **begge språk**, via
  malen/generatoren. Fjern «Film kommer»-teksten fra `tekst/*.json`.
- Behold rammen og formatet feltet har i dag (ingen layout-endring, ingen CLS).
  `object-fit: cover`, men kontroller at vannmerket fortsatt er synlig etter beskjæringen.
- PLACEHOLDER-kommentar: `<!-- PLACEHOLDER: eksempelfilm med vannmerke (Envato-forhåndsvisning), lisensieres eller byttes før lansering -->`.

## 2. Filer og koding

- I `assets/video/`:
  - `alibi-hero.mp4`: fila er allerede kodet riktig (H.264, `+faststart`, uten lyd). Kopier
    den uendret, med mindre ny koding gir tydelig mindre fil uten synlig tap.
  - `alibi-hero.webm` (VP9) bare hvis den blir tydelig mindre.
  - `alibi-hero-poster.webp` (+ jpg-fallback om nødvendig): første bilde i filmen, i
    feltets visningsstørrelse. Hold den liten, den kan bli LCP.
- Bruk ffmpeg lokalt (installer eller bruk `imageio-ffmpeg` via pip som utviklerverktøy).
  Legg kommandoene i et lite skript i `tools/`, slik at den lisensierte fila senere kan byttes
  inn med én kommando (ny fil inn, samme navn ut, sort-hvitt-konvertering inkludert).
  Dokumenter i README.
- 960×540 er lav oppløsning. Rapporter hvordan det ser ut i full feltbredde på 1440 px.
  Ikke skaler opp.

## 3. Avspilling

- `<video muted loop playsinline autoplay preload="metadata" poster="…">` med `<source>` for
  webm (hvis laget) og mp4.
- Filmen er dekor: `aria-hidden="true"` og ingen tekstspor. Ingen kontroller fra nettleseren.
- **Pauseknapp (krav, WCAG 2.2.2):** Filmen går i loop i mer enn 5 sekunder, så det må finnes
  en synlig, liten pause/spill-knapp i hjørnet av feltet, i sidens stil (messing, diskret).
  Tilgjengelig navn per språk («Pause film» / «Play film» og «Sett film på pause» /
  «Spill av film»), lagt i `tekst/*.json` (JS-tekstene genereres inn som i runde 15).
  Synlig fokus, touch-mål min. 44 × 44 px.
- **Redusert bevegelse** (`prefers-reduced-motion: reduce`): ingen autoavspilling. Vis
  plakaten, og la knappen starte filmen hvis gjesten vil.
- **Sparemodus** (`navigator.connection.saveData`): ingen autoavspilling, bare plakat + knapp.
- **Spar batteri:** pause filmen når feltet er ute av syne (IntersectionObserver) og når fanen
  er skjult. Start igjen når den er synlig, med mindre gjesten har trykket pause.
- **Bankedøra:** filmen skal ikke spille eller lastes bak lukket dør, på samme måte som
  kammerlyset og støvet ble pauset i runde 16. Start når døra åpnes (eller når gjesten
  allerede er inne i økten).
- Uten JS: plakaten vises, og filmen kan spilles som vanlig video (`controls` som utgangspunkt,
  fjernes med JS når egen knapp er på plass).

## 4. Verifisering

Dev-forhåndsvisningen krever Vercel-innlogging, så **test lokalt** (samme filer). Kim sjekker
selve forhåndsvisningen etterpå.
- Filmen spiller automatisk, lydløst og i loop i Chromium, Firefox og WebKit (Playwright),
  og i mobilemulering med berøring. Rapporter om hoppet ved omstart er synlig.
- Vannmerket er synlig i feltet på 1440 og 375 px.
- Pauseknappen virker med mus og tastatur, og husker valget mens gjesten er på siden.
- Redusert bevegelse og sparemodus: ingen autoavspilling.
- Filmen starter og lastes ikke før døra er åpnet.
- Kjør hele testsettet fra runde 16 (47 sjekker) på nytt. Alt skal fortsatt være OK.
- Lighthouse mobil, median av 3 kjøringer på begge språk. Utgangspunkt: **97** (runde 16).
  Krav: fortsatt ≥ 95, og rapporter nøyaktig hvor mye filmen koster. Faller den under 97:
  forklar hvorfor og hva som er prøvd. Accessibility 100, CLS 0. Rapporter LCP og hva som er
  LCP-elementet.
- Nettverk: filstørrelse for video og plakat, og at videoen ikke lastes før den trengs.
- Generatoren med `--sjekk`: i synk.
- Skjermbilder (1440 og 375, begge språk, med og uten pause) i
  `C:\Users\kimha\Desktop\Business\KOVISION\alibi-skjermbilder\runde-17\`.

## 5. Sporbarhet og levering

- Commits på `dev`. **Ikke merge, ikke tag, ikke push til main.**
- CHANGELOG (runde 17, «på dev»), DECISIONS (ny beslutning om hero-video: format, plakat,
  pauseknapp, redusert bevegelse/sparemodus, lasting bak døra, og at filmen er en vannmerket
  eksempelfilm).
- TODO: lukk P3 som «midlertidig løst». **Nytt lanseringskrav, høy prioritet:** «Hero-filmen er
  en Envato-forhåndsvisning med vannmerke. Den må lisensieres (VideoHive/Elements, last ned
  full oppløsning og kjør `tools/`-skriptet) eller byttes med eget materiale før P14 (noindex)
  fjernes.»
- BILDEKILDER: «Envato-forhåndsvisning, ikke lisensiert. Kun demo.»
- PROMPTS.md + arkiver prompten.
- Push `dev`. Sluttrapport: filstørrelser, hvordan filmen ser ut i full bredde, loop-overgangen,
  Lighthouse for begge språk (før/etter), testsettet, og URL til dev-forhåndsvisningen.
