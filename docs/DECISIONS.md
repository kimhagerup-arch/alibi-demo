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
  (TODO). *Runde 12:* dørskiltets plassering og størrelse er endret (#28);
  symbolet ligger i tillegg som kopi i `404.html` – endres logoen, byttes
  begge.

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
- **Status:** Gjeldende (midlertidig – P4/P7/P16 står åpne). *Runde 13:*
  `dame`, `par-dans` og `ford` er tatt inn i fotobåndet mellom Historien og
  Huset (se #29, TODO P19); ford med skiltet beskåret bort. `chesterfield`
  er fortsatt forkastet.

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

## #28 – Dørskiltet sentrert i det øvre dørfeltet, dimensjonert etter versalhøyde
- **Dato:** 2026-09-23 (runde 12)
- **Beslutning:** Messingskiltet på døra står sentrert *i* det øvre
  dørfeltet, liggende 2:1, 45 % av dørbladets bredde, og alt i prosent av
  døra så forholdet er likt på alle bredder. Ordmerket fyller 86 % av
  platehøyden med A-streken (versalhøyde ≈ 27 % av platehøyden: ≈ 15 px på
  desktop, ≈ 11 px på 375 px) og er optisk sentrert på *ordet* – A-en slik
  den står i versalbåndet pluss LIBI – ikke på SVG-boksen.
- **Alternativer vurdert:** (1) Sentrert i mellomrommet mellom kikkhullsluka
  og det øvre feltet (forkastet: mellomrommet er bare ≈ 11,6 % av
  dørhøyden ≈ 55 px på desktop; en plate stor nok for versalhøyde 14 px
  trenger ≈ 57 px, så luka eller feltene måtte flyttes, og døra ville fått
  tre elementer stablet tett). (2) Sentrere på LIBI + det korte A-benet
  alene (forkastet: gir 15,6 % forskyvning; A-en leses med diagonalen som
  venstre side, og strekens hale ville stått ≈ 19 px fra venstre kant mot
  ≈ 40 px til høyre – det ser venstretungt ut. Med 9,1 % står ordet
  eksakt midt på, og halen får 25 px luft mot 33 px på høyre side).
  (3) Ekstern `<use href="index.html#…">` eller egen SVG-fil på 404
  (forkastet: eksterne use-referanser virker ikke fra `file://`, som
  CLAUDE.md sier at siden skal kunne åpnes fra; kopi av symbolet koster
  ≈ 1 kB).
- **Begrunnelse:** Et navneskilt sitter naturlig i dørfeltet, innrammet av
  feltets kant, og feltet er det eneste rolige området som er stort nok
  uten å flytte på noe annet. Prosentmål gjør at skiltet holder samme
  forhold til døra på mobil og desktop.
- **Status:** Gjeldende. Presiserer #23.

## #29 – Fotobånd mellom Historien og Huset, horisontal rad med snap på mobil
- **Dato:** 2026-09-23 (runde 13)
- **Beslutning:** De tre godkjente, ubrukte bildene (dame, par-dans, ford)
  vises som et smalt fotobånd rett etter «Historien», før skillelinja til
  «Huset». Båndet er ikke en seksjon: ingen overskrift, ikke i
  navigasjonen, ingen bildetekster, og det er ikke med i scroll-
  avsløringen (statisk, ingen JS-endring). Tre like 4:5-bilder i sidens
  eksisterende ramme, i samme innholdsbredde som seksjonene. Bruddpunktet
  er 46 rem (sidens eget, som `.to-spalter` og `.hus-liste`) – 768 px
  faller i desktop-grenen som bestilt. Under 46 rem er båndet en
  horisontal rad med `scroll-snap` inni et fokuserbart rulleområde
  (`tabindex="0"`, `role="region"`, `aria-label`), 75 vw per bilde så
  neste stikker inn. Rulleområdet er fokuserbart på alle bredder (ett
  ekstra tabstopp på desktop). Bildene eksporteres i 480/640/800: 640
  dekker 2x-skjermer på alle bredder, 800 bare 3x.
- **Alternativer vurdert:** (1) Etter skillelinja, som opptakt til Huset
  (forkastet: bildene hører til tjuetallsfortellingen i Historien; linja
  markerer skiftet til Huset). (2) Mellom Huset og Menyen (forkastet:
  Huset-kortene har allerede tre bildeflater – seks på rad blir tett).
  (3) Spre bildene i eksisterende seksjoner slik TODO foreslo i runde 11
  (forkastet av bestillingen: ett bånd). (4) Avsløringsanimasjon som på
  `.medie-slot` i seksjonene (forkastet: krever JS-endring og gir ingen
  gevinst for et pusterom; statisk gir null CLS-risiko). (5) Fjerne
  `tabindex` på desktop (forkastet: krever JS/matchMedia; ett tabstopp
  koster lite). (6) 768 px som bruddpunkt (forkastet: 736–767 px ville
  vist to-spalter over et rullende bånd). (7) Lavere WebP-kvalitet på
  ford for å nå ~100 kB (forkastet: grillnettet komprimerer dårlig –
  q55 gir fortsatt 141 kB på 800; 640-varianten holder heller 2x-skjermer
  unna 800-fila, og kvaliteten holdes på 75–80 som resten).
- **Begrunnelse:** Et pusterom uten tekst gir siden luft mellom to
  tekstseksjoner uten å legge til et menypunkt. Rulling *inni* båndet
  holder siden fri for horisontal rulling; fokuserbart område med
  piltaster er den enkleste tilgjengelige løsningen uten JS.
- **Status:** Gjeldende. *Runde 14:* ford-utsnittet er flyttet til
  venstre så hånd og erme er helt ute (høyre kant ved frontrutestolpen);
  motivet er nå venstre lykt + grill, høyre lykt er ute fordi den lå under
  hånda. Ford eksporteres med egne innstillinger (WebP q65 + gaussisk
  støyfjerning 0,55 px) – 640 = 76 kB, 800 = 109 kB – som erstatning for
  alternativ (7) over; de andre bildene beholder q78.

## #30 – Engelsk som standardspråk på `/`, norsk på `/no/`, husket valg uten gjetting
- **Dato:** 2026-09-24 (runde 15)
- **Beslutning:** Siden finnes på engelsk (`/`, `<html lang="en">`) og norsk
  (`/no/`, `lang="nb"`). Engelsk er standard: første besøk på hovedadressen
  viser engelsk. Seksjons-ID-ene er like på begge språk. Språkvalget lagres i
  `localStorage` («alibi-sprak») når gjesten velger i språkvelgeren (topplinja
  eller døra); et inline-skript i `<head>` på `/` sender gjester med lagret
  «nb» til `/no/` før noe tegnes. Ingen gjetting ut fra nettleserspråk, ingen
  omdirigering uten lagret valg, og `/no/` omdirigerer aldri – søkeroboter får
  alltid siden de ber om. `sessionStorage`-nøklene (dør, skjult meny) deles
  mellom språkene. Én felles `404.html` med begge språk (engelsk først).
  Passordet godtar æ/ø/å som ae/oe/aa. SEO: selvrefererende canonical,
  `hreflang` (en/nb/x-default → `/`), `og:locale` + alternate, `inLanguage`
  i JSON-LD og `sitemap.xml` med `xhtml:link`. Engelsk side lenker til
  søstrenes engelske sider (alle svarer 200).
- **Alternativer vurdert:** Norsk som standard (forkastet: målgruppen er
  turister og hotellgjester). Automatisk språkvalg fra `Accept-Language`/
  `navigator.language` (forkastet av bestillingen: uforutsigbart for
  roboter og for norske gjester med engelsk telefon). Ett HTML-dokument med
  begge språk og JS-bytte (forkastet: ikke crawlbart per språk, dobbelt DOM).
  Språk som query-parameter (forkastet: dårlig for hreflang og deling).
- **Begrunnelse:** To ekte URL-er gir riktig SEO per språk og fungerer uten
  JS; lagret valg uten gjetting gir forutsigbar oppførsel.
- **Status:** Gjeldende (slått sammen til `main` i runde 16).

## #31 – Én mal og én menyfil: generator i standard-Python, genererte filer commites
- **Dato:** 2026-09-24 (runde 15)
- **Beslutning:** `index.html` og `no/index.html` (og `sitemap.xml`)
  genereres av `tools/bygg-sider.py` fra `tools/mal.html` +
  `tekst/nb.json`/`tekst/en.json` (all tekst, nøkkel for nøkkel) +
  `tekst/meny.json` (drinker: navn, glass, cl, pris og ingredienser felles;
  beskrivelse per språk; ordliste for oversatte ingredienser) +
  `tekst/felles.json` (domene, kart-URL). Generatoren bruker bare Pythons
  standardbibliotek, kjøres lokalt og de genererte filene sjekkes inn –
  serveren serverer fortsatt kun statiske filer. `--sjekk` feiler hvis filene
  på disk ikke er i synk med kildene, og generatoren stopper hvis et av
  språkene mangler en nøkkel. Tekstene JS skriver ut, genereres inn som
  `<script id="alibi-tekst" type="application/json">` i `<head>`, så
  `js/main.js` inneholder ingen strenger på noe språk. **Endrer #1:** «ingen
  byggesteg» presiseres til «intet byggesteg på serveren og ingen
  avhengigheter»; den lokale generatoren er i samme klasse som
  `eksporter-bilder.py` (byggtid, aldri runtime).
- **Alternativer vurdert:** To håndskrevne HTML-filer med kontrollskript
  (forkastet: menyen skal endres ofte, og to filer driver alltid fra
  hverandre – kontrollskriptet ville bare fortalt at de gjorde det).
  Jinja2/andre malbiblioteker (forkastet: ny avhengighet for tre
  plassholdertyper). Byggesteg i Vercel (forkastet: bryter «statisk hvor som
  helst» og gjør deploy avhengig av Python på serveren). Ingredienser
  skrevet per språk (forkastet: samme drink ville måtte redigeres to steder;
  ordlista gir én redigering + én oversettelse per nytt ord).
- **Begrunnelse:** Menyen og prisene endres ett sted; strukturen kan ikke
  drive fra hverandre; ingen ny driftsavhengighet.
- **Status:** Gjeldende (slått sammen til `main` i runde 16). Erstatter delvis #1.

## #32 – `dev`-gren for alt arbeid, `main` er kundens visning
- **Dato:** 2026-09-24 (runde 15)
- **Beslutning:** Kunden har lenken `alibi-demo.vercel.app`, som viser
  `main`. Alt arbeid skjer på `dev`; `main` endres bare når Kim eksplisitt
  sier «slå sammen til main». Runde-tagger settes først når runden er slått
  sammen til `main`. Ingen push, merge eller tag mot `main` uten beskjed.
  Vercel-prosjektet er per i dag **ikke** koblet til GitHub-repoet
  (deployene er gjort fra CLI: `vercel --prod` fra `main`); en push til
  `dev` gir derfor ingen automatisk forhåndsvisning. Forhåndsvisning av
  `dev` lages med `vercel` (uten `--prod`) fra `dev`-arbeidstreet – det gir
  en preview-URL og aliaset `alibi-demo-git-dev-kimhagerups-projects.vercel.app`,
  og rører ikke produksjon. Previews er beskyttet med Vercel Authentication
  (kun innlogget). `vercel --prod` kjøres aldri fra `dev`.
- **Alternativer vurdert:** Feature-grener per runde (unødig for én
  utvikler + én AI; `dev` er nok). Koble Vercel til GitHub med `main` som
  produksjonsgren (anbefalt på sikt – gir automatisk preview per gren;
  krever at Kim gjør koblingen i Vercel-dashbordet).
- **Begrunnelse:** Kunden skal aldri se halvferdig arbeid på sin lenke.
- **Status:** Gjeldende. *Runde 16:* Antakelsen om manglende
  GitHub-kobling var feil – `vercel git connect` svarte «already connected».
  Push til `dev` gir automatisk preview (aliaset
  `alibi-demo-git-dev-kimhagerups-projects.vercel.app`), og push til `main`
  deployer produksjon. Alternativet «koble til GitHub» er dermed allerede
  realiteten; CLI-deploy (`vercel`) er bare en reserve.

## #33 – Minifisert CSS fra generatoren, og ingen rastrering bak lukket dør
- **Dato:** 2026-09-24 (runde 16)
- **Beslutning:** Sidene lenker til `css/style.min.css`, en minifisert kopi
  som `tools/bygg-sider.py` lager fra `css/style.css` (kilden) med en egen
  minifiserer i standard-Python som bevarer strenger og `url(...)` (data-
  URI-en til kornet inneholder `url(%23n)`). Begge filene commites; `--sjekk`
  feiler hvis kopien ikke er i synk. I tillegg: (a) preload byttet fra
  Limelight til Cormorant 400 kursiv – Limelight brukes bare av h1–h4 under
  folden, kursiven av dørstatusen og velkomstlinja (LCP-elementet);
  (b) inline-skriptene står før `<link rel="stylesheet">`, så de ikke venter
  på CSS-en; (c) kammerlyset og støvet pauses (`html.dor-lukket`, satt av
  inline-skriptet, fjernet av `main.js` idet døra begynner å åpne seg) – de er
  usynlige bak døra. Rendringen med minifisert CSS er verifisert
  pikselidentisk (dør, forside på begge språk, 404 – 1440 og 375).
- **Alternativer vurdert:** Ikke minifisere (forkastet: 40 kB
  render-blokkerende CSS er det som holder Lighthouse på 96 – målt median
  96 på `main`, `dev` engelsk og `dev` norsk; med minifisert CSS 97–98).
  Minifisere med npm-verktøy (forkastet: ny avhengighet, jf. #1/#31).
  Inline kritisk CSS (forkastet: dobbelt vedlikehold av stil). Fjerne korn,
  vignett eller dørgradientene, som koster rastrering på Lighthouse sin
  programvare-GPU (forkastet: det er designet, jf. #3). Droppe font-preload
  helt (forkastet: målt 95).
- **Begrunnelse:** Runde 15-fallet fra 97 til 95 var målestøy (enkeltkjøringer;
  `main` måler også 96 i dag som median). Den eneste reelle, tapsfrie
  reduksjonen av den kritiske stien er CSS-bytes, og generatoren finnes
  allerede. Ytelseskravet måles heretter som median av tre kjøringer.
- **Status:** Gjeldende.

## #34 – Hero-film: format, plakat, pauseknapp, lasting bak døra – og at den er en vannmerket eksempelfilm
- **Dato:** 2026-09-24 (runde 17)
- **Beslutning:** Hero-feltet (16:9, samme ramme som plassholderen) viser en
  lydløs film i loop: `assets/video/alibi-hero.mp4` (H.264 High, yuv420p,
  960×540, crf 26, `+faststart`, uten lyd – 336 kB) med plakat
  `alibi-hero-poster.webp` (første bilde, 736 px = feltets bredde, 25 kB).
  Ingen WebM: VP9 ble ikke tydelig mindre (crf 40 = 279 kB, litt mykere).
  Filene lages av `tools/lag-hero-film.py` (ffmpeg): ny kildefil inn, samme
  navn ut, nedskalering (aldri opp), sort-hvitt, lyd fjernet. Markup:
  **ingen `<video>` i DOM-en** – feltet (`#hero-felt`, med `data-film` og
  `data-plakat`) har plakaten som `<img>` og en `<noscript>`-video med
  `controls`. `main.js` viser en egen pause/spill-knapp (44 × 44 px,
  messing, nedre høyre hjørne, navn per språk fra «js»-tekstene) og lager
  `<video muted loop playsinline aria-hidden>` første gang alt stemmer:
  gjesten har ikke trykket pause, døra er ikke lukket (`dorLukket`, samme
  idé som `dor-lukket` for kammerlyset), feltet er i syne
  (IntersectionObserver), fanen er synlig, og verken
  `prefers-reduced-motion` eller `navigator.connection.saveData` er satt
  (da vises plakat + knapp, og knappen starter filmen). Gjestens pausevalg
  huskes ut siden (i minnet). Uten JS: plakat + nettleserens kontroller.
  **Fila er en Envato-
  forhåndsvisning med synlig vannmerke, ikke lisensiert, kun for å vise
  kunden muligheten** – vannmerket fjernes, beskjæres eller dekkes ikke, og
  fila må lisensieres eller byttes før lansering (TODO, lanseringskrav;
  `docs/BILDEKILDER.md`).
- **Alternativer vurdert:** `autoplay preload="metadata"` i markupen som
  bestilt (forkastet: nettleseren ville lastet og startet filmen bak den
  lukkede døra, og også ved redusert bevegelse/sparemodus og uten JS – i
  strid med de andre kravene; JS-styrt `play()` gir samme resultat for alle
  som skal ha autoavspilling). `<video preload="none">` i markupen uten
  autoplay (forkastet etter test: Chromium og Firefox laster ingenting, men
  WebKit henter hele mp4-en bak lukket dør, også med JS avslått – derfor
  lages elementet av JS). Kopiere kildefila uendret (forkastet: ny
  koding ga 514 → 336 kB uten synlig tap i 2x-zoom). WebM i tillegg
  (forkastet, se over). Ikke egen knapp (forkastet: WCAG 2.2.2 krever
  pause for bevegelse over 5 s). Sømløs loop med kryssfading (forkastet i
  runde 17b: krever at skriptet dupliserer og overlapper starten, og
  resultatet avhenger av motivet). *Runde 17b:* i stedet **fade fra og til
  svart, 0,4 s i hver ende**, lagt inn i `tools/lag-hero-film.py`
  (`FADE_SEK`) så det gjelder alle fremtidige filmer – omstarten går via
  svart og ser tilsiktet ut, plakaten tas ved 0,4 s så den ikke er svart,
  og fila ble ikke større (334 kB).
- **Begrunnelse:** Levende bilde i hero-en uten å røre layout (ingen CLS),
  ytelse (lastes først etter døra), tilgjengelighet eller batteri. Én
  kommando bytter fila når den lisensierte versjonen kommer.
- **Status:** Gjeldende. *Runde 17c:* slått sammen til `main` (tag
  `runde-17`) etter PSI-måling mot produksjonen (100/100/100, CLS 0 på
  begge språk, beslutning #35). Eksempelfilmen er fortsatt midlertidig.

## #35 – Absolutt ytelseskrav måles med PageSpeed Insights, lokal Lighthouse bare relativt
- **Dato:** 2026-09-24 (runde 17c)
- **Beslutning:** Kravet Performance ≥ 95 / Accessibility 100 /
  Best Practices 100 / CLS 0 (mobil) verifiseres med **PageSpeed Insights**
  (pagespeed.web.dev eller PSI-API-et, dvs. Lighthouse på Googles servere)
  mot den **deployede** siden, som median av tre kjøringer per språk.
  Lokal Lighthouse mot `python -m http.server 8000` brukes **bare relativt**:
  `main` og `dev` måles om hverandre under like forhold før en
  sammenslåing, og `dev` skal ikke være dårligere enn `main`. Rekkefølgen
  er dermed: relativ lokal sjekk → sammenslåing → absolutt PSI-måling.
  Faller PSI under kravet, rulles det ikke tilbake; avviket rapporteres med
  auditene som trekker ned og tas i egen runde.
- **Alternativer vurdert:** Lokal Lighthouse som absolutt gulv (forkastet:
  runde 17b ga 89 på batteri og runde 16 ga 97 på lader for samme kode –
  tallet måler maskinen, ikke siden). PSI før sammenslåing mot
  dev-forhåndsvisningen (forkastet: previews er bak Vercel Authentication,
  så Googles servere får 302 til innlogging). Lighthouse CI i GitHub
  Actions (ikke nå: ville innført en avhengighet og et byggsteg, se
  beslutning #14/#31; kan vurderes senere). Krav om lokal måling på
  lader med `benchmarkIndex`-terskel (forkastet: fortsatt maskinavhengig).
- **Begrunnelse:** Googles servere gir stabile, sammenlignbare forhold og
  er det kunden og Google selv måler med. Det lokale tallet er likevel
  nyttig som A/B-sammenligning fordi begge sider av sammenligningen deler
  samme støy.
- **Status:** Gjeldende. Første måling etter regelen (runde 17c):
  100/100/100, CLS 0, LCP 1,6 s, TBT 0 ms på begge språk. Praktisk merknad:
  det nøkkelløse PSI-API-et har en delt dagskvote som kan være brukt opp
  (`429`); da måles det på pagespeed.web.dev (manuelt, eller headless med
  Playwright som i runde 17c).
