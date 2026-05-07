#!/usr/bin/env python3
"""
Download venue race photos from Wikimedia Commons category listings.
Lists actual files from Commons race categories (not Wikipedia article lead images).
Skips files that are already real JPEGs. Replaces PNG circuit maps.
Sequential downloads with 8s delays.
"""
import urllib.request
import urllib.parse
import json
import os
import time
import struct

OUT_DIR = os.path.join(os.path.dirname(__file__), "../frontend/public/images/venues")
os.makedirs(OUT_DIR, exist_ok=True)

DELAY_API = 4
DELAY_DL = 8
HEADERS = {"User-Agent": "formula-function-bot/1.0 (balsara.s@northeastern.edu)"}
API = "https://commons.wikimedia.org/w/api.php"

def is_jpeg(path):
    """Check if a file is a real JPEG (not PNG)."""
    if not os.path.exists(path) or os.path.getsize(path) < 10000:
        return False
    with open(path, "rb") as f:
        sig = f.read(3)
    return sig == b'\xff\xd8\xff'

def api_get(params):
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read())

def list_category_files(cat_name, limit=10):
    """List file titles from a Commons category."""
    data = api_get({
        "action": "query", "list": "categorymembers",
        "cmtitle": f"Category:{cat_name}", "cmtype": "file",
        "cmnamespace": 6, "cmlimit": limit, "format": "json",
    })
    return [m["title"] for m in data.get("query", {}).get("categorymembers", [])]

def get_imageinfo(titles):
    """Get URLs for a list of File: titles."""
    data = api_get({
        "action": "query", "titles": "|".join(titles[:10]),
        "prop": "imageinfo", "iiprop": "url|mediatype",
        "iiurlwidth": 1280, "format": "json",
    })
    result = {}
    for page in data.get("query", {}).get("pages", {}).values():
        title = page.get("title", "")
        ii = page.get("imageinfo", [])
        if ii and ii[0].get("mediatype") in ("BITMAP", "DRAWING"):
            result[title] = ii[0].get("thumburl") or ii[0].get("url")
    return result

def download(url, path):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    with open(path, "wb") as f:
        f.write(data)
    return len(data)

