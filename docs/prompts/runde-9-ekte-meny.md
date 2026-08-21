# Runde 9 – Ekte meny, Bakrommet og delingsbilde

**Lim inn hele denne i Claude Code.**

---

## Kontekst

Eierne har levert den ekte cocktailmenyen. Sju drinker skal inn i `#menyen` og
erstatte plassholderklassikerne (Bee's Knees, Sidecar, Old Fashioned, French 75,
Mary Pickford, Boulevardier, Southside), og de to hemmelige skal inn i Bakrommet
og erstatte «Mørketid» og «Midnattssol».

Dette lukker P5 delvis og P6 helt. **Prisene er ikke levert ennå** – de blir
stående som `kr —` til lansering.

Menyen finnes allerede som trykt PDF hos kunden, med QR-kode som peker hit og
teksten *«Flere spennende drinker i vår hemmelige meny. Se vår nettside, det blir
et Æventyr.»* Passordet er fortsatt `æventyr`, og **skal ikke endres i denne
runden** – hele koblingen mellom papir, QR og Bakrommet hviler på det.

---

## Oppgave 1 – De sju drinkene inn i `#menyen`

Hvert menykort skal ha, i denne rekkefølgen:

1. Navn + pris (`kr —`) – som i dag
2. **Strektegning av glasset** (ny)
3. Glassnavn og totalmengde i glasset (ny)
4. Ingredienslinje – kun navn, ingen mengder (ny)
5. Beskrivelse – som i dag

Innholdet, ordrett:

| # | Navn | Glass | Total | Ingredienser | Beskrivelse |
|---|---|---|---|---|---|
| 1 | Æventonic | vin | 30 cl | Gin Mare · Fever-Tree Mediterranean Tonic · rosmarin | Husets egen. Middelhavsgin, tonic med urter, og en rosmarinkvist som lukter av et varmere sted. |
| 2 | Aurora Fizz | highball | 25 cl | Gin · blå curaçao · sitron · sukkerlake · soda · sitronskall | Nordlys i kjelleren. Den lyser blått uten å rope om det. |
| 3 | Basil Smash | rocks | 15 cl | Gin · sitron · sukkerlake · fersk basilikum | Basilikum knust i bunnen, gin over. Grønn, frisk og litt uhøflig. |
| 4 | Manito | highball | 25 cl | Hvit rom · Mannsverk jordbær · mynte · lime · sukkerlake · soda · jordbær | Mojitoens jordbærglade slektning. Mynten er plukket her inne. |
| 5 | Mezcalita | margarita | 15 cl | Mezcal · triple sec · lime · sukkerlake · salt · flambert lime | Margarita med røyk i. Limebåten har vært innom flammen på veien. |
| 6 | Maltfassioned | rocks | 10 cl | Single malt · Angostura · sukkerbit · appelsin | En Old Fashioned som tok feil avkjøring og havnet i Skottland. |
| 7 | Canyon Tea | highball | 25 cl | Vodka · triple sec · gin · hvit rom · mezcal · sitron · sukkerlake · Coca-Cola · appelsin | Fem flasker og en cola. Vi sier ikke mer. |

Glassnavn som vises: **Vinglass**, **Highball**, **Rocks**, **Margarita**.

Ingresslinja over menyen («Klassikere fra tiden da oppskriftene måtte huskes, ikke
skrives ned») passer ikke lenger – dette er husets egne drinker, ikke klassikere.
Skriv en ny i samme tone. Forslag, juster fritt: *«Vår egen håndskrift. Noen av
dem har vi funnet på selv.»*

---

## Oppgave 2 – Glasstegningene

Fire tegninger, i samme flate strekstil som Æventyr-ikonene (jevn strek, runde
ender, ingen ellipser). Disse er hentet fra den trykte menyen og skal brukes
uendret, så papir og skjerm viser samme glass.

Alle bruker `viewBox="0 0 100 120"`, `fill="none"`, `stroke="currentColor"`,
`stroke-width="4.6"`, `stroke-linecap="round"`, `stroke-linejoin="round"`.

```
vin:
  <path d="M34,16 L66,16"/>
  <path d="M34,16 C34,38 37,57 50,58 C63,57 66,38 66,16"/>
  <path d="M50,58 L50,99"/>
  <path d="M35,103 L65,103"/>

highball:
  <path d="M27,16 L73,16"/>
  <path d="M27,16 L29,96 C29,100 32,102 35,102 L65,102 C68,102 71,100 71,96 L73,16"/>

rocks:
  <path d="M24,42 L76,42"/>
  <path d="M24,42 L27,94 C27,98 30,100 33,100 L67,100 C70,100 73,98 73,94 L76,42"/>

margarita:
  <path d="M20,24 L80,24"/>
  <path d="M20,24 L50,62 L80,24"/>
  <path d="M50,62 L50,96"/>
  <path d="M31,100 L69,100"/>
  <path d="M38,50 L70,14"/>
  <circle cx="73.5" cy="10.5" r="4.5"/>
  <circle cx="41" cy="33" r="1.9"/>
  <circle cx="57" cy="35" r="1.9"/>
```

**Krav:**

