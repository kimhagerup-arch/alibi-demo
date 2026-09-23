# Runde 11 – 2026-09-23 – Ny logo med gruppens A, stemningsbilder, footer og opprydding

Arkivert ordrett.

---

# Alibi – ny logo med gruppens A, stemningsbilder, footer og opprydding etter runde 10

Avgrenset runde: (1) Alibi-logoen byttes til en ordmerke-SVG med Æventyr-gruppens
kjennemerke – den spesielle A-en, (2) stemningsbilder i eksisterende fotofelt,
(3) footer får logoene til søsterstedene i Æventyr (med Canyon Hotell og Gargia Lodge),
(4) små rettelser fra runde 10.
Ingen nye seksjoner og ingen andre designendringer.
Følg CLAUDE.md, inkludert sporbarhetsreglene.

## 0. Før du starter

- Les `CLAUDE.md`, `docs/CHANGELOG.md` og `docs/TODO.md`. Bruk **neste ledige rundenummer**
  (trolig 11 – sjekk changeloggen).
- `git status` skal være rent. Er det ikke: stopp og rapporter.
- List innholdet i bildemappa:
  `C:\Users\kimha\Desktop\Business\KOVISION\alibi-lagring\bilder`
  **Åpne hvert bilde og se på det** før du bruker det – ikke stol på filnavnet alene.
  Pek aldri til denne mappa fra koden: bildene kopieres/eksporteres inn i repoet.
- List også logomappa: `C:\Users\kimha\Desktop\Business\KOVISION\alibi-lagring\Logos`
  Forventet innhold:
  - Alibi (del A): `alibi-logo.svg`, `alibi-logo-gold.svg`, `alibi-logo-white.svg`,
    `alibi-logo-black.svg`, `alibi-merke-gold.svg`
  - Søstersteder (del B): `aeventyr.svg`, `canyon.svg`, `gargia.svg`, `raus.svg`, `taakt.png`
    (finnes både `raus.svg` og `raus.png`: bruk SVG-en)
  Mangler Alibi-filene: stopp del A og rapporter, men fullfør resten. Åpne også disse filene
  og se på dem. Pek aldri til mappa fra koden – filene kopieres inn i repoet.

## A. Logo: Alibi med gruppens A

**Kjennemerket:** Alle stedene i Æventyr-gruppen (Canyon Hotell, Gargia Lodge, Raus Social,
Tåkt, Æventyr) skriver A-en på samme måte: **én lang, tynn diagonal strek** som går
langt over versalhøyden og langt under grunnlinja, pluss **et kort høyre ben** – ingen
tverrstrek og intet venstre ben. Resten av bokstavene er en enkel, monolineær grotesk i
versaler. Dagens logo («Λlibi» i displayfonten) følger ikke dette og skal byttes.

**Filer (ferdig laget, ligger i `Logos`):**
- `alibi-logo.svg` – ordmerket «ALIBI», `fill="currentColor"` (bruk denne inline på siden)
- `alibi-logo-gold.svg`, `alibi-logo-white.svg`, `alibi-logo-black.svg` – faste farger
  (gull = gruppens `#ca9e67`), til og:image/print/senere bruk
- `alibi-merke-gold.svg` – bare A-merket (strek + ben), til favicon

A-en er hentet **uendret** fra gruppens egne logofiler (Canyon Hotell-SVG-en), og L, I, B, I
er tegnet med samme strektykkelse og versalhøyde. Ikke tegn om A-en, ikke bytt den ut med en
font-glyph, og ikke strekk/skjev logoen.

**Gjør:**
1. Kopier Alibi-filene til repoet (f.eks. `img/logo/`).
2. Bytt logoen **overalt der den brukes som logo/ordmerke**: header/navigasjon, bankedøra
   (overlay), hero/toppseksjon hvis den har logo, og footer. Bruk `alibi-logo.svg` **inline**
   (ikke `<img>`) slik at fargen styres av CSS (`color:` = sidens gullfarge) og hover/fokus
   fungerer som i dag. Behold `aria-label`/`<title>` = «Alibi», og lenka til toppen som i dag.
3. **Proporsjoner:** den lange streken gjør SVG-en ca. 3,2 × versalhøyden høy. Dimensjoner
   etter **versalhøyde**, ikke total høyde: i navigasjonen skal «LIBI» ha tilnærmet samme
   visuelle høyde som menypunktene, og streken får gå over/under uten å presse høyden på
   headeren (bruk `overflow: visible`, negativ marg eller tilsvarende – ingen layout-hopp).
   Bankedøra/hero kan ha logoen stor.
