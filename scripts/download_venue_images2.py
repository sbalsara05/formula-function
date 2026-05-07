#!/usr/bin/env python3
"""
Download venue images using Wikipedia REST API (page summary endpoint).
Gets the lead image from each race's Wikipedia article.
No search API — uses direct article title lookups. Low rate limit.
"""
import urllib.request
import urllib.parse
import json
import os
import time

OUT_DIR = os.path.join(os.path.dirname(__file__), "../frontend/public/images/venues")
os.makedirs(OUT_DIR, exist_ok=True)

DELAY_API = 3   # seconds between REST API calls
DELAY_DL = 6    # seconds between downloads
HEADERS = {"User-Agent": "Mozilla/5.0 formula-function-bot/1.0"}

# (output_filename, wikipedia_article_title)
# For items where multiple slides share the same race, they share the same article.
# The image won't be exactly the moment described, but it'll be the correct race.
ITEMS = [
    # SPA (lines 270, 280, 290, 300, 310, 320)
    ("spa-schumacher-jordan-1991.jpg",    "1991_Belgian_Grand_Prix"),
    ("spa-1998.jpg",                       "1998_Belgian_Grand_Prix"),
    ("spa-2014.jpg",                       "2014_Belgian_Grand_Prix"),
    ("spa-verstappen-2021.jpg",            "2021_Belgian_Grand_Prix"),
    # MONACO (lines 396, 400, 401)
    ("monaco-senna-1984.jpg",             "1984_Monaco_Grand_Prix"),
    ("monaco-verstappen-2023.jpg",        "2023_Monaco_Grand_Prix"),
    ("monaco-norris-2025.jpg",            "2025_Monaco_Grand_Prix"),
    # MONZA (lines 478, 479, 480)
    ("monza-gasly-2020.jpg",              "2020_Italian_Grand_Prix"),
    ("monza-hamilton-2017.jpg",           "2017_Italian_Grand_Prix"),
    ("monza-schumacher-2000.jpg",         "2000_Italian_Grand_Prix"),
    # SILVERSTONE (lines 554, 555, 556, 557)
    ("silverstone-mansell-1987.jpg",      "1987_British_Grand_Prix"),
    ("silverstone-mansell-1992.jpg",      "1992_British_Grand_Prix"),
    ("silverstone-hamilton-2008.jpg",     "2008_British_Grand_Prix"),
    ("silverstone-2021-crash.jpg",        "2021_British_Grand_Prix"),
    # SUZUKA (lines 633, 634, 635, 636, 637)
    ("suzuka-senna-prost-1989.jpg",       "1989_Japanese_Grand_Prix"),
    ("suzuka-senna-prost-1990.jpg",       "1990_Japanese_Grand_Prix"),
    ("suzuka-schumacher-2000.jpg",        "2000_Japanese_Grand_Prix"),
    ("suzuka-verstappen-2022.jpg",        "2022_Japanese_Grand_Prix"),
    # INTERLAGOS (lines 712, 713, 715, 716, 717)
    ("interlagos-senna-1991.jpg",         "1991_Brazilian_Grand_Prix"),
    ("interlagos-schumacher-1994.jpg",    "1994_Brazilian_Grand_Prix"),
    ("interlagos-vettel-2012.jpg",        "2012_Brazilian_Grand_Prix"),
    ("interlagos-verstappen-2022.jpg",    "2022_Brazilian_Grand_Prix"),
    ("interlagos-norris-2024.jpg",        "2024_Brazilian_Grand_Prix"),
    # BAHRAIN (lines 792, 793, 794, 795, 796)
    ("bahrain-grosjean-2020-crash.jpg",   "2020_Bahrain_Grand_Prix"),
    ("bahrain-hamilton-2014.jpg",         "2014_Bahrain_Grand_Prix"),
    ("bahrain-verstappen-2021.jpg",       "2021_Bahrain_Grand_Prix"),
    ("bahrain-verstappen-2024.jpg",       "2024_Bahrain_Grand_Prix"),
    ("bahrain-leclerc-2022.jpg",          "2022_Bahrain_Grand_Prix"),
    # ABU DHABI (lines 871, 872, 873, 874)
    ("abu-dhabi-rosberg-2016.jpg",        "2016_Abu_Dhabi_Grand_Prix"),
    ("abu-dhabi-verstappen-2021.jpg",     "2021_Abu_Dhabi_Grand_Prix"),
    ("abu-dhabi-norris-2024.jpg",         "2024_Abu_Dhabi_Grand_Prix"),
    ("abu-dhabi-hamilton-2014.jpg",       "2014_Abu_Dhabi_Grand_Prix"),
    # JEDDAH (lines 945, 946)
    ("jeddah-2021.jpg",                   "2021_Saudi_Arabian_Grand_Prix"),
    ("jeddah-verstappen-2022.jpg",        "2022_Saudi_Arabian_Grand_Prix"),
    # ALBERT PARK (lines 1015, 1016, 1017)
    ("albert-park-ralf-2002.jpg",         "2002_Australian_Grand_Prix"),
    ("albert-park-coulthard-2003.jpg",    "2003_Australian_Grand_Prix"),
    ("albert-park-leclerc-2024.jpg",      "2024_Australian_Grand_Prix"),
    # SHANGHAI (lines 1088, 1089)
    ("shanghai-hamilton-2011.jpg",        "2011_Chinese_Grand_Prix"),
    ("shanghai-verstappen-2024.jpg",      "2024_Chinese_Grand_Prix"),
    # MIAMI (lines 1159, 1160)
    ("miami-verstappen-2022.jpg",         "2022_Miami_Grand_Prix"),
    ("miami-norris-2024.jpg",             "2024_Miami_Grand_Prix"),
    # IMOLA (lines 1228, 1230)
    ("imola-senna-1994.jpg",              "1994_San_Marino_Grand_Prix"),
    ("imola-verstappen-2022.jpg",         "2022_Emilia_Romagna_Grand_Prix"),
    # CANADA (lines 1301, 1302, 1303)
    ("canada-villeneuve-1978.jpg",        "1978_Canadian_Grand_Prix"),
    ("canada-button-2011.jpg",            "2011_Canadian_Grand_Prix"),
    ("canada-vettel-2019.jpg",            "2019_Canadian_Grand_Prix"),
    # BARCELONA (lines 1376, 1377, 1378, 1379)
    ("barcelona-senna-mansell-1991.jpg",  "1991_Spanish_Grand_Prix"),
    ("barcelona-verstappen-2016.jpg",     "2016_Spanish_Grand_Prix"),
    ("barcelona-hamilton-2017.jpg",       "2017_Spanish_Grand_Prix"),
    ("barcelona-verstappen-2021.jpg",     "2021_Spanish_Grand_Prix"),
    # HUNGARORING (lines 1451, 1452, 1453)
    ("hungary-hamilton-2020.jpg",         "2020_Hungarian_Grand_Prix"),
    ("hungary-ocon-2021.jpg",             "2021_Hungarian_Grand_Prix"),
    # ZANDVOORT (lines 1522, 1523, 1524)
    ("zandvoort-verstappen-2021.jpg",     "2021_Dutch_Grand_Prix"),
    ("zandvoort-verstappen-2022.jpg",     "2022_Dutch_Grand_Prix"),
    ("zandvoort-verstappen-2023.jpg",     "2023_Dutch_Grand_Prix"),
    # BAKU (lines 1593, 1594, 1595, 1596)
    ("baku-verstappen-tyre-2021.jpg",     "2021_Azerbaijan_Grand_Prix"),
    ("baku-hamilton-2021.jpg",            "2021_Azerbaijan_Grand_Prix"),  # same race, shares image
    ("baku-leclerc-2022.jpg",             "2022_Azerbaijan_Grand_Prix"),
    ("baku-perez-2021.jpg",               "2021_Azerbaijan_Grand_Prix"),  # same race
    # SINGAPORE (line 1669)
    ("singapore-sainz-2023.jpg",          "2023_Singapore_Grand_Prix"),
    # COTA (line 1741)
    ("cota-verstappen-2021.jpg",          "2021_United_States_Grand_Prix"),
    # MEXICO (lines 1812, 1813)
    ("mexico-hamilton-2016.jpg",          "2016_Mexican_Grand_Prix"),
    ("mexico-verstappen-2022.jpg",        "2022_Mexican_Grand_Prix"),
    # LAS VEGAS (lines 1882, 1883, 1884)
    ("las-vegas-drain-2023.jpg",          "2023_Las_Vegas_Grand_Prix"),
    ("las-vegas-verstappen-2023.jpg",     "2023_Las_Vegas_Grand_Prix"),
    ("las-vegas-verstappen-2024.jpg",     "2024_Las_Vegas_Grand_Prix"),
    # QATAR (lines 1953, 1954, 1956)
    ("qatar-hamilton-2021.jpg",           "2021_Qatar_Grand_Prix"),
    ("qatar-verstappen-wdc3-2023.jpg",    "2023_Qatar_Grand_Prix"),
    ("qatar-alonso-2023.jpg",             "2023_Qatar_Grand_Prix"),
]

