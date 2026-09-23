# Changelog – Alibi

Format etter [Keep a Changelog](https://keepachangelog.com/): nyeste øverst,
én seksjon per arbeidsøkt/runde, med Lagt til / Endret / Rettet / Fjernet.
Runde 1 og 2 er rekonstruert i ettertid (git ble tatt i bruk i runde 3);
datoene for runde 1–2 er antatt.

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