4. **Favicon:** lag nytt favicon av `alibi-merke-gold.svg` (SVG-favicon + PNG 32/180 for
   apple-touch-icon), på mørk bakgrunn der formatet krever det. Sjekk at streken er synlig i
   16 px – øk strektykkelsen *kun i favicon-versjonen* hvis den forsvinner.
5. **Løpende tekst endres ikke:** der «Alibi» står i setninger, overskrifter på kort (f.eks.
   Huset-kortet), `<title>`, meta og JSON-LD skal det fortsatt stå vanlig «Alibi». Merket er
   kun for logo-plassene.
6. Fjern CSS/markup for den gamle logoen som ikke lenger brukes (også ubrukte font-subsets
   hvis displayfonten *bare* ble brukt til logoen – sjekk først).

## B. Footer og beliggenhet

**Fakta:** Raus, Tåkt og Alibi ligger i **samme bygg som Canyon Hotell**. Gargia Lodge og
Canyon Hotell er også Æventyr-steder.

1. **Søsterstedene i footeren, som logoer.** Bytt/utvid dagens liste over søstersteder til
   en rad med logoer, hver som lenke. Rekkefølge og lenker:
   | Logo (fil i `Logos`) | Navn (alt/aria) | Lenke |
   |---|---|---|
   | `aeventyr.svg` | Æventyr | `https://aeventyr.no/nb/` |
   | `raus.svg` | Raus Social | `https://raussocial.no/no` |
   | `taakt.png` | Tåkt | `https://raussocial.no/no/takt` |
   | `canyon.svg` | Canyon Hotell | `https://canyonhotell.no/nb` |
   | `gargia.svg` | Gargia Lodge | `https://gargialodge.no/nb/winter` |
   Kun disse fem – ingen andre gruppelogoer.
   - Filene er gullversjonene (gruppens `#ca9e67`). **Behold stedenes egen gull** – ikke
     farg dem om til Alibis gull. Sjekk kontrast mot footerbakgrunnen (min. 3:1).
   - **Tåkt** finnes bare som PNG (`taakt.png`, ca. 2000 px / 73 KB). Eksporter til WebP i
     1× og 2× av visningsstørrelsen – mål under ~10 KB per fil. Raus er SVG.
   - SVG-ene brukes som `<img>` (ikke inline – de er andres merker, ikke noe vi styler).
     Sjekk at `gargia.svg` ikke inneholder `<text>` med en font vi ikke har – er det tilfelle,
     rapporter det (da er feil variant lagret).
   - Visuelt: lik **optisk** høyde (logoene har ulike proporsjoner – juster per logo, ikke én
     felles `height`), rolig avstand, rad som brytes pent på mobil. Liten, nøktern størrelse;
     de skal ikke konkurrere med Alibi-logoen.
   - Eksterne lenker med samme `rel`/`target`-oppsett som siden bruker i dag, `alt`/`aria-label`
     = stedets navn, synlig fokus, touch-mål min. 44 × 44 px.
   - Hvis footeren i dag har en tekstliste med de samme stedene: erstatt den (ikke dobbelt opp).
   - Rapporter hva footeren inneholder etter endringen, med skjermbilde.
2. **Finn oss:** legg inn én kort, nøktern linje om at Alibi ligger i samme bygg som
   Canyon Hotell (f.eks. «Du finner oss i samme bygg som Canyon Hotell.»). Ikke oppgi
   hotellets adresse eller andre fakta vi ikke har fått.
3. **JSON-LD:** legg til `containedInPlace` med `{"@type": "Hotel", "name": "Canyon Hotell",
   "url": "https://canyonhotell.no/nb"}`. Valider at JSON-en fortsatt er gyldig.
4. Oppdater prosjektbeskrivelsen i `CLAUDE.md` med Canyon Hotell (samme bygg) og Gargia Lodge.

## C. Stemningsbilder

### C1. Hvilke bilder – og hvilke som IKKE skal brukes

Bildemappa inneholder 7 sort-hvitt stockbilder. Telefon, lampe og bardisk er fra Pexels (fri
bruk, kreditering ikke påkrevd). For dame, par-dans og ford: skriv kilde og lisens i docs
som «oppgis av Kim» – ikke gjett.

| Fil | Motiv | Bruk |
|---|---|---|
| `telefon.jpg` | Gammel veggtelefon med nummerskive, art deco-tapet | **Ja** |
| `lampe.jpg` | Bordlampe med frynser, murvegg, chesterfield (Jameson-plakat er beskåret bort) | **Ja** |
| `bardisk-uten-glass.jpg` | Bardisk med avis, sedler, hatt og koffert | **Ja** |
| `dame.jpg` | 20-tallsportrett, kvinne med fjær og pannebånd | **Ja**, etter sjekk |
| `par-dans.jpg` | 20-tallspar som danser | **Ja**, etter sjekk |
| `ford.jpg` | Veteranbil (Ford T) | **Ja**, etter sjekk – se under |
| `chesterfield.jpg` | Chesterfield-sofaer, stort veggmaleri | **Nei** – en annen bar: gjenkjennelig person på veggmaleriet, stedets merkenavn og menykort på bordene |

