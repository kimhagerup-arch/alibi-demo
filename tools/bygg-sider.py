"""
Bygger de to språkversjonene av forsiden fra én mal:

    tools/mal.html  +  tekst/nb.json / tekst/en.json  +  tekst/meny.json
        → index.html (engelsk, /)  og  no/index.html (norsk, /no/)
        → sitemap.xml
    css/style.css → css/style.min.css (minifisert kopi som sidene lenker til –
        rediger alltid style.css; runde 16: 40 → 25 kB gir Lighthouse 97+)

Kun Python 3 (standardbiblioteket) – ingen avhengigheter. Kjøres lokalt
etter hver tekst- eller menyendring, og de genererte filene commites, så
serveren fortsatt bare serverer statiske filer (beslutning #30).

Bruk:
    python tools/bygg-sider.py          # bygg alt
    python tools/bygg-sider.py --sjekk  # bygg i minnet og feil hvis filene
                                        # på disk ikke er i synk (bruk i CI/
                                        # før commit)

Malspråk (tools/mal.html og verdiene i tekst/*.json):
    {{nokkel}}                 settes inn (kan stå i verdiene òg – løses rekursivt)
    {{#nokkel}} … {{/nokkel}}  tas med bare hvis nokkel er sann (er_en / er_nb)
    {{meny_kort}} / {{bakrom_kort}}  menykortene, bygget fra meny.json
    {{js_tekst}}               «js»-objektet i språkfila, som JSON
    {{rot}}                    "" på /, "../" på /no/ – prefiks for css/js/img
"""
import json
import os
import re
import sys

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEKST = os.path.join(ROT, "tekst")
MAL = os.path.join(ROT, "tools", "mal.html")

# (språk, målfil relativt til rota, prefiks til css/js/img fra den fila)
SIDER = [
    ("en", "index.html", ""),
    ("nb", os.path.join("no", "index.html"), "../"),
]


def les_json(navn):
    with open(os.path.join(TEKST, navn), encoding="utf-8") as f:
        return json.load(f)


def les(sti):
    # Universelle linjeskift: git på Windows (autocrlf) kan sjekke ut CRLF,
    # generatoren skriver alltid LF – --sjekk skal ikke slå ut på det.
    with open(sti, encoding="utf-8", newline=None) as f:
        return f.read()


def skriv(sti, innhold):
    os.makedirs(os.path.dirname(sti) or ".", exist_ok=True)
    with open(sti, "w", encoding="utf-8", newline="") as f:
        f.write(innhold)


# ---------- CSS ----------

def minifiser_css(css):
    """Fjerner kommentarer og overflødig mellomrom. Strenger og url(...)
    kopieres uendret, så data-URI-er og content-verdier ikke røres."""
    ut = []
    i, n = 0, len(css)
    while i < n:
        c = css[i]
        if css.startswith("/*", i):
            slutt = css.find("*/", i + 2)
            i = n if slutt < 0 else slutt + 2
            continue
        if c in "\"'":
            slutt = css.find(c, i + 1)
            while slutt > 0 and css[slutt - 1] == "\\":
                slutt = css.find(c, slutt + 1)
            slutt = n - 1 if slutt < 0 else slutt
            ut.append(css[i:slutt + 1])
            i = slutt + 1
            continue
        if css.startswith("url(", i):
            # url("…") kan inneholde ) inni strengen (data-URI med url(%23n)) –
            # er innholdet i anførselstegn, hopp til sluttanførselen først
            j = i + 4
            while j < n and css[j] in " \t\r\n":
                j += 1
            if j < n and css[j] in "\"'":
                j = css.find(css[j], j + 1)
                j = n - 1 if j < 0 else j
            slutt = css.find(")", j)
            slutt = n - 1 if slutt < 0 else slutt
            ut.append(css[i:slutt + 1])
            i = slutt + 1
            continue
        ut.append(c)
        i += 1
    tekst = "".join(ut)
    # Kollaps mellomrom, fjern det rundt tegnsetting, dropp siste ; i en blokk
    tekst = re.sub(r"\s+", " ", tekst)
    tekst = re.sub(r" ?([{}:;,>]) ?", r"\1", tekst)
    tekst = tekst.replace(";}", "}")
    return (
        "/* GENERERT av tools/bygg-sider.py fra css/style.css – rediger kilden, ikke denne */\n"
        + tekst.strip()
        + "\n"
    )


# ---------- Menyen ----------

GLASS_SVG = (
    '<svg class="glass-ikon" viewBox="0 0 100 120" fill="none" stroke="currentColor" '
    'stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round" '
    'aria-hidden="true" focusable="false"><use href="#glass-{glass}"/></svg>'
)


def ingrediens(ord, sprak, ordliste, advarsler):
    if sprak == "nb":
        return ord
    if ord in ordliste:
        return ordliste[ord]
    if ord[:1].islower():
        advarsler.append(f"ingrediens uten oversettelse: «{ord}»")
    return ord


