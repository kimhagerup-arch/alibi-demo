# Runde 10 – 2026-09-23 – Tekstjusteringer (bar, materialer, pris, skjult meny)

Arkivert ordrett.

---

Liten, avgrenset runde med tekstendringer. Ingen nye funksjoner, ingen designendringer.
Følg CLAUDE.md, inkludert sporbarhetsreglene.

## 0. Før du starter

- Les `CLAUDE.md` og `docs/CHANGELOG.md`. **Bruk neste ledige rundenummer** (siste runde i
  changeloggen + 1) – ikke anta det.
- `git status` skal være rent. Er det ikke, stopp og rapporter.

## 1. «Historien»: pub → bar, og ny materialbeskrivelse

I andre avsnitt i `#historien`:

- «En pub i en kjeller i Alta sentrum» → «En **bar** i en kjeller i Alta sentrum»
- «levende lys, messing som har fått lov til å mørkne» →
  «**dimmet lys og tre som har fått lov til å mørkne**»

Resten av avsnittet står urørt.

**Konsekvens:** Alibi omtales heretter som *bar*, ikke *pub*. Søk opp (`grep -in "pub"`) alle
steder der Alibi kalles pub i **synlig tekst og metadata** – blant annet kortet i «Huset»
(«Pub i samme kjeller …»), `<title>`/`description`/Open Graph og JSON-LD-beskrivelsen – og
bytt til bar der det gir god norsk. Rett også prosjektbeskrivelsen i `CLAUDE.md`
(«speakeasy-pub», «Alibi er puben»).

- **Ikke** endre JSON-LD-typen `BarOrPub` – den er riktig schema.org-type.
- List **hver** forekomst du endret (fil + gammel → ny tekst) i sluttrapporten.

## 2. «Huset»: undertittel

«Spis oppe. Dans ved siden av. Snakk her.» →
«Spis oppe. **Nattklubb** ved siden av. Snakk her.»

Ikke endre noe annet i seksjonen.

## 3. Menyen: priser og glass

Gjelder **alle** drinker – både hovedmenyen og den skjulte menyen:

- Pris: `kr —` → **`kr 159`** på alle kort (samme formatering/element som i dag).
- Fjern glasstypen fra spesifikasjonslinja, behold mengden:
  «VINGLASS · 30 CL» → «30 CL», «HIGHBALL · 25 CL» → «25 CL», «ROCKS · 15 CL» → «15 CL» osv.
  Fjern også skilletegnet `·` som blir hengende igjen.
- **Glass-ikonet beholdes** som dekor. Sørg for at det er `aria-hidden="true"` og ikke har
  alt-tekst/tittel som leser opp glasstypen – skjermlesere skal kun høre mengden.
- Navn, ingredienslinje og beskrivelser står urørt (de byttes når ekte meny kommer).
- PLACEHOLDER-kommentarene for menyen (P5, P6) **blir stående** – prisen er midlertidig.

## 4. «Bakrommet» → «skjult meny» i synlig tekst

All tekst brukeren ser som omtaler Bakrommet/«et bakrom» skrives om til **skjult meny**
(overskrift, ingress, knapp-/feltetiketter, feil-/suksessmeldinger, sr-only-tekst,
eventuelle `aria-label`). Formuler i sidens tone – lavmælt og konspiratorisk – og bøy riktig
(«den skjulte menyen», «Lås opp den skjulte menyen» e.l.).

**Ikke** endre interne navn: klasser (`.bakrom-liste` o.l.), ID-er, JS-variabler og
`sessionStorage`-nøkkelen `alibi-bakrom` beholdes – å bytte dem gir bare risiko uten gevinst.
Dokumentasjonen kan fortsatt bruke «Bakrommet» som internt navn, men nevn i CLAUDE.md at
den heter «skjult meny» på siden.

List alle endrede strenger (gammel → ny) i sluttrapporten.

## 5. Verifisering

- `grep -in "pub"` og `grep -in "bakrom"` i `index.html` og `js/main.js`: bare interne
  navn/`BarOrPub` skal gjenstå. Rapporter treffene.
- Alle menykort viser `kr 159` og kun mengde. Sjekk både hovedmeny og opplåst skjult meny.
- Test at den skjulte menyen fortsatt låses opp på alle tre veier (inline-felt, passord ved
  døra, taste-easter-egget) – `sessionStorage.clear()` mellom forsøkene.
- Sjekk at ingen menykort har fått ujevn høyde eller brutt layout når glassordet forsvant
  (desktop og 375 px mobil).
- `grep PLACEHOLDER` – antallet skal være uendret.

## 6. Sporbarhet og levering

- Commits etter konvensjonen, én per logisk endring, f.eks.:
  - `fix: kall Alibi bar i stedet for pub`
  - `fix: nytt materialbilde i historien`
  - `fix: nattklubb i undertittelen i huset`
  - `feat: fast pris 159 kr og kun mengde på menykortene`
  - `fix: kall bakrommet skjult meny i synlig tekst`
  - `docs: oppdater changelog, beslutninger, promptlogg og todo`
- `docs/CHANGELOG.md`: ny runde med Endret-punkter.
- `docs/DECISIONS.md`: ny beslutning om (a) Alibi = bar, ikke pub, og (b) «skjult meny» i
  synlig tekst med interne navn beholdt.
- `docs/TODO.md`: P5/P6 fortsatt åpne, men noter at prisene er midlertidig satt til 159 kr og
  at glasstype ikke skal vises. Oppdater «Sist verifisert mot koden».
- `docs/PROMPTS.md` + arkiver denne prompten i `docs/prompts/`.
- Tag runden (`runde-N`), push til origin main (Vercel bygger previewen).
- Sluttrapport: hva som ble endret (med listene over), beslutninger, hva som står igjen.
