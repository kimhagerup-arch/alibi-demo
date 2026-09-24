# TODO – Alibi

Restanseliste i tre deler. **Plassholder-tabellen skal alltid stemme med
koden** – verifiser med søk på `PLACEHOLDER` i repoet. Lukkede punkter
markeres med dato, ikke slettes.

Sist verifisert mot koden: 2026-09-24, runde 15 (21 `PLACEHOLDER`-merker i
`tools/mal.html` – de følger med i begge genererte filer, `index.html` og
`no/index.html`). Runde 15 ligger på `dev` og er ikke slått sammen til `main`.

## 1. Plassholdere

| # | Hva | Hvor | Hva som trengs for å lukke | Status |
|---|---|---|---|---|
| P1 | Open Graph-bilde (`og:image`) | `index.html` `<head>` | ~~Foto/grafikk 1200×630~~ | **Lukket 2026-08-21** (runde 9: `assets/og-image.png` 1200×630, 19 kB, rendret fra logofila; og:image/width/height/alt + twitter:image inne. URL-en peker på previewdomenet – byttes via P2) |
| P2 | **Bytt domene ved lansering** (samlepunkt) | `domene` i `tekst/felles.json` (→ `<head>` på begge sider + `sitemap.xml`) | Når endelig domene er klart: bytt `domene` i `tekst/felles.json` og kjør `python tools/bygg-sider.py`. Det oppdaterer selvrefererende `canonical`, `hreflang` (en/nb/x-default), `og:url`, `og:image`/`twitter:image` og `sitemap.xml` på begge sider (siden runde 15 står alt dette inne med previewdomenet `alibi-demo.vercel.app` – absolutte URL-er kreves av hreflang og Facebook/LinkedIn). Henger sammen med P14 (noindex vekk) | Åpen |
| P3 | Hero-video | `#velkommen`, `.medie-slot-hero` | `assets/hero.mp4` (1920×1080, H.264, < 8 MB, uten lyd) → bytt flaten med `<video autoplay muted loop playsinline>` | Åpen |
| P4 | Interiørfoto (ekte foto av Alibi) | `#historien`, `.medie-slot-staaende` | Siden runde 11 står stockbildet `img/alibi-telefon-*` der (Pexels, se `BILDEKILDER.md`). Ekte foto: eksporter med `tools/eksporter-bilder.py` (4:5, 480/800 WebP + JPEG) og bytt kildene i `<picture>` + alt-tekst | Åpen (stock inne) |
| P5 | ~~Ekte cocktailmeny og~~ **priser** | `pris` per drink i `tekst/meny.json` (→ `#menyen` på begge sider) | Menyen kom inn 2026-08-21 (runde 9: sju drinker + to i Bakrommet). Siden 2026-09-23 (runde 10) står alle ni kort med **midlertidig pris 159** («kr 159» / «NOK 159») – sett reelle priser per drink i `tekst/meny.json` og bygg på nytt. NB: glasstypen skal **ikke** vises som tekst (kun mengde, f.eks. «30 cl»; tegningen er dekor) – behold det når prisene legges inn | Åpen (kun priser) |
| P6 | Bakromsmeny (på siden: «den skjulte menyen») | `#menyen`, `.bakrom-liste` | ~~2 ekte «hemmelige» cocktails~~ | **Lukket 2026-08-21** (runde 9: Mandaquiri og Adventure inne; priser dekkes av P5 – midlertidig `kr 159` fra runde 10 – og glass/mengde av P18) |
| P7 | Foto av inngangen | `#finn-oss`, `.medie-slot-staaende` | Siden runde 11 står stockbildet `img/alibi-bardisk-*` der. Ekte foto av døra/inngangen: samme framgangsmåte som P4 | Åpen (stock inne) |
| P8 | Åpningstider | `#praktisk` | Reelle åpningstider fra eierne | Åpen |
| P9 | Aldersgrense | `#praktisk` | Reell aldersgrense (18/20 år?) | Åpen |
| P10 | Kontaktinfo | `#praktisk` | E-post og/eller telefon | Åpen |
| P11 | Sosiale medier-lenker | `#praktisk`, `.some-ikon` | Instagram-/Facebook-URL-er → bytt `<span>` til `<a>`. Se også P17 (footer + JSON-LD) | Åpen |
| P12 | Lenke til Tåkt | Footer + «Finn oss» | ~~Tåkt sin nettside-URL~~ | **Lukket 2026-07-30** (runde 4: raussocial.no/no/takt i footer og «Finn oss», HTTP 200 verifisert) |
| P13 | Ekte logo | `#velkommen`, `.logotype` | ~~Logotypen er satt i typografi~~ | **Lukket 2026-08-21** (runde 8). *Runde 11:* byttet til ordmerket med gruppens A (`img/logo/alibi-logo.svg`, inline symbol). Kommer en offisiell fil fra Æventyr, byttes innholdet i `<symbol id="alibi-ordmerke">` – se «bekreft logo» under |
| P14 | **noindex på previewen** | `tools/mal.html` `<head>` (rett under viewport) → begge sider | **MÅ fjernes ved lansering** på ekte domene – ellers indekseres ikke siden. Fjern meta-taggen og PLACEHOLDER-kommentaren i malen og bygg på nytt (står på både `/` og `/no/`). NB: så lenge den står, viser Lighthouse SEO 63 (is-crawlable) – forventet, ikke en regresjon. `404.html` har sin egen, permanente noindex | Åpen |
| P15 | **Adressekonflikt – MÅ avklares før lansering** | `#finn-oss`, `#praktisk` (Beliggenhet) og `address` i JSON-LD | Siden vår sier **Sentrumsparken 2, 9510 Alta** (brødtekst + JSON-LD). Raus og Tåkt oppgir begge **Markedsgata 6, 9510 Alta**, Tåkt ligger i kjelleren under Raus med inngang gjennom restauranten, og Alibi ligger vegg i vegg med Tåkt i samme kjeller – da kan ikke begge adressene stemme. Adressen står også i menyen som er sendt kunden. Feil adresse i JSON-LD ender i Google Maps/Google Business. Avklar med eierne; rett deretter alle tre stedene + Google Maps-lenken i «Finn oss» | Åpen |
| P16 | Foto til «Huset»-kortene | `#huset`, `.medie-slot-hus` (3 stk) | Raus (`assets/raus.jpg`) og Tåkt (`assets/taakt.jpg`) står med «Foto kommer» – ekte foto fra kunden, ingen stock der (beslutning #27). Alibi-kortet har stockbildet `img/alibi-lampe-*` siden runde 11; byttes med ekte foto (3:2). Ikke hotlink fra aeventyr-CDN – alt selvhostes | Åpen (Alibi: stock inne) |
| P17 | Alibis egne sosiale kontoer | Footer («Følg oss») + `sameAs` i JSON-LD | Egne Instagram-/Facebook-kontoer for Alibi. Ikke lenk til Raus' eller Tåkts kontoer som om de var Alibis. Når de finnes: bytt `<span>` til `<a>` i footeren, legg `sameAs` i JSON-LD, og lukk P11 samtidig | Åpen |
| P18 | Glass og mengde for Bakroms-drinkene | `glass`/`cl` for Mandaquiri og Adventure i `tekst/meny.json` | Eiernes regneark oppgir ikke glass/totalmengde for Mandaquiri og Adventure – derfor `null` i menyfila og ingen glasstegning eller cl-linje der. Når de kommer: sett `glass` (`vin`/`highball`/`rocks`/`margarita`) og `cl` i `tekst/meny.json` og bygg – generatoren lager `.meny-glass`-linja selv (`currentColor` gjør tegningen mørk på de inverterte kortene). Kun mengden vises som tekst, ikke glasstypen | Åpen |
| P19 | Fotobåndet mellom Historien og Huset (3 stockbilder) | `.fotoband` (mellom `#historien` og `#huset`) | Siden runde 13 står `img/alibi-dame-*`, `img/alibi-par-dans-*` og `img/alibi-ford-*` der (Pexels, se `BILDEKILDER.md`). Ekte foto av Alibi: eksporter 4:5 i 480/640/800 med `tools/eksporter-bilder.py` og bytt kildene + alt-tekstene i de tre `<picture>` | Åpen (stock inne) |

## 2. Kjente svakheter / gjeld

- **FØR LANSERING – Kim kontrollerer den engelske teksten** (runde 15,
  `tekst/en.json` og `tekst.en` i `tekst/meny.json`). Formuleringer
  oversetteren var usikker på:
  - Navigasjon/overskrifter «The story · The house · The menu · Find us ·
    Practical» (bestemt form er valgt for å speile norsk; «Story/House/Menu»
    er alternativet – kortere i mobilraden).
  - Overteksten «Alta · the cellar · since tonight» («siden i kveld»).
  - Huset-mottoet «Eat upstairs. Nightclub next door. Talk here.»
  - Meny-ingressen «Our own handwriting. Some of these we made up ourselves.»
  - «To come. Cellars keep their own hours.» («Kjellere har sin egen
    døgnrytme.») og «To come.» for «Kommer.» generelt.
  - Æventonic: «The house's own.» – Basil Smash: «a little rude» («litt
    uhøflig») – Mezcalita: «The lime wedge stopped by the flame on the way.»
  - Ingredienser: «sugar syrup» (britisk; amerikansk er «simple syrup»),
    «flamed lime» («flambert lime»), «Mannsverk strawberry» for «Mannsverk
    jordbær» – hva er produktet (likør? sirup?), «strawberry» som pynt.
  - «Directions in Google Maps» for «Vis vei i Google Maps».
  - «Atmosphere photos» (aria-label på fotobåndet).
  - 404: «This door doesn't exist. Ours does.» / «Back to the door».
  - `og:image:alt` på engelsk siterer den norske linja på delingsbildet
    («Speakeasy i kjelleren · Alta») – se backlog om engelsk og-image.
  - Æventyr-lenka på engelsk er `https://aeventyr.no/en/` (som norsk `/nb/`):
    svarer 308 → `/en` → 307 → `/en/winter`. `https://aeventyr.no/en` sparer
    ett hopp hvis Kim vil.
