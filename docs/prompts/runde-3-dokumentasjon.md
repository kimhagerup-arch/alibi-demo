# Prompt til Claude Code – Dokumentasjon og full sporbarhet (gjenbrukbar mal)

> **Slik brukes denne:** Lim inn hele prompten i Claude Code i et hvilket som helst prosjekt.
> Den er selvoppdagende – CC leser repoet og fyller inn prosjektdetaljene selv.
> Kjør den én gang per prosjekt; etterpå vedlikeholder CC dokumentasjonen automatisk
> fordi reglene legges i CLAUDE.md.

---

Du skal sette opp et komplett dokumentasjons- og sporbarhetssystem for dette prosjektet, og deretter fylle det med det som allerede er gjort. Les hele repoet først (alle filer, kommentarer og eventuell git-historikk) så du forstår hva prosjektet er, hvilke beslutninger som er tatt, og hva som gjenstår. Ikke endre funksjonalitet eller design i denne kjøringen – kun dokumentasjon og struktur.

## 1. Opprett disse filene

**`CLAUDE.md`** (i rota) – prosjektets hukommelse og regelbok, som du og fremtidige CC-økter leser automatisk. Skal inneholde:
- Kort prosjektbeskrivelse: hva dette er, for hvem, teknisk stack, hvordan kjøre lokalt og deploye.
- Viktige konvensjoner og føringer (designretning, tone, tekniske valg som IKKE skal endres uten eksplisitt beskjed).
- **Sporbarhetsreglene** (se punkt 3) – slik at hver eneste fremtidige økt følger dem uten å bli bedt om det.

**`docs/CHANGELOG.md`** – etter «Keep a Changelog»-formatet, nyeste øverst. Én seksjon per arbeidsøkt/runde med dato, med underpunkter for Lagt til / Endret / Rettet / Fjernet. Rekonstruer historikken så godt du kan fra repoet og kommentarene for det som allerede er gjort.

**`docs/DECISIONS.md`** – beslutningslogg (lettvekts-ADR). Én nummerert oppføring per vesentlig valg: dato, beslutning, begrunnelse, alternativer som ble vurdert/forkastet, og status (gjeldende/erstattet av #N). Rekonstruer beslutningene som ligger implisitt i koden (valg av stack, arkitektur, sentrale funksjonsvalg, ting som bevisst er utelatt).

**`docs/PROMPTS.md`** – promptlogg for AI-sporbarhet. Én oppføring per CC-kjøring: dato, kort sammendrag av hva prompten ba om, hva som faktisk ble gjort, og avvik fra bestillingen. Legg inn oppføringer for kjøringene som allerede er gjennomført (inkludert denne). Hvis promptfiler finnes i repoet, lenk til dem; foreslå gjerne en `docs/prompts/`-mappe der fremtidige prompter arkiveres som egne filer.

**`docs/TODO.md`** – strukturert restanseliste i tre deler:
1. **Plassholdere:** en komplett tabell over ALT som er merket som plassholder eller midlertidig i koden (søk grundig: `PLACEHOLDER`, `TODO`, `FIXME`, «kommer», dummy-verdier, tomme lenker). Kolonner: hva, hvor (fil/seksjon), hva som trengs for å lukke den, status.
2. **Kjente svakheter/gjeld:** ting som fungerer, men bør forbedres.
3. **Ideer/backlog:** ting som er nevnt, men ikke besluttet.

**`docs/ONBOARDING.md`** – «ny person»-testen: en kort side som gjør at et menneske (eller en AI) uten forkunnskap kan forstå prosjektet, kjøre det lokalt, vite hvor alt ligger, og trygt gjøre sin første endring. Lenk til de andre dokumentene fremfor å gjenta dem.

Oppdater `README.md` slik at den peker til docs-strukturen, uten å duplisere innholdet.

## 2. Git-sporbarhet

- Hvis repoet ikke er initialisert: kjør `git init`, lag en fornuftig `.gitignore`, og gjør en første commit av eksisterende tilstand merket som baseline.
- Foreslå og dokumentér (i CLAUDE.md) en commit-konvensjon: Conventional Commits på norsk eller engelsk (velg én og vær konsekvent), med typene feat/fix/docs/style/refactor/chore.
- Fra nå av: én commit per logisk endring, aldri én diger commit per økt. Tag gjerne milepæler (`runde-1`, `runde-2`, …).

## 3. Sporbarhetsreglene (skrives inn i CLAUDE.md, gjelder alle fremtidige økter)

Hver arbeidsøkt skal, uten å bli bedt om det, avsluttes med:
1. Nye oppføringer i CHANGELOG (hva), DECISIONS (hvorfor, hvis vesentlige valg ble tatt) og PROMPTS (bestilling vs. levert).
2. Oppdatert TODO: lukkede punkter markeres med dato, nye punkter legges til. Plassholder-tabellen skal alltid stemme med koden.
3. Commits underveis etter konvensjonen, med beskrivende meldinger.
4. En kort sluttrapport til brukeren: hva ble gjort, hvilke beslutninger ble tatt, hva står igjen.
Regel: dersom kode og dokumentasjon er i utakt, er det dokumentasjonen som er feil og skal rettes i samme økt. Ingen endring er ferdig før den er sporbar.

## 4. Til slutt i denne kjøringen

- Verifiser at alle dokumentene lenker riktig til hverandre og at ingenting i repoet er udokumentert.
- Gi en sluttrapport: hvilke filer som ble opprettet, hvor mange plassholdere som ble funnet, hvilke beslutninger som ble rekonstruert, og hva du var usikker på (merk usikre rekonstruksjoner med «(antatt)» i dokumentene, så brukeren kan korrigere).
