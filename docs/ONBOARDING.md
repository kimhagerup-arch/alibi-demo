# Onboarding – Alibi

Kort intro for deg som er ny i prosjektet – menneske eller AI. Etter denne
siden skal du kunne forstå prosjektet, kjøre det lokalt og trygt gjøre din
første endring.

## Hva er dette?

Nettsiden til **Alibi**, en speakeasy-bar i en kjeller i Alta (drevet av
Æventyr, vegg i vegg med nattklubben Tåkt). Én statisk side i ren
HTML/CSS/JS – ingen rammeverk, intet byggesteg på serveren. Signaturgrepet:
besøkende må «banke på» en dør for å komme inn, og et passord åpner en
skjult del av menyen («Bakrommet»).

Siden finnes på **engelsk (`/`, standard) og norsk (`/no/`)**. De to
forsidene genereres fra én mal og felles tekstfiler – du redigerer aldri
`index.html`/`no/index.html` direkte (se «Hvor ligger alt?»).

**Grener:** alt arbeid skjer på `dev`. `main` er det kunden ser, og røres
bare når Kim sier «slå sammen til main». Aldri push/merge/tag mot `main`
på egen hånd.

Full prosjektbeskrivelse og alle føringer (design, tone, tekniske valg som
ligger fast): [`../CLAUDE.md`](../CLAUDE.md) – **les den før du endrer noe.**

## Kjøre lokalt

```bash
python -m http.server 8000    # eller: npx serve .
```

Åpne `http://localhost:8000` (engelsk) eller `/no/` (norsk). Døra vises én
gang per økt – kjør `sessionStorage.clear()` i konsollen for å se den (og
Bakrommet-låsen) igjen; `localStorage.removeItem('alibi-sprak')` nullstiller
språkvalget. Passordet er `æventyr` (konstanten `ALIBI_PASSORD` øverst i
`js/main.js`); `aeventyr` virker også.

## Hvor ligger alt?

- `tools/mal.html` – **malen**: all HTML-struktur, med `{{nøkler}}` for
  tekst. Alt midlertidig er merket `<!-- PLACEHOLDER -->` her.
- `tekst/nb.json` og `tekst/en.json` – all tekst, samme nøkler i begge.
  `tekst/meny.json` – menyen (ett sted for begge språk).
  `tekst/felles.json` – domene og kart-URL.
- `tools/bygg-sider.py` – generatoren. `python tools/bygg-sider.py` skriver
  `index.html` (engelsk), `no/index.html` (norsk) og `sitemap.xml`;
  `--sjekk` sier om de er i synk. Kun standard-Python.
- `index.html`, `no/index.html`, `sitemap.xml` – **generert**, commites,
  redigeres aldri for hånd.
- `404.html` – felles 404 for begge språk (håndskrevet).
- `css/style.css` – all stil (kilden). Palett og typografi ligger som
  variabler i `:root` øverst; seksjonene er tydelig kommentert (døra,
  topplinje med språkvelger, meny, Bakrommet, bevegelse). Sidene laster den
  **genererte** `css/style.min.css` – kjør generatoren etter CSS-endringer.
- `js/main.js` – fire deler: døra, Bakrommet, språkvelgeren,
  bevegelseslaget. Tekstene JS skriver ut, kommer fra `<head>`
  (`#alibi-tekst`, generert fra «js»-blokka i språkfilene).
- `img/logo/` – ordmerket (`alibi-logo.svg` m.fl., inline som symbol i `tools/mal.html`) og søsterstedenes logoer
- `assets/` – favicon (SVG + PNG-fallback),
  delingsbildet (`og-image.png`) og selvhostede fonter (`fonts/`);
  foto/video kommer (spesifikasjoner i [`../README.md`](../README.md)).
- `docs/` – [CHANGELOG](CHANGELOG.md) (hva er gjort),
  [DECISIONS](DECISIONS.md) (hvorfor), [PROMPTS](PROMPTS.md) (AI-kjøringer),
  [TODO](TODO.md) (hva som gjenstår), [`prompts/`](prompts/) (arkiverte
  prompter).

## Din første endring – trygg løype

1. Stå på `dev` (`git checkout dev`). Finn oppgaven i [TODO.md](TODO.md) –
   f.eks. P8 (åpningstider): endre `praktisk_tider_tekst` (og `alibi_tider`)
   i **både** `tekst/nb.json` og `tekst/en.json`, behold tonen (lavmælt,
   ingen utropstegn). Kjør `python tools/bygg-sider.py`.
2. Test i nettleser på begge språk – inkludert med tastatur (Tab/Enter) og
   med redusert bevegelse aktivert (DevTools → Rendering →
   prefers-reduced-motion).
3. Commit kildene og de genererte filene sammen, etter konvensjonen i
   [`../CLAUDE.md`](../CLAUDE.md): `feat: legg til reelle åpningstider`.
   Push til `dev` – ikke `main`.
4. Oppdater dokumentasjonen: marker punktet lukket med dato i
   [TODO.md](TODO.md), legg til linje i [CHANGELOG.md](CHANGELOG.md).
   Regelen er: **ingen endring er ferdig før den er sporbar.**

## Manuell sjekkliste før du sier deg ferdig

- `python tools/bygg-sider.py --sjekk` sier «i synk» (ellers har du glemt å
  bygge eller redigert en generert fil).
- Døra: tre bank med mus OG med Enter/Space; «Gå rett inn» virker;
  passordet åpner med egen animasjon. Meldingene er på sidens språk.
- Bakrommet: låses opp via inline-feltet, via passord ved døra, og ved å
  taste passordet hvor som helst – med både `æventyr` og `aeventyr`.
- Språk: `/` er engelsk, språkvelgeren i topplinja åpner med Enter, lukker
  med Esc og klikk utenfor; velg norsk → `/no/`, og `/` sender deg tilbake
  til `/no/` til du velger engelsk igjen. Ingen norske ord på engelsk side
  utenom egennavn.
- Ankernavigasjonen klipper ingen overskrifter.
- Fotobåndet (under 46 rem): kan rulles med sveip og med piltaster når
  rulleområdet har fokus, uten at selve siden får horisontal rulling.
- Med `prefers-reduced-motion`: alt innhold synlig, ingenting beveger seg.
- Kontrast: nye farger sjekkes mot WCAG AA (4,5:1 for brødtekst).
