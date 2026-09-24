# Alibi – nettside

Nettsiden til **Alibi**, speakeasy-bar i en kjeller i Alta sentrum. Drevet av Æventyr (samme eiere som nattklubben Tåkt, vegg i vegg). NB: gateadressen er under avklaring – siden sier Sentrumsparken 2, søstersidene sier Markedsgata 6 (se TODO P15).

Ren statisk side: HTML + CSS + vanilla JavaScript. Ingen rammeverk, intet byggesteg på serveren, ingen eksterne avhengigheter – fontene selvhostes i `assets/fonts/`.

Siden finnes på **engelsk (`/`, standard) og norsk (`/no/`)**. Begge forsidene genereres lokalt fra én mal og felles tekst-/menyfiler med `python tools/bygg-sider.py` (kun standard-Python) – de genererte filene sjekkes inn. Se «Endre tekst eller meny» under.

**Arbeidsflyt:** alt arbeid skjer på grenen `dev`. `main` er det kunden ser på `alibi-demo.vercel.app` og endres bare på eksplisitt beskjed fra Kim. Se `CLAUDE.md`.

## Dokumentasjon

Denne fila dekker kjøring, deploy og plassholdere. Resten ligger i egne dokumenter (uten duplisering):

- **[CLAUDE.md](CLAUDE.md)** – prosjektets regelbok: føringer, commit-konvensjon og sporbarhetsregler. Leses automatisk av Claude Code.
- **[docs/ONBOARDING.md](docs/ONBOARDING.md)** – start her hvis du er ny.
- **[docs/CHANGELOG.md](docs/CHANGELOG.md)** – hva som er gjort, runde for runde.
- **[docs/DECISIONS.md](docs/DECISIONS.md)** – hvorfor det er gjort slik (beslutningslogg).
- **[docs/PROMPTS.md](docs/PROMPTS.md)** – logg over AI-kjøringer, med promptene arkivert i [docs/prompts/](docs/prompts/).
- **[docs/TODO.md](docs/TODO.md)** – alt som gjenstår, inkludert komplett plassholder-tabell.

## Kjøre lokalt

Åpne `index.html` rett i nettleseren – det er alt. For en lokal server (anbefalt, gir riktig oppførsel for alt):

```bash
# med Python
python -m http.server 8000

# eller med Node
npx serve .
```

Gå så til `http://localhost:8000` (engelsk) eller `http://localhost:8000/no/` (norsk). Språkbytte og 404 trenger en server – `index.html` kan åpnes rett fra fil, men språklenkene peker på `/` og `/no/`.

**Tips under utvikling:** Døra vises kun én gang per økt, og Bakrommet husker at det er låst opp (`sessionStorage`). For å nullstille begge: åpne DevTools → Console og kjør `sessionStorage.clear()`, eller bruk et privat vindu. Språkvalget ligger i `localStorage` (`alibi-sprak`): `localStorage.removeItem('alibi-sprak')`.

## Endre tekst eller meny (begge språk)

Ikke rediger `index.html` eller `no/index.html` – de er generert og overskrives. Kildene er:

| Fil | Innhold |
|---|---|
| `tekst/nb.json` / `tekst/en.json` | All tekst, samme nøkler i begge. `js`-blokka er tekstene JavaScript skriver ut (dør, skjult meny) |
| `tekst/meny.json` | Menyen, ett sted: per drink `navn`, `glass`, `cl`, `pris`, `ingredienser` (felles) og `tekst.nb`/`tekst.en`. `ordliste` oversetter ingrediensord til engelsk |
| `tekst/felles.json` | Domene (canonical/hreflang/og:url/sitemap) og kart-URL |
| `tools/mal.html` | Selve HTML-strukturen, med `{{nøkler}}` og alle `PLACEHOLDER`-kommentarer |

Slik gjør du det:

