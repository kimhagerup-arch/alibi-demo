# Prompt til Claude Code – Alibi (lim inn hele denne)

Du skal bygge en komplett, produksjonsklar nettside fra bunnen av i denne repo-mappen. Les hele briefen før du starter. Jobb selvstendig og ta fornuftige valg der noe ikke er spesifisert, men hold deg strengt til konsept og design-retning under.

## Om stedet

**Alibi** er et nytt utested i Alta, drevet av **Æventyr** (samme eiere som nattklubben **Tåkt**). Lokalet er en kjeller vegg-i-vegg med Tåkt, adresse **Sentrumsparken 2, 9510 Alta**. Konseptet er en fullblods **speakeasy** inspirert av forbudstidens USA på 1920-tallet: skjult, eksklusiv, halvhemmelig. Nettsiden skal *være* konseptet, ikke bare beskrive det.

Alt innhold på siden skal være på **norsk (bokmål)**.

## Signaturelementet: Døra

Landingsopplevelsen er en lukket dør. Besøkende må **banke på** for å komme inn:

- Fullskjerms inngangsscene: en mørk, tung dør (bygget i HTML/CSS/SVG – ikke bildefil, siden bilder kommer senere) med en dørluke/kikkhull og et diskret messingskilt.
- Brukeren banker ved å klikke/tappe på døra (gjerne 3 ganger, med banke-lyd valgfritt og av som standard). Dørluka åpnes, et "øye" vurderer deg, og døra glir opp til hovedsiden.
- Legg inn et lite easter egg: skriver man passordet **"Æventyr"** i et skjult felt (eller taster det), åpnes døra umiddelbart med en egen animasjon.
- **Kritisk for SEO og tilgjengelighet:** Døra er et overlay – ALT innhold ligger i DOM-en bak og er crawlbart. Synlig "Gå rett inn"-lenke for de som ikke gidder. Døra skal kunne betjenes med tastatur (Enter/Space = bank). `sessionStorage` husker at man har kommet inn, så døra vises kun én gang per besøk. Respekter `prefers-reduced-motion` med en enkel fade i stedet for animasjon.

Dette er sidens ene store grep. Resten av siden holdes rolig og disiplinert.

## Design-retning

- **Stemning:** kjeller, levende lys, messing, slitt fløyel, sigarrøyk, jazz. Art deco, men nedstøvet og intim – ikke blank Gatsby-glamour.
- **Palett (utgangspunkt, juster ved behov):** nesten-svart brunsort (`#141110`), varm messing/gull (`#C9A227`), dyp oksblod/burgunder (`#5E1F24`), røykgrønn (`#3A4A3F`), knekt kritt (`#E8E0D0`) til tekst. IKKE ren svart bakgrunn med én neonaksent – det skal føles varmt og analogt.
- **Typografi:** en karakterfull art deco-displayfont til overskrifter (f.eks. Limelight, Poiret One eller Marcellus fra Google Fonts – velg én og bruk den med måtehold) parret med en lesbar serif/sans til brødtekst (f.eks. Cormorant Garamond eller Jost). Sett en tydelig typeskala.
- **Detaljer:** subtil kornete tekstur/vignett på bakgrunnen, tynne messinglinjer som skillelinjer, art deco-rammer rundt menykort. Flimrende lys-effekt brukes maks ett sted.
- **Tone i tekst:** lavmælt, konspiratorisk, med glimt i øyet. "Du fant oss." / "Det du ser her, blir mellom oss." Aldri ropende salgstekst, ingen utropstegn-hype.

## Sider/seksjoner (one-page med ankernavigasjon)

1. **Velkommen** – etter døra: Alibi-logotype (sett i typografi inntil ekte logo kommer), én kort velkomstlinje i konspiratorisk tone.
2. **Historien** – kort om konseptet: speakeasy i en kjeller i Alta, forbudstids-rammefortelling. Skriv 2–3 korte avsnitt selv.
3. **Menyen** – cocktailmeny som plassholder: 6–8 klassiske forbudstids-cocktails (Bee's Knees, Sidecar, Old Fashioned, French 75 osv.) med én-linjes beskrivelser, priser markert som `kr —` inntil ekte meny kommer. Merk tydelig i koden med `<!-- PLACEHOLDER: erstattes med ekte meny -->`.
4. **Finn oss** – adressen presentert som en hemmelighet man betros: "Sentrumsparken 2, 9510 Alta. Kjelleren. Dør uten skilt – nesten." Lenke til Google Maps. Nevn diskret at søsterklubben Tåkt ligger vegg-i-vegg.
5. **Praktisk** – åpningstider, aldersgrense og kontakt som tydelig merkede plassholdere (`<!-- PLACEHOLDER -->`), sosiale medier-ikoner uten lenker inntil videre.
6. **Footer** – "Et Æventyr-sted" + diskret lenke-plass til Tåkt, © 2026 Alibi.

## Medieplassholdere

Bilder og video leveres senere. Lag en `assets/`-mappe og bygg inn tydelig merkede slots (f.eks. stilfulle mørke plassholder-flater med messingramme og teksten "Foto kommer") der interiørbilder og en hero-video naturlig skal inn. Dokumentér i README hvilke filer som forventes, med anbefalte dimensjoner/formater.

## Teknisk

- **Statisk side:** ren HTML + CSS + vanilla JS. Ingen rammeverk, ingen byggesteg – skal kunne hostes hvor som helst (Netlify/Vercel/GitHub Pages/one.com).
- Mobil først, responsiv ned til 360 px. Testet i moderne nettlesere.
- Semantisk HTML, synlig tastaturfokus, skip-lenke, kontrast som består WCAG AA (gull på mørkt må sjekkes – juster ved behov).
- Full SEO/meta: `<title>`, description, Open Graph, favicon (lag en enkel SVG-favicon med "A" i deco-stil), `lang="no"`, JSON-LD `BarOrPub`-schema med adresse.
- Ytelse: ingen tunge biblioteker, fonter med `font-display: swap`, mål Lighthouse 95+ på alt.
- Rydig struktur: `index.html`, `css/`, `js/`, `assets/`. Kommentér koden der innhold skal byttes ut.
- Skriv en `README.md` på norsk: hvordan kjøre lokalt, hvordan deploye, hva som er plassholdere og hvor eiere senere bytter inn meny, åpningstider, bilder og lenker.

## Arbeidsmåte

Lag først en kort plan (paletten, typevalg, dør-mekanikken), bygg deretter alt ferdig, og gjennomgå til slutt ditt eget resultat kritisk mot denne briefen – særlig at døra fungerer med tastatur, at innholdet er crawlbart, og at designet ikke ser generisk AI-generert ut. Fjern én unødvendig dekorasjon før du sier deg ferdig.
