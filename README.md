# Alibi – nettside

Nettsiden til **Alibi**, speakeasy-bar i en kjeller i Alta sentrum. Drevet av Æventyr (samme eiere som nattklubben Tåkt, vegg i vegg). NB: gateadressen er under avklaring – siden sier Sentrumsparken 2, søstersidene sier Markedsgata 6 (se TODO P15).

Ren statisk side: HTML + CSS + vanilla JavaScript. Ingen rammeverk, ingen byggesteg, ingen eksterne avhengigheter – fontene selvhostes i `assets/fonts/`.

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

Gå så til `http://localhost:8000`.

**Tips under utvikling:** Døra vises kun én gang per økt, og Bakrommet husker at det er låst opp (`sessionStorage`). For å nullstille begge: åpne DevTools → Console og kjør `sessionStorage.clear()`, eller bruk et privat vindu.

## Deploye

Siden kan hostes hvor som helst som serverer statiske filer. Last opp **hele mappa** (behold mappestrukturen):

- **Netlify:** dra og slipp mappa på app.netlify.com, eller koble til repoet. Ingen build-kommando, publish directory = rot.
- **Vercel:** `vercel` i mappa, eller importer repoet. Framework preset: «Other».
- **GitHub Pages:** push til et repo → Settings → Pages → deploy fra `main`-branchen, rotmappa.
- **one.com o.l.:** last opp alle filene til webroten via FTP/filbehandler.

## Dørmekanikken (kort)

- Døra er et **overlay** – alt innhold ligger i DOM-en bak og er fullt crawlbart for søkemotorer.
- Bank tre ganger (klikk, eller Enter/Space – døra er en `<button>`), så vurderer øyet deg og døra åpnes.
- Passordet (skjult felt bak «Har du et passord?», eller bare tast det) åpner umiddelbart med egen animasjon.
- «Gå rett inn»-lenken hopper over hele seremonien.
- `sessionStorage` husker at man er inne; `prefers-reduced-motion` gir en enkel fade i stedet for animasjon.
- Bankelyden genereres med WebAudio (ingen lydfil) og er **av** som standard.

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

Bytt verdien der – både døra og Bakrommet bruker den, og store/små bokstaver spiller ingen rolle for gjestene. (Passordet står i klartekst i fila; dette er en lek, ikke sikkerhet.)

## Bevegelse

Siden har et lag med rolig bevegelse («levende lys»): scroll-avsløring av seksjonsinnhold, messinglinjer som trekkes ut fra overskriftene, ett flimrende kammerlys og drivende støv i hero-en, lysstreif på menykort ved hover/fokus, og en topplinje som viker ved scroll ned. Alt kjøres på transform/opacity, IntersectionObservere kobles fra etter bruk, og ambient-animasjonene pauses når fanen ikke er synlig.

Med `prefers-reduced-motion` deaktiveres alt sammen – innholdet vises da statisk, ingenting skjules.

## Plassholdere – hva eierne skal bytte ut

Alt som skal byttes er merket med `<!-- PLACEHOLDER -->` i `index.html`. Søk på ordet `PLACEHOLDER`.

| Hva | Hvor i `index.html` | Merknad |
|---|---|---|
| Priser i menyen | Seksjonen `#menyen` (også Bakrommet) | Menyen er ekte fra runde 9; erstatt `kr —` med reelle priser når de leveres |
| Glass/mengde i Bakrommet | `#menyen`, `.bakrom-liste` | Ikke oppgitt av eierne ennå (TODO P18) |
| Åpningstider | Seksjonen `#praktisk` | |
| Aldersgrense | Seksjonen `#praktisk` | |
| Kontaktinfo | Seksjonen `#praktisk` | E-post og/eller telefon |
| Sosiale medier | Seksjonen `#praktisk` og footerens «Følg oss» | Bytt `<span>` til `<a href="…">` når Alibis egne kontoer finnes |
| Adresse | `#finn-oss`, `#praktisk` og JSON-LD i `<head>` | Må bekreftes: siden sier Sentrumsparken 2, Raus/Tåkt oppgir Markedsgata 6 (TODO P15) |
| Foto til «Huset»-kortene | Seksjonen `#huset` | `assets/raus.jpg`, `assets/taakt.jpg` + foto av Alibi |
| Open Graph-bilde | `<head>` | Generert (`assets/og-image.png`); bytt domenet i URL-en ved lansering (TODO P2) |
| Logo | `img/logo/alibi-logo.svg` (inline som `<symbol id="alibi-ordmerke">` i `index.html`) | Ordmerke med gruppens A (runde 11). Bekreftes med kunden; en offisiell fil fra Æventyr byttes inn i symbolet |