1. **Endre en tekst:** finn nøkkelen (søk på den norske setningen i `tekst/nb.json`), endre verdien der og under samme nøkkel i `tekst/en.json`.
2. **Endre en drink / pris:** rediger objektet i `tekst/meny.json`. Ny drink: kopier et objekt og gi den ny `id`. Prisen skrives som tall (`159`) – «kr»/«NOK» settes av språkfilene. Nye ingrediensord på norsk føres i `ordliste` med engelsk oversettelse; ord som ikke står der (merkevarer), brukes uendret. `bakrom: true` legger drinken i den skjulte menyen. `glass`/`cl` kan være `null` (da vises ingen glasslinje).
3. **Bygg:** `python tools/bygg-sider.py`. Generatoren stopper hvis et språk mangler en nøkkel, og varsler om ingrediensord uten oversettelse.
4. Sjekk begge sidene lokalt, og commit kildene **og** de genererte filene sammen. `python tools/bygg-sider.py --sjekk` sier fra hvis noe ikke er i synk.

Strukturendringer (ny seksjon, nye attributter) gjøres i `tools/mal.html`; ny tekst får en ny nøkkel i begge språkfilene.

**CSS:** rediger `css/style.css` og kjør generatoren – den skriver den minifiserte kopien `css/style.min.css` som sidene faktisk laster (rendringen er identisk, bare 15 kB lettere). Begge filene commites.

## Deploye

Siden kan hostes hvor som helst som serverer statiske filer. Last opp **hele mappa** (behold mappestrukturen):

- **Netlify:** dra og slipp mappa på app.netlify.com, eller koble til repoet. Ingen build-kommando, publish directory = rot.
- **Vercel:** `vercel` i mappa (forhåndsvisning) eller `vercel --prod` fra `main` (produksjon – kun på Kims beskjed), eller importer repoet. Framework preset: «Other». `/no/` serveres fra `no/index.html`, `404.html` for alt ukjent.
- **GitHub Pages:** push til et repo → Settings → Pages → deploy fra `main`-branchen, rotmappa.
- **one.com o.l.:** last opp alle filene til webroten via FTP/filbehandler.

## Dørmekanikken (kort)

- Døra er et **overlay** – alt innhold ligger i DOM-en bak og er fullt crawlbart for søkemotorer.
- Bank tre ganger (klikk, eller Enter/Space – døra er en `<button>`), så vurderer øyet deg og døra åpnes.
- Passordet (skjult felt bak «Har du et passord?», eller bare tast det) åpner umiddelbart med egen animasjon. `æventyr` og `aeventyr` er like gode (æ/ø/å normaliseres til ae/oe/aa).
- «Gå rett inn»-lenken hopper over hele seremonien. Sist i samme rad står en språklenke («Norsk»/«English»).
- `sessionStorage` husker at man er inne – på tvers av språkene; `prefers-reduced-motion` gir en enkel fade i stedet for animasjon.
- Bankelyden genereres med WebAudio (ingen lydfil) og er **av** som standard.

## Språk

- `/` er engelsk (`lang="en"`), `/no/` er norsk (`lang="nb"`). Engelsk er standard fordi målgruppen er turister og hotellgjester.
- Språkvelgeren helt til høyre i topplinja er en `<details>` med flagg (inline-SVG) og tekst, og virker uten JavaScript. JS lukker den på Esc og klikk utenfor.
- Valget lagres i `localStorage` som `alibi-sprak`. Har gjesten valgt norsk og kommer til `/`, sender et inline-skript i `<head>` hen til `/no/` før noe tegnes. Ingen gjetting ut fra nettleserspråk; uten lagret valg omdirigeres ingen, og `/no/` omdirigerer aldri.
- Hver side har selvrefererende `canonical`, `hreflang` (en/nb/x-default → `/`), `og:locale` + alternate og `inLanguage` i JSON-LD; `sitemap.xml` har begge URL-ene.

## Bakrommet