- Inline SVG, ikke bildefiler (beslutning #3). `stroke="currentColor"` så fargen
  arves – det gjør at tegningene automatisk blir mørke på Bakrommets inverterte
  messingkort hvis de en gang skal brukes der.
- **`aria-hidden="true"` og `focusable="false"`** på hver SVG. Glassnavnet står
  som tekst ved siden av; tegningen er dekorativ og skal ikke leses opp to ganger.
- Tre av kortene deler samme highball-tegning og to deler rocks. Legg geometrien
  **én gang** i et skjult `<svg>` med `<symbol id="glass-highball">` osv. øverst i
  `<body>`, og bruk `<use href="#glass-highball">` i kortene. Sparer markup og
  gjør en senere retting til ett sted.
- Størrelse og plassering: tegningen skal være underordnet drinknavnet, ikke
  konkurrere med det. På smale skjermer må kortet fortsatt puste.
- Kontrast: messing på kortbunnen er allerede godkjent, men **sjekk den nye
  strektykkelsen** – tynne streker i messing kan bli svakere enn AA-kravet for
  grafiske elementer (3:1). Er den det, øk `stroke-width` heller enn å endre
  fargen.

---

## Oppgave 3 – Bakrommet: de to hemmelige

Erstatt «Mørketid» og «Midnattssol» med:

| Navn | Ingredienser | Beskrivelse |
|---|---|---|
| Mandaquiri | Hvit rom · Mannsverk jordbær · lime | Daiquiri, men rød. Kort, kald og rett på sak. |
| Adventure | Gin · triple sec · lime · eggehvite | Ristet til skummet legger seg som et lokk. Ser uskyldig ut. |

**Viktig:** glass og totalmengde er **ikke oppgitt** for disse to i eiernes
regneark. Vis derfor **ingen** glasstegning og ingen mengde på Bakroms-kortene –
ikke gjett. Legg inn `<!-- PLACEHOLDER: glass og mengde mangler for Bakroms-
drinkene -->` og før det som eget punkt i TODO (P18).

Prisene står som `kr —` her også.

---

## Oppgave 4 – Allergener og urter

To linjer under menyen, i samme dempede stil som dagens «Alkoholfritt alternativ
finnes til alt»:

- **«Adventure inneholder rå eggehvite.»** Dette er ikke pynt – rå egg skal
  opplyses. Den må stå selv om drinken ligger i Bakrommet, så plasser den slik at
  den er synlig uten å låse opp. Formuler den så den ikke røper hva Bakrommet
  inneholder, f.eks. som en generell allergilinje: *«Enkelte av drinkene våre
  inneholder rå eggehvite. Si fra om allergier, så finner vi noe annet til deg.»*
- **«Mynte, basilikum og rosmarin dyrker vi selv.»** Detalj fra eierne, og et
  troverdighetspoeng verdt å ha på siden.

---

## Oppgave 5 – Delingsbilde (lukker P1)

Siden mangler fortsatt `og:image`. Nå som logoen finnes, kan den lages her:

- Generer `assets/og-image.png`, 1200×630, brunsort bunn (`#141110`) med
  logotypen sentrert i messing, og under den en dempet linje:
  «Speakeasy i kjelleren · Alta». Bruk samme metode som PNG-faviconene i runde 7
  (headless Chrome på en midlertidig HTML-fil), og slett hjelpefila etterpå.
- Legg inn `og:image`, `og:image:width`, `og:image:height`, `og:image:alt` og
  `twitter:image`.
- **Absolutt URL kreves** av Facebook og LinkedIn. Bruk previewens domene inntil
  videre, og før det i TODO sammen med P2 (canonical) og `og:url` som ett samlet
  «bytt domene»-punkt til lanseringsrunden. Ikke bruk relativ sti – da vises ikke
  bildet ved deling.
- Verifiser at fila er under ~200 kB.

---

## Oppgave 6 – To småting

- Footerens Æventyr-lenke går til `aeventyr.no/nb/`, som i dag redirigerer til
  kampanjesiden `/nb/summer`. Bytt til `https://aeventyr.no/nb/about` – en
  morselskapslenke bør ikke lande på en sesongkampanje. Verifiser 200 først; gjør
  den ikke det, behold dagens og noter i TODO.
- Sjekk at `docs/TODO.md` sitt lukkede runde 5-punkt ikke lenger påstår «SEO 100»
  uten forbehold – tallet er 60 på previewen, og det står riktig forklart i P14.
  Historikken skal ikke skrives om, men legg en kort merknad så ingen leser den
  gamle linja som gjeldende status.

---

## Kvalitetsgulv

- Ren HTML/CSS/vanilla JS. Ingen nye avhengigheter.
- Lighthouse før og etter, begge målingene i changeloggen. Performance skal bli
  værende på 99; sju inline-SVG-er skal ikke koste målbart, men mål det.
  SEO 60 er forventet så lenge P14 står.
- WCAG AA, synlig fokus, semantisk HTML.
- Bevegelse: menykortene tennes allerede ett og ett via IntersectionObserver –
  de nye elementene skal følge samme mønster og vises statisk ved
  `prefers-reduced-motion`. Ingen ny animasjon, ingen ny flimrende lyskilde.
- Bakrommets tre veier inn (inline-felt, passord ved døra, taste-easter-egget)
  skal fortsatt virke. Test alle tre.
- `ALIBI_PASSORD` røres ikke.

## Sporbarhet

Følg reglene i `CLAUDE.md`: changelog, beslutninger, promptlogg (arkiver denne
som `docs/prompts/runde-9-ekte-meny.md`), TODO à jour – P6 lukkes, P5 oppdateres
til å kun gjelde priser, P1 lukkes, P18 opprettes – commits etter konvensjonen,
tag `runde-9`. Push ikke uten at Kim ber om det.

## Sluttrapport

Hva ble gjort, hvilke valg du tok alene, Lighthouse før/etter, hva som gjenstår,
og hva du er usikker på. Er noe i denne bestillingen feil, si det i stedet for å
bygge det.
