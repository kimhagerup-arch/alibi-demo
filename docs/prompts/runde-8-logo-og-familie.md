# Runde 7 – Logoen inn og familiebåndet til Raus, Tåkt og Æventyr

**Lim inn hele denne i Claude Code.**

---

## Kontekst

Alibi-siden er teknisk ferdig (Lighthouse 99/100/100/100, runde 6). Det som mangler
er ikke kode – det er at siden ikke **ser ut som** den hører til i Æventyr-familien.
Eierne har nettopp oppgradert nettsidene til Raus Social, Tåkt og Æventyr, og de er
gode. Alibi må kjennes igjen som en del av det samme huset, med sin egen tone.

Denne runden gjør tre ting: setter inn den nye logotypen, bygger familiebåndet
(krysslenking og en «Huset»-seksjon), og strammer opp footer, praktisk-seksjon og
meta etter samme mønster som søstersidene.

**Denne runden rører ikke menyinnholdet** (kommer i runde 8) og **fjerner ikke
noindex** (kommer i lanseringsrunden).

---

## Verifiserte fakta om søstersidene

Hentet fra sidene 21. august 2026. Bruk disse – ikke gjett, og ikke dikt opp noe som
ikke står her.

| | Raus Social | Tåkt |
|---|---|---|
| URL (norsk) | `https://raussocial.no/` | `https://raussocial.no/takt` |
| URL (engelsk) | `https://raussocial.no/en` | `https://raussocial.no/en/takt` |
| Hva | Arktisk tapas, restaurant, gateplan | Nattklubb, kjeller |
| Adresse | Markedsgata 6, 9510 Alta | Kjeller, Markedsgata 6 – inngang gjennom Raus |
| Åpent | ons–tor 15–22, fre–lør 15–23, søn–tir stengt | fre 22–03, lør 22–03 |
| Telefon | +47 45 38 56 03 | +47 45 38 56 03 |
| E-post | booking@raussocial.no | – |
| Annet | Fri bevegelse mellom stedene etter 22 | Cover 100 kr, 20 års aldersgrense |
| Instagram | instagram.com/raussocial | instagram.com/taakt.no |
| Facebook | facebook.com/raussocial | facebook.com/taaktnattklub |

Æventyr: `https://aeventyr.no/nb/` – morselskapet. Begge søstersidene skriver
«A part of Æventyr» nederst.

**Mønstre som går igjen på alle tre sidene** (dette er det vi speiler):

1. **Stedsbytter i topplinja.** Raus har «Switch to Tåkt», Tåkt har «Switch to Raus».
   Det er en primærknapp, ikke en fotnote.
2. **Parseksjon midt på siden.** Raus: «Dine Upstairs. Dance Downstairs.» Tåkt:
   «Dance Downstairs. Dine Upstairs.» Samme seksjon speilvendt, med bilde av
   nabostedet, en kort punktliste og én tydelig lenke.
3. **Footer med tre lenkespalter** (stedet selv / opplevelsen / følg oss), deretter
   «© 2026 X – A part of Æventyr» og lenker til vilkår og personvern.
4. **Informasjonsblokk** med faste overskrifter: Beliggenhet, Åpningstider,
   Booking/kontakt, og stedsspesifikke tillegg (cover, aldersgrense).
5. **Språkbytter** NO/EN i topplinja.

Punkt 5 tar vi i en egen runde. Punkt 1–4 er denne runden.

---

## Oppgave 0 – Forarbeid

1. Kontroller at `assets/alibi-logo.svg` finnes i repoet. Kim legger den inn før
   du kjører. **Finnes den ikke, stopp og si fra** – ikke tegn din egen.
2. Verifiser med `curl -o /dev/null -s -w "%{http_code}"` at disse svarer 200:
   `https://raussocial.no/`, `https://raussocial.no/takt`,
   `https://aeventyr.no/nb/`, `https://raussocial.no/terms`,
   `https://raussocial.no/privacy`.
   Dagens footer bruker `raussocial.no/no/takt` – hvis den nå redirigerer eller
   svarer noe annet enn 200, bytt til URL-ene i tabellen over. Ikke lenk til
   `/en`-versjoner fra en norsk side.
3. `grep -rn PLACEHOLDER index.html` og sammenlign med `docs/TODO.md` før du starter.

