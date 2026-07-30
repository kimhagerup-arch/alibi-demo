# Beslutningslogg – Alibi

Lettvekts-ADR: én nummerert oppføring per vesentlig valg. Nyeste nederst.
Beslutninger fra runde 1–2 er rekonstruert i ettertid fra briefene og koden;
usikre rekonstruksjoner er merket «(antatt)».

---

## #1 – Ren statisk side uten rammeverk og byggesteg
- **Dato:** 2026-07-30 (runde 1)
- **Beslutning:** Ren HTML + CSS + vanilla JS. Ingen rammeverk, ingen
  bundler, ingen npm-avhengigheter.
- **Begrunnelse:** Skal kunne hostes hvor som helst (Netlify/Vercel/GitHub
  Pages/one.com), være enkel å vedlikeholde for eierne, og treffe
  Lighthouse 95+ uten optimaliseringsarbeid. Eksplisitt krav i briefen.
- **Alternativer vurdert:** Astro/Eleventy (forkastet: unødig byggesteg for
  én side), React/Vue (forkastet: tung avhengighet uten behov).
- **Status:** Gjeldende.

## #2 – Døra som overlay med alt innhold crawlbart bak
- **Dato:** 2026-07-30 (runde 1)
- **Beslutning:** Inngangsscenen er et rent overlay; alt innhold ligger i
  DOM-en bak. `sessionStorage` («alibi-inne») viser døra én gang per økt,
  med inline-snippet i `<head>` mot blinking ved gjenbesøk. Innholdet bak
  settes `inert` mens døra er aktiv. Synlig «Gå rett inn»-lenke.
- **Begrunnelse:** SEO og tilgjengelighet må ikke ofres for gimmicken –
  eksplisitt krav. `inert` hindrer at tastaturbrukere når innhold bak
  overlayet.
- **Alternativer vurdert:** Egen landingsside med redirect (forkastet: deler
  SEO-verdi på to URL-er), innhold lastet etter opplåsing (forkastet: ikke
  crawlbart).
- **Status:** Gjeldende.

## #3 – Dør og dekor bygget i CSS/SVG, ikke bildefiler
- **Dato:** 2026-07-30 (runde 1)
- **Beslutning:** Døra, øyet, teksturer og rammer er kode (CSS-gradienter,
  inline SVG, data-URI-korn) – ingen rastergrafikk.
- **Begrunnelse:** Ekte foto/video kommer senere; kode-grafikk veier
  ingenting, skalerer skarpt og kan finjusteres. Krav i briefen («ikke
  bildefil, siden bilder kommer senere»).
- **Status:** Gjeldende. Byttes delvis ut når ekte medier leveres
  (se `TODO.md`).

## #4 – Typografi: Limelight + Cormorant Garamond via Google Fonts
- **Dato:** 2026-07-30 (runde 1)
- **Beslutning:** Limelight til display (med måtehold), Cormorant Garamond
  til brødtekst, lastet fra Google Fonts med `font-display: swap`.
- **Begrunnelse:** Briefen foreslo Limelight/Poiret One/Marcellus –
  Limelight har mest utpreget art deco-karakter. Cormorant Garamond gir
  lesbar, varm serif.
- **Alternativer vurdert:** Poiret One (forkastet: for spinkel i messing på
  mørk bunn), Jost som brødtekst (forkastet: serif kler konseptet bedre)
  (antatt).
- **Status:** Gjeldende for fontvalget; leveringen via Google Fonts er
  erstattet av #14 (selvhosting).

## #5 – Bankelyd generert med WebAudio, av som standard
- **Dato:** 2026-07-30 (runde 1)
- **Beslutning:** Bankelyden syntetiseres med WebAudio (sinus-thud), ingen
  lydfil. Av som standard, med synlig av/på-knapp under døra.
- **Begrunnelse:** Briefen krevde lyd valgfritt og av som standard; WebAudio
  fjerner behovet for en asset og laster ingenting.
