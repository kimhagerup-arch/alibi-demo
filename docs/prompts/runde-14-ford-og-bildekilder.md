# Alibi – runde 14: ford-bildet og bildekilder

Liten runde. Følg CLAUDE.md og sporbarhetsreglene. Neste ledige rundenummer (trolig 14),
`git status` rent – ellers stopp.

1. **Bildekilder:** dame, par-dans og ford er fra Pexels (https://www.pexels.com/nb-no/),
   samme lisens som de andre bildene. Oppdater docs/BILDEKILDER.md (fjern «oppgis av Kim»)
   og lukk lanseringskravet om kilde/lisens i TODO.
2. **ford.jpg:**
   - Beskjær strammere slik at hånda og jakkeermet øverst til høyre er helt ute. Skiltet skal
     fortsatt være ute. Behold 4:5, grill og lykter i fokus.
   - Reduser filstørrelsen **kun for ford**: prøv WebP q≈65 og lett støyfjerning før eksport
     (i `tools/eksporter-bilder.py`, som egen innstilling per bilde). Mål: 640 ≤ 80 kB og
     800 ≤ 110 kB. Sammenlign før/etter visuelt i 281 px og 288 px visning; rapporter hvis
     grillnettet får synlige artefakter, og velg da nærmeste kvalitet som ser ren ut.
   - Sjekk alle eksporterte ford-varianter: ingen skilt, ingen hånd/erme.
3. **Verifisering:** skjermbilder av båndet på 1440 og 375 px i
   `alibi-skjermbilder\runde-14\`, filstørrelser før/etter, Lighthouse mobil (Performance
   95+, Accessibility 100, CLS uendret).
4. **Sporbarhet:** CHANGELOG, TODO («Sist verifisert»), oppdater #29 hvis nødvendig,
   PROMPTS.md + arkiver prompten, tag runden, push.
