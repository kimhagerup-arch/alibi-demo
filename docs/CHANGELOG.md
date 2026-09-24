# Changelog – Alibi

Format etter [Keep a Changelog](https://keepachangelog.com/): nyeste øverst,
én seksjon per arbeidsøkt/runde, med Lagt til / Endret / Rettet / Fjernet.
Runde 1 og 2 er rekonstruert i ettertid (git ble tatt i bruk i runde 3);
datoene for runde 1–2 er antatt.

## Runde 17 – 2026-09-24 – Hero-video i loop (på `dev`, ikke slått sammen til `main`)

### Lagt til
- **Hero-filmen** i `#velkommen` erstatter «Film kommer»-flaten på begge
  språk (P3 midlertidig løst). Samme ramme og 16:9-felt, ingen
  layout-endring, CLS 0. **Fila er en Envato-forhåndsvisning med synlig
  vannmerke, ikke lisensiert** – kun for å vise kunden muligheten; vannmerket
  er ikke fjernet, beskåret bort eller dekket, og er synlig i feltet på 1440
  (736 × 414) og 375 (335 × 188). Lanseringskrav i TODO (høy prioritet),
  kilde/lisens i `BILDEKILDER.md`. Beslutning #34.
- **Filer** i `assets/video/`: `alibi-hero.mp4` (H.264 High, yuv420p,
  960×540, 25 fps, 8,2 s, s/h, uten lyd, `+faststart`, crf 26) **336 kB** –
  kilden var 514 kB, ny koding uten synlig tap (sjekket i 2x-zoom);
  `alibi-hero-poster.webp` (første bilde, 736 × 414, q 75) **25 kB**.
  Ingen WebM: VP9 crf 40 ga 279 kB (−17 %) og var litt mykere – ikke
  «tydelig mindre».
- **`tools/lag-hero-film.py`** (ffmpeg): én kommando bytter filmen – ny
  kildefil inn, samme filnavn ut, nedskalering til maks 960 px (aldri opp),
  sort-hvitt (`hue=s=0`), lyd fjernet, plakat generert. `--webm` valgfritt.
  Dokumentert i README («Hero-filmen»).
- **Markup:** ingen `<video>` i DOM-en – `#hero-felt` har plakaten som
  `<img>` (`.hero-plakat`), `data-film`/`data-plakat`, og en
  `<noscript>`-video med `controls` for besøkende uten JS. `main.js`
  lager `<video muted loop playsinline aria-hidden>` første gang filmen skal
  spille. Grunn: WebKit hentet hele mp4-en for en `<video preload="none">` i
  markupen, også bak lukket dør og med JS avslått (målt via serverlogg).
  Chromium og Firefox lastet ingenting, men elementet må være borte for
  alle.
- **Pause/spill-knapp** (WCAG 2.2.2): 44 × 44 px, messing på mørk bunn,
  nedre høyre hjørne, ikon bytter (pause ⇄ spill), navn per språk fra
  «js»-tekstene («Pause film»/«Play film», «Sett film på pause»/«Spill av
  film»), synlig fokus. Gjestens valg huskes så lenge siden er åpen.
- **Regler for avspilling** i `main.js`: spiller bare når gjesten ikke har
  trykket pause, døra ikke er lukket (`dorLukket`, fjernes idet døra begynner
  å åpne seg), feltet er i syne (IntersectionObserver, terskel 0,1), fanen er
  synlig, og verken `prefers-reduced-motion` eller
  `navigator.connection.saveData` er satt – i de to siste vises plakat +
  knapp, og knappen starter filmen. Reserve for loop: en `pause`-hendelse vi
  ikke ba om (WebKit pauser ved 0 etter omstarten) starter filmen igjen.

### Endret
- `hero_video_aria`/`hero_video_tekst` («Film kommer») er fjernet fra
  språkfilene; `film_spill`/`film_pause` er nye (topp + «js»).
- `PLACEHOLDER`-antallet er uendret (21): hero-kommentaren er byttet til
  «eksempelfilm med vannmerke (Envato-forhåndsvisning), lisensieres eller
  byttes før lansering».

### Verifisert (lokalt, samme filer som previewen)
- **Filmtestsett (23 sjekker) i Chromium 143:** alle OK – ingen
  videoforespørsel og ingen `<video>` bak lukket dør; spiller automatisk,
  lydløst og i loop etter «Walk straight in»; klikk/Enter/Space på knappen;
  pause huskes ved scroll bort/tilbake; ute av syne → pauset, tilbake →
  spiller; skjult fane → pauset; redusert bevegelse og sparemodus → plakat +
  knapp uten lasting, knappen starter; mobil med berøring; uten JS →
  `<noscript>`-video med kontroller. **Firefox 141:** 19/19 (de fire
  mobil-/fane-sjekkene kjøres bare i Chromium/WebKit). **WebKit 26:** 20 OK;
  «mp4 lastet»-sjekken feiler fordi Playwright ikke rapporterer
  medieforespørsler i WebKit (fila lastes – bekreftet via serverlogg), og
  loopen krevde reserven over. Kim bør sjekke på ekte iPhone.
- **Loop-sømmen er synlig:** siste bilde (hånda er ute av bildet) og første
  bilde (hånda på knappen) avviker med gjennomsnittlig 23,0 gråtoneverdier,
  mot 0,2–0,5 mellom nabobilder. Filmen «hopper» ved omstart; ikke gjort noe
  med (eksempelfilmen byttes uansett).
- **Range-forespørsler:** loop og søk i WebKit krever en server med
  `Accept-Ranges` (Vercel har det; Pythons `http.server` har det ikke) –
  WebKit-testene er kjørt mot `npx http-server`.
- **Full feltbredde på 1440:** feltet er 736 × 414 css-px, filmen 960 × 540
  – vises nedskalert, aldri opp. Skarpt nok; på 2x-skjermer er 960 px under
  feltets 1472 fysiske piksler, så en lisensiert 1080p-fil vil bli skarpere.
- **Testsettet fra runde 16 (47 sjekker):** alle OK.
- **Lighthouse mobil, median av tre, kjørt om hverandre med runde 16-koden
  som kontroll på samme maskin:** kontroll (uten film) **94** (91/94),
  engelsk med film **93** (92/93/94), norsk med film **93** (93/93/92).
  Accessibility 100, Best Practices 100, SEO 63 (noindex), **CLS 0** på alle.
  FCP 1,5–1,6 s, **LCP 2,19 s (en) / 2,26 s (nb)**, LCP-elementet er nå
  **plakaten** (`img.hero-film`, 25 kB) mot velkomstlinja før; TBT 110–120 ms.
  **Filmen koster ≈ 1 poeng** og ingen LCP. Absoluttallene er lavere enn
  runde 16 (97) fordi maskinen var belastet under målingene (brukerens egen
  Chrome, 19 prosesser, 40–48 % CPU) – kontrollen viser det: samme kode
  målte 97/97/97 tidligere i dag og 94 nå. Kravet ≥ 95 er dermed ikke
  bekreftet i absolutte tall i denne økten; relativt til kontrollen er
  kostnaden 1 poeng, og LCP/CLS er uendret. Bør måles på nytt på rolig
  maskin (`bash`-oppsettet i CLAUDE.md, median av tre).
- Nettverk før døra åpnes: kun plakaten (25 295 B); mp4 (336 301 B) hentes
  først når filmen skal spille.
- `python tools/bygg-sider.py --sjekk` → i synk.
- Skjermbilder (1440 og 375, begge språk, film spiller og pauset, samt hero
  og dør uten JS) i `..\alibi-skjermbilder\runde-17\`.

## Runde 16 – 2026-09-24 – Rettet engelsk, ytelse 97, Vercel–GitHub bekreftet, slått sammen til `main`

### Endret
- **Engelske formuleringer** (Kims gjennomgang av runde 15-lista):
  navigasjonen (topp og bunn) i kort form «Story · House · Menu · Find us ·
  Practical» (overskriftene beholder «The story» osv.), «Alta · the cellar ·
  tonight», Æventonic «House special.», Basil Smash «a little cheeky» (norsk
  kilde er «litt uhøflig» – «cheeky» valgt som nærmeste naturlige med samme
  glimt; «a little impolite» er det ordrette alternativet), Mezcalita «The
  lime wedge passes through the flame on its way in.», ordlista «Mannsverk
  jordbær» → «Mannsverk Farm strawberries». Norsk side er uendret (bekreftet:
  `no/index.html` ikke i diffen). Headerhøyden på engelsk 375 er nå 85,1 px
  (nav-raden bryter på to linjer i stedet for tre); norsk uendret 124,8 px.
- **Ytelse – årsak og tiltak (beslutning #33).** Runde 15-fallet fra 97 til
  95 var målestøy: under like forhold i dag måler `main` 96/96/95 (median
  96), `dev` engelsk 96/96/95 og `dev` norsk 95/96/96 – ingen forskjell.
  Lighthouse sin observerte første paint kommer ~2 s etter `load` på alle
  varianter (rastrering av de fullskjerms dekorlagene på programvare-GPU),
  og LCP-elementet er velkomstlinja bak døra. Tiltak, alle tapsfrie:
  - `css/style.min.css` generert av `tools/bygg-sider.py` (40 → 25 kB),
    lenket fra malen og `404.html`. Rendringen er pikselidentisk mot
    `style.css` (dør, forside begge språk, 404; 1440 og 375). Dette var det
    eneste enkelttiltaket som flyttet scoren (eksperiment: 98/97).
  - Preload: Cormorant 400 + 400 kursiv i stedet for Limelight + 400
    (Limelight brukes bare av h1–h4 under folden).
  - Inline-skriptene i `<head>` står før `<link rel="stylesheet">`.
  - `html.dor-lukket` (satt av inline-skriptet når døra skal vises, fjernet
    av `main.js` idet døra åpner) pauser kammerlyset og støvet bak døra.
  - Forkastet etter måling: uten font-preload (95), fjerne enkeltlag som
    korn/vignett/dørgradienter/kammerlys (ingen målbar effekt hver for seg,
    og det er designet).
- **Vercel–GitHub:** koblingen fantes allerede (`vercel git connect` →
  «already connected»). Runde 15-antakelsen er rettet i CLAUDE.md,
  beslutning #32, TODO og changelog. Push til `dev` gir preview med aliaset
  `alibi-demo-git-dev-kimhagerups-projects.vercel.app` (innloggingsbeskyttet).
- Dokumentasjon: CLAUDE.md (filkart med `style.min.css`, ytelsesregel om
  median av tre), README, ONBOARDING, TODO (engelsk tekstkontroll lukket,
  Vercel-punktene lukket, «Sist verifisert»), DECISIONS #32 oppdatert, #33 ny.

### Verifisert (lokal server, headless Chromium)
- Lighthouse mobil, **median av tre**: **engelsk 97/97/97** – Performance 97 /
  Accessibility 100 / Best Practices 100 / SEO 63 (noindex, P14), FCP 1,4 s,
  LCP 2,18 s, TBT 61 ms, CLS 0, SI 3,5 s. **Norsk 97/97/97** – 97/100/100/63,
  FCP 1,4 s, LCP 2,18 s, TBT 61 ms, CLS 0, SI 3,4 s. Før tiltakene: 96 på
  begge (LCP 2,4–2,5 s).
- Funksjonstestene fra runde 15 (47 sjekker): språkflyt med tom lagring,
  språkvelger med tastatur/Esc/klikk utenfor/uten JS, skjult meny med
  «æventyr»/«aeventyr»/«AEVENTYR» via tre veier på begge språk, engelske
  meldinger, ingen horisontal rulling på 375 – alle OK etter endringene.
  `dor-lukket` bekreftet: `paused` bak døra, `running` fra døra åpner, ikke
  satt ved gjenbesøk.
- `python tools/bygg-sider.py --sjekk` → i synk (inkl. `style.min.css`).
- Skjermbilder av endrede steder (engelsk topp/hero og meny, 1440 og 375) i
  `..\alibi-skjermbilder\runde-16\`.
- **Sammenslått og publisert:** `runde-15` tagget på 15effea, `dev` merget
  `--no-ff` til `main` (7eb3f20), `runde-16` tagget, pushet med tagger.
  Vercel bygde produksjon automatisk fra `main` innen to minutter
  (bekrefter at produksjonsgrenen er `main`). Kontrollert på
  `alibi-demo.vercel.app`: `/` engelsk, `/no/` og `/no` norsk, noindex på
  begge, 404 på ukjent adresse, `sitemap.xml` og `style.min.css` servert –
  og hele funksjonstestsettet (47 sjekker, inkl. språkvelger og språkflyt)
  kjørt mot produksjonen: alle OK. `dev` = `main` etterpå.

## Runde 15 – 2026-09-24 – Engelsk og norsk, engelsk først (slått sammen til `main` i runde 16)

### Lagt til
- **Engelsk versjon** på `/` (`index.html`, `<html lang="en">`) og **norsk**
  på `/no/` (`no/index.html`, `lang="nb"`). Engelsk er standard. All synlig
  tekst, alt-tekster, `aria-label`, sr-only, `<title>`, description, Open
  Graph og JSON-LD-beskrivelsen er oversatt; egennavn (Alibi, Raus, Tåkt,
  Æventyr, Canyon Hotell, Gargia Lodge, drinknavn, adresser) står uendret.
  Priser på engelsk skrives «NOK 159» (norsk «kr 159»). Drinktekstene er
  oversatt uten å bli mer selgende (beslutning #30).
- **Generator** `tools/bygg-sider.py` (kun standard-Python) som bygger begge
  forsidene og `sitemap.xml` fra `tools/mal.html` + `tekst/nb.json` +
  `tekst/en.json` + `tekst/meny.json` + `tekst/felles.json`. Menyen ligger
  ett sted: navn, glass, cl, pris og ingredienser felles, beskrivelse per
  språk, ordliste for ingrediensoversettelse. `--sjekk` feiler hvis de
  genererte filene ikke er i synk; generatoren stopper hvis et språk mangler
  en nøkkel. Norsk utdata er verifisert byte-lik gammel `index.html` bortsett
  fra de tilsiktede endringene (beslutning #31).
- **Språkvelger** helt til høyre i topplinja: `<details>`/`<summary>` (virker
  uten JS), flagg som inline-SVG-symboler (`#flagg-gb`, `#flagg-no`, 16 × 12,
  dempede farger) alltid sammen med tekst («EN»/«NO», «English»/«Norsk»),
  `hreflang` + `lang` på lenkene, `aria-current="page"` på gjeldende språk,
  skjermlesernavn «Language: EN» / «Språk: NO». Knappen er 44 px høy som
  touch-mål, men ligger med negativ marg i en 1,4 rem layoutboks (samme knep
  som ordmerket) – topplinja er ikke blitt høyere. JS lukker på Esc (fokus
  tilbake til knappen) og klikk utenfor, og lagrer valget i `localStorage`
  («alibi-sprak»).
