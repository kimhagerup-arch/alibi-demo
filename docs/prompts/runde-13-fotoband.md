# Alibi – runde 13: fotobånd med tre stemningsbilder

Liten, avgrenset runde: ett nytt fotobånd med de tre godkjente bildene som ikke er brukt
ennå. Ingen andre endringer. Følg CLAUDE.md, inkludert sporbarhetsreglene og bilderegelen.

## 0. Før du starter

- Les `CLAUDE.md`, `docs/CHANGELOG.md`, `docs/TODO.md` og `docs/DECISIONS.md` (#25–#28).
  Bruk neste ledige rundenummer (trolig 13). `git status` skal være rent – ellers stopp.
- Les forslaget ditt fra runde 11 i TODO om plassering av dame/par-dans/ford.
- Kilde: `C:\Users\kimha\Desktop\Business\KOVISION\alibi-lagring\bilder`
  – `dame.jpg`, `par-dans.jpg`, `ford.jpg` (alle godkjent i runde 11, se #25).
  Åpne dem på nytt i full størrelse og bekreft at de fortsatt er rene (ingen drikke,
  tobakk/røyk eller alkohol-/tobakksmerker). `chesterfield.jpg` skal fortsatt **ikke** brukes.

## 1. Plassering og oppbygging

- **Hvor:** et smalt fotobånd **mellom Historien og Huset**. Det skal ikke ha overskrift eller
  nytt menypunkt i navigasjonen. Det er et visuelt pusterom, ikke en seksjon.
  Mener du etter å ha sett siden at et annet sted mellom to seksjoner er klart bedre:
  velg det, og begrunn det i rapporten.
- **Rekkefølge:** dame – par-dans – ford.
- **Markup:** semantisk liste (`<ul>`/`<li>` med `<figure>`), ingen bildetekster.
  Alt-tekster:
  «Kvinne i 1920-tallsantrekk med fjær og pannebånd»,
  «Et par i 1920-tallsklær som danser»,
  «Veteranbil fra 1920-tallet sett forfra».
- **Stil:** bruk sidens eksisterende bilderamme (tynn gullramme + hjørnediamant som på
  Huset-kortene / Historien). Ingen nye farger, fonter eller effekter. Behold sort-hvitt.
- **Desktop/nettbrett (≥ 768 px):** tre bilder på rad, lik bredde og **likt format 4:5**,
  samme innholdsbredde som seksjonene rundt, rolig avstand mellom.
- **Mobil (< 768 px):** horisontal rad med `scroll-snap` (hvert bilde ca. 75 % av
  skjermbredden, neste bilde stikker litt inn som hint). Rulleområdet skal:
  - ha `tabindex="0"`, `role="region"` og `aria-label="Stemningsbilder"`, med synlig fokus
    slik at det kan rulles med tastatur,
  - ikke gi horisontal rulling på selve siden (kun inni båndet),
  - respektere `prefers-reduced-motion` (ingen `scroll-behavior: smooth` da).
- **Beskjæring:**
  - `ford.jpg`: 4:5-utsnitt sentrert på grill og lykter. **Registreringsskiltet skal være
    helt borte** i alle varianter. Sjekk hver eksportert fil.
  - `dame.jpg`: ansiktet og fjæra skal være med.
  - `par-dans.jpg`: begge personene skal være med, hoder og mest mulig av kroppen.

## 2. Bildebehandling

Samme løype som runde 11: `tools/eksporter-bilder.py` (Python + Pillow).
- Filnavn: `alibi-dame`, `alibi-par-dans`, `alibi-ford`.
- WebP i bredder tilpasset faktisk visningsstørrelse (typisk 480 og 800) + JPEG-fallback,
  kvalitet 75–80. Mål: under ~100 KB per variant i vanlig visning.
- `<picture>` med `srcset`/`sizes` som stemmer med både desktop-raden og mobil-båndet,
  `width`/`height`, `loading="lazy"`, `decoding="async"`.
- `<!-- PLACEHOLDER: stemningsbilde (stock), byttes med ekte foto av Alibi -->` på båndet.

## 3. Verifisering

- Skjermbilder på 1440, 768 og 375 px (bruk samme målemetode som runde 12, ekte 375 px),
  lagret i `C:\Users\kimha\Desktop\Business\KOVISION\alibi-skjermbilder\runde-13\`.
  Ta også bilde av alle tre eksporterte ford-varianter for å vise at skiltet er borte.
- Ingen horisontal rulling på siden på 375 px. Båndet kan rulles med tastatur og sveip.
- Lighthouse mobil: Performance 95+ og Accessibility 100, CLS ikke høyere enn 0,012 + margin
  (rapporter tallet). Nettverksfanen viser at båndet lastes lazy og i riktig størrelse.
- Døra, skjult meny, navigasjon og fokusrekkefølge virker som før.
- `grep PLACEHOLDER`: rapporter antall.

## 4. Sporbarhet og levering

- Commits, f.eks. `feat: fotobånd med tre stemningsbilder` og `docs: ...`.
- CHANGELOG (ny runde), DECISIONS (ny beslutning: fotobåndet, plassering og mobilløsning;
  oppdater #25 om at dame/par-dans/ford nå er brukt), TODO:
  - fjern punktet om plassering av ubrukte bilder,
  - **nytt punkt før lansering:** kilde og lisens for dame, par-dans og ford må bekreftes
    av Kim (står i BILDEKILDER.md som «oppgis av Kim»),
  - oppdater «Sist verifisert mot koden».
- PROMPTS.md + arkiver denne prompten i `docs/prompts/`.
- Tag runden, push til origin main.
- Sluttrapport: plassering og begrunnelse, mål per bredde, filstørrelser per variant,
  Lighthouse-tall, bekreftelse på at skiltet er borte, og hvor skjermbildene ligger.
