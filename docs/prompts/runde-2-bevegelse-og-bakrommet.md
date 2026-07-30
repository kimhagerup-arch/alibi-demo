# Prompt til Claude Code – Alibi, runde 2 (lim inn hele denne)

Nettsiden fra runde 1 er gjennomgått i nettleser. Godt utgangspunkt. Nå skal du gjøre tre ting: rette faktafeil og småbugs, legge på et gjennomtenkt lag med bevegelse, og bygge én ny gimmick («Bakrommet»). Ikke skriv om ting som fungerer – gjør målrettede endringer.

## 1. Rettelser (gjør disse først)

**Faktafeil om Tåkt:** Tåkt ligger IKKE ovenpå – begge stedene ligger i kjelleren, vegg i vegg. Tåkt er nattklubben; Alibi er puben – roligere, mer voksent publikum. Rett alle steder dette omtales:
- «Finn oss»: skriv om avsnittet. Ny vinkling, omtrent: «Hører du basen fra Tåkt, er du nesten fremme. Nattklubben og vi deler kjeller – de tar seg av dansingen, vi tar oss av samtalen. Vår dør er den rolige.»
- Footer: bytt «Tåkt bor ovenpå.» til noe sånt som «Tåkt bor vegg i vegg.»
- Juster gjerne én setning i «Historien» slik at pub-identiteten skinner gjennom (god samtale, lavt tempo, voksent), men behold tonen som er der – den er riktig.

**Småbugs:**
- Ankernavigasjon: overskrifter klippes av den faste topplinja (synlig på «Praktisk»). Legg `scroll-margin-top` på seksjonene tilsvarende topplinjas høyde + litt luft.
- Footer-lenken til Tåkt er `<a href="#" aria-disabled="true">` – den hopper til toppen ved klikk. Bytt til `<span>` med samme styling til ekte URL foreligger (samme mønster som some-ikonene).
- «Finn oss»: foto-plassholderen er mye høyere enn teksten ved siden av. Sett en fornuftig maks-høyde/aspect-ratio på stående medie-slots så spaltene balanserer.
- Legg inn `<!-- PLACEHOLDER: <link rel="canonical"> når domenet er klart -->` i head.

## 2. Bevegelse – «levende lys»-pakka

Målet er at siden skal føles som et rom med levende lys: alt beveger seg litt, ingenting roper. Alle effekter deaktiveres ved `prefers-reduced-motion` (innhold vises da statisk – aldri skjult), kjøres med CSS transforms/opacity (ikke layout-egenskaper), og pauses når fanen ikke er synlig.

1. **Scroll-avsløring:** Seksjonsinnhold (overskrift, prosa, menykort) fader inn og stiger svakt (12–16 px) når det scrolles inn i view, via IntersectionObserver. Menykortene med lett forskjøvet delay (40–60 ms) så de «tennes» ett og ett. Kjør hver avsløring én gang.
2. **Linje som trekkes:** Messinglinjen etter seksjonsoverskriftene animeres fra 0 til full bredde når overskriften avsløres.
3. **Lysflimmer:** Én – og bare én – ambient lyskilde: en stor, myk radial glød i hero-seksjonen bak/rundt logotypen-området som flimrer svakt og uregelmessig som et stearinlys (CSS-animasjon med flere keyframes, lav amplitude, 6–9 s loop). Ikke en skarp glow på selve logotypen – et rom-lys, ikke en effekt.
4. **Menykort-hover:** Ved hover/fokus: kortet løftes 2–3 px, rammen går fra dus til full messing, og et smalt, skrått lysstreif («shine sweep») glir diskret over kortet én gang. Samme stil på fokus for tastaturbrukere.
5. **Topplinja:** Skjules ved scroll ned, glir inn igjen ved scroll opp. Aktiv seksjon markeres i menyen (scroll-spy med IntersectionObserver).
6. **Støv i lyset:** 12–18 små, svakt lysende partikler som driver sakte i hero-seksjonen, som støv i en lysstråle. Ren CSS eller minimal JS, subtilt nok til at man nesten ikke ser det. Kun i hero, fjernes ved reduced motion.

## 3. Ny gimmick: «Bakrommet»

En skjult seksjon som gir passordet en jobb etter døra, og som eierne kan bruke i markedsføring («ukas passord» på sosiale medier gir ukas hemmelige cocktail).

- **Inngang:** Nederst i meny-seksjonen, en diskret tekstlinje: «Vi har et bakrom. De som kan passordet, vet hva de skal gjøre.» Ordet «bakrom» (eller en liten nøkkel-glyf) er klikkbart, men ser ikke ut som en vanlig lenke.
- **Lås:** Klikk åpner et lite inline passordfelt (samme stil som dørens). Riktig passord (samme som døra: «æventyr», case-insensitivt) glir opp en skjult del av seksjonen: «Bakrommet» med 2 hemmelige cocktails i samme kortstil, men med en visuell tvist – f.eks. invertert (messingbakgrunn, mørk tekst) eller med tettere deco-ramme. Finn på navn og énlinjere selv i samme tone (gjerne med lokal Alta/nordnorsk blunk). Priser «kr —», merket `<!-- PLACEHOLDER -->`.
- **Husk:** `sessionStorage` («alibi-bakrom») husker at Bakrommet er åpnet i økten.
- **Detaljer:** Den som allerede kom inn døra via passord, får Bakrommet ferdig opplåst (sett flagget ved passord-inngang). Feil passord: samme «Det var ikke det.»-rist som på døra. Tastatur-easter-egget (å taste «æventyr» hvor som helst) skal også låse opp Bakrommet.
- **SEO-nyanse:** Bakrommet kan gjerne ligge med `hidden` til det låses opp – dette er en lek, ikke kritisk innhold.

## 4. Kvalitetskrav

- Alt fungerer med tastatur; synlig fokus overalt; `prefers-reduced-motion` respekteres 100 %.
- Ingen nye avhengigheter, ingen byggesteg – fortsatt ren HTML/CSS/JS.
- Ytelse: animasjoner kun på transform/opacity; IntersectionObservers kobles fra etter bruk; Lighthouse skal fortsatt ligge på 95+.
- Oppdater README: beskriv Bakrommet (og hvordan eierne bytter passord – legg passordet som én tydelig konstant øverst i main.js, brukt av både dør og bakrom).
- Selvgjennomgang til slutt: test at ankernavigasjonen ikke klipper overskrifter, at Bakrommet fungerer via alle tre veier (inline felt, dør-passord, tastebuffer), og at siden er rolig og lesbar med reduced motion aktivert. Fjern deretter én effekt du er minst sikker på – puben er rolig, siden skal også være det.