**Sjekk hvert «etter sjekk»-bilde i full størrelse** før bruk. Bildet skal forkastes hvis
det viser glass/drikke, sigarett/munnstykke/røyk eller merker for alkohol eller tobakk.
Bekreft også at `lampe.jpg` ikke viser Jameson-plakaten. Rapporter resultatet per bilde.

**`ford.jpg`:** Skiltet (ser ut som «AR 83 13») kan tilhøre en ekte bil. Beskjær skiltet bort
hvis bildet brukes. Ford-merket på grillen er greit, det er verken alkohol eller tobakk.

Finner du andre filer i mappa enn disse sju: ikke bruk dem, list dem i rapporten.

**Grunnregel (legg den inn i CLAUDE.md som fast regel):** Bilder på siden skal aldri vise
alkohol som drikkes eller er i fokus, tobakk/røyking, eller alkohol- eller tobakksmerker
(alkoholloven § 9-2 / alkoholforskriften kap. 14, tobakkskadeloven § 22). Er du i tvil om
et bilde: ikke bruk det, spør.

### C2. Plassering – kun eksisterende «FOTO KOMMER»-felt

List først alle fotofelt/placeholdere på siden (seksjon, format, ca. visningsstørrelse).

- **Historien** (høyt/stående felt ved teksten) → `telefon.jpg`. Stående bilde, passer formatet.
- **Huset → Alibi-kortet** → `lampe.jpg`. Beskjær med `object-fit: cover` /
  `object-position` slik at lampa og sofaen er med.
- **Huset → Raus- og Tåkt-kortene** → **urørt** («FOTO KOMMER» står). Stockbilder skal ikke
  late som de viser andre steder; ekte bilder kommer fra kunden. Det gjelder også
  `par-dans.jpg`: det skal **ikke** på Tåkt-kortet.
- **Øvrige eksisterende fotofelt som hører til Alibi selv** (f.eks. i Menyen, Finn oss eller
  Praktisk): bruk `bardisk-uten-glass.jpg` først, deretter `dame.jpg` / `par-dans.jpg` /
  `ford.jpg` etter hva som passer formatet og innholdet i seksjonen.
- **Flere bilder enn felt:** lag **ikke** nye felt, gallerier eller bakgrunnsbilder
  (heller ikke på bankedøra, der går det ut over LCP). Ubrukte bilder skal ikke inn i repoet.
  Foreslå i rapporten hvor de kunne passet, så tar vi det i en egen runde.

Behold rammene/hjørnediamantene som i dag – bildet går inn i den eksisterende rammen.

### C3. Bildebehandling (kvalitetsgulv: Lighthouse 95+, ingen CLS)

Originalene er store (flere tusen px, opptil ca. 2,7 MB). De skal **ikke** inn slik de er.

- Eksporter til `img/` (eller mappa prosjektet allerede bruker) med beskrivende norske
  filnavn med `alibi-`-prefiks: `alibi-telefon`, `alibi-lampe`, `alibi-bardisk` osv.
- Lag **WebP** i bredder tilpasset faktisk visningsstørrelse (f.eks. 480 / 800 / 1200 px,
  og 1600 kun hvis feltet er så stort på desktop) + én JPEG-fallback. Kvalitet ca. 75–80.
  Mål: hver variant i vanlig visning under ~150 KB.
- Bruk `<picture>` med `srcset` og korrekt `sizes`, `width`/`height` på `<img>`,
  `loading="lazy"` og `decoding="async"` (ingen av feltene er over bretten – sjekk det).
- Bildeverktøy er kun byggtid/lokalt (f.eks. `sharp` via `npx`, `cwebp` eller ImageMagick).
  **Ingen runtime-avhengigheter**, ingenting nytt i `package.json` som siden trenger for å kjøre.
  Hvis du legger til et lite eksportskript, dokumenter det i README.
- Bevar sort-hvitt. Ikke legg på farge-/sepiafilter.
- Alt-tekster på norsk, beskrivende og nøkterne, f.eks.
  «Gammel veggtelefon med nummerskive mot mønstret tapet»,
  «Bordlampe med frynser som lyser opp et hjørne med murvegg og skinnsofa»,
  «Bardisk i mørkt tre med en avis, noen sedler og en hatt»,
  «Kvinne i 1920-tallsantrekk med fjær og pannebånd»,
  «Et par i 1920-tallsklær som danser»,
  «Veteranbil fra 1920-tallet sett forfra».
  Ingen alt-tekst som omtaler drikke. Er bildet rent dekorativt i konteksten: `alt=""`.
