# Changelog – Alibi

Format etter [Keep a Changelog](https://keepachangelog.com/): nyeste øverst,
én seksjon per arbeidsøkt/runde, med Lagt til / Endret / Rettet / Fjernet.
Runde 1 og 2 er rekonstruert i ettertid (git ble tatt i bruk i runde 3);
datoene for runde 1–2 er antatt.

## Runde 6 – 2026-07-30 – Raus og noindex

### Lagt til
- Restaurant Raus (gateplan, samme eiere) som veiviser i «Finn oss»:
  Raus ses fra gata, Tåkt og Alibi deler kjelleren under. Raus-lenke
  (raussocial.no/no) i både «Finn oss» og footeren («Tåkt og Raus bor i
  samme hus»), begge verifisert HTTP 200.
- `<meta name="robots" content="noindex">` på previewen
  (alibi-demo.vercel.app) – ført som P14 i TODO: **MÅ fjernes ved
  lansering**.

### Endret
- JSON-LD-beskrivelsen angir beliggenheten «i kjelleren under restaurant
  Raus».
- Klassen `.taakt-nevnt` døpt om til `.soster-lenke` – brukes nå om både
  Tåkt og Raus.
- Pushet til origin main (github.com/kimhagerup-arch/alibi-demo) –
  Vercel-previewen bygger fra main.

## Runde 5 – 2026-07-30 – Selvhostede fonter

### Lagt til
- `assets/fonts/`: Limelight 400 + Cormorant Garamond 400/500/600/400
  kursiv som latin-subset woff2 (156 kB på disk; ~82 kB lastes i praksis –
  500/600 er deklarert, men hentes ikke før de brukes), med
  `LICENSE.txt` (SIL OFL 1.1).
- `@font-face`-regler øverst i `css/style.css`; preload av de to
  over-folden-filene i `<head>`.

### Endret
- **Lighthouse: Performance 86 → 99** (Accessibility/Best Practices/SEO
  fortsatt 100). FCP 3,1 → 1,4 s, LCP 3,1 → 2,0 s, ingen
  render-blokkerende ressurser igjen. 95+-målet er nådd og verifisert.
- CLAUDE.md og README rettet: siden har nå ingen eksterne avhengigheter
  overhodet (tidligere «utover Google Fonts»).

### Fjernet
- Google Fonts `<link>` og begge preconnect-hintene i `index.html` –
  fontene er 100 % lokale (verifisert: alle woff2 serveres fra eget domene).

## Runde 4 – 2026-07-30 – Logo og ekte lenker

### Lagt til
- Æventyr-logoen (`assets/aeventyr-gold.svg`, merkevaregull #CA9F68) i
  footeren som lenke til aeventyr.no – inline i «Et [logo]-sted»,
  `clamp(90px, 26vw, 110px)` bred, med sr-only «(åpnes i ny fane)».
- Ekte Tåkt-lenker (raussocial.no/no/takt) i footer og «Finn oss»
  (diskret understreking på `.taakt-nevnt` som lenke). Begge URL-er
  verifisert med HTTP 200.
- **Lighthouse målt for første gang** (lokal server, emulert mobil):
  Performance **86**, Accessibility **100**, Best Practices **100**,
  SEO **100**. TBT 0 ms, CLS 0; FCP/LCP 3,1 s pga. render-blokkerende
  Google Fonts-CSS (~900 ms) – ført som gjeld i TODO.

### Endret
- Ubrukt `.aeventyr`-tekstregel i CSS erstattet med logostiler.

### Fjernet
- PLACEHOLDER-kommentaren for Tåkt-lenken i footeren (P12 lukket i TODO).

## Runde 3 – 2026-07-30 – Dokumentasjon og sporbarhet

### Lagt til
- Git-repo initialisert med `.gitignore`; baseline-commit av eksisterende
  tilstand, tagget `runde-2`.
- `CLAUDE.md`: prosjektbeskrivelse, føringer, commit-konvensjon
  (Conventional Commits på norsk) og sporbarhetsregler for alle fremtidige økter.
- `docs/`: denne changeloggen, `DECISIONS.md` (beslutningslogg),
  `PROMPTS.md` (promptlogg), `TODO.md` (plassholdere/gjeld/backlog),
  `ONBOARDING.md` (ny person-intro) og `docs/prompts/` med arkiverte prompter.

### Endret
- `README.md` peker nå til docs-strukturen i stedet for å være eneste
  dokumentasjon.

## Runde 2 – 2026-07-30 (antatt) – Rettelser, bevegelse og Bakrommet

### Lagt til
- **Bevegelseslaget «levende lys»:** scroll-avsløring av seksjonsinnhold via
  IntersectionObserver (menykort tennes ett og ett med 50 ms forskyvning),
  messinglinjer som trekkes ut fra overskriftene, «kammerlyset» (flimrende
  ambient glød i hero-en), 15 drivende støvpartikler i hero-en, lysstreif og
  løft på menykort ved hover/fokus, topplinje som viker ved scroll ned og
  scroll-spy som markerer aktiv seksjon. Alt gated bak `html.js-klar`;
  ambient-animasjoner pauses når fanen er skjult; alt deaktiveres ved
  `prefers-reduced-motion`.
- **Bakrommet:** passordlåst skjult meny nederst i menyseksjonen med to
  hemmelige cocktails (Mørketid, Midnattssol) i invertert kortstil. Låses opp
  via inline-felt, passord ved døra, eller taste-easter-egget;
  `sessionStorage`-nøkkel `alibi-bakrom`.
- Passordet samlet som konstanten `ALIBI_PASSORD` øverst i `js/main.js`,
  delt mellom dør og Bakrom.
- Canonical-plassholder i `<head>`.

### Endret
- Menykortene fikk indre wrapper (`.meny-kort-indre`) slik at lysstreifet kan
  klippes uten at deco-diamanten på kortkanten forsvinner.
- `js/main.js` restrukturert: dørkoden i egen IIFE (gjenbesøks-`return`
  drepte tidligere all etterfølgende kode), tastebufferen delt mellom dør og
  Bakrom, felles `rist()`-hjelper.
- Stående medieplassholder strammet til 4:5 med makshøyde 24 rem så spaltene
  i «Finn oss» balanserer.
- «Historien» spisset mot pub-identiteten (lavt tempo, musikk lavere).

### Rettet
- **Faktafeil:** Tåkt ligger ikke ovenpå – begge steder deler kjeller, vegg i
  vegg. Rettet i «Finn oss», footer og «Historien».
- Footer-lenken til Tåkt var `<a href="#">` og hoppet til toppen – byttet til
  `<span>` til ekte URL foreligger.
- Ankernavigasjonen klippet overskrifter under den faste topplinja –
  `scroll-margin-top: 4.5rem` på seksjonene.
- Kontrast på inverterte kort: gjennomsiktig mørk tekst målte ~3,8:1 mot
  mørkeste del av messing-gradienten (under WCAG AA) – nå solid `#2a1e12`
  (≈ 4,7:1).
- `prefers-reduced-motion`-blokka pekte på gammel `#passord-felt`-selektor og
  ville sluppet gjennom risteanimasjonen på Bakroms-feltet.
- `transitionend`-lytteren på dørscenen fanget boblende transitions fra
  barneelementer og kunne klippe åpne-animasjonen – filtrert på `e.target`.

### Fjernet
- Lampeflimmeret i dørscenen (regelen er maks én flimrende lyskilde;
  kammerlyset i hero-en overtok). Gangen utenfor døra har nå statisk glød.

## Runde 1 – 2026-07-30 (antatt) – Nettsiden bygget fra bunnen

### Lagt til
- One-page statisk nettside i ren HTML/CSS/vanilla JS: Velkommen, Historien,
  Menyen (7 forbudstids-cocktails som plassholder), Finn oss, Praktisk, footer.
  Alt innhold på norsk bokmål i lavmælt, konspiratorisk tone.
- **Døra:** fullskjerms inngangsoverlay bygget i CSS/SVG (ingen bildefiler).
  Tre bank (klikk eller Enter/Space – døra er en `<button>`), dørluke med
  animert SVG-øye som vurderer gjesten, dør som glir opp. Passordet «Æventyr»
  (skjult felt eller global tasting) åpner med egen animasjon. «Gå rett inn»-
  lenke, `sessionStorage` («alibi-inne») med inline head-snippet mot blinking,
  `inert` på innholdet bak, `prefers-reduced-motion` → enkel fade. Bankelyd
  generert med WebAudio, av som standard.
- Design: palett (brunsort/messing/oksblod/røykgrønn/kritt), Limelight +
  Cormorant Garamond, kornete tekstur og vignett, art deco-rammer med
  diamant på menykort, tynne messinglinjer.
- SEO/meta: title, description, Open Graph, SVG-favicon med deco-«A»,
  `lang="no"`, JSON-LD `BarOrPub` med adresse.
- Medieplassholdere («Foto kommer» / «Film kommer») med spesifiserte
  filnavn/formater; `README.md` på norsk med kjøring, deploy og
  plassholder-oversikt.

### Rettet (i egen selvgjennomgang samme runde)
- `transitionend`-lytter filtrert på `e.target` (boblende barne-transitions).
- Dørhøyden begrenset med `31vh` for korte mobilskjermer.
- Kornteksturen lå i z-aksen under dør-overlayet – løftet over alt.

### Fjernet
- Gull-glød (`text-shadow`) bak logotypen – én unødvendig dekorasjon fjernet
  som siste grep, i tråd med briefen.