# (output_filename, commons_category_name)
# Only items that need real photos (the PNG circuit maps)
ITEMS = [
    # SPA
    ("spa-1998.jpg",                    "1998 Belgian Grand Prix"),
    ("spa-2014.jpg",                    "2014 Belgian Grand Prix"),
    ("spa-verstappen-2021.jpg",         "2021 Belgian Grand Prix"),
    # MONACO
    ("monaco-senna-1984.jpg",           "1984 Monaco Grand Prix"),
    ("monaco-verstappen-2023.jpg",      "2023 Monaco Grand Prix"),
    ("monaco-norris-2025.jpg",          "2025 Monaco Grand Prix"),
    # MONZA
    ("monza-gasly-2020.jpg",            "2020 Italian Grand Prix"),
    ("monza-hamilton-2017.jpg",         "2017 Italian Grand Prix"),
    ("monza-schumacher-2000.jpg",       "2000 Italian Grand Prix"),
    # SILVERSTONE
    ("silverstone-mansell-1987.jpg",    "1987 British Grand Prix"),
    ("silverstone-mansell-1992.jpg",    "1992 British Grand Prix"),
    ("silverstone-hamilton-2008.jpg",   "2008 British Grand Prix"),
    ("silverstone-2021-crash.jpg",      "2021 British Grand Prix"),
    # SUZUKA
    ("suzuka-senna-prost-1989.jpg",     "1989 Japanese Grand Prix"),
    ("suzuka-senna-prost-1990.jpg",     "1990 Japanese Grand Prix"),
    ("suzuka-schumacher-2000.jpg",      "2000 Japanese Grand Prix"),
    ("suzuka-verstappen-2022.jpg",      "2022 Japanese Grand Prix"),
    # INTERLAGOS
    ("interlagos-senna-1991.jpg",       "1991 Brazilian Grand Prix"),
    ("interlagos-vettel-2012.jpg",      "2012 Brazilian Grand Prix"),
    ("interlagos-verstappen-2022.jpg",  "2022 Brazilian Grand Prix"),
    ("interlagos-norris-2024.jpg",      "2024 Brazilian Grand Prix"),
    # BAHRAIN
    ("bahrain-grosjean-2020-crash.jpg", "2020 Bahrain Grand Prix"),
    ("bahrain-hamilton-2014.jpg",       "2014 Bahrain Grand Prix"),
    ("bahrain-verstappen-2021.jpg",     "2021 Bahrain Grand Prix"),
    ("bahrain-verstappen-2024.jpg",     "2024 Bahrain Grand Prix"),
    ("bahrain-leclerc-2022.jpg",        "2022 Bahrain Grand Prix"),
    # ABU DHABI
    ("abu-dhabi-rosberg-2016.jpg",      "2016 Abu Dhabi Grand Prix"),
    ("abu-dhabi-verstappen-2021.jpg",   "2021 Abu Dhabi Grand Prix"),
    ("abu-dhabi-norris-2024.jpg",       "2024 Abu Dhabi Grand Prix"),
    ("abu-dhabi-hamilton-2014.jpg",     "2014 Abu Dhabi Grand Prix"),
    # JEDDAH
    ("jeddah-2021.jpg",                 "2021 Saudi Arabian Grand Prix"),
    ("jeddah-verstappen-2022.jpg",      "2022 Saudi Arabian Grand Prix"),
    # ALBERT PARK
    ("albert-park-ralf-2002.jpg",       "2002 Australian Grand Prix"),
    ("albert-park-coulthard-2003.jpg",  "2003 Australian Grand Prix"),
    ("albert-park-leclerc-2024.jpg",    "2024 Australian Grand Prix"),
    # SHANGHAI
    ("shanghai-hamilton-2011.jpg",      "2011 Chinese Grand Prix"),
    ("shanghai-verstappen-2024.jpg",    "2024 Chinese Grand Prix"),
    # MIAMI
    ("miami-verstappen-2022.jpg",       "2022 Miami Grand Prix"),
    ("miami-norris-2024.jpg",           "2024 Miami Grand Prix"),
    # IMOLA
    ("imola-senna-1994.jpg",            "1994 San Marino Grand Prix"),
    ("imola-verstappen-2022.jpg",       "2022 Emilia Romagna Grand Prix"),
    # CANADA
    ("canada-villeneuve-1978.jpg",      "1978 Canadian Grand Prix"),
    ("canada-button-2011.jpg",          "2011 Canadian Grand Prix"),
    ("canada-vettel-2019.jpg",          "2019 Canadian Grand Prix"),
    # BARCELONA
    ("barcelona-senna-mansell-1991.jpg","1991 Spanish Grand Prix"),
    ("barcelona-verstappen-2016.jpg",   "2016 Spanish Grand Prix"),
    ("barcelona-hamilton-2017.jpg",     "2017 Spanish Grand Prix"),
    ("barcelona-verstappen-2021.jpg",   "2021 Spanish Grand Prix"),
    # HUNGARORING
    ("hungary-hamilton-2020.jpg",       "2020 Hungarian Grand Prix"),
    ("hungary-ocon-2021.jpg",           "2021 Hungarian Grand Prix"),
    # ZANDVOORT
    ("zandvoort-verstappen-2021.jpg",   "2021 Dutch Grand Prix"),
    ("zandvoort-verstappen-2022.jpg",   "2022 Dutch Grand Prix"),
    ("zandvoort-verstappen-2023.jpg",   "2023 Dutch Grand Prix"),
    # BAKU
    ("baku-verstappen-tyre-2021.jpg",   "2021 Azerbaijan Grand Prix"),
    ("baku-hamilton-2021.jpg",          "2021 Azerbaijan Grand Prix"),
    ("baku-leclerc-2022.jpg",           "2022 Azerbaijan Grand Prix"),
    ("baku-perez-2021.jpg",             "2021 Azerbaijan Grand Prix"),
    # SINGAPORE
    ("singapore-sainz-2023.jpg",        "2023 Singapore Grand Prix"),
    # COTA
    ("cota-verstappen-2021.jpg",        "2021 United States Grand Prix"),
    # MEXICO
    ("mexico-hamilton-2016.jpg",        "2016 Mexican Grand Prix"),
    ("mexico-verstappen-2022.jpg",      "2022 Mexican Grand Prix"),
    # LAS VEGAS
    ("las-vegas-drain-2023.jpg",        "2023 Las Vegas Grand Prix"),
    ("las-vegas-verstappen-2023.jpg",   "2023 Las Vegas Grand Prix"),
    ("las-vegas-verstappen-2024.jpg",   "2024 Las Vegas Grand Prix"),
    # QATAR
    ("qatar-hamilton-2021.jpg",         "2021 Qatar Grand Prix"),
    ("qatar-verstappen-wdc3-2023.jpg",  "2023 Qatar Grand Prix"),
    ("qatar-alonso-2023.jpg",           "2023 Qatar Grand Prix"),
]

