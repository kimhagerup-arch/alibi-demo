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
- **Status:** Gjeldende – utvidet av #24 (runde 11): fila er nå
  `img/logo/aeventyr.svg` i logoraden i footeren, sammen med de andre
  søsterstedene, fortsatt i egen gull.

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

## #15 – Runde-nummerering: bestillingen «runde 7» ble runde 8
- **Dato:** 2026-08-21 (runde 8)
- **Beslutning:** Bestillingen for logo/familiebånd omtalte seg selv som
  runde 7, men repoet hadde allerede en runde 7 (404-side og
  favicon-fallback, tag `runde-7`). Økten er derfor gjennomført og
  dokumentert som **runde 8** (prompt arkivert som
  `runde-8-logo-og-familie.md`, tag `runde-8`).
- **Begrunnelse:** To runder med samme nummer ødelegger sporbarheten, og
  git-taggen `runde-7` kan ikke gjenbrukes.
- **Alternativer vurdert:** Følge bestillingen bokstavelig (forkastet:
  kollisjon i changelog, promptlogg og tags).
- **Status:** Gjeldende.

## #16 – Norske /no-URL-er i stedet for bestillingens tabell-URL-er
- **Dato:** 2026-08-21 (runde 8)
- **Beslutning:** Alle lenker til søstersidene bruker de norske stiene
  `raussocial.no/no`, `/no/takt`, `/no/terms` og `/no/privacy`.
- **Begrunnelse:** Bestillingens tabell oppga `raussocial.no/` osv. som
  «norske» URL-er, men målt 2026-08-21 redirigerer de (307) til
  `/en`-versjonene. `/no`-stiene svarer 200 direkte. Bestillingens eget
  prinsipp («ikke lenk til /en-versjoner fra en norsk side») veier tyngre
  enn tabellen. Kim fikk avviket rapportert før gjennomføring.
- **Status:** Gjeldende. NB: `aeventyr.no/nb/` (beholdt som bestilt) ender
  i dag via redirect på kampanjesiden `/nb/summer`.

## #17 – Logotypen som selvstendig SVG-fil; favicon med kvadratisk viewBox
- **Dato:** 2026-08-21 (runde 8)
- **Beslutning:** `assets/alibi-logo.svg` (levert fil, bokstaver som
  kurver) brukes uendret i hero og topplinje via `<img>` med `alt="Alibi"`
  og faste bredde/høyde-attributter; optisk størrelse styres med `clamp()`
  i CSS. Faviconet bruker bestillingens A-geometri, men viewBoxen er
  utvidet til kvadrat (`-60 -10 290 290`) med brunsort bunn og avrundede
  hjørner.
- **Begrunnelse:** `<img>` + alt bevarer h1-ens tekstverdi for søk og
  skjermlesere og holder CLS på 0. Bestillingens favicon-viewBox var
  stående (198×290); i en kvadratisk fane-rute ville merket blitt
  letterboxet og mindre. Geometrien er identisk – bare flaten er utvidet.
- **Alternativer vurdert:** Inline-SVG i h1 (forkastet: dupliserer
  geometri, mer markup uten gevinst), stående favicon som bestilt
  (forkastet: mindre merke i fanen).
- **Status:** Gjeldende.

## #18 – Stedsbytteren: egen rad for ankerlenkene på smale skjermer
- **Dato:** 2026-08-21 (runde 8)
- **Beslutning:** På skjermer smalere enn 46 rem brytes topplinja: merke og
  stedsbytter (Raus/Tåkt) på første rad, ankerlenkene på egen rad under,
  med litt mindre skrift. `scroll-margin-top` økes tilsvarende. Full tekst
  beholdes – ingen ikon-forkorting.
- **Begrunnelse:** Fem ankerlenker + to stedslenker får ikke plass på én
  rad ved 360 px. Egen rad holder alt lesbart og tastaturnavigerbart;
  topplinja viker uansett ved scroll ned, så den ekstra høyden koster lite.
- **Alternativer vurdert:** Ikon + navn (forkastet: to ekstra SVG-er og
  mindre tydelighet for null plassgevinst), skjule stedsbytteren på mobil
  (forkastet: den er rundens poeng).
- **Status:** Gjeldende.

## #19 – Dørplata beholder messingskiltet med tekst
- **Dato:** 2026-08-21 (runde 8)
- **Beslutning:** Skiltet på døra i inngangsoverlayet (`.dor-skilt`)
  beholder dagens graverte «Alibi» i Limelight – logofila settes ikke inn
  der.
