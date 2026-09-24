"""
Lager hero-filmen til forsiden fra én kildefil:

    assets/video/alibi-hero.mp4          H.264 (High), yuv420p, sort-hvitt, uten lyd,
                                         +faststart, maks 960 px bred, crf 26
    assets/video/alibi-hero-poster.webp  første bilde, 736 px bred (feltets bredde), q 75
    assets/video/alibi-hero.webm         VP9 – bare med --webm (runde 17: ikke tydelig
                                         mindre enn mp4, derfor ikke i bruk)

Kjøres kun lokalt/byggtid – siden trenger ikke dette. Krever ffmpeg og ffprobe på
PATH (winget install Gyan.FFmpeg, eller `pip install imageio-ffmpeg` og pek på
den med --ffmpeg).

Bruk:
    python tools/lag-hero-film.py <kildefil.mp4> [--webm] [--ffmpeg <sti>]

Den lisensierte fila byttes inn med samme kommando: ny fil inn, samme navn ut.
Sort-hvitt-konverteringen (hue=s=0) er med uansett, så en fargefilm blir riktig.
Kilden per runde 17 er en Envato-forhåndsvisning MED vannmerke – vannmerket skal
ikke fjernes eller beskjæres bort (se docs/BILDEKILDER.md).
"""
import os
import shutil
import subprocess
import sys

sys.stdout.reconfigure(encoding="utf-8")  # Windows-konsollen er cp1252 som standard

ROT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAAL = os.path.join(ROT, "assets", "video")
MAKS_BREDDE = 960      # kilden er 960×540 – aldri skaler opp
PLAKAT_BREDDE = 736    # .medie-slot-hero er min(100 %, 46 rem) = 736 px
CRF_MP4 = 26           # runde 17: 514 → 336 kB uten synlig tap (sjekket i 2x-zoom)
CRF_WEBM = 40

args = sys.argv[1:]
if not args or args[0].startswith("-"):
    sys.exit(__doc__)
kilde = args[0]
lag_webm = "--webm" in args
ffmpeg = args[args.index("--ffmpeg") + 1] if "--ffmpeg" in args else "ffmpeg"
ffprobe = ffmpeg.replace("ffmpeg", "ffprobe") if ffmpeg != "ffmpeg" else "ffprobe"
if shutil.which(ffmpeg) is None:
    sys.exit(f"Fant ikke {ffmpeg} – installer ffmpeg eller bruk --ffmpeg <sti>")

os.makedirs(MAAL, exist_ok=True)

# Skaler ned til maks bredde (aldri opp), sort-hvitt, partallsdimensjoner for yuv420p
filter_film = f"scale='min({MAKS_BREDDE},iw)':-2,hue=s=0"


def kjor(*kommando):
    print("  " + " ".join(kommando))
    subprocess.run(kommando, check=True)


def storrelse(sti):
    return f"{os.path.getsize(sti) // 1024} kB"


mp4 = os.path.join(MAAL, "alibi-hero.mp4")
kjor(ffmpeg, "-v", "error", "-y", "-i", kilde,
     "-vf", filter_film, "-c:v", "libx264", "-profile:v", "high", "-preset", "slow",
     "-crf", str(CRF_MP4), "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", mp4)
print(f"  → {os.path.relpath(mp4, ROT)} ({storrelse(mp4)})")

plakat = os.path.join(MAAL, "alibi-hero-poster.webp")
kjor(ffmpeg, "-v", "error", "-y", "-i", mp4, "-frames:v", "1",
     "-vf", f"scale='min({PLAKAT_BREDDE},iw)':-2", "-c:v", "libwebp", "-quality", "75", plakat)
print(f"  → {os.path.relpath(plakat, ROT)} ({storrelse(plakat)})")

if lag_webm:
    webm = os.path.join(MAAL, "alibi-hero.webm")
    kjor(ffmpeg, "-v", "error", "-y", "-i", kilde,
         "-vf", filter_film, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", str(CRF_WEBM),
         "-row-mt", "1", "-pix_fmt", "yuv420p", "-an", webm)
    print(f"  → {os.path.relpath(webm, ROT)} ({storrelse(webm)})")

if shutil.which(ffprobe):
    ut = subprocess.run([ffprobe, "-v", "error", "-select_streams", "v:0", "-show_entries",
                         "stream=codec_name,width,height,r_frame_rate:format=duration",
                         "-of", "default=nw=1", mp4], capture_output=True, text=True).stdout
    print("  " + ut.strip().replace("\n", "  "))
print("Ferdig. Husk: kjør python tools/bygg-sider.py hvis malen er endret, og oppdater docs/BILDEKILDER.md.")
