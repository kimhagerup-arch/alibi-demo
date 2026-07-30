# CLAUDE.md – Alibi

Prosjektets hukommelse og regelbok. Leses automatisk av Claude Code i hver økt.
**Følg sporbarhetsreglene nederst i hver eneste økt, uten å bli bedt om det.**

## Hva dette er

Nettsiden til **Alibi** – en speakeasy-pub i en kjeller i Sentrumsparken 2, 9510 Alta,
drevet av **Æventyr** (samme eiere som nattklubben **Tåkt**, som ligger vegg i vegg
i samme kjeller – Tåkt er nattklubben, Alibi er puben). Målgruppen er et voksent
publikum som vil ha god samtale og gode cocktails i lavt tempo.

One-page statisk nettside med ankernavigasjon. Signaturgrepet er «Døra»: et
fullskjerms-overlay der besøkende banker tre ganger for å komme inn. Skjult
bonus: «Bakrommet» – en passordlåst del av menyen.

## Teknisk stack og drift

- **Ren HTML + CSS + vanilla JS.** Ingen rammeverk, ingen byggesteg, ingen
  eksterne avhengigheter overhodet (fontene selvhostes i `assets/fonts/`,
  se beslutning #14). Dette er et bevisst valg – ikke innfør npm, bundlere,
  CDN-er eller biblioteker uten eksplisitt beskjed.
- Kjøre lokalt: åpne `index.html`, eller `python -m http.server 8000`.
- Deploy: statisk hosting hvor som helst (Netlify/Vercel/GitHub Pages/one.com) –
  se `README.md`.
- Nullstille dør + Bakrom under testing: `sessionStorage.clear()` i konsollen.

## Filkart

| Fil | Innhold |
|---|---|
| `index.html` | Alt innhold. Plassholdere merket `<!-- PLACEHOLDER -->` |
| `css/style.css` | All stil. Palett/typografi som variabler i `:root` øverst |
| `js/main.js` | Døra, Bakrommet, bevegelseslaget. Passordet: `ALIBI_PASSORD` øverst |
| `assets/` | Favicon + fremtidige bilder/video (spesifisert i `README.md`) |
| `docs/` | Changelog, beslutninger, promptlogg, TODO, onboarding |

## Føringer som IKKE endres uten eksplisitt beskjed

- **Design:** varm, analog forbudstids-stemning. Palett: brunsort `#141110`,
  messing `#C9A227`, oksblod `#5E1F24`, røykgrønn `#3A4A3F`, kritt `#E8E0D0`.
  Typografi: Limelight (display, med måtehold) + Cormorant Garamond (brødtekst).
  Aldri ren svart bakgrunn med neonaksent, aldri blank «Gatsby-glamour».
  Æventyr-logoen i footeren beholder merkevarens gull `#CA9F68` – ikke
  «harmoniser» den med sidens messing (beslutning #13).
- **Tone:** norsk bokmål, lavmælt, konspiratorisk, glimt i øyet
  («Du fant oss.»). Aldri ropende salgstekst, ingen utropstegn-hype.
- **Døra:** forblir et overlay – ALT innhold skal ligge i DOM-en bak og være
  crawlbart. Døra betjenes med tastatur (den er en `<button>`), «Gå rett inn»-
  lenken skal alltid finnes, `sessionStorage` («alibi-inne») viser den én gang
  per økt.
- **Bevegelse:** kun `transform`/`opacity`. Alt gates bak `html.js-klar` som
  bare settes når JS kjører og brukeren ikke har `prefers-reduced-motion` –
  med redusert bevegelse vises alt statisk, ingenting skjules. Maks én
  flimrende lyskilde på siden (kammerlyset i hero-en).
- **Tilgjengelighet:** WCAG AA-kontrast (messing på brunsort ≈ 7,7:1 er OK;
  sjekk alt nytt), synlig fokus, semantisk HTML, skip-lenke.
- **Passordet** («æventyr») ligger som konstanten `ALIBI_PASSORD` øverst i
  `js/main.js` og brukes av både døra og Bakrommet. Bytt det kun der.
- **Plassholdere** merkes alltid `<!-- PLACEHOLDER: … -->` i koden OG føres inn
  i tabellen i `docs/TODO.md`.

## Commit-konvensjon

**Conventional Commits på norsk.** Typene er engelske, beskrivelsen norsk:

```
feat: legg til åpningstider i praktisk-seksjonen
fix: rett kontrast på inverterte menykort
docs: oppdater changelog for runde 3
style: juster luft rundt menykortene
refactor: trekk passordsjekken ut i egen funksjon
chore: oppdater .gitignore
```

- Én commit per logisk endring – aldri én diger commit per økt.
- Milepæler tagges: `runde-1`, `runde-2`, … (baseline-commiten er tagget
  `runde-2`; runde 1 ble gjort før git fantes og har ingen egen tag).

## Sporbarhetsreglene (gjelder ALLE økter)

Hver arbeidsøkt avsluttes med følgende, uten at brukeren ber om det:

1. **Nye oppføringer i:**
   - `docs/CHANGELOG.md` – hva som ble gjort (Lagt til/Endret/Rettet/Fjernet).
   - `docs/DECISIONS.md` – hvorfor, dersom vesentlige valg ble tatt
     (nummerert, med alternativer og status).
   - `docs/PROMPTS.md` – hva bestillingen var, hva som ble levert, og avvik.
     Arkiver selve prompten som egen fil i `docs/prompts/`.
2. **Oppdatert `docs/TODO.md`:** lukkede punkter markeres med dato, nye legges
   til. Plassholder-tabellen skal alltid stemme med koden (`grep PLACEHOLDER`).
3. **Commits underveis** etter konvensjonen over, med beskrivende meldinger.
4. **Kort sluttrapport til brukeren:** hva ble gjort, hvilke beslutninger ble
   tatt, hva står igjen.

**Regel:** Er kode og dokumentasjon i utakt, er det dokumentasjonen som er feil
og skal rettes i samme økt. Ingen endring er ferdig før den er sporbar.