def meny_kort(drink, sprak, tekst, meny, advarsler):
    bakrom = drink.get("bakrom", False)
    tittel = "h4" if bakrom else "h3"
    klasse = "meny-kort meny-kort-invers" if bakrom else "meny-kort"
    innrykk = "        " if bakrom else "      "
    i = innrykk
    pris = tekst["pris_format"].format(pris=drink["pris"])
    ingredienser = " · ".join(
        ingrediens(o, sprak, meny["ordliste"], advarsler) for o in drink["ingredienser"]
    )
    linjer = [
        f'{i}<li class="{klasse}">',
        f'{i}  <div class="meny-kort-indre">',
        f'{i}    <div class="meny-kort-topp"><{tittel}>{drink["navn"]}</{tittel}>'
        f'<span class="meny-pris">{pris}</span></div>',
    ]
    if drink.get("glass") and drink.get("cl"):
        linjer += [
            f'{i}    <div class="meny-glass">',
            f'{i}      {GLASS_SVG.format(glass=drink["glass"])}',
            f'{i}      <span class="meny-glass-tekst">{drink["cl"]} cl</span>',
            f'{i}    </div>',
        ]
    linjer += [
        f'{i}    <p class="meny-ingredienser">{ingredienser}</p>',
        f'{i}    <p>{drink["tekst"][sprak]}</p>',
        f'{i}  </div>',
        f'{i}</li>',
    ]
    return "\n".join(linjer) + "\n"


# ---------- Malen ----------

BLOKK = re.compile(r"\{\{#(\w+)\}\}(.*?)\{\{/\1\}\}", re.S)
NOKKEL = re.compile(r"\{\{(\w+)\}\}")


def fyll(mal, verdier):
    def blokk(m):
        return m.group(2) if verdier.get(m.group(1)) else ""

    ut = BLOKK.sub(blokk, mal)
    manglende = set()

    def nokkel(m):
        n = m.group(1)
        if n in verdier:
            return str(verdier[n])
        manglende.add(n)
        return m.group(0)

    # Verdiene kan selv inneholde {{nøkler}} (lenker inni avsnitt) – løs til det er stabilt
    for _ in range(6):
        ny = NOKKEL.sub(nokkel, ut)
        if ny == ut:
            break
        ut = ny
    if manglende:
        raise SystemExit("Mangler nøkler i tekstfilene: " + ", ".join(sorted(manglende)))
    return ut


def bygg_side(sprak, rot, mal, felles, meny):
    tekst = les_json(f"{sprak}.json")
    advarsler = []
    verdier = dict(felles)
    verdier.update({k: v for k, v in tekst.items() if not k.startswith("_") and k != "js"})
    verdier["rot"] = rot
    verdier["er_en"] = sprak == "en"
    verdier["er_nb"] = sprak == "nb"
    verdier["js_tekst"] = json.dumps(tekst["js"], ensure_ascii=False, separators=(",", ":"))
    verdier["meny_kort"] = "".join(
        meny_kort(d, sprak, tekst, meny, advarsler) for d in meny["drinker"] if not d.get("bakrom")
    )
    verdier["bakrom_kort"] = "".join(
        meny_kort(d, sprak, tekst, meny, advarsler) for d in meny["drinker"] if d.get("bakrom")
    )
    for a in advarsler:
        print(f"  advarsel ({sprak}): {a}")
    return fyll(mal, verdier)


def sjekk_nokler():
    nb = {k for k in les_json("nb.json") if not k.startswith("_")}
    en = {k for k in les_json("en.json") if not k.startswith("_")}
    if nb != en:
        bare_nb = ", ".join(sorted(nb - en)) or "–"
        bare_en = ", ".join(sorted(en - nb)) or "–"
        raise SystemExit(f"Nøklene er ulike. Bare i nb.json: {bare_nb}. Bare i en.json: {bare_en}.")
    js_nb = set(les_json("nb.json")["js"])
    js_en = set(les_json("en.json")["js"])
    if js_nb != js_en:
        raise SystemExit("«js»-nøklene er ulike i nb.json og en.json.")


def sitemap(felles):
    d = felles["domene"]
    def url(loc):
        return (
            "  <url>\n"
            f"    <loc>{d}{loc}</loc>\n"
            f'    <xhtml:link rel="alternate" hreflang="en" href="{d}/"/>\n'
            f'    <xhtml:link rel="alternate" hreflang="nb" href="{d}/no/"/>\n'
            f'    <xhtml:link rel="alternate" hreflang="x-default" href="{d}/"/>\n'
            "  </url>\n"
        )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        "<!-- GENERERT av tools/bygg-sider.py – domenet ligger i tekst/felles.json -->\n"
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
        + url("/") + url("/no/") +
        "</urlset>\n"
    )


def main():
    sjekk = "--sjekk" in sys.argv
    sjekk_nokler()
    felles = {k: v for k, v in les_json("felles.json").items() if not k.startswith("_")}
    meny = les_json("meny.json")
    mal = les(MAL)

    utdata = {os.path.join(ROT, fil): bygg_side(sprak, rot, mal, felles, meny) for sprak, fil, rot in SIDER}
    utdata[os.path.join(ROT, "sitemap.xml")] = sitemap(felles)
    utdata[os.path.join(ROT, "css", "style.min.css")] = minifiser_css(les(os.path.join(ROT, "css", "style.css")))

    avvik = []
    for sti, innhold in utdata.items():
        rel = os.path.relpath(sti, ROT)
        if sjekk:
            if not os.path.exists(sti) or les(sti) != innhold:
                avvik.append(rel)
            continue
        skriv(sti, innhold)
        print(f"  skrev {rel} ({len(innhold.encode('utf-8')) // 1024} kB)")

    if sjekk:
        if avvik:
            raise SystemExit("IKKE I SYNK – kjør python tools/bygg-sider.py: " + ", ".join(avvik))
        print("  i synk: " + ", ".join(os.path.relpath(s, ROT) for s in utdata))


if __name__ == "__main__":
    main()
