# Promptlogg – Alibi

Én oppføring per Claude Code-kjøring: hva bestillingen var, hva som ble
levert, og avvik. Selve promptene arkiveres ordrett i [`prompts/`](prompts/).
Nyeste øverst.

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