- **Begrunnelse:** Logoen er messing (#C9A227) på en messingplate – den
  ville vært nær usynlig, og i skiltets størrelse (under 1 rem bokstavhøyde)
  er skråstrek-detaljen ulesbar. Bestillingen åpnet eksplisitt for dette
  valget.
- **Alternativer vurdert:** Mørk omfarging av logoen i egen fil (forkastet:
  én sannhet for logogeometrien er mer verdt enn en tredje favicon-variant
  av samme merke på ei dørplate få ser).
- **Status:** Erstattet av #23 (runde 11): det nye ordmerket bruker
  `currentColor`, så plata kan bære det mørkt gravert (#2a1e12 på messing,
  ≈ 8:1) uten egen fil – argumentet fra runde 8 falt bort.

## #20 – Glasstegningene: strekstil på instansen, full messing
- **Dato:** 2026-08-21 (runde 9)
- **Beslutning:** Geometrien ligger som rene `<path>`-er i `<symbol>`-er;
  strekattributtene (`fill="none" stroke="currentColor" stroke-width="4.6"`
  osv.) står på hver instans-SVG (`.glass-ikon`) og arves inn i
  symbolinnholdet. Fargen er full messing (`--messing`) via `currentColor`
  på `.meny-glass`-raden – ikke den dusere `--messing-dus`.
- **Begrunnelse:** Attributter på instansen gjør at samme geometri kan få
  annen strek/farge senere (f.eks. mørk på Bakrommets inverterte kort) uten
  å røre symbolene. Full messing måler ≈ 6,9:1 mot kortbunnen; messing-dus
  hadde målt ≈ 4,8:1 – begge består AA for grafikk (3:1), men tynne streker
  (~1,6 px rendret) tåler god margin.
- **Alternativer vurdert:** Attributter i symbolene (forkastet: låser
  stilen), tykkere strek (unødvendig når kontrasten er godkjent med
  margin – og geometrien skal matche trykt meny uendret).
- **Status:** Gjeldende.

## #21 – Begge footer-lenkene til Æventyr peker på /nb/about
- **Dato:** 2026-08-21 (runde 9)
- **Beslutning:** Bestillingen gjaldt «footerens Æventyr-lenke»; footeren
  har to (logoen i «et …-sted» og Huset-spalten) – begge byttet til
  `https://aeventyr.no/nb/about` (HTTP 200 verifisert). `url`-feltet på
  `parentOrganization` i JSON-LD beholder `https://aeventyr.no/nb/`.
- **Begrunnelse:** To ulike mål for samme merke i samme footer ville vært
  inkonsekvent. JSON-LD-url-en er en identifikator for organisasjonen, ikke
  navigasjon – der er nettstedsroten riktigere enn en undermeny-side.
- **Status:** Delvis erstattet i runde 11 (#24): tekstlenkene er borte, og
  logoraden lenker til `https://aeventyr.no/nb/` som bestilt (svarer 308 →
  `/nb` → sesongside). JSON-LD beholder `/nb/`.

## #22 – Alibi er «bar», og Bakrommet heter «den skjulte menyen» utad
- **Dato:** 2026-09-23 (runde 10)
- **Beslutning:** (a) Alibi omtales som *bar*, aldri *pub*, i all synlig
  tekst, metadata og prosjektdokumentasjon. JSON-LD-typen `BarOrPub`
  beholdes – det er schema.org-typen som dekker begge, ikke en
  merkevarebetegnelse. (b) Den passordlåste delen av menyen heter «den
  skjulte menyen» i alt besøkende ser og hører (inngangslinje, etiketter,
  overskrift, meldinger). «Bakrommet» lever videre som internt navn:
  klasser (`.bakrom-*`), ID-er, JS-variabler, `sessionStorage`-nøkkelen
  `alibi-bakrom` og dokumentasjonen.
- **Alternativer vurdert:** Bytte de interne navnene også, for full
  konsistens – forkastet: det gir bare risiko for å knekke opplåsingen og
  sesjonslagringen, uten synlig gevinst. Endre `BarOrPub` til noe
  «bar-aktig» – finnes ingen mer presis type på schema.org.
- **Begrunnelse:** Eierne ser Alibi som cocktailbar, ikke pub; «bar» treffer
  også tonen (cocktails, lavt tempo) bedre. «Skjult meny» sier hva det er
  uten å love et fysisk rom som ikke finnes.
- **Status:** Gjeldende.

## #23 – Ordmerket «ALIBI» med gruppens A
- **Dato:** 2026-09-23 (runde 11)
- **Beslutning:** Logoen er et ordmerke satt i Æventyr-gruppens kjennemerke:
  A-en er én lang, tynn diagonal (langt over versalhøyden, langt under
  grunnlinja) med et kort høyre ben – ingen tverrstrek, intet venstre ben –
  hentet uendret fra gruppens egne logofiler; L, I, B, I er tegnet i samme
  strek. Fila (`img/logo/alibi-logo.svg`, `currentColor`) ligger inline som
  `<symbol id="alibi-ordmerke">` og brukes med `<use>` i topplinja, hero,
  dørskiltet og footeren. Dimensjoner settes etter versalhøyde, ikke total
  høyde; i topplinja går streken utenfor layoutboksen (negativ marg), så
  headerhøyden er uendret. «Alibi» i løpende tekst, `<title>`, meta og
  JSON-LD er vanlig tekst. Gjelder til en eventuell offisiell logo fra
  Æventyr foreligger – da byttes symbolet, ikke markupen.
- **Alternativer vurdert:** Beholde Limelight-logotypen (forkastet: følger
  ikke gruppens kjennemerke). `<img>` i stedet for inline (forkastet: fargen
  må styres av CSS for dørplata/hover/fokus). Egen mørk fil til dørplata
  (unødvendig med `currentColor`, jf. #19).
- **Begrunnelse:** Alibi skal leses som et Æventyr-sted ved første blikk –
  A-en er familielikheten. Ett symbol i DOM-en gir én sannhet for geometrien.
- **Status:** Gjeldende. Erstatter #19. Logoen skal bekreftes med kunden
  (TODO).

## #24 – Søsterstedenes logoer i footeren, i egen gull
- **Dato:** 2026-09-23 (runde 11)
- **Beslutning:** Footeren viser Æventyr, Raus Social, Tåkt, Canyon Hotell og
  Gargia Lodge som en logorad («Familien») – hver som lenke, som `<img>`
  (ikke inline: det er andres merker, vi styler dem ikke), i stedenes egen
  gull `#ca9e67`, ikke Alibis messing. Høyden settes per logo for lik optisk
  størrelse (filene har ulike proporsjoner). Tåkt finnes bare som PNG og er
  eksportert til WebP 1×/2×. Raden erstatter tekstlista «Huset» og Æventyr-
  logoen i bunnlinja; footeren har derfor to lenkespalter + logorad.
- **Alternativer vurdert:** Beholde tekstlista i tillegg (forkastet: dobbelt
  opp). Én felles `height` (forkastet: ulik optisk størrelse). Farge om til
  messing (forkastet, jf. #13).
- **Begrunnelse:** Familiebåndet vises med merkene, ikke bare ord; egen gull
  respekterer merkevarene. Kontrast 7,7:1 er godt over 3:1-kravet.
- **Status:** Gjeldende. Utvider #13, erstatter delvis #21.

## #25 – Midlertidige stockbilder: hva som er brukt og forkastet
- **Dato:** 2026-09-23 (runde 11)
- **Beslutning:** Tre sort-hvitt stockbilder er tatt inn som midlertidige
  stemningsbilder, kun i eksisterende fotofelt som hører til Alibi selv:
  veggtelefon (`#historien`), lampe/chesterfield (Alibi-kortet i `#huset`),
  bardisk (`#finn-oss`). Sjekket i full størrelse: ingen drikke, røyk eller
  merker; Jameson-plakaten i lampe-bildet er bekreftet beskåret bort;
  bakbarens uskarpe glass i bardisk-bildet er beskåret bort i eksporten.
  `dame`, `par-dans` og `ford` er sjekket og godkjent (ford krever
  beskjæring av skiltet), men ikke tatt inn – det finnes ingen ledige felt,
  og nye felt/gallerier/bakgrunner lages ikke. `chesterfield` er forkastet
  (annen bar: gjenkjennelig person, merkenavn, menykort). Ubrukte bilder
  ligger ikke i repoet. Kilder og lisenser i `docs/BILDEKILDER.md`.
- **Alternativer vurdert:** Legge et bilde på bankedøra (forkastet: LCP).
  Bruke `par-dans` på Tåkt-kortet (forkastet: stock skal ikke late som det
  viser andre steder, jf. #27).
- **Begrunnelse:** Siden trenger stemning nå; ekte foto kommer fra kunden og
  byttes inn i samme `<picture>`-markup.
- **Status:** Gjeldende (midlertidig – P4/P7/P16 står åpne).

## #26 – Bilderegel: alkohol, tobakk og merker
- **Dato:** 2026-09-23 (runde 11)
- **Beslutning:** Bilder på siden skal aldri vise alkohol som drikkes eller er
  i fokus, tobakk/røyking, eller alkohol- eller tobakksmerker (alkoholloven
  § 9-2 / alkoholforskriften kap. 14, tobakkskadeloven § 22). I tvil: ikke
  bruk bildet, spør. Alt-tekster omtaler aldri drikke. Regelen står i
  CLAUDE.md under føringene som ikke endres.
- **Begrunnelse:** Alibi er et skjenkested; reklameforbudet gjelder også
  nettsiden. Regelen må være fast, ikke vurderes per bilde.
- **Status:** Gjeldende.

## #27 – Raus og Tåkt venter på ekte foto
- **Dato:** 2026-09-23 (runde 11)
- **Beslutning:** Raus- og Tåkt-kortene i «Huset» beholder «Foto kommer»
  til kunden leverer ekte bilder (P16). Stockbilder brukes ikke der – de
  ville latt som de viser andres lokaler.
- **Begrunnelse:** Troverdighet: et stockbilde av et dansende par er ikke
  Tåkt.
- **Status:** Gjeldende.