---

## Oppgave 1 – Logotypen inn

Alibi har fått en ekte logotype. A-en er Æventyr-familiens kjennetegn: en forlenget
skråstrek uten tverrstrek, slik A-en er tegnet i RAUS-logoen. Resten av ordet er
Limelight konvertert til kurver, så fila er selvstendig.

**Gjør dette:**

- Bytt hero-logotypen (`.logotype` i `#velkommen`) fra tekst til logofila:
  ```html
  <h1 class="logotype">
    <img src="assets/alibi-logo.svg" alt="Alibi" width="728" height="292">
  </h1>
  ```
  `alt="Alibi"` er ikke valgfritt – h1-en må fortsatt ha tekstverdi for søk og
  skjermlesere. `width`/`height` skal stå der for å holde CLS på 0.
- Bredden styres med `clamp()` i CSS, ikke med attributtene. Sikt på omtrent samme
  optiske størrelse som dagens tekstlogo.
- **Skråstreken stikker ut over og under bokstavene.** Det er selve poenget. Kontroller
  at ingen `overflow: hidden` i hero-en klipper den, og at det er nok luft over
  logoen til at den ikke kolliderer med topplinja på små skjermer.
- Sett samme logo i **topplinja** (der det i dag står «ALIBI» i Limelight), i liten
  størrelse. Bruk samme fil.
- **Dørplata** i inngangsoverlayet: bruk logoen der også hvis den er lesbar i den
  størrelsen. Er den det ikke, behold dagens messingplate og noter valget i
  `DECISIONS.md`.
- **Faviconet** oppdateres til A-merket alene. Bruk denne banen (samme geometri som
  i logofila, beskåret til A-en):
  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-14 -10 198 290">
    <path d="M88,63 L102,63 L170,210 L122,210 Z" fill="#C9A227"/>
    <path d="M123.4,0 L2,270" stroke="#C9A227" stroke-width="11" fill="none"/>
  </svg>
  ```
  Legg mørk bakgrunn (`#141110`) bak i faviconet, ellers forsvinner messing på lyse
  nettleserfaner.
- P13 i `docs/TODO.md` («Ekte logo») lukkes med dato, med merknad om at kunden kan
  levere en egen fil senere og at det da er ett filbytte.

**Ikke** endre paletten, ikke bytt ut Limelight andre steder, ikke legg glød eller
skygge bak logoen (jf. runde 1: den ble bevisst fjernet).

---

## Oppgave 2 – Stedsbytter i topplinja

Søstersidene har nabostedet som en tydelig knapp øverst. Alibi skal ha det samme,
men i sin egen tone – lavmælt, ikke en ropende CTA.

- Legg til i topplinja, til høyre for ankernavigasjonen: **Raus** og **Tåkt** som
  eksterne lenker, visuelt adskilt fra ankerlenkene med en tynn messing-skillestrek.
- Målet er at en gjest på Alibi-siden skjønner på ett blikk at det finnes to steder
  til i samme hus.
- Krav: tastaturnavigerbart, synlig fokus, `rel="noopener"`, `target="_blank"` med
  `<span class="sr-only">(åpnes i ny fane)</span>` – samme mønster som Æventyr-logoen
  i footeren allerede bruker (runde 4).
- På mobil må ikke topplinja bli trang. Vurder å vise dem under ankernavigasjonen
  eller å korte ned til ikon + navn. Velg selv, men beskriv valget i `DECISIONS.md`.

---

## Oppgave 3 – Ny seksjon «Huset»

Dette er rundens viktigste grep. Søstersidene har hver sin speilvendte parseksjon;
Alibi er det tredje stedet og kan gjøre den komplett.

Legg inn en ny seksjon mellom «Historien» og «Menyen», med anker `#huset` og
oppføring i ankernavigasjonen.

**Innhold:**

- Overskrift i husets mønster, men med Alibis stemme. Forslag – juster fritt:
  «Spis oppe. Dans ved siden av. Snakk her.»
- Ingress, ca. to setninger: samme hus, tre steder, ett kvartal. Raus på gateplan,
  Tåkt og Alibi deler kjelleren. Nevn at man beveger seg fritt mellom stedene på
  kveldstid – **men bare hvis det stemmer for Alibi også**; Tåkt-siden sier fri
  bevegelse til Raus etter 22, den sier ingenting om Alibi. Er du usikker, skriv
  det generelt («naboene våre er ett trappetrinn unna») og før spørsmålet i TODO.
