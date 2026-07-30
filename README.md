# Alibi – nettside

Nettsiden til **Alibi**, speakeasy i kjelleren i Sentrumsparken 2, Alta. Drevet av Æventyr (samme eiere som Tåkt).

Ren statisk side: HTML + CSS + vanilla JavaScript. Ingen rammeverk, ingen byggesteg, ingen avhengigheter utover Google Fonts.

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

`sessionStorage`-nøkkelen `alibi-bakrom` husker opplåsingen ut økten. Bakroms-cocktailene er merket `<!-- PLACEHOLDER -->` i `index.html` og byttes på samme måte som hovedmenyen.

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
| Cocktailmeny og priser | Seksjonen `#menyen` | Bytt navn/beskrivelser, erstatt `kr —` med reelle priser |
| Åpningstider | Seksjonen `#praktisk` | |
| Aldersgrense | Seksjonen `#praktisk` | |
| Kontaktinfo | Seksjonen `#praktisk` | E-post og/eller telefon |
| Sosiale medier | Seksjonen `#praktisk` | Bytt `<span class="some-ikon">` til `<a href="…">` med lenkene |
| Lenke til Tåkt | Footer | Sett inn URL i `href` |
| Open Graph-bilde | `<head>` | Legg til `og:image` når foto foreligger |
| Logo | Seksjonen `#velkommen` | Logotypen er satt i typografi; bytt til SVG/bilde når ekte logo er klar |

## Medier som forventes (i `assets/`)

Plassholder-flatene («Foto kommer» / «Film kommer») i `index.html` viser hvor mediene skal inn:

| Fil | Brukes i | Anbefalt format |
|---|---|---|
| `assets/hero.mp4` | `#velkommen` – bytt ut `.medie-slot-hero` med en `<video autoplay muted loop playsinline>` | MP4 (H.264), 1920×1080, < 8 MB, uten lyd |
| `assets/interior-1.jpg` | `#historien` – bytt ut `.medie-slot-staaende` med `<img>` | JPG/WebP, 1200×1600 (3:4) |
| `assets/inngang.jpg` | `#finn-oss` – bytt ut `.medie-slot-staaende` med `<img>` | JPG/WebP, 1200×1600 (3:4) |
| `assets/og-image.jpg` | `<head>` – `og:image` | JPG, 1200×630 |

Husk `alt`-tekst på norsk på alle bilder, og `loading="lazy"` på bilder under folden.

## Struktur

```
index.html        – alt innhold (one-page med ankernavigasjon)
css/style.css     – all stil; palett og typografi som variabler øverst i :root
js/main.js        – dørmekanikken; ingenting annet krever JavaScript
assets/           – favicon.svg + fremtidige bilder/video
```

## Design-referanse

- Palett: brunsort `#141110`, messing `#C9A227`, oksblod `#5E1F24`, røykgrønn `#3A4A3F`, kritt `#E8E0D0` – definert i `:root` i `css/style.css`.
- Typografi: Limelight (display) + Cormorant Garamond (brødtekst), via Google Fonts med `font-display: swap`.
- Kontrast: messing på brunsort måler ca. 7,7:1 og består WCAG AA (også AAA for stor tekst).