- **Språklenke på døra** («Norsk» / «English») sist i raden med «Walk straight
  in · Got a password? · Sound: off», med samme lagring.
- **Husket språkvalg:** inline-skript i `<head>` på `/` sender gjester med
  lagret «nb» til `/no/` (med `location.replace`, før noe tegnes). Ingen
  gjetting ut fra nettleserspråk, ingen omdirigering uten lagret valg,
  `localStorage` i try/catch, ikke på `file:`.
- **SEO per side:** selvrefererende `canonical`, `hreflang` en/nb/x-default,
  `og:url`, `og:locale` (`en_GB`/`nb_NO`) + `og:locale:alternate`,
  `inLanguage` og `url` i JSON-LD, og ny `sitemap.xml` med `xhtml:link`.
  Domenet ligger ett sted (`domene` i `tekst/felles.json`, TODO P2).
- **Engelske søsterlenker** på den engelske siden – alle verifisert HTTP 200:
  raussocial.no/en, raussocial.no/en/takt, canyonhotell.no/en,
  gargialodge.no/en/winter, raussocial.no/en/terms og /en/privacy.
  aeventyr.no/en/ svarer 308 → /en → 307 → /en/winter (som den norske
  /nb/-lenka).
- **Tekstene JS skriver ut** (bank-meldinger, «Du fant oss.», lyd av/på,
  passordmeldinger) genereres inn som `<script id="alibi-tekst"
  type="application/json">` i `<head>` fra «js»-blokka i språkfilene;
  `js/main.js` inneholder ingen strenger på noe språk.