- Tre kort, i denne rekkefølgen:

  | Kort | Innhold |
  |---|---|
  | **Raus** | Arktisk tapas på gateplan. Ons–tor 15–22, fre–lør 15–23. Lenke: `https://raussocial.no/` |
  | **Tåkt** | Nattklubb i kjelleren, vegg i vegg med oss. Fre–lør 22–03. Lenke: `https://raussocial.no/takt` |
  | **Alibi** | Du er her. Ingen lenke – markert som gjeldende sted, f.eks. med `aria-current="page"` og en dempet stil. |

- Hvert kort har en medieplassholder for foto i samme stil som de eksisterende
  (`<!-- PLACEHOLDER: foto av Raus/Tåkt … -->`), ført inn i TODO som nye punkter.
  **Ikke** hotlink bilder fra `aeventyr1.b-cdn.net` – vi hoster ikke andres filer
  fra en side som skal ha null eksterne avhengigheter.
- Dagens omtale av Raus og Tåkt i «Finn oss» beholdes som veiviser (den forklarer
  hvordan man finner inngangen), men trimmes så det ikke blir dobbelt opp. «Finn
  oss» handler om veien inn, «Huset» handler om familien.

**Design:** samme kortspråk som menykortene (deco-ramme, diamant), men uten
lysstreif-effekten – hold antallet effekter nede. Kortene skal fungere i én kolonne
på mobil og tre på desktop. Scroll-avsløring gates bak `html.js-klar` som alt annet.

---

## Oppgave 4 – Footer i familiestil

Bygg om footeren til tre spalter, etter mønsteret på Raus og Tåkt:

| Spalte | Innhold |
|---|---|
| **Alibi** | Ankerlenker: Historien, Huset, Menyen, Finn oss, Praktisk |
| **Huset** | Raus, Tåkt, Æventyr (eksterne, ny fane) |
| **Følg oss** | Instagram og Facebook – PLACEHOLDER til vi får Alibis egne kontoer. Ikke lenk til Raus' eller Tåkts kontoer som om de var Alibis. |

