# TODO – Alibi

Restanseliste i tre deler. **Plassholder-tabellen skal alltid stemme med
koden** – verifiser med søk på `PLACEHOLDER` i repoet. Lukkede punkter
markeres med dato, ikke slettes.

Sist verifisert mot koden: 2026-08-21, runde 8 (20 `PLACEHOLDER`-merker i `index.html`).

## 1. Plassholdere

| # | Hva | Hvor | Hva som trengs for å lukke | Status |
|---|---|---|---|---|
| P1 | Open Graph-bilde (`og:image`) | `index.html` `<head>` (linje ~16) | Foto/grafikk 1200×630 som `assets/og-image.jpg` + meta-tag | Åpen |
| P2 | Canonical-URL | `index.html` `<head>` (linje ~17) | Endelig domene → `<link rel="canonical">` | Åpen |
| P3 | Hero-video | `#velkommen`, `.medie-slot-hero` | `assets/hero.mp4` (1920×1080, H.264, < 8 MB, uten lyd) → bytt flaten med `<video autoplay muted loop playsinline>` | Åpen |
| P4 | Interiørfoto | `#historien`, `.medie-slot-staaende` | `assets/interior-1.jpg` (3:4/4:5) → `<img>` med norsk alt-tekst | Åpen |
| P5 | Ekte cocktailmeny og priser | `#menyen`, `.meny-liste` | Endelig meny fra eierne; erstatt navn/beskrivelser og `kr —` | Åpen |
| P6 | Bakromsmeny | `#menyen`, `.bakrom-liste` | 2 ekte «hemmelige» cocktails med priser (kan rullere med ukas passord) | Åpen |
| P7 | Foto av inngangen | `#finn-oss`, `.medie-slot-staaende` | `assets/inngang.jpg` (3:4/4:5) → `<img>` | Åpen |
| P8 | Åpningstider | `#praktisk` | Reelle åpningstider fra eierne | Åpen |
| P9 | Aldersgrense | `#praktisk` | Reell aldersgrense (18/20 år?) | Åpen |
| P10 | Kontaktinfo | `#praktisk` | E-post og/eller telefon | Åpen |
| P11 | Sosiale medier-lenker | `#praktisk`, `.some-ikon` | Instagram-/Facebook-URL-er → bytt `<span>` til `<a>`. Se også P17 (footer + JSON-LD) | Åpen |
| P12 | Lenke til Tåkt | Footer + «Finn oss» | ~~Tåkt sin nettside-URL~~ | **Lukket 2026-07-30** (runde 4: raussocial.no/no/takt i footer og «Finn oss», HTTP 200 verifisert) |
| P13 | Ekte logo | `#velkommen`, `.logotype` | ~~Logotypen er satt i typografi~~ | **Lukket 2026-08-21** (runde 8: `assets/alibi-logo.svg` i hero, topplinje og favicon. Leverer kunden en egen fil senere, er det ett filbytte – samme filnavn, samme proporsjoner) |
| P14 | **noindex på previewen** | `index.html` `<head>` (rett under viewport) | **MÅ fjernes ved lansering** på ekte domene – ellers indekseres ikke siden. Fjern meta-taggen og PLACEHOLDER-kommentaren. NB: så lenge den står, viser Lighthouse SEO 60 (is-crawlable) – forventet, ikke en regresjon | Åpen |
| P15 | **Adressekonflikt – MÅ avklares før lansering** | `#finn-oss`, `#praktisk` (Beliggenhet) og `address` i JSON-LD | Siden vår sier **Sentrumsparken 2, 9510 Alta** (brødtekst + JSON-LD). Raus og Tåkt oppgir begge **Markedsgata 6, 9510 Alta**, Tåkt ligger i kjelleren under Raus med inngang gjennom restauranten, og Alibi ligger vegg i vegg med Tåkt i samme kjeller – da kan ikke begge adressene stemme. Adressen står også i menyen som er sendt kunden. Feil adresse i JSON-LD ender i Google Maps/Google Business. Avklar med eierne; rett deretter alle tre stedene + Google Maps-lenken i «Finn oss» | Åpen |
| P16 | Foto til «Huset»-kortene | `#huset`, `.medie-slot-hus` (3 stk) | Foto av Raus (`assets/raus.jpg`), Tåkt (`assets/taakt.jpg`) og Alibi (kan gjenbruke interiørfotoet fra P4). Ikke hotlink fra aeventyr-CDN – alt selvhostes | Åpen |
| P17 | Alibis egne sosiale kontoer | Footer («Følg oss») + `sameAs` i JSON-LD | Egne Instagram-/Facebook-kontoer for Alibi. Ikke lenk til Raus' eller Tåkts kontoer som om de var Alibis. Når de finnes: bytt `<span>` til `<a>` i footeren, legg `sameAs` i JSON-LD, og lukk P11 samtidig | Åpen |

## 2. Kjente svakheter / gjeld

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
  tastatur, Bakrommets tre veier, reduced motion). En enkel sjekkliste
  ligger i [ONBOARDING.md](ONBOARDING.md).
- **`og:url` mangler** i Open Graph-settet – legges til sammen med P2 når
  domenet er klart.
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

- **«Ukas passord»-rutine:** Bakrommet er bygget for markedsføringsgrepet
  der ukas passord deles på sosiale medier (runde 2-briefen). Krever bare å
  bytte `ALIBI_PASSORD` i `js/main.js` og publisere – men rutinen/eierskapet
  er ikke avtalt.
- **Rullerende bakromsmeny** koblet til ukas passord (naturlig forlengelse
  av P6).
- **Banke-lyd som innspilt lyd** i stedet for WebAudio-syntese, hvis eierne
  vil ha mer «ekte» dunk (beslutning #5 valgte syntese; kan revurderes med
  ekte lydfil).
