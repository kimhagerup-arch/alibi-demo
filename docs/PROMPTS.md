# Promptlogg – Alibi

Én oppføring per Claude Code-kjøring: hva bestillingen var, hva som ble
levert, og avvik. Selve promptene arkiveres ordrett i [`prompts/`](prompts/).
Nyeste øverst.

---

## Runde 17b – 2026-09-24 – Fade i loopen, ny måling, (ikke) sammenslåing
**Prompt:** [`prompts/runde-17b-fade-maaling-main.md`](prompts/runde-17b-fade-maaling-main.md)

**Bestilt:** (1) Fade fra/til svart ≈ 0,4 s i `lag-hero-film.py` for alle
fremtidige filmer, kjør på eksempelfilmen, plakat etter fade-in, vannmerke
synlig, ikke vesentlig større fil, `--sjekk` + filmtester + 47 sjekker,
push `dev`. (2) Lighthouse på rolig maskin, `main` mot `dev` om hverandre,
median av tre, begge språk; krav dev ≥ 95 / 100 / 100 / CLS 0 – ellers
stopp. (3) Kun hvis bestått: merge `--no-ff` til `main`, tag `runde-17`,
tester og Lighthouse mot produksjonen, `dev` = `main`. (4) Sporbarhet.
(5) Sluttrapport.

**Levert:** Del 1 fullt (fade, ny film 334 kB, plakat 24 kB med vannmerke,
47/47 + 23/23/19/20 tester OK, pushet). Del 2 målt (12 kjøringer), del 4
og 5 gjort.

**Avvik:**
- **Ikke slått sammen til `main`.** Del 2 ga `dev` median 89 (engelsk) og
  93 (norsk), under kravet – men `main` (som målte 97 i runde 16) ga 89 og
  89 i de samme kjøringene. Maskinen sto på **batteri** (CPU-klokke
  710–1 440 MHz av 3 244, Lighthouse `benchmarkIndex` 100–925 mot
  1 400–1 570 i runde 16, «slower CPU than expected» i 11 av 12
  kjøringer). Chrome var lukket og samlet CPU-bruk lav (≈ 9 %), men én
  VS Code-prosess lå på ≈ 45 % av én kjerne. Tallene er derfor ugyldige som
  gulv, og regelen «under kravet → stopp» er fulgt. Del 3 er ikke gjort.
  Ny måling med laderen i før sammenslåing.
- Kryssfading (sømløs loop) ble ikke vurdert på nytt; fade til svart er
  det som ble bestilt.

---

## Runde 17 – 2026-09-24 – Hero-video i loop (på `dev`)
**Prompt:** [`prompts/runde-17-hero-video.md`](prompts/runde-17-hero-video.md)

**Bestilt:** Envato-eksempelfilmen (med vannmerke) inn i hero-feltet på
begge språk via malen; mp4 kopiert/kodet, ev. webm, plakat; ffmpeg-skript i
`tools/`; `<video muted loop playsinline autoplay preload="metadata">`,
`aria-hidden`, egen pauseknapp (WCAG 2.2.2, navn per språk), ingen
autoavspilling ved redusert bevegelse/sparemodus, pause ute av syne og ved
skjult fane, ingen lasting bak lukket dør, no-JS-fallback. Verifisering i
tre nettlesere + mobil, vannmerke synlig, loop-hopp, Lighthouse median av
tre (≥ 95, rapporter kostnad, LCP-element, CLS 0), nettverk, `--sjekk`,
skjermbilder. Sporbarhet, TODO-lanseringskrav, BILDEKILDER, push `dev`.

**Levert:** Alt, i fire kode-commits + docs på `dev`. 336 kB mp4 + 25 kB
plakat, ett skript, alle tester OK i Chromium/Firefox, WebKit med
forbehold.

**Avvik:**
- **Ingen `autoplay`/`preload="metadata"` og ingen `<video>` i markupen.**
  `autoplay` ville startet filmen bak døra og ved redusert bevegelse; og
  WebKit lastet hele fila for en `<video preload="none">` selv uten JS.
  Derfor plakat-`<img>` + `<noscript>`-video i markupen, og JS lager
  videoelementet når det skal spille. Samme resultat for alle som skal ha
  autoavspilling.
- **Lighthouse-kravet ≥ 95 er ikke bekreftet i absolutte tall:** maskinen
  var belastet (brukerens Chrome, 40–48 % CPU), så også runde 16-koden
  målte 94 i samme økt (97 tidligere på dagen). Relativt koster filmen
  ≈ 1 poeng, LCP og CLS uendret. Må måles på nytt på rolig maskin før
  sammenslåing.
