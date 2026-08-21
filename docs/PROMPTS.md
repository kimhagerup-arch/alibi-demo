# Promptlogg – Alibi

Én oppføring per Claude Code-kjøring: hva bestillingen var, hva som ble
levert, og avvik. Selve promptene arkiveres ordrett i [`prompts/`](prompts/).
Nyeste øverst.

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