Under spaltene, på én linje: «Alibi – et **[Æventyr-logo]**-sted», altså dagens
løsning med gulllogoen (beslutning #13 – logoen beholder `#CA9F68`, ikke harmoniser).
Ved siden av: lenker til vilkår og personvern på `raussocial.no/terms` og
`/privacy` **hvis de svarte 200 i oppgave 0** – ellers PLACEHOLDER, og spørsmål i
TODO om Alibi skal ha egne.

Behold copyright-linja, men skriv den i husets form: `© 2026 Alibi – en del av Æventyr.`

---

## Oppgave 5 – «Praktisk» med familiens informasjonsstruktur

Søstersidene bruker faste, gjenkjennelige informasjonsblokker. Struktur opp
`#praktisk` med samme rekkefølge og overskrifter:

1. **Beliggenhet** – adresse + «inngang gjennom …» når det er bekreftet
2. **Åpningstider** – PLACEHOLDER (P8)
3. **Aldersgrense** – PLACEHOLDER (P9). Tåkt har 20 år; Alibi er en pub med et roligere
   publikum og har trolig 18 eller 20. **Ikke gjett.**
4. **Kontakt** – PLACEHOLDER (P10). Raus/Tåkt bruker +47 45 38 56 03 og
   booking@raussocial.no; om Alibi deler nummeret er ikke bekreftet.
5. **Sosiale medier** – PLACEHOLDER (P11)

Plassholderne beholdes som plassholdere. Poenget er at *strukturen* står klar, så
runden som fyller inn innhold blir triviell.

### Viktig: adressekonflikt

Siden vår sier **Sentrumsparken 2, 9510 Alta** – i brødtekst og i JSON-LD.
Raus og Tåkt oppgir begge **Markedsgata 6, 9510 Alta**, og Tåkt ligger i kjelleren
under Raus med inngang gjennom restauranten. Alibi ligger vegg i vegg med Tåkt i
samme kjeller. Da kan ikke begge adressene stemme.

**Gjør dette:** ikke endre adressen på egen hånd. Legg inn
`<!-- PLACEHOLDER: adresse må bekreftes – se TODO P15 -->` ved adressen i brødteksten
og ved `address` i JSON-LD, og opprett **P15** i `docs/TODO.md` med hele konflikten
beskrevet, inkludert at den også står i menyen som er sendt kunden. Dette skal
avklares før lansering – feil adresse i JSON-LD ender i Google Maps og Google
Business.

---

## Oppgave 6 – Meta og strukturerte data

- Legg til `og:site_name` («Alibi»), `og:locale` («nb_NO») og `og:type` («website»),
  og `twitter:card` = `summary_large_image`. Søstersidene har alle disse.
- Utvid JSON-LD (`BarOrPub`):
  - `parentOrganization` → Æventyr, med `url: https://aeventyr.no/nb/`
  - `sameAs` → legges inn når Alibis egne kontoer finnes (PLACEHOLDER så lenge)
  - behold `address`, med plassholder-kommentaren fra oppgave 5
- **Ikke** legg inn `meta keywords` – den har ingen effekt, selv om søstersidene har
  den.
- **Ikke rør** `<meta name="robots" content="noindex">` på previewen. Den skal stå til
  lanseringsrunden, og kommentaren som skiller den fra 404-sidens permanente noindex
  skal fortsatt være tydelig.

---

## Kvalitetsgulv – gjelder hele runden

- Ren HTML/CSS/vanilla JS. **Ingen** nye avhengigheter, ingen npm, ingen CDN, ingen
  ikonbibliotek. Trenger du et ikon, tegn det i SVG.
- Lighthouse ≥ 95 på alle fire kategoriene. Mål før og etter med
  `python -m http.server 8000` +
  `npx lighthouse http://localhost:8000 --quiet --chrome-flags="--headless=new"`,
  og skriv begge målingene i changeloggen. Går Performance ned, finn ut hvorfor før
  du er ferdig.
- WCAG AA: kontrast på alt nytt (messing på brunsort ≈ 7,7:1 er OK, sjekk nye
  kombinasjoner), synlig fokus, semantisk HTML, skip-lenke intakt.
- Bevegelse: kun `transform`/`opacity`, alt gated bak `html.js-klar`, alt statisk ved
  `prefers-reduced-motion`. Fortsatt **maks én** flimrende lyskilde på siden.
- Døra: alt innhold ligger crawlbart i DOM-en bak overlayet. Ny «Huset»-seksjon skal
  også ligge bak døra, ikke utenfor.
- Test manuelt før du er ferdig: dør med tastatur, Bakrommets tre veier inn,
  redusert bevegelse, og alle nye lenker (klikk dem).

---

## Sporbarhet – ikke valgfritt

Følg reglene i `CLAUDE.md`:

1. `docs/CHANGELOG.md` – ny seksjon for runde 7 (Lagt til / Endret / Rettet / Fjernet),
   med begge Lighthouse-målingene.
2. `docs/DECISIONS.md` – nummererte beslutninger for: logotypen som SVG-fil,
   plasseringen av stedsbytteren på mobil, dørplata (logo eller ikke), og eventuelle
   avvik fra denne bestillingen.
3. `docs/PROMPTS.md` – hva som ble bestilt, hva som ble levert, hva som avvek.
   Arkiver denne prompten som `docs/prompts/runde-7-logo-og-familie.md`.
4. `docs/TODO.md` – P13 lukkes med dato. Nye punkter opprettes: P15 (adressekonflikt),
   foto av Raus og Tåkt til «Huset», Alibis egne sosiale kontoer, vilkår/personvern.
   Plassholder-tabellen skal stemme med `grep PLACEHOLDER`.
5. Commits underveis etter konvensjonen (norsk beskrivelse, engelsk type), én per
   logisk endring. Tagg til slutt `runde-7`.

## Sluttrapport til Kim

Kort og konkret: hva ble gjort, hvilke beslutninger du tok på egen hånd og hvorfor,
hva som ble målt (Lighthouse før/etter), hva som gjenstår, og – viktigst – **hva du
er usikker på**. Hvis noe i denne bestillingen viste seg å være feil eller dumt, si
det rett ut i stedet for å bygge det.
