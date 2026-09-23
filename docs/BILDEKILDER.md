# Bildekilder – Alibi

Sporbarhet for bildene på siden: kilde, lisens, hva som er brukt hvor, og
hva som ble forkastet. Ikke synlig på siden. Originalene ligger utenfor
repoet (stor filstørrelse); det som er sjekket inn er eksporterte
WebP/JPEG-varianter fra `tools/eksporter-bilder.py`.

Bilderegelen (se `CLAUDE.md`): aldri alkohol som drikkes eller er i fokus,
tobakk/røyking, eller alkohol-/tobakksmerker (alkoholloven § 9-2 /
alkoholforskriften kap. 14, tobakkskadeloven § 22). I tvil: ikke bruk, spør.

Sist oppdatert: 2026-09-24 (runde 14).

## Brukt på siden (midlertidige stockbilder – byttes med ekte foto)

| Fil i repoet | Original | Kilde / lisens | Hvor | Sjekk (runde 11) |
|---|---|---|---|---|
| `img/alibi-telefon-{480,800}.webp`, `-800.jpg` | `telefon.jpg` (3056×4064, s/h) | Pexels – fri bruk, kreditering ikke påkrevd | `#historien` (stående felt, 4:5) | OK: veggtelefon, art deco-tapet, lysrekke. Ingen glass/drikke, ingen røyk, ingen merker |
| `img/alibi-lampe-{480,800}.webp`, `-800.jpg` | `lampe.jpg` (3086×2333, s/h) | Pexels – fri bruk, kreditering ikke påkrevd | `#huset`, Alibi-kortet (3:2) | OK: bordlampe med frynser, murvegg, chesterfield, tre innrammede bilder på veggen. Jameson-plakaten er bekreftet beskåret bort (sjekket i full størrelse). Utsnitt: høyre del, så lampe + sofa fyller det lille feltet |
| `img/alibi-bardisk-{480,800}.webp`, `-800.jpg` | `bardisk-uten-glass.jpg` (3879×5819, s/h) | Pexels – fri bruk, kreditering ikke påkrevd | `#finn-oss` (stående felt, 4:5) | OK: bardisk med avis, sedler, hatt og koffert. Øverst i originalen står uskarpe glass på bakbaren – beskåret bort (utsnittet er forskjøvet helt ned). Ingen drikke, ingen merker |
| `img/alibi-dame-{480,640,800}.webp`, `-800.jpg` | `dame.jpg` (4160×6240, s/h) | Pexels – fri bruk, kreditering ikke påkrevd (bekreftet av Kim, runde 14) | Fotobåndet mellom `#historien` og `#huset` (4:5), bilde 1 | Sjekket på nytt i runde 13: portrett, kvinne i 1920-tallsantrekk med fjær, pannebånd og pels. Ingen glass, ingen sigarett/munnstykke, ingen merker. Utsnitt forskjøvet mot toppen (fjær og ansikt med) |
| `img/alibi-par-dans-{480,640,800}.webp`, `-800.jpg` | `par-dans.jpg` (3375×6000, s/h) | Pexels – fri bruk, kreditering ikke påkrevd (bekreftet av Kim, runde 14) | Fotobåndet, bilde 2 | Sjekket på nytt i runde 13: par i 1920-tallsklær som danser foran et vindu. Ingen drikke, ingen røyk, ingen merker. Utsnitt fra rett over hatten til knærne, begge hodene med. Ikke på Tåkt-kortet (#27) |
| `img/alibi-ford-{480,640,800}.webp`, `-800.jpg` | `ford.jpg` (5184×3888, s/h) | Pexels – fri bruk, kreditering ikke påkrevd (bekreftet av Kim, runde 14) | Fotobåndet, bilde 3 | Sjekket på nytt i runde 13: veteranbil (Ford T) forfra. Ford-merket på grillen er greit (verken alkohol eller tobakk). Fast utsnitt 2048×2560 px (runde 14: x 0,401–0,796, y 0,088–0,746) med venstre lykt og grillen; høyre kant ved frontrutestolpen. **Skiltet «AR-83-13», hånda og jakkeermet til personen i høyre kant er utenfor i alle fire varianter** (sjekket per fil). Eksporteres med WebP q65 + gaussisk støyfjerning 0,55 px (grillnettet komprimerer dårlig) |

## Sjekket og godkjent, men ikke tatt inn

Ingen per runde 13 – `dame`, `par-dans` og `ford` ble tatt inn i fotobåndet
(beslutning #29). Ubrukte originaler ligger fortsatt utenfor repoet.

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
