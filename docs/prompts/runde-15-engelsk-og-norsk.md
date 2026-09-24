# Alibi – runde 15: engelsk og norsk, engelsk først (på dev-gren)

Følg CLAUDE.md, inkludert sporbarhetsreglene, bilderegelen og kvalitetsgulvet
(WCAG AA, Lighthouse 95+, ingen runtime-avhengigheter).

## 0. Før du starter – ny arbeidsflyt med dev-gren

Kunden har allerede lenken `alibi-demo.vercel.app`, som viser `main`. Den skal **ikke** vise
halvferdig arbeid. Fra nå av:

- `main` = det kunden ser. Endres **kun** når Kim eksplisitt sier «slå sammen til main».
- `dev` = utviklingsgrenen. Alt arbeid i denne runden skjer her.

Gjør dette først:
1. Les `CLAUDE.md`, `docs/CHANGELOG.md`, `docs/TODO.md` og `docs/DECISIONS.md`.
   Bruk neste ledige rundenummer (trolig 15). `git status` skal være rent – ellers stopp.
2. Sjekk at du står på oppdatert `main` (`git pull`), og lag så grenen:
   `git checkout -b dev` (finnes den allerede: `git checkout dev` og `git merge main`).
3. Push grenen: `git push -u origin dev`. Vercel lager da en egen forhåndsvisning for grenen.
   Finn URL-en (Vercel-dashboardet eller `vercel`-CLI hvis tilgjengelig, ellers mønsteret
   `alibi-demo-git-dev-<team>.vercel.app`) og rapporter den. Klarer du ikke å finne den,
   si det – Kim finner den under Deployments i Vercel.
4. **Bekreft** at produksjonsgrenen i Vercel er `main` (Settings → Git → Production Branch),
   hvis du har tilgang. Ellers: noter at Kim må sjekke det.
5. Legg arbeidsflyten inn i `CLAUDE.md` som fast regel: utvikling på `dev`, aldri push eller
   merge til `main` uten eksplisitt beskjed fra Kim, runde-tagger settes først når runden er
   slått sammen til `main`.
6. **Dette er en større runde.** Lag først en kort plan (filstruktur, hvordan tekstene holdes
   i synk, hva JS-en må endre) og skriv den i rapporten, men gå videre uten å vente på svar.

## 1. Mål

Siden skal finnes på engelsk og norsk. **Engelsk er standard**, fordi Alibi først og fremst
retter seg mot turister og hotellgjester. Første besøk på hovedadressen viser engelsk.

## 2. URL-struktur

- `/` = engelsk (`<html lang="en">`)
- `/no/` = norsk (`<html lang="nb">`)
- Seksjons-ID-ene (`#historien`, `#menyen` osv.) beholdes like i begge språk, så JS og ankere
  virker uendret.
- **Husket språkvalg:** når gjesten velger språk i menyen, lagres det i `localStorage`
  (`alibi-sprak`). Har gjesten valgt norsk tidligere og kommer til `/`, sendes hen til `/no/`
  med et lite inline-skript i `<head>` (samme prinsipp som dørskriptet, så ingenting blinker).
  **Ingen automatisk gjetting ut fra nettleserspråk**, og ingen omdirigering uten lagret valg.
  Søkeroboter skal alltid få siden de ber om. Pakk `localStorage` i try/catch.
- `404.html`: én felles side med tekst på begge språk (engelsk først), og lenker til begge
  forsidene.

## 3. Holde språkene i synk (viktig for driften)

Menyen og prisene skal endres ofte, og da må det skje **ett sted**, ikke i to HTML-filer.
- **Anbefalt:** en liten generator i `tools/` (Python, som `eksporter-bilder.py`) som bygger
  `index.html` og `no/index.html` fra én felles mal + språkfiler (f.eks. `tekst/en.json` og
  `tekst/nb.json`) + én felles menyfil (navn, ingredienser, mengde og pris felles; beskrivelser
  per språk). **De genererte HTML-filene commites**, så Vercel fortsatt bare serverer statiske
  filer og det ikke finnes noe byggesteg på serveren. Dette er en endring av beslutning #1 –
  skriv en ny beslutning som forklarer hvorfor og hvordan.
- Velger du heller to håndskrevne filer: lag da et kontrollskript som feiler hvis strukturen,
  ID-ene eller menyen avviker mellom språkene. Begrunn valget.
- Dokumenter i README og CLAUDE.md nøyaktig hvordan man endrer en tekst eller en drink.

## 4. Oversettelse

- Oversett **all** synlig tekst, alt-tekster, `aria-label`, sr-only-tekster, meta
  (`<title>`, description, Open Graph) og JSON-LD-beskrivelsen.
- **Tone:** samme som på norsk – lavmælt, konspiratorisk, glimt i øyet, britisk-nøytral
  engelsk, ingen amerikansk salgsspråk eller utropstegn. Eksempler på nivå:
  «Bank på døra.» → «Knock on the door.», «Gå rett inn» → «Walk straight in»,
  «Har du et passord?» → «Got a password?», «Du fant oss.» → «You found us.»,
  «Den skjulte menyen» → «The hidden menu», «Feil dør» → «Wrong door».
- **Beholdes uoversatt:** Alibi, Raus, Tåkt, Æventyr, Canyon Hotell, Gargia Lodge, Måsa,
  drinknavn og adresser.
- **Priser på engelsk:** «NOK 159» (norsk beholder «kr 159»). Mengde «30 cl» likt.
- **Alkoholreglene gjelder også den engelske teksten.** Ikke gjør drinkbeskrivelsene mer
  selgende i oversettelsen.
- Lag en liste i rapporten over formuleringer du var usikker på, så Kim kan sjekke dem.

## 5. Språkvelgeren