Nederst i menyseksjonen ligger en diskret linje om et bakrom. Riktig passord åpner en skjult del av menyen med to hemmelige cocktails – tenkt brukt i markedsføring («ukas passord» på sosiale medier gir ukas hemmelige cocktail).

Bakrommet låses opp på tre måter:

1. **Inline-feltet** – klikk på ordet «bakrom» (med nøkkelen) og skriv passordet.
2. **Døra** – den som kom inn med passord ved døra, får Bakrommet ferdig opplåst.
3. **Tastaturet** – å taste passordet hvor som helst på siden (utenfor et skrivefelt) låser også opp.

`sessionStorage`-nøkkelen `alibi-bakrom` husker opplåsingen ut økten. Bakroms-cocktailene (Mandaquiri og Adventure) er ekte siden runde 9 – det som gjenstår der er priser (P5) og glass/mengde (P18).

### Bytte passord

Passordet ligger som **én konstant øverst i `js/main.js`**:

```js
var ALIBI_PASSORD = "æventyr";
```

Bytt verdien der – både døra og Bakrommet bruker den, og store/små bokstaver spiller ingen rolle for gjestene; æ/ø/å godtas også som ae/oe/aa. (Passordet står i klartekst i fila; dette er en lek, ikke sikkerhet.)

## Bevegelse

Siden har et lag med rolig bevegelse («levende lys»): scroll-avsløring av seksjonsinnhold, messinglinjer som trekkes ut fra overskriftene, ett flimrende kammerlys og drivende støv i hero-en, lysstreif på menykort ved hover/fokus, og en topplinje som viker ved scroll ned. Alt kjøres på transform/opacity, IntersectionObservere kobles fra etter bruk, og ambient-animasjonene pauses når fanen ikke er synlig.

Med `prefers-reduced-motion` deaktiveres alt sammen – innholdet vises da statisk, ingenting skjules.

## Plassholdere – hva eierne skal bytte ut

Alt som skal byttes er merket med `<!-- PLACEHOLDER -->` i `tools/mal.html` (og følger med i begge genererte sider). Søk på ordet `PLACEHOLDER`. Tekstene selv ligger i `tekst/*.json`.

| Hva | Hvor | Merknad |
|---|---|---|
| Priser i menyen | `pris` per drink i `tekst/meny.json` | Menyen er ekte fra runde 9; sett reelle priser (tall) når de leveres og bygg |
| Glass/mengde i Bakrommet | `glass`/`cl` for Mandaquiri og Adventure i `tekst/meny.json` | Ikke oppgitt av eierne ennå (TODO P18) |
| Åpningstider | `praktisk_tider_tekst` + `alibi_tider` i språkfilene | |
| Aldersgrense | `praktisk_alder_tekst` i språkfilene | |
| Kontaktinfo | `praktisk_kontakt_tekst` i språkfilene | E-post og/eller telefon |
| Sosiale medier | `#praktisk` og footerens «Følg oss» i `tools/mal.html` | Bytt `<span>` til `<a href="…">` når Alibis egne kontoer finnes |
| Adresse | `adresse_linje`, `praktisk_beliggenhet_tekst` (språkfilene), `kart_url` (felles) og JSON-LD i malen | Må bekreftes: siden sier Sentrumsparken 2, Raus/Tåkt oppgir Markedsgata 6 (TODO P15) |
| Foto til «Huset»-kortene | `#huset` i `tools/mal.html` | `assets/raus.jpg`, `assets/taakt.jpg` + foto av Alibi |
| Open Graph-bilde og domene | `domene` i `tekst/felles.json` | Bildet er generert (`assets/og-image.png`); bytt domenet ved lansering (TODO P2) |
| Logo | `img/logo/alibi-logo.svg` (inline som `<symbol id="alibi-ordmerke">` i `tools/mal.html`, kopi i `404.html`) | Ordmerke med gruppens A (runde 11). Bekreftes med kunden; en offisiell fil fra Æventyr byttes inn i symbolet |