- **Alternativer vurdert:** MP3-fil (forkastet: unødig nedlasting for en
  effekt de fleste aldri hører).
- **Status:** Gjeldende.

## #6 – Maks én flimrende lyskilde
- **Dato:** 2026-07-30 (runde 1, skjerpet i runde 2)
- **Beslutning:** Kun ett sted på siden flimrer: opprinnelig lampen i
  dørscenen (runde 1); fra runde 2 er det **kammerlyset i hero-en**, og
  dørscenens glød er statisk.
- **Begrunnelse:** Briefene: «Flimrende lys-effekt brukes maks ett sted» og
  «Én – og bare én – ambient lyskilde». To flimrende lys ville brutt begge.
- **Status:** Gjeldende (dørflimmeret fjernet i runde 2 som «effekten jeg
  var minst sikker på»).

## #7 – Bevegelseslag gated bak `html.js-klar`, kun transform/opacity
- **Dato:** 2026-07-30 (runde 2)
- **Beslutning:** All scroll-avsløring og pynt aktiveres av en klasse JS
  setter kun når IntersectionObserver finnes og brukeren ikke har
  `prefers-reduced-motion`. Animasjoner bruker bare `transform`/`opacity`;
  observere kobles fra etter bruk; ambient-animasjoner pauses når fanen er
  skjult.
- **Begrunnelse:** Uten JS eller med redusert bevegelse skal alt innhold
  vises statisk – aldri skjult. Ytelseskravet (Lighthouse 95+) utelukker
  layout-animasjoner.
- **Alternativer vurdert:** `animation` på alt uten gating (forkastet:
  innhold ville vært usynlig uten JS), scroll-event med `getBoundingClientRect`
  (forkastet: dyrere enn IntersectionObserver).
- **Status:** Gjeldende.

## #8 – Bakrommet: skjult med `hidden`, passord i klartekst i JS
- **Dato:** 2026-07-30 (runde 2)
- **Beslutning:** Bakrommet ligger med `hidden` til det låses opp, og
  passordet ligger i klartekst som konstanten `ALIBI_PASSORD` øverst i
  `js/main.js`, delt mellom dør og Bakrom. `sessionStorage`
  («alibi-bakrom») husker opplåsingen ut økten.
- **Begrunnelse:** Dette er en lek og et markedsføringsgrep («ukas
  passord»), ikke sikkerhet eller kritisk innhold – briefen sa eksplisitt at
  SEO kan ofres her. Én konstant gjør det trivielt for eierne å bytte
  passord.
