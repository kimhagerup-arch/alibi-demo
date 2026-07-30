# Prompt til Claude Code – Alibi, runde 7: finpuss i ventetiden (lim inn hele denne)

Liten runde mens vi venter på innhold fra kunden. To punkter fra «Kjente svakheter» i docs/TODO.md som kan lukkes uten kundeinnhold. Følg sporbarhetsreglene i CLAUDE.md, arkiver prompten i docs/prompts/, og push til origin main til slutt.

## 1. 404-side

Hostingen er valgt (Vercel nå, statisk hosting generelt senere), så 404-punktet i TODO kan lukkes:

- Lag `404.html` i rota – Vercel og de fleste statiske hoster plukker den opp automatisk.
- Samme palett, fonter og tone som resten: mørkt rom, en kort tekst i stil med «Denne døra finnes ikke. Men vår gjør.» og én tydelig lenke tilbake til forsiden («Tilbake til døra»).
- Hold den selvforsynt og lett: gjenbruk style.css, men siden skal fungere pent også om noen ser den isolert. Ingen dør-overlay her – rett på budskapet. Husk `<meta name="robots" content="noindex">` (404-sider skal aldri indekseres – denne skal IKKE fjernes ved lansering, noter det i koden så den ikke forveksles med P14).
- Sjekk at fontstiene og asset-stiene er riktige fra rot-nivå.

## 2. Favicon-fallback

- Generer en PNG-fallback av deco-«A»-faviconen (32×32 og 180×180 for apple-touch-icon) fra SVG-en, legg i assets/, og koble opp i `<head>`:
  - behold SVG-en som primær (`rel="icon" type="image/svg+xml"`),
  - legg til `rel="icon"` PNG 32×32 som fallback og `rel="apple-touch-icon"` 180×180.
- Har du ikke verktøy for SVG→PNG i miljøet: skriv nøyaktig kommando/verktøy Kim kan kjøre selv (f.eks. via Inkscape eller en nettbasert konverter), og la punktet stå åpent i TODO med den instruksen.

## 3. Kontroll og avslutning

- Verifiser 404-siden lokalt (`python -m http.server` og gå til en tullete URL – merk at Python-serveren ikke viser 404.html automatisk, så åpne `/404.html` direkte for visuell sjekk; Vercel håndterer selve rutingen).
- Sjekk kontrast og at siden fungerer uten JS.
- Lukk de aktuelle punktene i TODO med dato, commits etter konvensjonen, push, kort sluttrapport.