results = {}
cat_cache = {}  # category -> list of file titles (so same-race items share one cat lookup)
cat_urls  = {}  # category -> {title: url} map already fetched

for filename, category in ITEMS:
    out_path = os.path.join(OUT_DIR, filename)

    # Skip if already a real JPEG
    if is_jpeg(out_path):
        print(f"  SKIP (real JPEG): {filename}")
        results[filename] = "exists_jpeg"
        continue

    print(f"\n  [{filename}] ← Category:{category}")

    # Fetch category members if not cached
    if category not in cat_cache:
        try:
            titles = list_category_files(category, limit=15)
            cat_cache[category] = titles
            print(f"    Found {len(titles)} files in category")
            time.sleep(DELAY_API)
        except Exception as e:
            print(f"    ERROR listing category: {e}")
            results[filename] = f"cat_error:{e}"
            cat_cache[category] = []
            time.sleep(3)
            continue
    else:
        titles = cat_cache[category]

    if not titles:
        print(f"    Category empty or not found")
        results[filename] = "cat_empty"
        continue

    # Get imageinfo for these titles if not cached
    if category not in cat_urls:
        try:
            urls = get_imageinfo(titles)
            cat_urls[category] = urls
            time.sleep(DELAY_API)
        except Exception as e:
            print(f"    ERROR getting imageinfo: {e}")
            results[filename] = f"info_error:{e}"
            time.sleep(3)
            continue
    else:
        urls = cat_urls[category]

    if not urls:
        print(f"    No bitmap images in category")
        results[filename] = "no_bitmap"
        continue

    # Pick first available URL
    chosen_title, img_url = next(iter(urls.items()))
    print(f"    Using: {chosen_title[:70]}")
    print(f"    URL:   {img_url[:80]}...")

    try:
        size = download(img_url, out_path)
        # Verify it's not a PNG circuit map
        with open(out_path, "rb") as f:
            sig = f.read(3)
        fmt = "JPEG" if sig == b'\xff\xd8\xff' else ("PNG" if sig[:2] == b'\x89P' else "OTHER")
        print(f"    Downloaded: {filename} ({size:,} bytes, {fmt})")
        results[filename] = f"ok:{fmt}:{chosen_title[:50]}"
        time.sleep(DELAY_DL)
    except Exception as e:
        print(f"    ERROR downloading: {e}")
        results[filename] = f"dl_error:{e}"
        time.sleep(3)

print("\n\n=== RESULTS ===")
ok = [f for f, s in results.items() if s.startswith("ok") or "jpeg" in s.lower()]
empty = [f for f, s in results.items() if "empty" in s or "no_bitmap" in s]
err = [f for f, s in results.items() if "error" in s.lower()]

print(f"OK/exists: {len(ok)}")
print(f"Category empty/no bitmap: {len(empty)}")
print(f"Errors: {len(err)}")
if empty:
    print("\nEMPTY/NO BITMAP:")
    for f in empty: print(f"  {f}: {results[f]}")
if err:
    print("\nERRORS:")
    for f in err: print(f"  {f}: {results[f]}")

with open(os.path.join(os.path.dirname(__file__), "venue_image_results3.json"), "w") as jf:
    json.dump(results, jf, indent=2)