## Medier som forventes (i `assets/`)

Plassholder-flatene («Foto kommer» / «Film kommer») i `index.html` viser hvor mediene skal inn:

| Fil | Brukes i | Anbefalt format |
|---|---|---|
| `assets/video/alibi-hero.mp4` + `alibi-hero-poster.webp` | `#velkommen` – **inne siden runde 17** som vannmerket Envato-eksempel (ikke lisensiert). Bytt kilden med `tools/lag-hero-film.py`, se «Hero-filmen» under | MP4 (H.264), 16:9, lages av skriptet (maks 960 px bred, s/h, uten lyd) |
| `assets/interior-1.jpg` | `#historien` – i dag stemningsbilde (stock) i `<picture>`; bytt kildene i `img/` | JPG/WebP, 1200×1600 (3:4) |
| `assets/inngang.jpg` | `#finn-oss` – i dag stemningsbilde (stock) i `<picture>`; bytt kildene i `img/` | JPG/WebP, 1200×1600 (3:4) |
| Tre foto til fotobåndet | `.fotoband` mellom `#historien` og `#huset` – i dag tre stemningsbilder (stock) i `<picture>`; bytt kildene i `img/` og alt-tekstene | JPG/WebP, 4:5 (eksporteres i 480/640/800) |
| `assets/raus.jpg` | `#huset` – Raus-kortet, bytt ut `.medie-slot-hus` med `<img>` | JPG/WebP, 1200×800 (3:2) |
| `assets/taakt.jpg` | `#huset` – Tåkt-kortet, bytt ut `.medie-slot-hus` med `<img>` | JPG/WebP, 1200×800 (3:2) |
| `assets/og-image.png` | `<head>` – `og:image` | Finnes (generert fra logofila, 1200×630); kan byttes med foto senere |

Husk `alt`-tekst på norsk på alle bilder, og `loading="lazy"` på bilder under folden.

### Hero-filmen

Feltet øverst på forsiden viser en lydløs film i loop (`assets/video/alibi-hero.mp4`, plakat `alibi-hero-poster.webp`). **Fila i repoet er en Envato-forhåndsvisning med vannmerke og er ikke lisensiert** – den må lisensieres eller byttes med eget materiale før lansering (se `docs/TODO.md` og `docs/BILDEKILDER.md`).

Bytte filmen – én kommando (krever ffmpeg på PATH, f.eks. `winget install Gyan.FFmpeg`):

```
python tools/lag-hero-film.py <ny-kildefil.mp4>
```

Skriptet skalerer ned til maks 960 px bredde (aldri opp), gjør filmen sort-hvitt, legger på en kort fade fra og til svart (0,4 s i hver ende, `FADE_SEK`, så omstarten i loopen ser tilsiktet ut), fjerner lyd, koder H.264 (crf 26, `+faststart`) og lager plakaten (bildet rett etter fade-in, 736 px bred WebP). Krever også ffprobe (følger med ffmpeg) for å finne varigheten. Samme filnavn ut, så ingenting i malen må endres. `--webm` lager i tillegg en VP9-fil (ikke i bruk – ble ikke tydelig mindre). Kilden bør være 16:9; feltet er 16:9 og filmen fyller det med `object-fit: cover`.

Avspilling: dekor (`aria-hidden`), lydløs, i loop, uten nettleserkontroller, med en egen pause/spill-knapp i hjørnet (WCAG 2.2.2). Markupen har bare plakaten som `<img>`; `main.js` lager `<video>`-elementet første gang filmen skal spille (kildene ligger i `data-film`/`data-plakat` på feltet), så ingenting lastes før døra er åpnet – heller ikke i Safari/WebKit, som ellers laster hele fila for en `<video preload="none">`. Filmen pauses når feltet er ute av syne eller fanen er skjult, og autostarter ikke ved `prefers-reduced-motion` eller sparemodus (`saveData`) – da vises plakaten, og knappen starter filmen. Uten JavaScript vises `<noscript>`-videoen med nettleserens egne kontroller.

