# Bildekilder – Alibi

Sporbarhet for bildene på siden: kilde, lisens, hva som er brukt hvor, og
hva som ble forkastet. Ikke synlig på siden. Originalene ligger utenfor
repoet (stor filstørrelse); det som er sjekket inn er eksporterte
WebP/JPEG-varianter fra `tools/eksporter-bilder.py`.

Bilderegelen (se `CLAUDE.md`): aldri alkohol som drikkes eller er i fokus,
tobakk/røyking, eller alkohol-/tobakksmerker (alkoholloven § 9-2 /
alkoholforskriften kap. 14, tobakkskadeloven § 22). I tvil: ikke bruk, spør.

Sist oppdatert: 2026-09-23 (runde 11).

## Brukt på siden (midlertidige stockbilder – byttes med ekte foto)

| Fil i repoet | Original | Kilde / lisens | Hvor | Sjekk (runde 11) |
|---|---|---|---|---|
| `img/alibi-telefon-{480,800}.webp`, `-800.jpg` | `telefon.jpg` (3056×4064, s/h) | Pexels – fri bruk, kreditering ikke påkrevd | `#historien` (stående felt, 4:5) | OK: veggtelefon, art deco-tapet, lysrekke. Ingen glass/drikke, ingen røyk, ingen merker |
| `img/alibi-lampe-{480,800}.webp`, `-800.jpg` | `lampe.jpg` (3086×2333, s/h) | Pexels – fri bruk, kreditering ikke påkrevd | `#huset`, Alibi-kortet (3:2) | OK: bordlampe med frynser, murvegg, chesterfield, tre innrammede bilder på veggen. Jameson-plakaten er bekreftet beskåret bort (sjekket i full størrelse). Utsnitt: høyre del, så lampe + sofa fyller det lille feltet |
| `img/alibi-bardisk-{480,800}.webp`, `-800.jpg` | `bardisk-uten-glass.jpg` (3879×5819, s/h) | Pexels – fri bruk, kreditering ikke påkrevd | `#finn-oss` (stående felt, 4:5) | OK: bardisk med avis, sedler, hatt og koffert. Øverst i originalen står uskarpe glass på bakbaren – beskåret bort (utsnittet er forskjøvet helt ned). Ingen drikke, ingen merker |

## Sjekket og godkjent, men ikke tatt inn (ingen ledige felt)

Ligger **ikke** i repoet. Forslag til plassering står i `docs/TODO.md`.

| Original | Kilde / lisens | Sjekk (runde 11) | Merknad |
|---|---|---|---|
| `dame.jpg` (4160×6240, s/h) | Oppgis av Kim | OK: portrett, kvinne i 1920-tallsantrekk med fjær, pannebånd og pels. Ingen glass, ingen sigarett/munnstykke, ingen merker | Stående 2:3 |
| `par-dans.jpg` (3375×6000, s/h) | Oppgis av Kim | OK: par i 1920-tallsklær som danser foran et vindu. Ingen drikke, ingen røyk, ingen merker | Stående 9:16. Skal **ikke** på Tåkt-kortet (stockbilder later ikke som de viser andre steder) |
| `ford.jpg` (5184×3888, s/h) | Oppgis av Kim | OK med forbehold: veteranbil (Ford T) forfra. Ford-merket på grillen er greit (verken alkohol eller tobakk). **Skiltet «AR-83-13» må beskjæres bort** før bruk – kan tilhøre en ekte bil. En person i høyre kant bør også ut av utsnittet | Liggende 4:3 |

## Forkastet

| Original | Hvorfor |
|---|---|
| `chesterfield.jpg` (3072×4096, s/h) | En annen bar: gjenkjennelig person på veggmaleriet, stedets merkenavn på veggen og menykort på bordene. Ikke i repoet |

## Andre filer i bildemappa

Ingen – mappa inneholdt nøyaktig de sju filene over.

## Logoer

| Fil | Kilde | Bruk |
|---|---|---|
| `img/logo/alibi-logo.svg` (+ `-gold`, `-white`, `-black`, `alibi-merke-gold.svg`) | Laget for Alibi av gruppens A-geometri (A-en er hentet uendret fra Canyon Hotell-SVG-en; L, I, B, I tegnet i samme strek). Gjelder til en eventuell offisiell logo fra Æventyr foreligger | Ordmerke (inline symbol), og-image, favicon |
| `img/logo/aeventyr.svg`, `raus.svg`, `canyon.svg`, `gargia.svg` | Æventyr-gruppens egne logofiler (gullversjon `#ca9e67`) | Logoraden i footeren, som `<img>` |
| `img/logo/taakt-1x.webp`, `taakt-2x.webp` | Eksportert fra `taakt.png` (1987×1803, kun PNG finnes) til 53×48 / 106×96 px med gjennomsiktig bunn | Logoraden i footeren |