- **Vercel er ikke koblet til GitHub** (funnet runde 15): deployene er gjort
  fra CLI (`vercel --prod`), så `dev`-grenen får ingen automatisk
  forhåndsvisning, og «Production Branch» kan ikke bekreftes. Kim bør koble
  repoet i Vercel (Settings → Git, produksjonsgren `main`) – da får hver gren
  sin preview automatisk. Inntil da: `vercel` (uten `--prod`) fra `dev`.
  Previews er beskyttet med Vercel Authentication (Settings → Deployment
  Protection) – de kan bare åpnes innlogget i Vercel. Skal kunden se en
  preview, må beskyttelsen skrus av eller en delingslenke lages der.
- **Engelske søsterlenker:** ingen mangler – raussocial.no/en (+ /en/takt,
  /en/terms, /en/privacy), canyonhotell.no/en og gargialodge.no/en/winter
  svarer alle 200 (2026-09-24). Sjekk sesongsidene (gargia/aeventyr `/en/winter`)
  når sesongen skifter, som for de norske.
- ~~**FØR LANSERING – kilde og lisens for dame, par-dans og ford må
  bekreftes av Kim.**~~ **Lukket 2026-09-24** (runde 14): Kim bekreftet at
  alle tre er fra Pexels (https://www.pexels.com/nb-no/), samme lisens som
  telefon/lampe/bardisk (fri bruk, kreditering ikke påkrevd). Ført i
  `BILDEKILDER.md`.
- **HØY PRIORITET – nøktern meny (knyttet til P5).** Når Brian Rundhaugs
  meny kommer: drinktekstene skal være nøkterne (navn, ingredienser, mengde,
  pris) uten salgsfremmende formuleringer, og alkoholfrie alternativer skal
  vises like tydelig som de alkoholholdige (alkoholforskriften § 14-3
  nr. 13). Gjelder også den skjulte menyen. Vurder også om passordet /
  «skjult meny» i markedsføring kan oppfattes som salgsfremmende. Dagens
  drinktekster er ikke skrevet om – de byttes uansett. (Lagt inn runde 11.)
- **Bekreft logoen med kunden.** Ordmerket med gruppens A (runde 11,
  beslutning #23) er bygget av gruppens egen A-geometri, men er ikke en
  offisiell fil fra Æventyr. Får vi en offisiell fil: bytt innholdet i
  `<symbol id="alibi-ordmerke">` i **både** `index.html` og `404.html`
  (kopi siden runde 12), samt `img/logo/*`, favicon og og-image.
- **Gargia-lenka er sesongavhengig.** Footeren lenker til
  `https://gargialodge.no/nb/winter` (200 per 2026-09-23). Sjekk at den
  fortsatt svarer når sesongen skifter – ev. bytt til `/nb`.
- **Æventyr-lenka i logoraden** går til `https://aeventyr.no/nb/` som
  bestilt; den svarer 308 → `/nb` → sesongside (`/nb/winter` nå). Fungerer,
  men lander på kampanjeside – vurder `/nb/about` hvis eierne vil ha
  «om oss» (jf. beslutning #21/#24).
- ~~**Performance 86 – under 95-målet.**~~ **Lukket 2026-07-30** (runde 5):
  fontene selvhostes nå, render-blokkeringen er borte. Ny måling (samme
  oppsett – lokal server, emulert mobil): Performance **99**, Accessibility
  **100**, Best Practices **100**, SEO **100**; FCP 1,4 s, LCP 2,0 s.
  *(Merknad 2026-08-21: SEO 100 gjaldt før noindex kom i runde 6 – på
  previewen viser tallet 60 så lenge P14 står. Se P14; dette punktet er
  historikk, ikke gjeldende status.)*
  Mål på nytt ved behov med: `python -m http.server 8000` +
  `npx lighthouse http://localhost:8000 --quiet --chrome-flags="--headless=new"`.
- ~~**Google Fonts lastes fra tredjepart.**~~ **Lukket 2026-07-30**
  (runde 5): Limelight og Cormorant Garamond selvhostes som latin-subset
  woff2 i `assets/fonts/` (SIL OFL, se `LICENSE.txt`). Ingen eksterne
  avhengigheter gjenstår. Se beslutning #14 i [DECISIONS.md](DECISIONS.md).
- **Ingen automatiske tester** – all verifisering er manuell (dør med
  tastatur, Bakrommets tre veier, reduced motion, språkflyt). Eneste
  automatiske kontroll er `python tools/bygg-sider.py --sjekk` (genererte
  filer i synk, samme nøkler på begge språk). En enkel sjekkliste ligger i
  [ONBOARDING.md](ONBOARDING.md).
- ~~**`og:url` mangler** i Open Graph-settet~~ – **Lukket 2026-09-24**
  (runde 15): `og:url` og selvrefererende canonical genereres på begge
  sider fra `domene` i `tekst/felles.json`; selve domenebyttet er P2.
- **Bekreft logoen** gjelder nå `<symbol id="alibi-ordmerke">` i
  `tools/mal.html` (ikke `index.html`) og kopien i `404.html`.
- ~~**Ingen 404-side**~~ – **Lukket 2026-07-30** (runde 7): `404.html` i
  rota, husets stil, uten dør og uten JS, med permanent noindex (skal IKKE
  fjernes ved lansering – ikke det samme som P14). Vercel plukker den opp
  automatisk; verifisert visuelt lokalt.
- ~~**Kun SVG-favicon**~~ – **Lukket 2026-07-30** (runde 7):
  `assets/favicon-32.png` (32×32) og `assets/apple-touch-icon.png`
  (180×180, full-bleed) rendret fra SVG-en og koblet i `<head>` på begge
  sider. SVG er fortsatt primær.
- **Tåkt-krysslenking** er énveis inntil Tåkt lenker tilbake (utenfor dette
  repoet, men verdt å huske for SEO).
- **Vilkår og personvern** i footeren lenker til `raussocial.no/no/terms` og
  `/no/privacy` (verifisert HTTP 200, runde 8). Spørsmål til eierne: skal
  Alibi ha egne sider, eller dekker Raus-dokumentene hele huset?
- **Fri bevegelse mellom stedene:** Tåkt-siden sier fri bevegelse til Raus
  etter kl. 22, men nevner ikke Alibi. Huset-ingressen er derfor holdt
  generell («et trappetrinn unna»). Spørsmål til eierne: gjelder ordningen
  Alibi også? I så fall kan ingressen spisses.

## 3. Ideer / backlog (nevnt, ikke besluttet)

- ~~**Ubrukte stemningsbilder** – forslag til plassering av `dame`,
  `par-dans` og `ford` i eksisterende seksjoner.~~ **Lukket 2026-09-23**
  (runde 13): alle tre ligger i fotobåndet mellom Historien og Huset
  (beslutning #29, P19). Forslagene om egne felt i Menyen/Praktisk/Finn oss
  er dermed uaktuelle.
- **«Ukas passord»-rutine:** Bakrommet er bygget for markedsføringsgrepet
  der ukas passord deles på sosiale medier (runde 2-briefen). Krever bare å
  bytte `ALIBI_PASSORD` i `js/main.js` og publisere – men rutinen/eierskapet
  er ikke avtalt.
- **Rullerende bakromsmeny** koblet til ukas passord (naturlig forlengelse
  av P6).
- **Banke-lyd som innspilt lyd** i stedet for WebAudio-syntese, hvis eierne
  vil ha mer «ekte» dunk (beslutning #5 valgte syntese; kan revurderes med
  ekte lydfil).
- **Engelsk delingsbilde:** `assets/og-image.png` har den norske linja
  «Speakeasy i kjelleren · Alta». En engelsk variant (f.eks.
  `og-image-en.png`, «Speakeasy in the cellar · Alta») kan legges inn med en
  egen nøkkel i språkfilene når/hvis Kim vil – da byttes også `og:image:alt`.
- **Vercel-kobling til GitHub** med `main` som produksjonsgren, så `dev`
  får automatisk forhåndsvisning (se punkt 2).