## Medier som forventes (i `assets/`)

Plassholder-flatene («Foto kommer» / «Film kommer») i `index.html` viser hvor mediene skal inn:

| Fil | Brukes i | Anbefalt format |
|---|---|---|
| `assets/hero.mp4` | `#velkommen` – bytt ut `.medie-slot-hero` med en `<video autoplay muted loop playsinline>` | MP4 (H.264), 1920×1080, < 8 MB, uten lyd |
| `assets/interior-1.jpg` | `#historien` – i dag stemningsbilde (stock) i `<picture>`; bytt kildene i `img/` | JPG/WebP, 1200×1600 (3:4) |
| `assets/inngang.jpg` | `#finn-oss` – i dag stemningsbilde (stock) i `<picture>`; bytt kildene i `img/` | JPG/WebP, 1200×1600 (3:4) |
| `assets/raus.jpg` | `#huset` – Raus-kortet, bytt ut `.medie-slot-hus` med `<img>` | JPG/WebP, 1200×800 (3:2) |
| `assets/taakt.jpg` | `#huset` – Tåkt-kortet, bytt ut `.medie-slot-hus` med `<img>` | JPG/WebP, 1200×800 (3:2) |
| `assets/og-image.png` | `<head>` – `og:image` | Finnes (generert fra logofila, 1200×630); kan byttes med foto senere |

Husk `alt`-tekst på norsk på alle bilder, og `loading="lazy"` på bilder under folden.

### Stemningsbilder (midlertidige) og eksport

Tre sort-hvitt stockbilder ligger som midlertidige stemningsbilder i
`img/` (`alibi-telefon`, `alibi-lampe`, `alibi-bardisk`) som WebP i 480/800 px
+ JPEG-fallback, i `<picture>` med `srcset`/`sizes`. Originalene ligger
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
index.html        – alt innhold (one-page med ankernavigasjon)
css/style.css     – all stil; palett og typografi som variabler øverst i :root
js/main.js        – dørmekanikken; ingenting annet krever JavaScript
assets/           – favicon (SVG + PNG), og-image, selvhostede fonter; video kommer
img/              – stemningsbilder (WebP + JPEG) og img/logo/ (ordmerket + søsterstedenes logoer)
tools/            – eksporter-bilder.py (lokal bildeeksport, Pillow)
```

## Design-referanse

- Palett: brunsort `#141110`, messing `#C9A227`, oksblod `#5E1F24`, røykgrønn `#3A4A3F`, kritt `#E8E0D0` – definert i `:root` i `css/style.css`.
- Typografi: Limelight (display) + Cormorant Garamond (brødtekst), selvhostet som latin-subset woff2 i `assets/fonts/` (SIL OFL, se `assets/fonts/LICENSE.txt`) med `font-display: swap`.
- Kontrast: messing på brunsort måler ca. 7,7:1 og består WCAG AA (også AAA for stor tekst).
- Lighthouse (målt 2026-08-21, emulert mobil): Performance 99, Accessibility 100, Best Practices 100, SEO 60 – SEO-tallet skyldes previewens midlertidige `noindex` (TODO P14) og går tilbake til 100 når den fjernes ved lansering.
