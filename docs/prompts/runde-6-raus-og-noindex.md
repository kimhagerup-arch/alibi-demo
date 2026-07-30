# Prompt til Claude Code – Alibi, runde 6: Raus og noindex (lim inn hele denne)

Liten runde med to oppgaver. Følg sporbarhetsreglene i CLAUDE.md som vanlig, og arkiver denne prompten i docs/prompts/. Commit og push til origin main når du er ferdig (Vercel-previewen oppdateres automatisk fra main).

## 1. Restaurant Raus inn i stedsbeskrivelsen

Ny faktainformasjon om huset: **Restaurant Raus** ligger på gateplan og eies også av Æventyr. **Tåkt ligger i kjelleren under Raus**, og Alibi ligger vegg i vegg med Tåkt i samme kjeller. Raus er dermed landemerket man ser fra gata. Lenke til Raus: `https://raussocial.no/no`.

- **«Finn oss»:** Skriv om avsnittet så Raus blir veiviseren. Behold tonen og bassen-detaljen. Retning, omtrent: «Finn restaurant Raus. Under den ligger kjelleren vår – hører du bassen, er det Tåkt; nattklubben og vi deler kjeller, vegg i vegg. De tar seg av dansingen, vi tar oss av samtalen. Vår dør er den rolige.» Juster fritt så det flyter, men geografien må stemme: Raus oppe, Tåkt og Alibi nede.
- Gjør «Raus» til en diskret lenke i samme stil som Tåkt-lenken (`.taakt-nevnt`-mønsteret – vurder å døpe klassen om til noe generisk som `.soster-lenke` siden den nå brukes om flere), ny fane + noopener + sr-only.
- **Footer:** Utvid familielinja så alle tre nevnes, f.eks.: «Tåkt og Raus bor i samme hus.» – med begge som lenker i samme stil. Hold det på én linje, footeren skal forbli rolig.
- Vurder om JSON-LD-schemaet bør nevne beliggenheten (f.eks. «I kjelleren under restaurant Raus» i description-feltet) – gjør det hvis det er en naturlig énlinjers endring.

## 2. noindex på preview (glemt før push)

Legg i `<head>`, rett under viewport-metaen:

```html
<!-- PLACEHOLDER: fjernes ved lansering på ekte domene -->
<meta name="robots" content="noindex">
```

Før den inn som egen rad i TODO-tabellen med tydelig merknad «MÅ fjernes ved lansering», slik at den fanges opp i lanseringsrunden. Siden ligger allerede live på alibi-demo.vercel.app uten noindex, så denne skal ut med første push.

## 3. Kontroll og avslutning

- `node --check` på JS (uendret, for ordens skyld), sjekk at begge nye lenker svarer HTTP 200 hvis nettverk er tilgjengelig.
- Les gjennom «Finn oss» høyt for deg selv: geografien skal være umiddelbart forståelig for en som står på gata i Alta.
- Commit etter konvensjonen, push til origin main, kort sluttrapport.