- **WebKit:** Playwrights WebKit på Windows rapporterer ikke
  medieforespørsler, og pauset ved loop-punktet – lagt inn en liten reserve
  (uønsket `pause` → `play()`), som fikk loopen til å gå. Ekte Safari/iPhone
  bør sjekkes av Kim.
- Loop-hoppet er tydelig synlig (hånda er borte i siste bilde, på knappen i
  første). Ikke utbedret – eksempelfilmen byttes.
- Ingen WebM (bare 17 % mindre, litt mykere).

---

## Runde 16 – 2026-09-24 – Rettet engelsk, ytelse, Vercel–GitHub, sammenslåing til `main`
**Prompt:** [`prompts/runde-16-engelsk-ytelse-vercel-main.md`](prompts/runde-16-engelsk-ytelse-vercel-main.md)

**Bestilt:** (1) Seks engelske rettelser, resten beholdes, lukk
lanseringskravet. (2) Finn årsaken til 97 → 95, rett uten å fjerne
funksjonalitet, mål 97+ som median av tre. (3) `vercel git connect`,
`--sjekk`, push `dev`, kontroller preview, skjermbilder. (4) Kun hvis 3 er
bestått: tag `runde-15`, merge `--no-ff` til `main`, tag `runde-16`, push,
kontroller produksjon, `dev` = `main`. (5) Sporbarhet.

**Levert:** Alt. Median 97 på begge språk (fra 96). Vercel var allerede
koblet. Slått sammen til `main` og publisert.

**Avvik:**
- **«a little cheeky»:** norsk kilde er «litt uhøflig», ikke «litt frekk».
  «cheeky» er valgt likevel (nærmeste naturlige engelsk med samme glimt);
  ordrett alternativ «a little impolite» er notert i CHANGELOG.
