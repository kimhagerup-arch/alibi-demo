# Onboarding – Alibi

Kort intro for deg som er ny i prosjektet – menneske eller AI. Etter denne
siden skal du kunne forstå prosjektet, kjøre det lokalt og trygt gjøre din
første endring.

## Hva er dette?

Nettsiden til **Alibi**, en speakeasy-pub i en kjeller i Alta (drevet av
Æventyr, vegg i vegg med nattklubben Tåkt). Én statisk side i ren
HTML/CSS/JS – ingen rammeverk, ingen byggesteg. Signaturgrepet: besøkende
må «banke på» en dør for å komme inn, og et passord åpner en skjult del av
menyen («Bakrommet»).

Full prosjektbeskrivelse og alle føringer (design, tone, tekniske valg som
ligger fast): [`../CLAUDE.md`](../CLAUDE.md) – **les den før du endrer noe.**

## Kjøre lokalt

```bash
python -m http.server 8000    # eller: npx serve .
```

Åpne `http://localhost:8000`. Døra vises én gang per økt – kjør
`sessionStorage.clear()` i konsollen for å se den (og Bakrommet-låsen)
igjen. Passordet er `æventyr` (konstanten `ALIBI_PASSORD` øverst i
`js/main.js`).

## Hvor ligger alt?

- `index.html` – alt innhold, one-page. Alt midlertidig er merket
  `<!-- PLACEHOLDER -->`.
- `css/style.css` – all stil. Palett og typografi ligger som variabler i
  `:root` øverst; seksjonene er tydelig kommentert (døra, meny, Bakrommet,
  bevegelse).
- `js/main.js` – tre deler: døra, Bakrommet, bevegelseslaget.
- `assets/` – favicon; bilder/video kommer (spesifikasjoner i
  [`../README.md`](../README.md)).
- `docs/` – [CHANGELOG](CHANGELOG.md) (hva er gjort),
  [DECISIONS](DECISIONS.md) (hvorfor), [PROMPTS](PROMPTS.md) (AI-kjøringer),
  [TODO](TODO.md) (hva som gjenstår), [`prompts/`](prompts/) (arkiverte
  prompter).

## Din første endring – trygg løype

1. Finn oppgaven i [TODO.md](TODO.md) – f.eks. P8 (åpningstider): søk på
   `PLACEHOLDER` i `index.html`, bytt innholdet i `<dd>`-en, behold tonen
   (lavmælt, ingen utropstegn).
2. Test i nettleser – inkludert med tastatur (Tab/Enter) og med redusert
   bevegelse aktivert (DevTools → Rendering → prefers-reduced-motion).
3. Commit etter konvensjonen i [`../CLAUDE.md`](../CLAUDE.md):
   `feat: legg til reelle åpningstider`.
4. Oppdater dokumentasjonen: marker punktet lukket med dato i
   [TODO.md](TODO.md), legg til linje i [CHANGELOG.md](CHANGELOG.md).
   Regelen er: **ingen endring er ferdig før den er sporbar.**

## Manuell sjekkliste før du sier deg ferdig

- Døra: tre bank med mus OG med Enter/Space; «Gå rett inn» virker;
  passordet åpner med egen animasjon.
- Bakrommet: låses opp via inline-feltet, via passord ved døra, og ved å
  taste passordet hvor som helst.
- Ankernavigasjonen klipper ingen overskrifter.
- Med `prefers-reduced-motion`: alt innhold synlig, ingenting beveger seg.
- Kontrast: nye farger sjekkes mot WCAG AA (4,5:1 for brødtekst).