def get_article_image(article_title):
    """Fetch originalimage URL from Wikipedia REST summary API."""
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{urllib.parse.quote(article_title)}"
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read())
    # Prefer originalimage (full res) over thumbnail
    orig = data.get("originalimage")
    if orig:
        return orig["source"], orig.get("width", 0), orig.get("height", 0)
    thumb = data.get("thumbnail")
    if thumb:
        return thumb["source"], thumb.get("width", 0), thumb.get("height", 0)
    return None, 0, 0

def download(img_url, out_path):
    req = urllib.request.Request(img_url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()
    with open(out_path, "wb") as f:
        f.write(data)
    return len(data)

results = {}
seen_articles = {}  # article -> downloaded filename (to reuse same file for same race)

for filename, article in ITEMS:
    out_path = os.path.join(OUT_DIR, filename)

    if os.path.exists(out_path) and os.path.getsize(out_path) > 10000:
        print(f"  SKIP (exists): {filename}")
        results[filename] = "exists"
        seen_articles.setdefault(article, filename)
        continue

    # Reuse already-downloaded image if same article
    if article in seen_articles:
        src = os.path.join(OUT_DIR, seen_articles[article])
        if os.path.exists(src):
            import shutil
            shutil.copy2(src, out_path)
            print(f"  COPY from {seen_articles[article]}: {filename}")
            results[filename] = f"copy:{seen_articles[article]}"
            continue

    print(f"\n  Fetching: {article}")
    try:
        img_url, w, h = get_article_image(article)
        time.sleep(DELAY_API)

        if not img_url:
            print(f"  NO IMAGE in article: {filename}")
            results[filename] = "no_image"
            continue

        print(f"  URL: {img_url[:90]}...")
        size = download(img_url, out_path)
        print(f"  Downloaded: {filename} ({size:,} bytes, {w}x{h})")
        results[filename] = f"ok:{img_url[:60]}"
        seen_articles[article] = filename
        time.sleep(DELAY_DL)

    except Exception as e:
        print(f"  ERROR {filename} ({article}): {e}")
        results[filename] = f"error:{e}"
        time.sleep(3)

# Summary
print("\n\n=== RESULTS ===")
ok_list = [f for f, s in results.items() if s.startswith("ok") or s in ("exists", ) or s.startswith("copy")]
nf_list = [f for f, s in results.items() if s == "no_image"]
err_list = [f for f, s in results.items() if s.startswith("error")]

print(f"Downloaded/reused: {len(ok_list)}")
print(f"No image in article: {len(nf_list)}")
print(f"Errors: {len(err_list)}")

if nf_list:
    print("\nNO IMAGE:")
    for f in nf_list:
        print(f"  {f}")
if err_list:
    print("\nERRORS:")
    for f in err_list:
        print(f"  {f}: {results[f]}")

with open(os.path.join(os.path.dirname(__file__), "venue_image_results2.json"), "w") as jf:
    json.dump(results, jf, indent=2)
print("\nResults saved to scripts/venue_image_results2.json")