- Legg en `<!-- PLACEHOLDER: stemningsbilde (stock), byttes med ekte foto av Alibi -->`
  ved hvert bilde, og opprett/oppdater TODO-punkt for ekte foto.

## D. Rettelser fra runde 10

1. **Meta-description / og:description / JSON-LD-beskrivelse** sier fortsatt «levende lys».
   Bytt til samme materialbilde som historien («dimmet lys og tre …» e.l.), i alle tre
   hvis de finnes. Hold lengden innenfor ~155 tegn for description.
2. **Alkoholreklame i menyen – kun dokumentasjon nå, ikke tekstendring.** Legg inn nytt
   TODO-punkt (høy prioritet, knyttet til P5):
   «Når Brian Rundhaugs meny kommer: drinktekstene skal være nøkterne (navn, ingredienser,
   mengde, pris) uten salgsfremmende formuleringer, og alkoholfrie alternativer skal vises
   like tydelig som de alkoholholdige (alkoholforskriften § 14-3 nr. 13). Gjelder også den
   skjulte menyen. Vurder også om passordet/‹skjult meny› i markedsføring kan oppfattes som
   salgsfremmende.»
   Ikke skriv om dagens drinktekster – de byttes uansett.

## E. Verifisering

- **Logo:** skjermbilder av header, bankedøra og footer på 1440 px og 375 px. A-streken
  klippes ikke, headeren har samme høyde som før (eller rapporter ny høyde), ingen
  horisontal rulling på mobil. Logoen er tastaturfokuserbar som før, med synlig fokus.
  Kontrast gull mot bakgrunn er minst 3:1 (grafisk element).
- **Favicon** vises i fanen (sjekk lys og mørk fane).
- **Footer:** alle lenker virker (ingen 404), tastaturrekkefølgen er logisk.
- **JSON-LD** validerer (Schema Markup Validator eller tilsvarende) – rapporter resultatet.
- Alle bildene som er brukt, vises riktig i sine felt på 1440 px og 375 px, uten forvrengning, med
  motivet synlig etter beskjæring. Skjermbilder av hvert felt på begge bredder.
- Nettverksfanen: mobil laster små varianter, desktop passende størrelse; WebP brukes.
- Lighthouse (mobil) på preview/lokalt: fortsatt 95+ i alle fire. Rapporter tallene
  og LCP/CLS.
- `chesterfield.jpg`, forkastede bilder og ubrukte bilder ligger ikke i repoet (`git ls-files img/`).
- Bankedøra, skjult meny og tastatur-/fokusrekkefølge fungerer som før.
- `grep PLACEHOLDER`: rapporter nytt antall (skal øke med antall bilder lagt inn).

## F. Sporbarhet og levering

- Commits etter konvensjonen, f.eks.:
  - `feat: ny Alibi-logo med gruppens A`
  - `feat: favicon av A-merket`
  - `feat: søsterstedenes logoer i footer`
  - `feat: samme bygg som canyon hotell i finn oss og json-ld`
  - `feat: stemningsbilder i historien og huset`
  - `fix: oppdater beskrivelser med nytt materialbilde`
  - `docs: bilderegel, bildekilder og todo for nøktern meny`
- `docs/CHANGELOG.md`: ny runde.
- `docs/DECISIONS.md`: nye beslutninger om (a) logoen – gruppens A som kjennemerke;
  ordmerket er bygget av gruppens egen A-geometri og gjelder til en eventuell offisiell logo
  fra Æventyr foreligger, (b) søsterstedenes logoer i footer i egen gullfarge,
  (c) midlertidige stockbilder – hvilke som er brukt/forkastet og hvorfor, (d) bilderegelen
  om alkohol/tobakk/merker, (e) Raus/Tåkt venter på ekte foto.
- `docs/TODO.md`: nye punkter (ekte foto av Alibi, forslag til plassering av ubrukte stemningsbilder, nøktern meny, bekreft logo med kunden,
  sjekk at Gargia-lenka `/nb/winter` fortsatt virker når sesongen skifter), oppdater
  «Sist verifisert mot koden».
- Bildekilder per bilde i docs (Pexels for telefon/lampe/bardisk; «oppgis av Kim» for resten) –
  til sporbarhet, ikke synlig på siden.
- `docs/PROMPTS.md` + arkiver denne prompten i `docs/prompts/`.
- Tag runden, push til origin main.
- Sluttrapport: hvor logoen er byttet (med skjermbilder), footerens innhold, hvilke bilder
  som ble brukt hvor, filstørrelser per variant, Lighthouse-tall, hva som står igjen.
