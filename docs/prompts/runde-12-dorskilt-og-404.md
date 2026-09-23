# Runde 12 – 2026-09-23 – Dørskiltet og logo på 404

Arkivert ordrett.

---

# Alibi – runde 12: dørskiltet og logo på 404

Liten, avgrenset runde. Følg CLAUDE.md, inkludert sporbarhetsreglene.
Les CLAUDE.md, docs/CHANGELOG.md og docs/TODO.md først. Bruk neste ledige rundenummer
(trolig 12). `git status` skal være rent – ellers stopp og rapporter.

## 1. Dørskiltet (messingplata på bankedøra)

**Problem (sett i nettleser, 1440 px):** Skiltet er for lite til ordmerket. Den lange
A-streken bestemmer høyden, så «LIBI» blir bitteliten og ligger forskjøvet til venstre.
Skiltet står dessuten over overkanten på det øvre dørfeltet (halvt på feltet, halvt på
rammen), rett under kikkhullsluka, og ser feilplassert ut.

**Løsning:**
- **Plassering:** Skiltet skal stå helt innenfor ett rolig område på døra – enten sentrert
  i mellomrommet mellom kikkhullsluka og det øvre feltet, eller sentrert *i* det øvre
  feltet. Det skal ikke krysse noen kant. Velg det som ser mest naturlig ut, og begrunn
  valget i rapporten.
- **Proporsjoner:** Gjør skiltet liggende (bredde ca. 2–2,5 × høyden) og stort nok til at
  «LIBI» får en versalhøyde på minst ca. 14 px på desktop og 11 px på 375 px.
  Dimensjoner etter versalhøyden. A-streken får gå nesten til kanten av plata i høyden, med
  jevn innvendig luft, men skal **ikke** klippes.
- **Sentrering:** Ordmerket skal være optisk sentrert på plata. Mål på «LIBI» + A-benet,
  ikke på SVG-boksen – den lange streken gjør at boksen skjevt ut til venstre.
- **Uttrykk:** Behold den mørke, graverte stilen i messingen, samme SVG (`<use>` av
  `alibi-ordmerke`). Kontrast mellom gravering og plate min. 3:1.
- **Skalering:** Skiltet skal skalere sammen med døra (samme enhet/prosent som døra bruker),
  så forholdet er likt på alle bredder.
- **Tilgjengelighet:** Døra skal fortsatt ha tilgjengelig navn «Alibi» som i dag.
  Bankeanimasjon, tre bank, «Gå rett inn», passord og lyd skal virke som før.

## 2. Logo på 404-siden

- Legg ordmerket (samme symbol, `currentColor`, gull) sentrert over «FEIL DØR»:
  liten og nøktern, versalhøyde ca. som «FEIL DØR»-teksten, ikke større.
  Den skal lenke til forsiden, med `aria-label="Alibi – til forsiden"`.
- Ikke rør resten av 404-siden.

## 3. Verifisering

- Skjermbilder av døra på 1440, 768 og 375 px (før og etter), og av 404-siden på 1440 og
  375 px.
- Døra fungerer som før: tre bank åpner, «Gå rett inn», passord ved døra (skjult meny
  låses opp), lyd av/på, tastaturfokus synlig.
- Ingen layout-hopp når døra lastes (CLS uendret eller lavere). Lighthouse mobil fortsatt
  95+ på Performance og 100 på Accessibility.

## 4. Sporbarhet og levering

- Commits, f.eks. `fix: dørskiltet får plass til ordmerket` og `feat: ordmerke på 404`,
  og `docs: ...`.
- CHANGELOG (ny runde), DECISIONS hvis plasseringen av skiltet endres (oppdater #23),
  TODO («Sist verifisert mot koden»), PROMPTS.md + arkiver prompten i docs/prompts/.
- Tag runden, push til origin main.
- Sluttrapport: plassering og mål på skiltet (plate og versalhøyde per bredde), hva som
  ble endret på 404, testresultater, og hvor skjermbildene ligger.
