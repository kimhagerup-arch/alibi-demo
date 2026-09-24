# CLAUDE.md – Alibi

Prosjektets hukommelse og regelbok. Leses automatisk av Claude Code i hver økt.
**Følg sporbarhetsreglene nederst i hver eneste økt, uten å bli bedt om det.**

## Hva dette er

Nettsiden til **Alibi** – en speakeasy-bar i en kjeller i Alta sentrum
(adressen er under avklaring: siden sier Sentrumsparken 2, søstersidene
Markedsgata 6 – se TODO P15, skal løses før lansering),
drevet av **Æventyr** (samme eiere som nattklubben **Tåkt**, som ligger vegg i vegg
i samme kjeller – Tåkt er nattklubben, Alibi er baren). Raus, Tåkt og Alibi ligger
i **samme bygg som Canyon Hotell**; **Gargia Lodge** og Canyon Hotell er også
Æventyr-steder (alle fem har logo i footeren). Alibi omtales alltid som *bar*,
aldri *pub* (beslutning #22). Målgruppen er et voksent publikum som vil ha god
samtale og gode cocktails i lavt tempo.

One-page statisk nettside med ankernavigasjon. Signaturgrepet er «Døra»: et
fullskjerms-overlay der besøkende banker tre ganger for å komme inn. Skjult
bonus: «Bakrommet» – en passordlåst del av menyen. «Bakrommet» er det interne
navnet (klasser, ID-er, JS, dokumentasjon); på siden heter den **«den skjulte
menyen»** i all synlig tekst (beslutning #22).

**To språk, engelsk først** (beslutning #30): `/` er engelsk (`lang="en"`),
`/no/` er norsk (`lang="nb"`). Målgruppen er turister og hotellgjester, så
engelsk er standard. Språkvalget huskes i `localStorage` («alibi-sprak») –
ingen gjetting ut fra nettleserspråk, ingen omdirigering uten lagret valg.

## Arbeidsflyt: `dev` og `main` (fast regel, beslutning #32)

- **`main` = det kunden ser** på `alibi-demo.vercel.app`. Endres **kun** når
  Kim eksplisitt sier «slå sammen til main». Aldri push, merge eller tag mot
  `main` uten den beskjeden.
- **`dev` = utviklingsgrenen.** Alt arbeid skjer her; `git push origin dev`
  underveis. Finnes grenen: `git checkout dev && git merge main` først.
- **Runde-tagger** (`runde-N`) settes først når runden er slått sammen til
  `main`.
- **Vercel er koblet til GitHub** (bekreftet runde 16): push til `dev` gir
  automatisk en forhåndsvisning med aliaset
  `alibi-demo-git-dev-kimhagerups-projects.vercel.app` (ett–to minutter,
  sjekk med `vercel ls alibi-demo`); push til `main` deployer produksjon.
  Previews er beskyttet med Vercel Authentication (302 til innlogging) –
  Kim ser dem innlogget; automatiske tester kjøres derfor mot lokal server.
  **`vercel --prod` kjøres aldri fra `dev`** – det ville overskrevet kundens
  lenke. Produksjon kommer fra `main`, kun på Kims beskjed.

## Teknisk stack og drift

- **Ren HTML + CSS + vanilla JS.** Ingen rammeverk, intet byggesteg på
  serveren, ingen eksterne avhengigheter overhodet (fontene selvhostes i
  `assets/fonts/`, se beslutning #14). Dette er et bevisst valg – ikke innfør
  npm, bundlere, CDN-er eller biblioteker uten eksplisitt beskjed.
- **Forsidene genereres lokalt** (beslutning #31): `python tools/bygg-sider.py`
  bygger `index.html`, `no/index.html`, `sitemap.xml` og `css/style.min.css`
  fra `tools/mal.html`, `tekst/*.json` og `css/style.css`. Kun standard-Python.
  De genererte filene **commites**. `python tools/bygg-sider.py --sjekk`
  feiler hvis de ikke er i synk – kjør den før commit. **CSS redigeres i
  `css/style.css`**, og generatoren kjøres etterpå (beslutning #33).
- Kjøre lokalt: `python -m http.server 8000` (språkbytte og 404 krever
  server; `index.html` kan også åpnes rett fra fil).
- Deploy: statisk hosting hvor som helst (Netlify/Vercel/GitHub Pages/one.com) –
  se `README.md`.
- Nullstille dør + Bakrom under testing: `sessionStorage.clear()` i konsollen;
  språkvalget: `localStorage.removeItem('alibi-sprak')`.

## Endre tekst eller meny (begge språk)

- **Tekst:** finn nøkkelen i `tekst/nb.json`, endre der **og** i
  `tekst/en.json` (samme nøkkel). Generatoren stopper hvis et språk mangler
  en nøkkel. Verdiene kan inneholde HTML og `{{andre_nøkler}}`.
- **Drink:** rediger `tekst/meny.json` – ett objekt per drink: `navn`,
  `glass` (`vin`/`highball`/`rocks`/`margarita` eller `null`), `cl`, `pris`
  (tall; formatet «kr»/«NOK» ligger i språkfilene), `ingredienser` (norsk
  liste; nye ord som skal oversettes, føres i `ordliste`), `tekst.nb` og
  `tekst.en`, `bakrom: true` for den skjulte menyen.
- **Struktur/markup:** `tools/mal.html` – aldri `index.html`/`no/index.html`.
- **Tekster JS skriver ut:** «js»-blokka i språkfilene (genereres inn i
  `<head>` som `#alibi-tekst`). `js/main.js` skal ikke inneholde strenger på
  noe språk.
- **Domene** (canonical, hreflang, og:url, sitemap): `domene` i
  `tekst/felles.json`.
- Deretter: `python tools/bygg-sider.py`, sjekk begge sider, commit kilder
  **og** genererte filer sammen.

## Filkart

| Fil | Innhold |
|---|---|
| `tools/mal.html` | **Malen** – all struktur og alle `<!-- PLACEHOLDER -->`-kommentarer. Rediger denne, aldri de genererte filene |
| `tekst/nb.json`, `tekst/en.json` | All tekst per språk, samme nøkler. «js»-blokka = tekstene JS skriver ut |
| `tekst/meny.json` | Menyen, ett sted for begge språk (+ `ordliste` for ingredienser) |
| `tekst/felles.json` | Domene og kart-URL |
| `tools/bygg-sider.py` | Generatoren (standard-Python). `--sjekk` = kontroll uten å skrive |
| `index.html` | **Generert** – engelsk forside (`/`) |
| `no/index.html` | **Generert** – norsk forside (`/no/`), `../`-stier |
| `sitemap.xml` | **Generert** – begge URL-ene med `xhtml:link` |
| `404.html` | Håndskrevet, felles for begge språk, rot-absolutte stier, kopi av logosymbolet |
| `css/style.css` | All stil – **kilden**. Palett/typografi som variabler i `:root` øverst |
| `css/style.min.css` | **Generert** minifisert kopi som sidene lenker til (40 → 25 kB, PSI 100). Rediger aldri; bygg etter hver CSS-endring |
| `js/main.js` | Døra, Bakrommet, språkvelgeren, bevegelseslaget. Passordet: `ALIBI_PASSORD` øverst |
| `assets/` | Favicon (SVG + PNG), og-image, fonter i `fonts/`; video kommer (spesifisert i `README.md`) |
| `img/` | Stemningsbilder (WebP + JPEG-fallback, midlertidig stock) og `img/logo/` (ordmerket + søsterstedenes logoer) |
| `tools/eksporter-bilder.py` | Lokal bildeeksport (Pillow). Kun byggtid, aldri runtime |
| `tools/lag-hero-film.py` | Lager `assets/video/alibi-hero.mp4` + plakat fra én kildefil (ffmpeg). Kun byggtid |
| `assets/video/` | Hero-filmen og plakaten. **Per runde 17 en Envato-forhåndsvisning med vannmerke – ikke lisensiert, vannmerket skal ikke fjernes/dekkes** (TODO, lanseringskrav) |
| `docs/` | Changelog, beslutninger, promptlogg, TODO, onboarding |

## Føringer som IKKE endres uten eksplisitt beskjed

- **Design:** varm, analog forbudstids-stemning. Palett: brunsort `#141110`,
  messing `#C9A227`, oksblod `#5E1F24`, røykgrønn `#3A4A3F`, kritt `#E8E0D0`.
  Typografi: Limelight (display, med måtehold) + Cormorant Garamond (brødtekst).
  Aldri ren svart bakgrunn med neonaksent, aldri blank «Gatsby-glamour».
  Æventyr-logoen i footeren beholder merkevarens gull `#CA9F68` – ikke
  «harmoniser» den med sidens messing (beslutning #13).
- **Logo:** ordmerket «ALIBI» med gruppens A (`img/logo/alibi-logo.svg`, inline som
  `<symbol id="alibi-ordmerke">` i `tools/mal.html` og som kopi i `404.html`, farge via
  `currentColor` – endres logoen, byttes begge). A-en er
  hentet uendret fra Æventyr-gruppens egne logofiler – ikke tegn den om, ikke bytt
  den med en font-glyph, ikke strekk/skjev. Dimensjoner etter versalhøyde (LIBI),
  ikke total høyde – A-streken skal få gå over/under uten å presse layouten.
  «Alibi» i løpende tekst, `<title>`, meta og JSON-LD er vanlig tekst (beslutning #23).
- **Hero-filmen:** dekor (`aria-hidden`), lydløs, loop, egen pause/spill-knapp
  (WCAG 2.2.2, 44 px). **Ingen `<video>` i markupen** – bare plakaten som
  `<img>` (+ `<noscript>`-video); JS lager videoelementet først når døra er
  åpnet og feltet er i syne, og aldri ved `prefers-reduced-motion` eller
  sparemodus (plakat + knapp). Grunn: WebKit laster hele fila for en
  `<video preload="none">` i markupen. Bilderegelen gjelder filmen òg.
  Byttes kun via `tools/lag-hero-film.py` (beslutning #34).
- **Bilder:** aldri alkohol som drikkes eller er i fokus, tobakk/røyking, eller
  alkohol- eller tobakksmerker (alkoholloven § 9-2 / alkoholforskriften kap. 14,
  tobakkskadeloven § 22). I tvil om et bilde: ikke bruk det, spør. Stockbilder er
  midlertidige, merkes `PLACEHOLDER` og føres i `docs/BILDEKILDER.md`; de skal aldri
  late som de viser andre steder (Raus/Tåkt venter på ekte foto fra kunden).
  Bilder leveres som WebP + JPEG-fallback i `<picture>`, med `width`/`height`,
  `loading="lazy"` og norsk alt-tekst (aldri om drikke). Sort-hvitt bevares.
- **Tone:** norsk bokmål, lavmælt, konspiratorisk, glimt i øyet
  («Du fant oss.»). Aldri ropende salgstekst, ingen utropstegn-hype.
  Engelsk i samme tone: britisk-nøytral, ingen amerikansk salgsspråk.
  Egennavn oversettes aldri (Alibi, Raus, Tåkt, Æventyr, Canyon Hotell,
  Gargia Lodge, Måsa, drinknavn, adresser). Priser: «kr 159» / «NOK 159».
- **Språk:** begge språk skal alltid være komplette og like i struktur –
  derfor generatoren. Ingen norske ord på engelsk side utenom egennavn.
  Språkvelgeren (topplinja + døra) skal virke uten JS, ha flagg som
  inline-SVG *sammen med* tekst, `hreflang`/`lang` på lenkene og
  `aria-current` på gjeldende språk. `sessionStorage`-nøklene deles mellom
  språkene.
- **Døra:** forblir et overlay – ALT innhold skal ligge i DOM-en bak og være
  crawlbart. Døra betjenes med tastatur (den er en `<button>`), «Gå rett inn»-
  lenken skal alltid finnes, `sessionStorage` («alibi-inne») viser den én gang
  per økt.
- **Bevegelse:** kun `transform`/`opacity`. Alt gates bak `html.js-klar` som
  bare settes når JS kjører og brukeren ikke har `prefers-reduced-motion` –
  med redusert bevegelse vises alt statisk, ingenting skjules. Maks én
  flimrende lyskilde på siden (kammerlyset i hero-en). Kammerlys og støv er
  pauset (`html.dor-lukket`, satt av inline-skriptet i `<head>`) til døra
  begynner å åpne seg – de er usynlige bak den og koster bare rastrering.
- **Ytelse (beslutning #35):** det *absolutte* kravet – Performance ≥ 95,
  Accessibility 100, Best Practices 100, CLS 0, mobil – måles med
  **PageSpeed Insights** (pagespeed.web.dev / PSI-API-et, Googles servere)
  mot den deployede siden, median av tre kjøringer per språk. Lokal
  Lighthouse (`python -m http.server 8000`) brukes **bare relativt**: `main`
  mot `dev` om hverandre under like forhold, og `dev` skal ikke være dårligere.
  Grunn: lokale tall varierer med strøm/CPU-klokke (runde 17b: 89 på batteri,
  97 på lader for samme kode). Preload kun fontene som brukes over folden
  (Cormorant 400 + kursiv).
- **Tilgjengelighet:** WCAG AA-kontrast (messing på brunsort ≈ 7,7:1 er OK;
  sjekk alt nytt), synlig fokus, semantisk HTML, skip-lenke.
- **Passordet** («æventyr») ligger som konstanten `ALIBI_PASSORD` øverst i
  `js/main.js` og brukes av både døra og Bakrommet. Bytt det kun der.
  æ/ø/å godtas som ae/oe/aa (normaliseres før sammenligning) – bevar det.
- **Plassholdere** merkes alltid `<!-- PLACEHOLDER: … -->` i `tools/mal.html`
  (de følger med i begge genererte filer) OG føres inn i tabellen i
  `docs/TODO.md`. Tell dem i malen.

## Commit-konvensjon

**Conventional Commits på norsk.** Typene er engelske, beskrivelsen norsk:

```
feat: legg til åpningstider i praktisk-seksjonen
fix: rett kontrast på inverterte menykort
docs: oppdater changelog for runde 3
style: juster luft rundt menykortene
refactor: trekk passordsjekken ut i egen funksjon
chore: oppdater .gitignore
```

- Én commit per logisk endring – aldri én diger commit per økt.
- Milepæler tagges: `runde-1`, `runde-2`, … (baseline-commiten er tagget
  `runde-2`; runde 1 ble gjort før git fantes og har ingen egen tag).
  Fra runde 15: taggen settes først når runden er slått sammen til `main`.
- Alt arbeid på `dev` (se «Arbeidsflyt» over).

## Sporbarhetsreglene (gjelder ALLE økter)

Hver arbeidsøkt avsluttes med følgende, uten at brukeren ber om det:

1. **Nye oppføringer i:**
   - `docs/CHANGELOG.md` – hva som ble gjort (Lagt til/Endret/Rettet/Fjernet).
   - `docs/DECISIONS.md` – hvorfor, dersom vesentlige valg ble tatt
     (nummerert, med alternativer og status).
   - `docs/PROMPTS.md` – hva bestillingen var, hva som ble levert, og avvik.
     Arkiver selve prompten som egen fil i `docs/prompts/`.
2. **Oppdatert `docs/TODO.md`:** lukkede punkter markeres med dato, nye legges
   til. Plassholder-tabellen skal alltid stemme med koden
   (`grep PLACEHOLDER tools/mal.html`).
3. **Commits underveis** etter konvensjonen over, med beskrivende meldinger –
   på `dev`, aldri `main`. Kjør `python tools/bygg-sider.py --sjekk` før
   hver commit som rører mal eller tekstfiler.
4. **Kort sluttrapport til brukeren:** hva ble gjort, hvilke beslutninger ble
   tatt, hva står igjen.

**Regel:** Er kode og dokumentasjon i utakt, er det dokumentasjonen som er feil
og skal rettes i samme økt. Ingen endring er ferdig før den er sporbar.