- **Årsaken til fallet var målestøy**, ikke runde 15: `main` måler også 96
  som median i dag. 97 er nådd med minifisert CSS fra generatoren
  (beslutning #33) pluss tre mindre, tapsfrie grep – ikke ved å rulle noe
  tilbake.
- **Vercel-koblingen fantes**; runde 15-rapporten om manglende kobling var
  feil og er rettet i alle dokumenter.
- Headerhøyden på engelsk 375 gikk *ned* (124,8 → 85,1 px) fordi den korte
  navigasjonen får plass på to linjer; norsk er uendret.
- Previewen kan ikke testes automatisk (innloggingsbeskyttet); kontrollene i
  del 3 er kjørt mot lokal server med de samme filene, og deploymenten er
  bekreftet opprettet.

---

## Runde 15 – 2026-09-24 – Engelsk og norsk, engelsk først (på `dev`)
**Prompt:** [`prompts/runde-15-engelsk-og-norsk.md`](prompts/runde-15-engelsk-og-norsk.md)

**Bestilt:** (0) `dev`-gren, push, finn forhåndsvisnings-URL, bekreft
produksjonsgren, regel i CLAUDE.md, kort plan. (1–3) Engelsk på `/`, norsk
på `/no/`, husket valg i `localStorage` uten gjetting, felles 404, generator
(anbefalt) med én mal + språkfiler + én menyfil, genererte filer commites,
ny beslutning som endrer #1. (4) Full oversettelse i samme tone,
egennavn uoversatt, «NOK 159», alkoholreglene, liste over usikre
formuleringer. (5) Språkvelger med inline-SVG-flagg, `<details>`, Esc/klikk
utenfor, 44 px, hreflang/lang/aria-current, uten høyere header; språklenke
på døra. (6) JS-tekster per språk, passord med æ/ae, delte
sessionStorage-nøkler. (7) hreflang, og:locale, inLanguage, sitemap,
selvrefererende canonical, engelske søsterlenker. (8) Skjermbilder,
språkflyt, tastatur, passord ×3 veier ×2 språk, norske ord på engelsk side,
375 uten rulling, headerhøyde, Lighthouse begge, generator i synk, main
uendret. (9) Sporbarhet, push `dev`, ikke main/merge/tag.

**Levert:** Alt, i kode- og docs-commits på `dev`. Generator valgt
(beslutning #31). Lighthouse 95/100/100/63 på begge språk, CLS 0.
Headerhøyde uendret (124,8 px på 375). Alle søstre har engelske sider (200).

**Avvik:**
- **Vercel er ikke koblet til GitHub** – deployene er gjort fra CLI, så
  push til `dev` ga ingen automatisk forhåndsvisning, og «produksjonsgren»
  finnes ikke som innstilling. Forhåndsvisning av `dev` er derfor laget med
  `vercel` (uten `--prod`) fra `dev`-treet; URL-en står i sluttrapporten og
  i CLAUDE.md. Kim må koble repoet i Vercel (Settings → Git) hvis grenene
  skal få automatiske previews.
- Canonical og `og:url` er lagt inn nå (selvrefererende, med
  previewdomenet fra `tekst/felles.json`) i stedet for å vente på P2 –
  hreflang krever absolutte URL-er uansett, og P2 blir da ett bytte i én
  fil. `PLACEHOLDER`-antallet gikk fra 22 til 21 (canonical-kommentaren er
  slått sammen med og:image-kommentaren).
- `og:image:alt` på engelsk siterer den norske teksten på delingsbildet
  (bildet er ikke oversatt) – ført som backlog.
- «Kim kontrollerer engelsk tekst» er lagt inn som lanseringskrav i TODO
  med lista over usikre formuleringer.

---

## Runde 14 – 2026-09-24 – Ford-bildet og bildekilder
**Prompt:** [`prompts/runde-14-ford-og-bildekilder.md`](prompts/runde-14-ford-og-bildekilder.md)

**Bestilt:** (1) Bildekilder: dame/par-dans/ford er fra Pexels – rett
BILDEKILDER og lukk lanseringskravet i TODO. (2) Ford: strammere utsnitt
uten hånd/erme, skiltet fortsatt ute, 4:5, grill og lykter i fokus; mindre
filer kun for ford (WebP q≈65 + lett støyfjerning som egen innstilling per
bilde), mål 640 ≤ 80 kB / 800 ≤ 110 kB, visuell før/etter-sammenligning i
281/288 px, rapporter artefakter. (3) Skjermbilder 1440/375, filstørrelser
før/etter, Lighthouse. (4) Sporbarhet, tag, push.

**Levert:** Alt. Ford 48/76/109 kB (webp 480/640/800), 160 kB jpg. Ingen
synlige artefakter ved q65 + radius 0,55. Lighthouse 97/100/100/60,
CLS 0,012 uendret.

**Avvik:**
- **Høyre lykt er ute av utsnittet.** Hånda ligger oppå høyre lykt i
  originalen, så «grill og lykter» og «hånd helt ute» lar seg ikke forene
  i ett 4:5-rektangel. Valgt: venstre lykt + grill (hånd/erme/skilt ute).
- **Støyfjerning er gaussisk radius 0,55** (ikke 0,5): 0,5 ga 116 kB på
  800-varianten, over målet; 0,55 ser identisk ut i zoom.
- Kilde-URL-en i BILDEKILDER er Pexels' forside (nb-no) – lenker til de
  enkelte fotografene/bildene er ikke oppgitt.

## Runde 13 – 2026-09-23 – Fotobånd med tre stemningsbilder
**Prompt:** [`prompts/runde-13-fotoband.md`](prompts/runde-13-fotoband.md)

**Bestilt:** Ett fotobånd mellom Historien og Huset med dame – par-dans –
ford: semantisk liste, sidens ramme, 4:5, tre på rad ≥ 768 px, horisontal
snap-rad under (fokuserbart rulleområde, ingen siderulling, reduced
motion respektert). Eksport 480/800 + JPEG, kvalitet 75–80, mål ~100 kB.
Ford uten registreringsskilt. Skjermbilder 1440/768/375 + ford-varianter,
Lighthouse 95+/100 og CLS ≤ 0,012, dør/skjult meny/nav som før. Sporbarhet,
tag, push. Ingen andre endringer.

**Levert:** Alt, i to kode-commits + docs. Båndet rett etter Historien
(beslutning #29). Lighthouse 97/100/100/60, CLS 0,012 (uendret).
Skiltet er bekreftet borte i alle fire ford-filer. 22 `PLACEHOLDER`.

**Avvik:**
- **Bruddpunkt 46 rem (736 px) i stedet for 768 px** – sidens eget
  bruddpunkt, så båndet skifter samtidig med to-spalter og Huset-kortene.
  768 px ligger fortsatt i desktop-grenen.
- **Ekstra 640-variant** i tillegg til 480/800, for alle tre bildene: på
  2x-skjermer (som er det vanlige) velges 640 (44/28/131 kB) i stedet for
  800.
- **Ford over ~100 kB-målet:** 131 kB (640) og 199 kB (800). Grillnettet
  komprimerer dårlig; kvaliteten er holdt på 78 som de andre i stedet for
  å presse den under 75. 480-varianten (1x) er 79 kB.
- **Ford-utsnittet** viser en hånd/jakke fra personen i høyre kant øverst;
  ansiktet og skiltet er ute. Bestillingen sa «sentrert på grill og
  lykter» – begge lyktene er med, men klippes i kantene (4:5 av et 4:3-
  motiv).
- **Sveip** er verifisert med touch-emulering i headless Chrome, ikke på
  fysisk enhet.
- Lighthouse laster båndbildene tidlig (Chromes lazy-terskel på treg
  mobil) – i vanlig Chrome på 375 px lastes de først når båndet rulles inn.

## Runde 12 – 2026-09-23 – Dørskiltet og logo på 404
**Prompt:** [`prompts/runde-12-dorskilt-og-404.md`](prompts/runde-12-dorskilt-og-404.md)

**Bestilt:** (1) Dørskiltet: liggende 2–2,5:1, helt innenfor ett rolig
område (mellomrommet under luka eller det øvre feltet – velg og begrunn),
versalhøyde ≥ ca. 14 px desktop / 11 px på 375 px, optisk sentrert på
ordet, streken nesten til kanten men ikke klippet, kontrast ≥ 3:1,
skalerer med døra, døra fungerer som før. (2) Ordmerket lite over «Feil
dør» på 404, lenke til forsiden med `aria-label`. (3) Skjermbilder før/
etter, funksjonstest av døra, CLS/Lighthouse. (4) Sporbarhet, tag, push.

**Levert:** Alt, i to kode-commits + docs. Skiltet sentrert i det øvre
feltet (beslutning #28): 114,5 × 57,2 px / versal 15,1 px på 1440 og 768,
85,1 × 42,6 px / 11,2 px på 375. 404 har ordmerket (versal 9,5 px mot
9 px i overteksten). Lighthouse 98/100/100/60, CLS 0,012 (uendret). Alle
dørveier testet i headless Chrome.

**Avvik:**
- **Sentreringen måler på A-en i versalbåndet + LIBI** (9,1 % forskyvning),
  ikke bare LIBI + det korte A-benet som bestillingen ordla det (15,6 %) –
  det siste så venstretungt ut. Begrunnet i #28.
- **Symbolet er kopiert inn i `404.html`** (404 laster ikke JS og deler
  ikke DOM med forsiden; ekstern `<use>` virker ikke fra `file://`). To
  steder å oppdatere hvis logoen byttes – ført i TODO under «bekreft
  logoen».
- **Verktøy for verifisering** (puppeteer-core) ligger i Claude Codes
  scratchpad utenfor repoet – ingen npm i prosjektet. Skjermbildene ligger
  i søskenmappa `alibi-skjermbilder/runde-12/` ved siden av repoet, ikke i
  git.

## Runde 11 – 2026-09-23 – Ny logo med gruppens A, stemningsbilder, footer
**Prompt:** [`prompts/runde-11-logo-bilder-footer.md`](prompts/runde-11-logo-bilder-footer.md)

**Bestilt:** (A) Nytt ordmerke med gruppens A inline overalt logoen brukes
(header, dør, hero, footer), dimensjonert etter versalhøyde uten layout-
hopp; nytt favicon av A-merket; gammel logo-CSS/markup ut. (B) Søsterstedene
som logorad i footeren (fem logoer, egen gull, Tåkt PNG → WebP 1×/2×),
Canyon-linje i «Finn oss», `containedInPlace` i JSON-LD, CLAUDE.md.
(C) Sju stockbilder sjekket; telefon/lampe/bardisk inn i eksisterende
Alibi-felt som WebP+JPEG i `<picture>`; Raus/Tåkt urørt; ingen nye felt;
bilderegel i CLAUDE.md. (D) «levende lys» ut av beskrivelsene; TODO-punkt
om nøktern meny. (E) Verifisering med skjermbilder, Lighthouse 95+, JSON-LD-
validering, opplåsingsveier, PLACEHOLDER-antall. (F) Sporbarhet, tag, push.

**Levert:** Alt, i sju commits + docs. Lighthouse 98/100/100/60 (SEO 60 =
noindex). JSON-LD validert eksternt. Skjermbilder av header/dør/footer og
alle tre bildefelt på 1440 og 375 px sjekket i økten.

**Avvik:**
- **PLACEHOLDER-antallet er uendret (21), ikke +3:** feltene hadde allerede
  ett merke hver (P4/P7/P16); de er omformulert til «stemningsbilde (stock),
  byttes med ekte foto» i stedet for å legge et merke til ved siden av.
- **Delingsbildet** (`og-image.png`) er rendret på nytt med den nye logoen
  selv om det ikke sto i bestillingen – det gamle viste Limelight-logoen.
- **1200-bredden er droppet** for bildene: feltene er maks 307 px brede, så
  480/800 dekker 1× og 2×; telefon-1200 ble dessuten 189 kB (> 150-målet).
- **og:description og JSON-LD-beskrivelsen** inneholdt ikke «levende lys» –
  bare meta description er endret.
- **Æventyr-lenka** følger bestillingen (`/nb/`), som avviker fra beslutning
  #21 (`/nb/about`) – ført som delvis erstattet, med TODO-notat.
- **Dørplata** bærer nå ordmerket (mørkt gravert) – beslutning #19 er
  erstattet av #23 siden `currentColor` fjernet argumentet.
- Limelight beholdes: displayfonten brukes til overskrifter og motto, ikke
  bare logoen.
- Ingen `package.json`/npm: eksportskriptet er Python + Pillow (allerede
  installert lokalt), dokumentert i README.

---

## Runde 10 – 2026-09-23 – Tekstjusteringer: bar, materialer, pris, skjult meny
**Prompt:** [`prompts/runde-10-tekstjusteringer.md`](prompts/runde-10-tekstjusteringer.md)

**Bestilt:** Avgrenset tekstrunde. (1) Historien: pub → bar, «levende lys,
messing …» → «dimmet lys og tre …»; alle «pub»-forekomster i synlig tekst,
metadata og CLAUDE.md byttes (ikke `BarOrPub`). (2) Huset-mottoet: «Dans»
→ «Nattklubb». (3) Alle menykort: `kr —` → `kr 159`, glasstype ut av
spesifikasjonslinja (kun mengde), ikonet beholdt som dekor uten opplest
glassnavn, P5/P6-merkene står. (4) «Bakrommet» → «skjult meny» i all synlig
tekst, interne navn beholdt. (5) Verifisering: grep, alle tre opplåsings-
veier, korthøyder på desktop og 375 px, PLACEHOLDER-antall uendret.
(6) Sporbarhet, tag og push.

**Levert:** Alt det bestilte, i seks commits etter konvensjonen. Fire
opplåsingsveier (taste-easter-egget testet både foran døra og etter «Gå
rett inn») + feil-passord-tilfellet verifisert i headless Chrome.
Korthøyder identiske før/etter på 1440 og 375 px. 21 PLACEHOLDER-merker
før og etter.

**Avvik:**
- `<title>`, `description`, Open Graph og JSON-LD-beskrivelsen inneholdt
  ikke ordet «pub» (de sier «speakeasy»/«speakeasy-bar») – ingenting å
  endre der. `description` sier fortsatt «levende lys»; bestillingen gjaldt
  bare avsnittet i historien, så det står.
- README og ONBOARDING sa også «speakeasy-pub» – rettet i samme commit
  (regelen: dokumentasjon i utakt med koden rettes i samme økt).
- Overskriften ble «Den skjulte menyen» (bestemt form) fordi den står som
  egen tittel; bestillingens forslag «Lås opp den skjulte menyen» passet
  ingen eksisterende streng – det finnes ingen egen låseknapp-tekst.
- PLACEHOLDER-kommentarene for P5/P18 er omformulert (fortsatt merket
  PLACEHOLDER) så de beskriver ny status.

---

## Justering – 2026-08-21 – «header ble for stor» (etter runde 9)
**Prompt:** [`prompts/justering-2026-08-21-header.md`](prompts/justering-2026-08-21-header.md)

**Bestilt:** «header ble for stor, fiks det.»

**Levert:** Rot-årsaken var ikke topplinja, men runde 9-symbolblokka:
`hidden`-attributtet gjelder ikke SVG-elementer, så den rendret som en tom
~300×150-boks over topplinja. Byttet til `style="display:none"`
(`<use>`-referansene virker fortsatt, verifisert). Topplinja i tillegg
slanket (logo 1,9 → 1,4 rem, mindre padding).

**Avvik:** Ingen.

---

## Runde 9 – 2026-08-21 – Ekte meny, Bakrommet og delingsbilde
**Prompt:** [`prompts/runde-9-ekte-meny.md`](prompts/runde-9-ekte-meny.md)

**Bestilt:** (1) Sju ekte drinker inn i `#menyen` med glasstegning,
glassnavn/mengde, ingredienslinje og beskrivelse; ny ingress. (2) Fire
glasstegninger som `<symbol>`/`<use>`, dekorative, kontrastsjekket.
(3) Mandaquiri og Adventure inn i Bakrommet – uten glass/mengde (P18,
ikke oppgitt). (4) Generell allergilinje for rå eggehvite (synlig uten
opplåsing) + urtelinje. (5) `assets/og-image.png` 1200×630 + og:image-
meta med absolutt preview-URL (P1 lukkes, «bytt domene» samles i P2).
(6) Æventyr-lenken → `/nb/about`; merknad ved TODO-ens gamle «SEO 100».
Passordet urørt; Bakrommets tre veier testes; Lighthouse før/etter.

**Levert:** Alt det bestilte. Lighthouse 99/100/100/60 både før og etter
(SVG-ene koster ingenting målbart; SEO 60 = noindex/P14). Bakrommets tre
veier verifisert grønne i headless funksjonstest. og-image.png ble 19 kB.
Alle nye/endrede lenker HTTP-verifisert.

**Avvik:**
- Footeren har to Æventyr-lenker (logoen og Huset-spalten) – begge byttet
  til `/nb/about` for konsistens; JSON-LD beholder `/nb/` som org-URL
  (beslutning #21).
- Strekattributtene ligger på instans-SVG-ene, ikke i symbolene, og fargen
  er full messing (≈ 6,9:1; AA-kravet 3:1 var uansett oppfylt) – se
  beslutning #20. `stroke-width` uendret 4.6 som bestilt.
- Ingressforslaget og allergiformuleringen brukt ordrett.

---

## Runde 8 – 2026-08-21 – Logo og familiebånd
**Prompt:** [`prompts/runde-8-logo-og-familie.md`](prompts/runde-8-logo-og-familie.md)

**Bestilt:** (0) Forarbeid: verifisere at logofila finnes og at
søstersidenes URL-er svarer 200. (1) Ny logotype inn i hero, topplinje,
ev. dørplata, og favicon med A-merket. (2) Stedsbytter (Raus/Tåkt) i
topplinja. (3) Ny seksjon «Huset» med tre kort. (4) Footer med tre
lenkespalter i familiestil. (5) «Praktisk» i husets informasjonsstruktur +
adressekonflikt som P15. (6) og:-meta/twitter:card/JSON-LD-utvidelser.
Kvalitetsgulv: Lighthouse ≥ 95, WCAG AA, ingen nye avhengigheter.

**Levert:** Alt det bestilte, i to omganger: første kjøring stoppet i
oppgave 0 fordi logofila manglet (som bestillingen krevde); Kim la inn
fila og runden ble fullført. Verifisert med skjermbilder (desktop + 500 px,
inkl. redusert bevegelse), funksjonell headless-test av dør (tre bank →
åpner, fokus, inert) og Bakrommet, HTTP-sjekk av alle eksterne lenker og
Lighthouse før/etter (99/100/100/60 begge – SEO 60 er previewens noindex).

**Avvik:**
- Bestillingen kalte seg runde 7; repoet hadde alt en runde 7 → nummerert
  som runde 8 (beslutning #15).
- Tabellens «norske» URL-er redirigerer til `/en` – brukte `/no`-stiene i
  stedet (beslutning #16); dagens footer-URL-er var altså riktige og ble
  beholdt.
- Favicon-viewBoxen gjort kvadratisk, geometrien uendret (beslutning #17).
- Dørplata beholder tekstskiltet – logoen er messing-på-messing og
  ulesbar i den størrelsen (beslutning #19, forankret i bestillingen).
- `meta name="twitter:card"` lagt til; `og:type/locale/site_name` fantes
  allerede fra runde 1 og ble beholdt som de var.
- Logofila lå som `Alibi-logo.svg`; `git add` med små bokstaver feilet
  stille og fila manglet i første commit – oppdaget i sluttkontrollen,
  omdøpt og committet (egen fix-commit).

---

## Runde 7 – 2026-07-30 – Finpuss i ventetiden
**Prompt:** [`prompts/runde-7-finpuss.md`](prompts/runde-7-finpuss.md)

**Bestilt:** Lukke to punkter fra «Kjente svakheter» uten kundeinnhold:
(1) `404.html` i husets stil (uten dør, uten JS, permanent noindex),
(2) PNG-fallback for faviconen (32×32 + apple-touch 180×180), koblet i
`<head>`. Verifisere lokalt, lukke TODO-punkter, pushe.

**Levert:** Alt det bestilte. PNG-ene rendret fra SVG-en med headless
Chrome i miljøet (ingen manuell instruks nødvendig). 404-siden verifisert
med HTTP-sjekk og skjermbilder.

**Avvik:** Headless Chrome viste seg å ha en minimums-layoutbredde rundt
500 px, som først ga feilrendrede PNG-er og et misvisende 360 px-
skjermbilde – løst med eksplisitt piksel-forankring for ikonene, og
360 px-oppførselen verifisert via CSS-analyse + 500 px-kontrollbilde i
stedet for direkte skjermbilde.

---

## Runde 6 – 2026-07-30 – Raus og noindex
**Prompt:** [`prompts/runde-6-raus-og-noindex.md`](prompts/runde-6-raus-og-noindex.md)

**Bestilt:** (1) Restaurant Raus (gateplan, samme eiere) inn som veiviser i
«Finn oss» og i footerens familielinje, med diskrete lenker; geografien må
stemme (Raus oppe, Tåkt og Alibi i kjelleren under); vurdere JSON-LD.
(2) `noindex`-meta på previewen (alibi-demo.vercel.app) med TODO-rad
«MÅ fjernes ved lansering». (3) Kontroller + push til origin main.

**Levert:** Alt det bestilte. «Finn oss» leder nå fra Raus på gata ned til
kjelleren; footeren sier «Tåkt og Raus bor i samme hus»; JSON-LD-
beskrivelsen angir «i kjelleren under restaurant Raus». Klassen
`.taakt-nevnt` døpt om til `.soster-lenke` (promptens eget forslag).
noindex inne som P14. Begge URL-er svarer HTTP 200. Pushet til origin
main (remote fantes allerede, i synk med runde 5).

**Avvik:** Ingen.

---

## Runde 5 – 2026-07-30 – Selvhost fontene
**Prompt:** [`prompts/runde-5-selvhost-fontene.md`](prompts/runde-5-selvhost-fontene.md)

**Bestilt:** Selvhoste Limelight (400) og Cormorant Garamond (400/500/600 +
kursiv 400) som latin-subset woff2 i `assets/fonts/` med LICENSE-notis,
`@font-face` med `font-display: swap`, preload på de to over-folden-filene,
fjerne Google Fonts-link/preconnects, måle Lighthouse på nytt og lukke
gjeldspunktene.

**Levert:** Alt det bestilte. 5 filer, 156 kB på disk (~82 kB lastes i
praksis). **Performance 86 → 99** (FCP 3,1 → 1,4 s, LCP 3,1 → 2,0 s,
render-blokkering borte). Begge gjeldspunktene lukket. CLAUDE.md og README
rettet der de fortsatt omtalte Google Fonts som avhengighet.

**Avvik:** Vektene 500/600 er deklarert i `@font-face` men brukes ikke av
dagens CSS – nettleseren henter dem derfor ikke (verifisert i
nettverksloggen: kun 400, 400 italic og Limelight lastes). Beholdt per
bestillingens «behold nøyaktig disse», som fremtidssikring uten kostnad.

---

## Runde 4 – 2026-07-30 – Logo og ekte lenker
**Prompt:** [`prompts/runde-4-logo-og-lenker.md`](prompts/runde-4-logo-og-lenker.md)

**Bestilt:** (1) Æventyr-logoen inn i footeren som lenke til aeventyr.no
(ASCII-filnavn, merkevaregull #CA9F68 uendret, 90–120 px, «Et [logo]-sted»
hvis pent). (2) Ekte Tåkt-lenker (raussocial.no/no/takt) i footer og
«Finn oss», lukke TODO-rader. (3) Kjøre Lighthouse og loggføre faktiske
tall. (4) Kontroller: `node --check`, lenke-status, 360 px-skalering.

**Levert:** Alt det bestilte. Inline-varianten «Et [logo]-sted» fungerte
(bokstavhøyden i logoen matcher brødteksten ved 110 px bredde). Begge
URL-er verifisert med HTTP 200. Lighthouse kjørt: Performance 86,
Accessibility 100, Best Practices 100, SEO 100 – ytelsestallet loggført
som gjeld i TODO med årsak (render-blokkerende Google Fonts-CSS, ~900 ms).

**Avvik:** Ingen. Ytelsesgapet (86 < 95) er dokumentert, ikke fikset –
fiksen (selvhosting av fonter) lå allerede som gjeldspunkt og var utenfor
rundens bestilling.

---

## Runde 3 – 2026-07-30 – Dokumentasjon og full sporbarhet
**Prompt:** [`prompts/runde-3-dokumentasjon.md`](prompts/runde-3-dokumentasjon.md)

**Bestilt:** Sette opp komplett dokumentasjons- og sporbarhetssystem
(CLAUDE.md, docs/-struktur med changelog, beslutningslogg, promptlogg, TODO,
onboarding), initialisere git med baseline og commit-konvensjon, og
rekonstruere historikk/beslutninger fra runde 1–2. Ingen endringer i
funksjonalitet eller design.

**Levert:** Alt det bestilte. Git initialisert (`main`), baseline-commit
tagget `runde-2`, Conventional Commits på norsk dokumentert i CLAUDE.md,
12 plassholdere kartlagt i TODO-tabellen, 12 beslutninger rekonstruert,
promptene fra alle tre rundene arkivert i `docs/prompts/`.

**Avvik:** Ingen funksjonelle. Datoene for runde 1–2 er antatt (samme dato
som runde 3) siden git ikke fantes da – merket «(antatt)» i dokumentene.
Runde 1 har ingen git-tag (tilstanden før runde 2 er ikke rekonstruerbar).

---

## Runde 2 – 2026-07-30 (antatt) – Rettelser, bevegelse og Bakrommet
**Prompt:** [`prompts/runde-2-bevegelse-og-bakrommet.md`](prompts/runde-2-bevegelse-og-bakrommet.md)

**Bestilt:** (1) Rette faktafeil om Tåkt (ligger vegg i vegg i samme
kjeller, ikke ovenpå; Alibi er puben) og fire småbugs (ankerklipping, død
footer-lenke, ubalansert foto-plassholder, canonical-plassholder).
(2) Bevegelsespakke «levende lys»: scroll-avsløring, linjetrekk,
kammerlys-flimmer, menykort-hover med lysstreif, topplinje-skjuling med
scroll-spy, støvpartikler. (3) Ny gimmick «Bakrommet»: passordlåst skjult
meny med tre veier inn. Til slutt: fjerne én usikker effekt.

**Levert:** Alt det bestilte. Bakrommet med cocktailene «Mørketid» og
«Midnattssol». Fjernet effekt: lampeflimmeret i dørscenen (kammerlyset
overtok som sidens ene flimrende lys).

**Avvik/tillegg utover bestillingen:**
- Kontrastfeil oppdaget og rettet i egen selvgjennomgang: tekst på
  inverterte kort under WCAG AA → solid `#2a1e12`.
- `js/main.js` restrukturert (dørkodens gjenbesøks-`return` ville ellers
  drept Bakroms- og bevegelseskoden).
- Menykortene fikk indre wrapper i HTML (nødvendig for lysstreifet – ikke
  eksplisitt bestilt).
- Briefens «basen fra Tåkt» skrevet som «bassen» (korrekt bokmål).
- Reduced-motion-blokka rettet for gammel passordfelt-selektor.

---

## Runde 1 – 2026-07-30 (antatt) – Nettsiden bygget fra bunnen
**Prompt:** [`prompts/runde-1-bygg-nettsiden.md`](prompts/runde-1-bygg-nettsiden.md)

**Bestilt:** Komplett produksjonsklar speakeasy-nettside for Alibi i ren
HTML/CSS/JS: dør-inngangsscene med bank-mekanikk, passord-easter-egg og full
SEO/tilgjengelighet; one-page med seks seksjoner på bokmål; angitt palett og
typografiretning; medieplassholdere; README. Til slutt: selvgjennomgang og
fjerning av én unødvendig dekorasjon.

**Levert:** Alt det bestilte. 7 cocktails (briefen ba om 6–8). Fjernet
dekorasjon: gull-glød bak logotypen.

**Avvik/tillegg utover bestillingen:**
- Selvgjennomgangen fant og rettet tre bugs (transitionend-bobling,
  dørhøyde på korte skjermer, korntekstur under dør-overlayet i z-aksen).
- Bankelyden implementert som WebAudio-syntese i stedet for lydfil (briefen
  sa bare «valgfritt og av som standard»).
- Inline-snippet i `<head>` mot dør-blink ved gjenbesøk (ikke eksplisitt
  bestilt, følger av sessionStorage-kravet).

---

## Rutine for nye kjøringer

1. Lagre prompten ordrett som `docs/prompts/runde-N-kort-navn.md`.
2. Legg til en oppføring øverst i denne fila: bestilt / levert / avvik.
3. Se sporbarhetsreglene i [`../CLAUDE.md`](../CLAUDE.md).