- **Passordet godtar æ og ae:** input og fasit normaliseres (æ→ae, ø→oe,
  å→aa, små bokstaver) før sammenligning – i døra, inline-feltet og
  taste-easter-egget. `ALIBI_PASSORD` er fortsatt ett sted.
- **`dev`-gren** for alt arbeid; `main` er kundens visning (beslutning #32).
  `.vercel/` i `.gitignore`.

### Endret
- `index.html` er nå **generert** (engelsk) – redigeres aldri direkte.
  Malen `tools/mal.html` bærer strukturen og alle `PLACEHOLDER`-kommentarene
  (21 stk., mot 22 før: den egne canonical-kommentaren er borte fordi
  canonical nå genereres; og:image-kommentaren dekker canonical/hreflang/
  og:url). Begge genererte filer har samme 21 kommentarer.
- `no/index.html` bruker `../`-stier til css/js/img/assets (prefikset
  `{{rot}}` i malen), så siden fortsatt kan åpnes rett fra fil.
- `404.html` er én felles side: engelsk øverst («Wrong door / This door
  doesn't exist. Ours does. / Back to the door»), norsk under en tynn
  messinglinje (`.feil-norsk`, `lang="nb"`), lenker til `/` og `/no/`.
  Stiene er rot-absolutte, siden Vercel serverer fila også under `/no/`.
  Logosymbolet er fortsatt en kopi (nå av `tools/mal.html`).
- JSON-LD: `containedInPlace.url` og `parentOrganization.url` følger språket
  (canyonhotell.no/en, aeventyr.no/en/ på engelsk).
- `.sprak-pil` er med i reduced-motion-blokka (`transition: none`).

### Verifisert (lokal server, headless Chromium)
- Tom `localStorage`: `/` viser engelsk → velg norsk → `/no/` (døra vises
  ikke igjen i samme økt) → gå til `/` → havner på `/no/` → velg engelsk →
  `/` og blir der. Språklenka på døra gjør det samme.
- Språkvelgeren: Enter åpner, Tab går til første lenke, Esc lukker med fokus
  tilbake på knappen, klikk utenfor lukker; knapp 66,7 × 44 px, lenker 44 px
  høye; uten JS finnes begge lenkene i HTML-en og dørlenka virker.
- Skjult meny låses opp med «æventyr», «aeventyr» og «AEVENTYR» på begge
  språk via alle tre veier (dør, inline-felt, tasting – tasting testet med
  ekte `keydown`-hendelser, siden headless-tastaturet ikke har æ).
- Feil passord og lyd/bank-meldinger vises på engelsk på `/`.
- Norske ord på engelsk side (synlig tekst + alt/aria/placeholder/meta,
  kommentarer unntatt): kun «kjelleren» i `og:image:alt`, som siterer den
  norske teksten på selve delingsbildet. Ingen andre treff.
- Headerhøyde **uendret**: 124,8 px på 375 (før: 124,8), 47,0 px på 1440
  (før: 47,0), begge språk. Ingen horisontal rulling på 375; nedtrekket
  ligger innenfor skjermen (x 203–355).
- Lighthouse mobil (lokal server): **engelsk** Performance 95 /
  Accessibility 100 / Best Practices 100 / SEO 63 (noindex, P14) – FCP 1,5 s,
  LCP 2,5 s, TBT 100 ms, CLS 0. **Norsk** 95 / 100 / 100 / 63 – FCP 1,4 s,
  LCP 2,6 s, TBT 60 ms, CLS 0.
- `python tools/bygg-sider.py --sjekk` → i synk; `git diff` tom etter bygg.
- Skjermbilder (begge språk, 1440 og 375: dør, topp lukket/åpen, meny,
  footer, hele siden, samt 404) i `..\alibi-skjermbilder\runde-15\`.
- `alibi-demo.vercel.app` (main) er uendret: index.html, style.css, main.js
  og 404.html lastet ned før og etter runden er identiske med `main`;
  `/no/` gir 404 der, som før.
- Forhåndsvisning av `dev` deployet med `vercel` (preview):
  `alibi-demo-eprnl7vq6-kimhagerups-projects.vercel.app`, alias
  `alibi-demo-git-dev-kimhagerups-projects.vercel.app`. Begge svarer 302 til
  Vercel-innlogging (Deployment Protection) – testene over er derfor kjørt
  mot lokal server med samme filer. *(Rettet i runde 16: Vercel var koblet
  til GitHub hele tiden; pushene til `dev` ga egne previews.)*

## Runde 14 – 2026-09-24 – Strammere ford-utsnitt, lettere ford-filer, bildekilder

### Endret
- **Ford-utsnittet** er flyttet til venstre: fortsatt 2048 × 2560 px (4:5)
  av originalen, nå x 0,401–0,796 (før 0,469–0,864), y uendret. Høyre kant
  går ved frontrutestolpen, like før jakkeermet til personen i høyre kant
  (ermet når inn til x ≈ 0,80, hånda ligger ved x ≥ 0,85). Motivet er
  venstre lykt + grillen med Ford-skriften; høyre lykt er ute (den lå under
  hånda – ingen 4:5-rektangel får med begge lyktene uten hånda).
  Registreringsskiltet er fortsatt utenfor (bunn ved y 0,746, skiltet
  starter ved ≈ 0,77). Alle fire eksporterte varianter er sjekket: ingen
  skilt, ingen hånd, ingen erme.
- **Egne eksportinnstillinger per bilde** i `tools/eksporter-bilder.py`:
  valgfritt åttende element i `BILDER` med `"webp"` (kvalitet) og `"stoy"`
  (gaussisk radius på det nedskalerte bildet før lagring). Kun ford bruker
  det: q65 + radius 0,55. De andre bildene er uendret (q78, ingen
  støyfjerning) og re-eksporteres byte-identisk.
- **Ford-filene** (før → etter):

  | Variant | runde 13 | runde 14 |
  |---|---|---|
  | 480 webp | 79 kB | 48 kB |
  | 640 webp | 131 kB | 76 kB |
  | 800 webp | 199 kB | 109 kB |
  | 800 jpg (fallback, q75 uendret) | 195 kB | 160 kB |

  Målet 640 ≤ 80 kB / 800 ≤ 110 kB er nådd. Visuell sammenligning i 576 og
  562 px (288/281 css-px @2x) med 3:1-zoom på grillnettet: q65 uten
  støyfjerning, radius 0,5, 0,55 og 0,6 er alle rene (ingen blokk- eller
  ringeartefakter i nettet); 0,7–0,8 gjør nettet synlig mykere og ble
  forkastet. 0,5 ga 116 kB på 800, 0,55 er det letteste som holder både
  målene og skarpheten.
- **Bildekilder:** dame, par-dans og ford er fra Pexels (fri bruk,
  kreditering ikke påkrevd) – samme lisens som telefon, lampe og bardisk.
  `docs/BILDEKILDER.md` er rettet («oppgis av Kim» er borte), og
  lanseringskravet om kilde/lisens i TODO er lukket.

### Verifisert
- Skjermbilder av båndet (og hele siden) på 1440 og 375 px, samt de fire
  ford-variantene, i `..\alibi-skjermbilder\runde-14\`.
- Kildevalg uendret: 480 på 1x, 640 på 2x, 800 på 3x; lazy på 375 som før.
- Lighthouse mobil (lokal server): Performance **97** / Accessibility
  **100** / Best Practices **100** / SEO 60 (noindex, P14). FCP 1,5 s,
  LCP 2,5 s, TBT 38 ms, CLS **0,012** (uendret; kilden er hero-feltet).
  Nettverk: `alibi-ford-640.webp` 79 kB (før 134 kB).
- `PLACEHOLDER`-antallet er uendret (22).

## Runde 13 – 2026-09-23 – Fotobånd med tre stemningsbilder

### Lagt til
- **Fotobånd mellom Historien og Huset** (`.fotoband`, rett etter
  `#historien`, før skillelinja): dame – par-dans – ford som tre stående
  4:5-bilder i sidens ramme (border + ytre hårlinje fra `.medie-slot`,
  diamant i toppen som på kortene). Ingen overskrift, ikke i navigasjonen,
  ingen bildetekster, ikke med i scroll-avsløringen (statisk). Markup:
  `<ul>`/`<li>`/`<figure>`/`<picture>`. Fra 46 rem: tre på rad med samme
  innholdsbredde som seksjonene – målt 3 × 288 px (luft 24 px) på 1440 og
  3 × 219,5 px på 768. Under 46 rem: horisontal rad med `scroll-snap`
  *inni* båndet, hvert bilde 75 vw (281 px på 375) med 16 px gap, så neste
  bilde stikker 58 px inn; gutter lik seksjonenes `--luft` i begge ender.
  Rulleområdet har `tabindex="0"`, `role="region"` og
  `aria-label="Stemningsbilder"`; fokusringen ligger 3 px innenfor båndet.
  Piltaster ruller ett bilde av gangen (scrollLeft 0 → 297 → 541 px).
  Ingen `scroll-behavior` settes på båndet.
- **Nye bilder** `img/alibi-dame-*`, `img/alibi-par-dans-*` og
  `img/alibi-ford-*` – WebP 480/640/800 (q78) + JPEG 800 (q75) fra
  `tools/eksporter-bilder.py`:

  | Variant | dame | par-dans | ford |
  |---|---|---|---|
  | 480 webp | 26 kB | 17 kB | 79 kB |
  | 640 webp | 44 kB | 28 kB | 131 kB |
  | 800 webp | 66 kB | 46 kB | 199 kB |
  | 800 jpg (fallback) | 95 kB | 81 kB | 195 kB |

  `sizes="(min-width: 62.5rem) 18rem, (min-width: 46rem) calc((92vw - 3rem) / 3), 75vw"`
  gir 480 på 1x-skjermer, 640 på 2x (1440, 768 og 375) og 800 bare på 3x.
  Ford: fast utsnitt 2048 × 2560 px av originalen (x 0,469–0,864,
  y 0,088–0,746), sentrert på grill og lykter – registreringsskiltet
  «AR-83-13» og ansiktet til personen i høyre kant ligger utenfor i alle
  fire varianter (sjekket per fil). Dame: forskjøvet mot toppen så fjæra
  og ansiktet er med. Par-dans: fra rett over hatten til knærne, begge
  hodene med.
- Én ny `PLACEHOLDER`-kommentar på båndet (TODO P19) – 22 totalt.

### Endret
- `tools/eksporter-bilder.py`: tre nye oppføringer; de tre gamle bildene
  ble re-eksportert byte-identisk (ingen diff i git).

### Verifisert
- Skjermbilder på 1440, 768 og 375 px (hele siden, båndet, fokus og rullet
  tilstand) og de fire ford-variantene i `..\alibi-skjermbilder\runde-13\`.
- Ingen horisontal rulling på siden på 375: `scrollWidth` 375 = `innerWidth`
  før og etter rulling/sveip. Sveip (touch-emulert i headless Chrome)
  snapper 0 → 297 → 541 px og tilbake; vertikalt sveip over båndet ruller
  siden. Bildene har `aspect-ratio` 0,800 på alle bredder.
- Lazy: på 375 er ingen av båndbildene lastet ved `load` (`currentSrc`
  tom); de lastes når båndet rulles inn. På 1440/768 ligger båndet
  innenfor Chromes lazy-terskel og lastes tidlig – som telefon-bildet.
- Redusert bevegelse: `js-klar` settes ikke, `scroll-behavior: auto` på
  både `html` og båndet, bildene er synlige (opacity 1).
- Døra (tre bank → `aapner`, «Gå rett inn» → `borte`, passord →
  `hemmelig` med skjult meny synlig), navigasjonen (fem ankere, ingen til
  båndet) og tab-rekkefølgen (skip-lenke → topplinje → båndet → Huset-
  lenkene → skjult meny-knapp → footer) virker som før.
- Lighthouse mobil (lokal server, emulert 412 px @1,75x): Performance
  **97** / Accessibility **100** / Best Practices **100** / SEO 60
  (noindex, P14). FCP 1,4 s, LCP 2,4 s, TBT 77 ms, CLS **0,012** –
  uendret fra runde 11/12; eneste layout-skift er fortsatt hero-feltet.
  Nettverk: `alibi-dame-640.webp` 45 kB, `alibi-par-dans-640.webp` 30 kB,
  `alibi-ford-640.webp` 134 kB.

## Runde 12 – 2026-09-23 – Dørskiltet får plass til ordmerket, logo på 404

### Lagt til
- **Ordmerket på 404-siden:** samme `<symbol id="alibi-ordmerke">` som på
  forsiden (kopiert inn i `404.html`, som ikke laster JS og ikke deler DOM
  med `index.html`), sentrert over «Feil dør» i messing. Lite og nøkternt:
  høyde 1,9 rem → versalhøyde 9,5 px, overteksten «FEIL DØR» har 9 px.
  Lenke til forsiden (`href="/"`) med `aria-label="Alibi – til forsiden"`,
  hover i dempet messing som ordmerket i footeren. Resten av 404 er urørt.

### Endret
- **Dørskiltet** (`.dor-skilt`) er nå liggende 2:1 og står sentrert *i* det
  øvre dørfeltet (feltet: top 34 %, høyde 22 % → skiltet på 45 %), helt
  innenfor feltets kanter. Bredde 45 % av dørbladet og `aspect-ratio`, så
  det skalerer med døra (som er `min(17rem, 62vw, 31vh)`). Ordmerket
  dimensjoneres etter versalhøyden: A-streken fyller 86 % av platehøyden,
  som gir LIBI ≈ 27 % av platehøyden. Målt: plate 114,5 × 57,2 px og
  versalhøyde 15,1 px på 1440 og 768 px; 85,1 × 42,6 px og 11,2 px på
  375 px (før: 68,5 × 46,8 px og 11 px på alle bredder, rem-basert).
  Luft over/under streken 4,4 px (3,4 px på 375). Ingenting klippes.
- **Optisk sentrering** av ordmerket på plata: SVG-en flyttes 9,1 % av egen
  bredde mot venstre (`translateX`), slik at ordet slik det leses – A-en i
  versalbåndet + LIBI, x 45–235 av 237 i viewBoxen – står midt på plata.
  Målt avvik 0,0 px. Bare LIBI + det korte A-benet ville krevd 15,6 % og
  lagt streken for tett i venstre kant (se beslutning #28).
- Skiltet ligger etter dørfyllingene i DOM-en, så det males oppå feltet
  (feltene har halvgjennomsiktig mørk bakgrunn som ellers ville dempet
  messingen).
- CLAUDE.md og README: symbolet ligger i både `index.html` og `404.html`.

### Verifisert
- Skjermbilder før/etter av døra på 1440, 768 og 375 px (+ utsnitt av skilt-
  området og fokusbilde) og av 404 på 1440 og 375 px, lagret utenfor repoet:
  `..\alibi-skjermbilder\runde-12\`.
- Døra (headless Chrome via puppeteer-core i scratchpad, ikke i prosjektet):
  tre bank → `vurderer` → `aapner`, `alibi-inne` settes; «Gå rett inn» →
  `aapner` → `borte`; passord «æventyr» ved døra → `hemmelig`, skjult meny
  synlig, lås skjult, `alibi-bakrom` satt; lyd av → på → av med
  `aria-pressed`; Tab × 2 lander på døra med synlig fokus (2 px messing
  outline), Enter × 3 banker. Tilgjengelig navn uendret (`aria-label` på
  knappen, skiltet er `aria-hidden`). Med redusert bevegelse er skiltet
  synlig og `js-klar` settes ikke.
- Kontrast gravering (#2a1e12) mot plata: 8,2:1 mot lys ende (#d9b545),
  4,7:1 mot mørk ende (#a9862a) – over kravet 3:1.
- Lighthouse mobil (lokal server): Performance **98** / Accessibility
  **100** / Best Practices **100** / SEO 60 (noindex, P14). FCP 1,5 s,
  LCP 2,3 s, TBT 50 ms, CLS **0,012** – identisk med runde 11.
- `PLACEHOLDER`-antallet er uendret (21).

## Runde 11 – 2026-09-23 – Ny logo med gruppens A, stemningsbilder og footer

### Lagt til
- **Nytt ordmerke «ALIBI»** med Æventyr-gruppens A (én lang diagonal + kort
  høyre ben, ingen tverrstrek). Filene ligger i `img/logo/` (`alibi-logo.svg`
  med `currentColor`, gull/hvit/svart-varianter og `alibi-merke-gold.svg`).
  Ordmerket er inline som `<symbol id="alibi-ordmerke">` og brukes med
  `<use>` i topplinja, hero, dørskiltet og footeren – fargen styres av CSS.
  Dimensjonert etter versalhøyde: i topplinja er LIBI ≈ 0,7 rem og
  A-streken går utenfor layoutboksen med negativ marg, så headerhøyden er
  uendret (47 px desktop / 125 px mobil, målt før og etter).
- **Favicon** (SVG + PNG 32/180) av A-merket på brunsort, kvadratisk
  viewBox; streken har ekstra kontur *kun* i favicon-versjonen så den er
  synlig i 16 px (sjekket på lys og mørk fane-bakgrunn). **og-image.png**
  rendret på nytt med gullversjonen av ordmerket (8,6 kB).
- **Søsterstedene som logorad i footeren** («Familien»): Æventyr, Raus
  Social, Tåkt, Canyon Hotell og Gargia Lodge, hver som lenke, som `<img>`
  i stedenes egen gull `#ca9e67` (7,7:1 mot bunnen). Per-logo høyde for lik
  optisk størrelse, touch-mål ≥ 44 px, raden brytes pent på 375 px. Tåkt er
  WebP 1×/2× (1,8 / 3,9 kB) eksportert fra PNG-en. `gargia.svg` inneholder
  ingen `<text>` – alt er kurver.
- **Canyon Hotell:** én linje i «Finn oss» («Du finner oss i samme bygg som
  Canyon Hotell.», lenket) og `containedInPlace` {Hotel} i JSON-LD-en.
  Validert med validator.schema.org (0 feil).
- **Tre stemningsbilder** (sort-hvitt stock) i de eksisterende fotofeltene
  som hører til Alibi: veggtelefon i «Historien», lampe/chesterfield på
  Alibi-kortet i «Huset», bardisk i «Finn oss». WebP 480/800 px + JPEG-
  fallback i `<picture>` med `srcset`/`sizes`, `width`/`height`, lazy/async.
  Rammen på `.medie-slot` beholdes; bildet fyller feltet med cover.
  Filstørrelser: telefon 52 / 110 kB (jpg 140), lampe 6 / 15 kB (jpg 27),
  bardisk 19 / 38 kB (jpg 61). Raus- og Tåkt-kortene står urørt.
- `tools/eksporter-bilder.py` (Pillow, kun lokalt) for reproduserbar
  eksport med utsnitt/beskjæring per bilde. `docs/BILDEKILDER.md` med kilde,
  lisens og sjekk per bilde.
- **Bilderegel** i CLAUDE.md: aldri alkohol som drikkes/er i fokus, tobakk/
  røyking eller alkohol-/tobakksmerker (alkoholloven § 9-2, alkoholforskriften
  kap. 14, tobakkskadeloven § 22).

### Endret
- Footeren har to lenkespalter (Alibi, Følg oss) + logoraden; tekstlista
  «Huset» og Æventyr-logoen i bunnlinja er erstattet. Bunnlinja viser nå
  ordmerket (lenke til toppen).
- Meta description: «levende lys» → «dimmet lys og mørknet tre» (141 tegn).
  og:description og JSON-LD-beskrivelsen nevnte ikke lys og er urørt.
- PLACEHOLDER-kommentarene for P4, P7 og P16 (Alibi) omformulert til
  «stemningsbilde (stock), byttes med ekte foto» – ett merke per felt som
  før, derfor uendret antall (21), ikke +3 som bestillingen antok.
- CLAUDE.md: Canyon Hotell (samme bygg) og Gargia Lodge i beskrivelsen,
  logo-føring, bilderegel, `img/` og `tools/` i filkartet. README: medier,
  eksportskript, filkart.

### Fjernet
- `assets/alibi-logo.svg` (Limelight-logotypen) og `assets/aeventyr-gold.svg`
  (erstattet av `img/logo/aeventyr.svg` i logoraden), samt CSS for
  bildelogoen og alt-tekst-fallback. Limelight beholdes – den brukes fortsatt
  til overskrifter og mottoet.

### Verifisert
- Lighthouse mobil (lokal server): Performance **98** / Accessibility
  **100** / Best Practices **100** / SEO 60 (noindex, P14). FCP 1,5 s,
  LCP 2,3 s, TBT 50 ms, CLS 0,012. Før runden (runde 9): 99/100/100/60,
  LCP 2,0 s.
- Bildene laster riktig variant: 375 px @1× og 1440 px @1× → 480-WebP,
  375 px @2× → 800-WebP; Tåkt 1×/2× tilsvarende.
- Skjult meny låses opp via inline-felt, passord ved døra og taste-egget;
  tre bank åpner døra; fokusrekkefølgen er logisk (skip-lenke → dør →
  ordmerke → ankere → … → logorad → ordmerke i bunnen → vilkår/personvern).
- Alle fem footerlenker svarer 200 (aeventyr.no/nb/ via 308 → /nb → sesong-
  side; Gargia `/nb/winter` 200 nå – sjekkes ved sesongskifte).
- `git ls-files img/`: kun de tre brukte bildene og logoene. Ingen
  chesterfield/dame/par-dans/ford i repoet.

## Runde 10 – 2026-09-23 – Bar, materialer, fast pris og «skjult meny»

Liten tekstrunde uten nye funksjoner eller designendringer.

### Endret
- **Alibi er bar, ikke pub** i all synlig tekst og i prosjektbeskrivelsen:
  historien («En bar i en kjeller …»), Huset-kortet («Bar i samme kjeller …»),
  CLAUDE.md, README og ONBOARDING. `<title>`, `description`, Open Graph og
  JSON-LD-beskrivelsen sa allerede «speakeasy»/«speakeasy-bar» og er urørt.
  JSON-LD-typen `BarOrPub` står (riktig schema.org-type). Beslutning #22.
- **Historien, andre avsnitt:** «levende lys, messing som har fått lov til å
  mørkne» → «dimmet lys og tre som har fått lov til å mørkne».
- **Huset-mottoet:** «Spis oppe. Dans ved siden av. Snakk her.» →
  «Spis oppe. Nattklubb ved siden av. Snakk her.»
- **Menykortene (alle ni, hovedmeny + skjult meny):** pris `kr —` → `kr 159`
  (midlertidig, P5 står åpen). Glasstypen er tatt ut av spesifikasjonslinja –
  bare mengden står igjen («Vinglass · 30 cl» → «30 cl» osv.). Glasstegningen
  beholdes som dekor (`aria-hidden="true"`, ingen `<title>`), så skjermlesere
  hører kun mengden.
- **«Bakrommet» heter «den skjulte menyen» i synlig tekst:** inngangslinja
  («Vi har en skjult meny.»), sr-only-etiketten («Passord til den skjulte
  menyen»), overskriften («Den skjulte menyen») og suksessmeldingen («Du kan
  passordet. Den skjulte menyen er din.»). Interne navn (klasser, ID-er,
  JS-variabler, `alibi-bakrom`) er uendret. Beslutning #22.
- PLACEHOLDER-kommentarene for P5 og P18 oppdatert til å beskrive ny status
  (midlertidig pris, glasstype vises ikke). Antall merker uendret: 21.

### Verifisert
- Funksjonstest i headless Chrome (fersk profil per forsøk): den skjulte
  menyen låses opp via inline-feltet, passordet ved døra, taste-easter-egget
  foran døra og taste-easter-egget etter «Gå rett inn». Feil passord gir
  «Det var ikke det.» og lar menyen være låst. `ALIBI_PASSORD` urørt.
- Korthøydene i menyen er identiske før og etter endringen på 1440 px og
  375 px (emulert via DevTools-protokollen); ingen horisontal rulling.
  Skjermbilder av hovedmeny og opplåst skjult meny sjekket på begge bredder.
- `grep -in "pub"` / `"bakrom"` i `index.html` og `js/main.js`: bare
  `BarOrPub`, kommentarer, klasser, ID-er og variabler gjenstår.

## Justering – 2026-08-21 – «for stor header» (rett etter runde 9)

### Rettet
- Symbol-SVG-en med glasstegningene (runde 9) brukte `hidden`-attributtet,
  som ikke gjelder for SVG-elementer (SVG-navnerommet treffes ikke av
  UA-regelen `[hidden]{display:none}`). Blokka rendret derfor som en tom
  boks i standardstørrelse (~300×150) over topplinja – det så ut som en
  altfor høy header. Nå `style="display:none"`; `<use>`-referansene virker
  fortsatt (verifisert med skjermbilde av menyen).

### Endret
- Topplinja slanket i samme slengen: logoen 1,9 → 1,4 rem, padding
  0,7 → 0,45 rem, mobil `scroll-margin-top` 6,5 → 5,5 rem.

### Etterpå
- Runde 8, 9 og justeringen pushet til origin main av Kim. Verifisert på
  previewen: `og-image.png` svarer HTTP 200 (delingsbildet kan nå testes i
  Facebook/LinkedIn-debuggerne) og glass-symbolene ligger i utrullet HTML.
- Docs-ajourføring i etterkant: README (Bakroms-cocktailene er ekte,
  adresseforbehold P15, assets-beskrivelse), ONBOARDING og CLAUDE.md
  (assets-beskrivelse, adresseforbehold), promptlogg-oppføring for
  header-justeringen.

## Runde 9 – 2026-08-21 – Ekte meny, Bakrommet og delingsbilde

### Lagt til
- **De sju ekte drinkene** fra eierne i `#menyen` (Æventonic, Aurora Fizz,
  Basil Smash, Manito, Mezcalita, Maltfassioned, Canyon Tea), hver med
  glasstegning, glassnavn + totalmengde, ingredienslinje uten mengder og
  beskrivelse. Priser står som `kr —` til de leveres (P5).
- **Fire glasstegninger** (vin, highball, rocks, margarita) fra den trykte
  menyen, som `<symbol>` i én skjult SVG-blokk øverst i `<body>` og
  `<use>` i kortene – highball og rocks gjenbrukes på tvers av kort.
  `stroke="currentColor"`, `aria-hidden`/`focusable="false"` (glassnavnet
  står som tekst ved siden av). Full messing mot kortbunnen ≈ 6,9:1 –
  godt over AA-kravet 3:1 for grafikk.
- **Bakrommet:** Mandaquiri og Adventure erstatter Mørketid/Midnattssol.
  Glass/mengde er ikke oppgitt av eierne – ingen tegning der, ført som P18.
- **Allergen- og urtelinjer** under menyen: rå eggehvite opplyst generelt
  (synlig uten opplåsing, uten å røpe Bakrommet) og «Mynte, basilikum og
  rosmarin dyrker vi selv.»
- **Delingsbilde** `assets/og-image.png` (1200×630, 19 kB) rendret fra
  logofila med headless Chrome; `og:image` + width/height/alt og
  `twitter:image` med absolutt URL mot previewdomenet (P1 lukket, byttes
  til endelig domene via P2).

### Endret
- Meny-ingressen: «Vår egen håndskrift. Noen av dem har vi funnet på selv.»
  (de gamle klassikerne var «klassikere fra forbudstiden» – det stemmer
  ikke lenger).
- Footerens to Æventyr-lenker (logoen i «et …-sted» og Huset-spalten) går
  nå til `aeventyr.no/nb/about` (HTTP 200) – `/nb/` redirigerer til
  sesongkampanjen `/nb/summer`. JSON-LD beholder `/nb/` som org-URL.
- P2 i TODO omgjort til samlepunkt «bytt domene ved lansering»
  (canonical + og:url + og:image-URL-ene).
- Merknad ved runde 5-punktet i TODO om at «SEO 100» der er historikk
  (previewen viser 60 pga. noindex, se P14).

### Målt
- Lighthouse (lokal server, emulert mobil), **før**: Performance 99 /
  Accessibility 100 / Best Practices 100 / SEO 60 (FCP 1,2 s, LCP 2,0 s,
  TBT 11 ms, CLS 0,012).
- **Etter**: Performance 99 / Accessibility 100 / Best Practices 100 /
  SEO 60 (FCP 1,2 s, LCP 2,0 s, TBT 13 ms, CLS 0,010). De sju inline-
  SVG-ene koster ingenting målbart. SEO 60 = previewens noindex (P14).
- Funksjonstest i headless Chrome: Bakrommets tre veier inn (inline-felt,
  passord ved døra, taste-easter-egget) verifisert grønne; `ALIBI_PASSORD`
  urørt.

## Runde 8 – 2026-08-21 – Logo og familiebånd

Bestillingen omtalte seg selv som «runde 7», men repoet hadde allerede en
runde 7 (404-side/favicon-fallback) – denne økten er derfor nummerert 8.

### Lagt til
- **Logotypen** (`assets/alibi-logo.svg`, levert av Kim): A-en med forlenget
  skråstrek uten tverrstrek (Æventyr-familiens kjennetegn), resten Limelight
  som kurver. Inn i hero-en (`<img>` i h1 med alt="Alibi", bredde/høyde-
  attributter mot CLS, `clamp()`-styrt bredde) og i topplinja i liten
  størrelse. Skråstreken stikker ut over og under – ingenting klipper den.
- **Stedsbytter i topplinja:** Raus og Tåkt som eksterne lenker bak en tynn
  messing-skillestrek, i messing så de skiller seg fra ankerlenkene. På
  smale skjermer legger ankerlenkene seg på egen rad under (beslutning #18).
- **Ny seksjon «Huset»** mellom Historien og Menyen (anker `#huset`, med i
  ankernavigasjon og scroll-spy): motto «Spis oppe. Dans ved siden av.
  Snakk her.», ingress om ett hus/tre steder, og tre kort i menykortenes
  deco-språk men uten lysstreif – Raus (åpningstider + lenke), Tåkt
  (åpningstider + lenke), Alibi («Du er her.», `aria-current="page"`,
  dempet, uten lenke). Medieplassholdere i alle tre kort (P16).
- **Footer i familiestil:** tre lenkespalter (Alibi-ankere / Huset:
  Raus–Tåkt–Æventyr / Følg oss-plassholder), deretter «Alibi – et
  [Æventyr-logo]-sted» med lenker til vilkår og personvern
  (`raussocial.no/no/terms` og `/no/privacy`, begge HTTP 200), og
  «© 2026 Alibi – en del av Æventyr.»
- **Praktisk i husets struktur:** Beliggenhet (ny, med adresse), deretter
  Åpningstider, Aldersgrense, Kontakt, Sosiale medier – samme rekkefølge og
  overskrifter som søstersidene. Plassholderne står som før.
- `twitter:card` (`summary_large_image`) i `<head>`; `url` på
  `parentOrganization` i JSON-LD; plassholder-kommentar for `sameAs`.
- **P15 – adressekonflikt** ført inn: siden sier Sentrumsparken 2, Raus/Tåkt
  oppgir Markedsgata 6. Merket med PLACEHOLDER i «Finn oss», «Praktisk» og
  ved JSON-LD; ikke endret på egen hånd.

### Endret
- Faviconet byttet til A-merket alene (samme geometri som logofila) på
  brunsort bunn, kvadratisk viewBox; PNG-fallbackene (32 px + apple-touch
  180 px) rendret på nytt fra samme geometri.
- «Finn oss» trimmet til ren veiviser (Raus over, Tåkts bass, vår rolige
  dør) – familiepresentasjonen bor nå i «Huset».
- Scroll-avsløringen hopper over medieplassholdere som ligger inni kort, så
  Huset-kortene ikke dobbelt-animeres; `.huset-motto` med i avsløringen.
- Topplinje-nav justert fra baseline- til senterjustering (logoen er nå et
  bilde).
- README: plassholder-tabell, medie-tabell og Lighthouse-notis ajourført.

### Rettet
- Logofila lå som `Alibi-logo.svg` og var aldri blitt committet (`git add`
  med små bokstaver feilet stille på Windows) – omdøpt til
  `alibi-logo.svg` og committet, så referansene holder på case-sensitiv
  hosting.

### Målt
- Lighthouse (lokal server, emulert mobil), **før** runden:
  Performance 99 / Accessibility 100 / Best Practices 100 / SEO 60
  (FCP 1,1 s, LCP 2,0 s, TBT 10 ms, CLS 0,011).
- **Etter** runden: Performance 99 / Accessibility 100 /
  Best Practices 100 / SEO 60 (FCP 1,2 s, LCP 1,9 s, TBT 0 ms, CLS 0,012).
- SEO 60 skyldes previewens bevisste `noindex` (P14) og var 60 også før
  runden – går tilbake til 100 ved lansering. Ingen ytelsesregresjon.

## Runde 7 – 2026-07-30 – 404-side og favicon-fallback

### Lagt til
- `404.html` i husets stil: «Denne døra finnes ikke. Men vår gjør.» med
  «Tilbake til døra»-lenke. Uten dør-overlay og uten JS; gjenbruker
  `style.css` (egen 404-seksjon der). Permanent noindex – kommentert i
  koden så den ikke forveksles med P14. Verifisert visuelt lokalt
  (desktop + smal viewport) og med HTTP-sjekk.
- PNG-fallback for faviconen: `assets/favicon-32.png` (32×32, transparent
  avrundet) og `assets/apple-touch-icon.png` (180×180, full-bleed – iOS
  runder hjørnene selv), rendret fra deco-A-SVG-en med headless Chrome og
  koblet i `<head>` på begge sider. SVG fortsatt primær.

### Endret
- To punkter lukket i «Kjente svakheter» i TODO (404-side, favicon-fallback).

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