- **Alternativer vurdert:** Hashing av passordet (forkastet: falsk trygghet
  i klientkode, unødig kompleksitet), eget innhold server-side (forkastet:
  krever backend – bryter #1).
- **Status:** Gjeldende.

## #9 – Indre wrapper i menykortene
- **Dato:** 2026-07-30 (runde 2)
- **Beslutning:** Hvert menykort har `.meny-kort-indre` som bærer padding og
  `overflow: hidden` for lysstreifet, mens selve kortet bærer ramme og
  deco-diamant.
- **Begrunnelse:** `overflow: hidden` direkte på kortet ville klippet
  diamanten som straddler kortkanten; streifet må klippes for ikke å gli
  utenfor kortet.
- **Alternativer vurdert:** `overflow-clip-margin` (forkastet: ville også
  sluppet streifet utenfor), flytte diamanten inn i kortet (forkastet:
  svekker rammeuttrykket).
- **Status:** Gjeldende.

## #10 – Solid mørk tekst på inverterte kort (WCAG)
- **Dato:** 2026-07-30 (runde 2)
- **Beslutning:** All tekst på Bakrommets messingkort er solid `#2a1e12` –
  ingen gjennomsiktighet.
- **Begrunnelse:** Halvtransparent tekst målte ~3,8:1 mot mørkeste del av
  gradienten – under WCAG AA (4,5:1). Solid farge måler ≈ 4,7:1.
- **Alternativer vurdert:** Lysere gradient (forkastet: mistet
  messing-dybden), større tekst for å nå AA Large (forkastet: brøt
  typeskalaen).
- **Status:** Gjeldende.

## #11 – Git-sporbarhet og Conventional Commits på norsk
- **Dato:** 2026-07-30 (runde 3)
- **Beslutning:** Git initialisert med baseline-commit tagget `runde-2`
  (runde 1 har ingen tag – git fantes ikke da). Commit-konvensjon:
  Conventional Commits med engelske typer (feat/fix/docs/style/refactor/
  chore) og norsk beskrivelse. Én commit per logisk endring; milepæler
  tagges `runde-N`.
- **Begrunnelse:** Alt annet i prosjektet er på norsk; typene holdes
  engelske fordi verktøy og konvensjonen selv forventer dem.
- **Alternativer vurdert:** Alt på engelsk (forkastet: bryter med
  prosjektspråket), helnorske typer (forkastet: ikke-standard, verktøystøtte
  ryker).
- **Status:** Gjeldende.

## #12 – Dokumentasjonsstruktur i `docs/` med sporbarhetsregler i CLAUDE.md
- **Dato:** 2026-07-30 (runde 3)
- **Beslutning:** Changelog, beslutningslogg, promptlogg (med arkiverte
  prompter i `docs/prompts/`), TODO og onboarding samlet i `docs/`.
  Sporbarhetsreglene ligger i `CLAUDE.md` slik at hver fremtidig CC-økt
  følger dem automatisk. Ved konflikt mellom kode og dokumentasjon er det
  dokumentasjonen som rettes.
- **Begrunnelse:** Full sporbarhet av både menneskelige beslutninger og
  AI-kjøringer; `CLAUDE.md` er filen Claude Code leser uoppfordret.
- **Status:** Gjeldende.

## #13 – Æventyr-logoens gull beholdes uendret
- **Dato:** 2026-07-30 (runde 4)
- **Beslutning:** Logoen (`assets/aeventyr-gold.svg`) beholder merkevarens
  gull `#CA9F68` selv om det avviker fra sidens messing `#C9A227`.
  Filnavnet er ASCII (`aeventyr-gold.svg`) fordi «Æ» i filnavn/URL kan
  feile på enkelte webservere.
- **Begrunnelse:** Merkevarefargen eies av Æventyr, ikke av denne siden –
  eksplisitt føring i runde 4-bestillingen. Avviket er lite og leses ikke
  som feil på den mørke bunnen.
- **Alternativer vurdert:** Omfarge SVG-en til sidens messing (forkastet:
  tukler med merkevaren).
- **Status:** Gjeldende.

## #14 – Fontene selvhostes som latin-subset woff2
- **Dato:** 2026-07-30 (runde 5)
- **Beslutning:** Limelight og Cormorant Garamond selvhostes fra
  `assets/fonts/` (latin-subset woff2, kun woff2-format) med `@font-face`
  øverst i `style.css` og preload på de to over-folden-filene. Google
  Fonts-link og preconnects er fjernet. Vektene 500/600 er deklarert som
  fremtidssikring, men hentes ikke av nettleseren før CSS-en bruker dem.
- **Begrunnelse:** Google Fonts-CSS-en render-blokkerte ~900 ms og holdt
  Performance på 86 (målt i runde 4); selvhosting ga 99 og fjernet siste
  tredjepartsavhengighet (personvern/GDPR). Latin-subsettet dekker æ/ø/å.
- **Alternativer vurdert:** Beholde Google Fonts med `media=print`-triks
  (forkastet: hack, løser ikke GDPR), egen `fonts.css` (forkastet: én
  ekstra request uten gevinst), woff-fallback (forkastet: woff2-dekningen
  er total i 2026).
- **Status:** Gjeldende. Erstatter leveringsdelen av #4.
