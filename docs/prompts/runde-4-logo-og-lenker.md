# Prompt til Claude Code – Alibi, runde 4: logo og ekte lenker (lim inn hele denne)

Liten, presis runde. Følg sporbarhetsreglene i CLAUDE.md som vanlig (changelog, beslutninger ved behov, promptlogg, TODO à jour, commits underveis). Arkiver denne prompten i docs/prompts/.

## 1. Æventyr-logoen inn i footeren

- Kopier logofilen fra `C:\Users\kimha\Desktop\Business\KOVISION\alibi-lagring\Æventyr_Gold.svg` inn i repoet som `assets/aeventyr-gold.svg` (ASCII-filnavn – Æ i filnavn kan feile på enkelte webservere/URL-er).
- Bruk den i footeren: erstatt tekstordet «Æventyr» i «Et Æventyr-sted» med logoen som `<img>`, ca. 90–120 px bred, vertikalt justert med teksten rundt. `alt="Æventyr"`. Behold setningsstrukturen («Et [logo]-sted») hvis det lar seg gjøre pent – hvis ikke, sett logoen på egen linje over «-sted»-teksten justert til noe som «Et sted fra Æventyr».
- Ikke endre logofargen (#CA9F68) – det er merkevarens gull, selv om den avviker litt fra sidens messing. Sørg for at den ligger på den mørke bunnen med god kontrast.
- Gjør logoen til en lenke til `https://aeventyr.no/nb/` (åpnes i ny fane, `rel="noopener"`, med sr-only-tekst «(åpnes i ny fane)» som på Maps-lenken).

## 2. Ekte lenker

- **Tåkt:** `https://raussocial.no/no/takt`. Koble den på begge steder Tåkt nevnes:
  - Footer: `<span>`-en byttes tilbake til en ekte `<a>` med denne URL-en (ny fane + noopener + sr-only, samme mønster).
  - «Finn oss»: gjør ordet «Tåkt» i bassen-avsnittet til en lenke med samme stil som `.taakt-nevnt` har i dag – lenken skal ikke skrike, bare være der for den som leter.
- Fjern/oppdater tilhørende PLACEHOLDER-kommentarer og lukk de aktuelle radene i TODO-tabellen (med dato, jf. reglene).

## 3. Mål det som aldri er målt

TODO-en noterer ærlig at Lighthouse 95+ aldri er verifisert. Gjør det nå hvis miljøet tillater det (f.eks. `npx lighthouse http://localhost:8000 --quiet` mot en lokal server, eller tilsvarende). Loggfør faktiske tall i TODO/CHANGELOG. Får du ikke kjørt Lighthouse i miljøet, skriv i TODO nøyaktig hvilken kommando brukeren kan kjøre selv, og la punktet stå åpent.

## 4. Kontroll til slutt

- `node --check` på JS, og verifiser at alle nye lenker svarer med rimelig status hvis nettverk er tilgjengelig (ellers: noter at de er ubekreftet).
- Sjekk at logoen skalerer pent på 360 px-viewport og at footeren fortsatt er balansert.
- Kort sluttrapport: hva som ble gjort, TODO-rader som ble lukket, og eventuelle Lighthouse-tall.
