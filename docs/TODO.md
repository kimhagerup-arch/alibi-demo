# TODO – Alibi

Restanseliste i tre deler. **Plassholder-tabellen skal alltid stemme med
koden** – verifiser med søk på `PLACEHOLDER` i repoet. Lukkede punkter
markeres med dato, ikke slettes.

Sist verifisert mot koden: 2026-07-30, runde 4 (11 `PLACEHOLDER`-merker i `index.html`).

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
| P11 | Sosiale medier-lenker | `#praktisk`, `.some-ikon` | Instagram-/Facebook-URL-er → bytt `<span>` til `<a>` | Åpen |
| P12 | Lenke til Tåkt | Footer + «Finn oss» | ~~Tåkt sin nettside-URL~~ | **Lukket 2026-07-30** (runde 4: raussocial.no/no/takt i footer og «Finn oss», HTTP 200 verifisert) |
| P13 | Ekte logo | `#velkommen`, `.logotype` | Logotypen er satt i typografi (Limelight); bytt til SVG/bilde når logo er klar. Ikke kommentar-merket i koden – dokumentert her og i `README.md` | Åpen |

## 2. Kjente svakheter / gjeld

- ~~**Performance 86 – under 95-målet.**~~ **Lukket 2026-07-30** (runde 5):
  fontene selvhostes nå, render-blokkeringen er borte. Ny måling (samme
  oppsett – lokal server, emulert mobil): Performance **99**, Accessibility
  **100**, Best Practices **100**, SEO **100**; FCP 1,4 s, LCP 2,0 s.
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
- **Ingen 404-side** – lag en enkel i samme stil («Denne døra finnes
  ikke.») når hosting er valgt.
- **Kun SVG-favicon** – eldre nettlesere og enkelte verktøy foretrekker
  `favicon.ico`/PNG-fallback. Lav prioritet.
- **Tåkt-krysslenking** er énveis inntil Tåkt lenker tilbake (utenfor dette
  repoet, men verdt å huske for SEO).

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