### Stemningsbilder (midlertidige) og eksport

Seks sort-hvitt stockbilder ligger som midlertidige stemningsbilder i
`img/` (`alibi-telefon`, `alibi-lampe`, `alibi-bardisk`, og `alibi-dame`,
`alibi-par-dans`, `alibi-ford` i fotobåndet) som WebP i 480/800 px (båndet
også 640) + JPEG-fallback, i `<picture>` med `srcset`/`sizes`. Originalene ligger
utenfor repoet. Eksporten gjøres lokalt med `tools/eksporter-bilder.py`
(Python 3 + Pillow – kun byggtid, siden trenger det ikke):

```
python tools/eksporter-bilder.py <mappe-med-originaler>
```

Bilderegel: aldri alkohol som drikkes eller er i fokus, tobakk/røyking,
eller alkohol-/tobakksmerker (se `CLAUDE.md`). Kilder og lisenser per bilde:
[`docs/BILDEKILDER.md`](docs/BILDEKILDER.md).

## Struktur

```
tools/mal.html    – malen: all struktur og alle PLACEHOLDER-kommentarer (rediger denne)
tekst/            – nb.json, en.json (all tekst), meny.json (menyen), felles.json (domene)
tools/bygg-sider.py – generatoren (standard-Python): mal + tekst → index.html, no/index.html, sitemap.xml
index.html        – GENERERT: engelsk forside (/)
no/index.html     – GENERERT: norsk forside (/no/)
sitemap.xml       – GENERERT
404.html          – felles 404 på begge språk (håndskrevet)
css/style.css     – all stil (kilden); palett og typografi som variabler øverst i :root
css/style.min.css – GENERERT minifisert kopi som sidene lenker til – rediger style.css og bygg
js/main.js        – døra, Bakrommet, språkvelgeren, bevegelseslaget; tekstene kommer fra <head>
assets/           – favicon (SVG + PNG), og-image, selvhostede fonter; video kommer
img/              – stemningsbilder (WebP + JPEG) og img/logo/ (ordmerket + søsterstedenes logoer)
tools/eksporter-bilder.py – lokal bildeeksport (Pillow)
tools/lag-hero-film.py – lager hero-filmen og plakaten fra én kildefil (ffmpeg)
assets/video/      – alibi-hero.mp4 (Envato-eksempel med vannmerke, ikke lisensiert) + plakat
```

## Design-referanse

- Palett: brunsort `#141110`, messing `#C9A227`, oksblod `#5E1F24`, røykgrønn `#3A4A3F`, kritt `#E8E0D0` – definert i `:root` i `css/style.css`.
- Typografi: Limelight (display) + Cormorant Garamond (brødtekst), selvhostet som latin-subset woff2 i `assets/fonts/` (SIL OFL, se `assets/fonts/LICENSE.txt`) med `font-display: swap`.
- Kontrast: messing på brunsort måler ca. 7,7:1 og består WCAG AA (også AAA for stor tekst).
- Ytelse (PageSpeed Insights, mobil, Googles servere, målt 2026-09-24, runde 17c, median av tre kjøringer mot produksjonen): Performance 100 / Accessibility 100 / Best Practices 100 / SEO 63 på begge språk, LCP 1,6 s, TBT 0 ms, CLS 0 – se `docs/CHANGELOG.md` runde 17c. Absolutt krav (≥ 95 / 100 / 100 / CLS 0) måles alltid slik; lokal Lighthouse brukes bare til å sammenligne `main` og `dev` (beslutning #35). SEO-tallet skyldes previewens midlertidige `noindex` (TODO P14) og går opp når den fjernes ved lansering.