- Plassering: i toppmenyen, helt til høyre (etter RAUS · TÅKT), på alle bredder. På mobil
  i øverste rad ved siden av RAUS · TÅKT, **uten at headeren blir høyere enn i dag**.
- Utseende: knapp med lite flagg + kode for gjeldende språk (f.eks. britisk flagg + «EN» og
  en liten pil). Den åpner en nedtrekksliste med «English» og «Norsk», hver med flagg.
  - Flaggene lages som **små inline-SVG-er** (ikke emoji og ikke bildefiler), ca. 16 × 12 px,
    med dempede farger/lav metning så de passer paletten. Teksten (EN/NO, English/Norsk)
    skal alltid stå ved siden av. Flagg alene er ikke nok.
- Oppførsel og tilgjengelighet:
  - Bygges med `<details>`/`<summary>` eller en knapp med `aria-expanded`, slik at den
    virker uten JS (lenkene til begge språk finnes i HTML-en).
  - Esc lukker, klikk utenfor lukker, synlig fokus, touch-mål min. 44 × 44 px.
  - Hver lenke har `hreflang` og `lang`, og gjeldende språk er markert (`aria-current`).
  - Valg lagrer `alibi-sprak` (se punkt 2).
- **Også på bankedøra:** en diskret språklenke i raden med «Walk straight in · Got a password? ·
  Sound: off» (f.eks. «Norsk» / «English»), så en norsk gjest kan bytte før hen går inn.
  Døra skal ikke vises på nytt når man bytter språk i samme økt.

## 6. JavaScript

- Alle tekster JS skriver ut (suksess- og feilmeldinger for passord, lyd av/på, osv.) hentes
  per språk – f.eks. fra `data-`-attributter eller et lite ordbokobjekt valgt ut fra
  `document.documentElement.lang`. Ingen norske strenger skal dukke opp på engelsk side.
- **Passordet:** godta både `æventyr` og `aeventyr` (og tilsvarende for taste-easter-egget),
  ellers kommer ikke turister med engelsk tastatur inn. Normaliser æ → ae før sammenligning.
  Passordet ligger fortsatt ett sted (`ALIBI_PASSORD`).
- `sessionStorage`-nøklene deles mellom språkene (dør og skjult meny huskes på tvers).

## 7. SEO

- `hreflang` i `<head>` på begge sider: `en` → `/`, `nb` → `/no/`, `x-default` → `/`.
- `og:locale` (`en_GB` / `nb_NO`) med `og:locale:alternate`, og egen title/description per språk.
- JSON-LD per side med `inLanguage`. `containedInPlace` og øvrig struktur likt.
- `sitemap.xml`: oppdater (eller opprett) med begge URL-ene og `xhtml:link`-alternativer.
- Canonical (P2) og noindex (P14) håndteres fortsatt ved lansering, men forbered at hver side
  får **selvrefererende** canonical. Oppdater P2-teksten i TODO. noindex skal stå på begge sider.
- **Søsterlenker:** sjekk om søstrene har engelske sider med HTTP 200 (f.eks. raussocial.no/en,
  canyonhotell.no/en, gargialodge.no/en/winter, aeventyr.no/en). Bruk dem på den engelske
  siden hvis de finnes, ellers de norske. Rapporter hva du fant.

## 8. Verifisering

Test lokalt og på **dev-forhåndsvisningen**, ikke på `alibi-demo.vercel.app`.
- Skjermbilder av begge språk på 1440 og 375 px (dør, topp med språkvelger åpen og lukket,
  meny, footer) i `C:\Users\kimha\Desktop\Business\KOVISION\alibi-skjermbilder\runde-15\`.
- Test med tom `localStorage`: `/` viser engelsk. Velg norsk → `/no/`. Gå til `/` → havner på
  `/no/` uten blink. Velg engelsk → `/` og blir der.
- Språkvelgeren: tastatur (Tab, Enter, Esc), skjermleser-navn, virker uten JS.
- Skjult meny låses opp med både `æventyr` og `aeventyr` på begge språk, på alle tre veier.
- Søk etter norske ord på den engelske siden (f.eks. «og», «på», «kr », «døra») og rapporter
  treffene. Bare egennavn skal gjenstå.
- Ingen horisontal rulling på 375 px. Headerhøyden på mobil er uendret (rapporter mål).
- Lighthouse mobil på **begge** sider: Performance 95+, Accessibility 100, Best Practices 100.
  Rapporter tallene, LCP og CLS.
- Generatoren (hvis valgt): kjør den og bekreft at `git diff` er tom etterpå (utdata i synk).
- **Bekreft at `alibi-demo.vercel.app` er uendret** etter push (samme innhold som før runden,
  kun norsk).

## 9. Sporbarhet og levering

- Commits etter konvensjonen, gjerne én per logisk del (struktur/generator, oversettelse,
  språkvelger, JS, SEO, docs). **Alt på `dev`.**
- CHANGELOG (runde 15, merket «på dev, ikke slått sammen til main»), DECISIONS (ny beslutning
  om språkstruktur og engelsk som standard, om generatoren endrer #1, og om dev/main-flyten),
  TODO (nye punkter: Kim kontrollerer engelsk tekst; engelske søsterlenker hvis de mangler;
  «Sist verifisert»), README/CLAUDE.md/ONBOARDING (hvordan man endrer tekst og meny på to
  språk, og dev/main-flyten), PROMPTS.md + arkiver prompten.
- `git push origin dev`. **Ikke** push til `main`, **ikke** merge, **ikke** tag.
- Sluttrapport: URL til dev-forhåndsvisningen, valgt løsning og hvorfor, filstruktur, liste
  over usikre oversettelser, søsterlenkene, testresultater og Lighthouse for begge språk,
  bekreftelse på at main er urørt, og hvor skjermbildene ligger.
