"""
Eksporterer stemningsbildene til img/ som WebP (flere bredder) + én JPEG-fallback.

Kjøres kun lokalt/byggtid – siden trenger ikke dette for å kjøre.
Krever Python 3 + Pillow (`pip install pillow`).

Bruk:
    python tools/eksporter-bilder.py <mappe-med-originaler>

Originalene ligger utenfor repoet (de er store og skal ikke sjekkes inn).
Beskjæring (crop) er oppgitt som brøk av originalens høyde/bredde, slik at
skriptet gir samme resultat uansett originalstørrelse.
"""
import os
import sys

from PIL import Image, ImageOps

if len(sys.argv) < 2:
    sys.exit(__doc__)

KILDE = sys.argv[1]
MAAL = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "img")
os.makedirs(MAAL, exist_ok=True)

# (kildefil, målnavn, (bredde, høyde)-forhold, y-forskyvning 0–1 av tilgjengelig
#  beskjæringsrom (0 = topp, 0.5 = midt, 1 = bunn), x-forskyvning, bredder,
#  utsnitt (x0, y0, x1, y1 som brøk av originalen – None = hele bildet))
BILDER = [
    ("telefon.jpg", "alibi-telefon", (4, 5), 0.45, 0.5, (480, 800), None),
    # Lampa: høyre del av originalen, så lampe og sofa fyller det lille kortfeltet
    ("lampe.jpg", "alibi-lampe", (3, 2), 0.5, 0.5, (480, 800), (0.36, 0.22, 1.0, 1.0)),
    # Bardisken: øverst i originalen står uskarpe glass på bakbaren –
    # beskjæringen tar dem bort (y = 1.0 → maksimal forskyvning nedover).
    ("bardisk-uten-glass.jpg", "alibi-bardisk", (4, 5), 1.0, 0.5, (480, 800), None),
]

JPEG_FALLBACK_BREDDE = 800
WEBP_KVALITET = 78
JPEG_KVALITET = 75


def beskjaer(im, forhold, fy, fx):
    bw, bh = forhold
    w, h = im.size
    if w / h > bw / bh:  # for bred → kutt i bredden
        nw = round(h * bw / bh)
        x0 = round((w - nw) * fx)
        return im.crop((x0, 0, x0 + nw, h))
    nh = round(w * bh / bw)  # for høy → kutt i høyden
    y0 = round((h - nh) * fy)
    return im.crop((0, y0, w, y0 + nh))


for kilde, navn, forhold, fy, fx, bredder, utsnitt in BILDER:
    im = Image.open(os.path.join(KILDE, kilde))
    im = ImageOps.exif_transpose(im)
    if utsnitt:
        w, h = im.size
        im = im.crop((round(w * utsnitt[0]), round(h * utsnitt[1]), round(w * utsnitt[2]), round(h * utsnitt[3])))
    im = beskjaer(im, forhold, fy, fx).convert("L")  # sort-hvitt bevares
    print(f"{kilde} -> {navn}: beskåret til {im.size}")
    for b in bredder:
        h = round(im.height * b / im.width)
        liten = im.resize((b, h), Image.LANCZOS)
        sti = os.path.join(MAAL, f"{navn}-{b}.webp")
        liten.convert("RGB").save(sti, "WEBP", quality=WEBP_KVALITET, method=6)
        print(f"  {os.path.basename(sti)} {b}x{h} {os.path.getsize(sti) // 1024} kB")
        if b == JPEG_FALLBACK_BREDDE:
            sti = os.path.join(MAAL, f"{navn}-{b}.jpg")
            liten.save(sti, "JPEG", quality=JPEG_KVALITET, optimize=True, progressive=True)
            print(f"  {os.path.basename(sti)} {b}x{h} {os.path.getsize(sti) // 1024} kB")
