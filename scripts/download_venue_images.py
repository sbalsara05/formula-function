#!/usr/bin/env python3
"""
Download venue images from Wikimedia Commons.
Uses the Commons search API to find images, then downloads thumbnails.
Sequential with 6s delays to avoid rate limiting.
"""
import requests
import time
import json
import os
import sys

SESSION = requests.Session()
SESSION.headers.update({"User-Agent": "Mozilla/5.0 (compatible; formula-function-bot/1.0)"})
OUT_DIR = os.path.join(os.path.dirname(__file__), "../frontend/public/images/venues")
os.makedirs(OUT_DIR, exist_ok=True)

DELAY = 6  # seconds between downloads

# (output_filename, search_query)
ITEMS = [
    # SPA
    ("spa-schumacher-benetton-1992.jpg",  "Michael Schumacher 1992 Belgian Grand Prix Benetton"),
    ("spa-schumacher-jordan-1991.jpg",    "Michael Schumacher 1991 Belgian Grand Prix Jordan"),
    ("spa-1998.jpg",                       "1998 Belgian Grand Prix formula one"),
    ("spa-2014.jpg",                       "2014 Belgian Grand Prix formula one"),
    ("spa-2016.jpg",                       "2016 Belgian Grand Prix formula one"),
    ("spa-verstappen-2021.jpg",            "Max Verstappen 2021 Belgian Grand Prix"),
    # MONACO
    ("monaco-senna-1984.jpg",             "Ayrton Senna 1984 Monaco Grand Prix Toleman"),
    ("monaco-verstappen-2023.jpg",        "Max Verstappen 2023 Monaco Grand Prix"),
    ("monaco-norris-2025.jpg",            "Lando Norris 2025 Monaco Grand Prix McLaren"),
    # MONZA
    ("monza-gasly-2020.jpg",              "Pierre Gasly 2020 Italian Grand Prix AlphaTauri"),
    ("monza-hamilton-2017.jpg",           "Lewis Hamilton 2017 Italian Grand Prix Mercedes"),
    ("monza-schumacher-2000.jpg",         "Michael Schumacher 2000 Italian Grand Prix Ferrari"),
    # SILVERSTONE
    ("silverstone-mansell-1987.jpg",      "Nigel Mansell 1987 British Grand Prix Williams"),
    ("silverstone-mansell-1992.jpg",      "Nigel Mansell 1992 British Grand Prix Williams"),
    ("silverstone-hamilton-2008.jpg",     "Lewis Hamilton 2008 British Grand Prix McLaren wet"),
    ("silverstone-2021-crash.jpg",        "2021 British Grand Prix Hamilton Verstappen crash"),
    # SUZUKA
    ("suzuka-senna-prost-1989.jpg",       "Ayrton Senna Alain Prost 1989 Japanese Grand Prix collision"),
    ("suzuka-senna-prost-1990.jpg",       "Ayrton Senna Alain Prost 1990 Japanese Grand Prix"),
    ("suzuka-schumacher-2000.jpg",        "Michael Schumacher 2000 Japanese Grand Prix Ferrari title"),
    ("suzuka-verstappen-2022.jpg",        "Max Verstappen 2022 Japanese Grand Prix"),
    ("suzuka-hamilton-2015.jpg",          "Lewis Hamilton 2015 Japanese Grand Prix Mercedes"),
    ("suzuka-antonelli-2025.jpg",         "Kimi Antonelli 2025 Japanese Grand Prix Mercedes"),
    # INTERLAGOS
    ("interlagos-senna-1991.jpg",         "Ayrton Senna 1991 Brazilian Grand Prix McLaren"),
    ("interlagos-schumacher-1994.jpg",    "Michael Schumacher 1994 Brazilian Grand Prix Benetton"),
    ("interlagos-vettel-2012.jpg",        "Sebastian Vettel 2012 Brazilian Grand Prix Red Bull title"),
    ("interlagos-verstappen-2022.jpg",    "Max Verstappen 2022 Brazilian Grand Prix Red Bull"),
    ("interlagos-norris-2024.jpg",        "Lando Norris 2024 Brazilian Grand Prix McLaren"),
    # BAHRAIN
    ("bahrain-grosjean-2020-crash.jpg",   "Romain Grosjean 2020 Bahrain Grand Prix crash fire"),
    ("bahrain-hamilton-2014.jpg",         "Lewis Hamilton 2014 Bahrain Grand Prix Mercedes"),
    ("bahrain-verstappen-2021.jpg",       "Max Verstappen 2021 Bahrain Grand Prix Red Bull"),
    ("bahrain-verstappen-2024.jpg",       "Max Verstappen 2024 Bahrain Grand Prix Red Bull"),
    ("bahrain-leclerc-2022.jpg",          "Charles Leclerc 2022 Bahrain Grand Prix Ferrari"),
    # ABU DHABI
    ("abu-dhabi-rosberg-2016.jpg",        "Nico Rosberg 2016 Abu Dhabi Grand Prix title"),
    ("abu-dhabi-verstappen-2021.jpg",     "Max Verstappen 2021 Abu Dhabi Grand Prix title"),
    ("abu-dhabi-norris-2024.jpg",         "Lando Norris 2024 Abu Dhabi Grand Prix McLaren"),
    ("abu-dhabi-hamilton-2014.jpg",       "Lewis Hamilton 2014 Abu Dhabi Grand Prix title"),
    # JEDDAH
    ("jeddah-2021.jpg",                   "2021 Saudi Arabian Grand Prix Jeddah Hamilton Verstappen"),
    ("jeddah-verstappen-2022.jpg",        "Max Verstappen 2022 Saudi Arabian Grand Prix"),
    # ALBERT PARK
    ("albert-park-ralf-2002.jpg",         "Ralf Schumacher 2002 Australian Grand Prix crash"),
    ("albert-park-coulthard-2003.jpg",    "David Coulthard 2003 Australian Grand Prix McLaren"),
    ("albert-park-leclerc-2024.jpg",      "Charles Leclerc 2024 Australian Grand Prix Ferrari"),
    # SHANGHAI
    ("shanghai-hamilton-2011.jpg",        "Lewis Hamilton 2011 Chinese Grand Prix McLaren"),
    ("shanghai-verstappen-2024.jpg",      "Max Verstappen 2024 Chinese Grand Prix Red Bull"),
    # MIAMI
    ("miami-verstappen-2022.jpg",         "Max Verstappen 2022 Miami Grand Prix Red Bull"),
    ("miami-norris-2024.jpg",             "Lando Norris 2024 Miami Grand Prix McLaren first win"),
    # IMOLA
    ("imola-senna-1994.jpg",              "Ayrton Senna 1994 San Marino Grand Prix Tamburello"),
    ("imola-verstappen-2022.jpg",         "Max Verstappen 2022 Emilia Romagna Grand Prix Red Bull"),
    # CANADA
    ("canada-villeneuve-1978.jpg",        "Gilles Villeneuve 1978 Canadian Grand Prix Ferrari"),
    ("canada-button-2011.jpg",            "Jenson Button 2011 Canadian Grand Prix McLaren"),
    ("canada-vettel-2019.jpg",            "Sebastian Vettel 2019 Canadian Grand Prix penalty"),
    # BARCELONA
    ("barcelona-senna-mansell-1991.jpg",  "Ayrton Senna Nigel Mansell 1991 Spanish Grand Prix"),
    ("barcelona-verstappen-2016.jpg",     "Max Verstappen 2016 Spanish Grand Prix Red Bull youngest winner"),
    ("barcelona-hamilton-2017.jpg",       "Lewis Hamilton 2017 Spanish Grand Prix Mercedes"),
    ("barcelona-verstappen-2021.jpg",     "Max Verstappen 2021 Spanish Grand Prix Red Bull"),
    # HUNGARORING
    ("hungary-hamilton-2020.jpg",         "Lewis Hamilton 2020 Hungarian Grand Prix Mercedes"),
    ("hungary-ocon-2021.jpg",             "Esteban Ocon 2021 Hungarian Grand Prix Alpine win"),
    ("hungary-vettel-2010.jpg",           "Sebastian Vettel 2010 Hungarian Grand Prix Red Bull"),
    # ZANDVOORT
    ("zandvoort-verstappen-2021.jpg",     "Max Verstappen 2021 Dutch Grand Prix Zandvoort"),
    ("zandvoort-verstappen-2022.jpg",     "Max Verstappen 2022 Dutch Grand Prix Zandvoort"),
    ("zandvoort-verstappen-2023.jpg",     "Max Verstappen 2023 Dutch Grand Prix Zandvoort"),
    # BAKU
    ("baku-verstappen-tyre-2021.jpg",     "Max Verstappen 2021 Azerbaijan Grand Prix tyre failure"),
    ("baku-hamilton-2021.jpg",            "Lewis Hamilton 2021 Azerbaijan Grand Prix brake magic"),
    ("baku-leclerc-2022.jpg",             "Charles Leclerc 2022 Azerbaijan Grand Prix Ferrari DNF"),
    ("baku-perez-2021.jpg",               "Sergio Perez 2021 Azerbaijan Grand Prix win Red Bull"),
    # SINGAPORE
    ("singapore-sainz-2023.jpg",          "Carlos Sainz 2023 Singapore Grand Prix Ferrari win"),
    # COTA
    ("cota-verstappen-2021.jpg",          "Max Verstappen 2021 United States Grand Prix Austin"),
    # MEXICO
    ("mexico-hamilton-2016.jpg",          "Lewis Hamilton 2016 Mexican Grand Prix Mercedes"),
    ("mexico-verstappen-2022.jpg",        "Max Verstappen 2022 Mexican Grand Prix Red Bull"),
    # LAS VEGAS
    ("las-vegas-drain-2023.jpg",          "2023 Las Vegas Grand Prix drain cover Sainz Ferrari"),
    ("las-vegas-verstappen-2023.jpg",     "Max Verstappen 2023 Las Vegas Grand Prix night win"),
    ("las-vegas-verstappen-2024.jpg",     "Max Verstappen 2024 Las Vegas Grand Prix title"),
    # QATAR
    ("qatar-hamilton-2021.jpg",           "Lewis Hamilton 2021 Qatar Grand Prix Mercedes win"),
    ("qatar-verstappen-wdc3-2023.jpg",    "Max Verstappen 2023 Qatar Grand Prix sprint WDC title"),
    ("qatar-alonso-2023.jpg",             "Fernando Alonso 2023 Qatar Grand Prix Aston Martin"),
]

API = "https://commons.wikimedia.org/w/api.php"

def search_commons(query):
    """Search Wikimedia Commons for an image, return first result title."""
    params = {
        "action": "query",
        "list": "search",
        "srsearch": query + " filetype:bitmap",
        "srnamespace": 6,
        "srlimit": 5,
        "format": "json",
    }
    resp = SESSION.get(API, params=params, timeout=15)
    resp.raise_for_status()
    data = resp.json()
    results = data.get("query", {}).get("search", [])
    if not results:
        # Try without filetype filter
        params["srsearch"] = query
        resp = SESSION.get(API, params=params, timeout=15)
        data = resp.json()
        results = data.get("query", {}).get("search", [])
    return [r["title"] for r in results] if results else []

def get_thumb_url(file_title, width=1280):
    """Get thumbnail URL for a Commons file title."""
    params = {
        "action": "query",
        "titles": file_title,
        "prop": "imageinfo",
        "iiprop": "url",
        "iiurlwidth": width,
        "format": "json",
    }
    resp = SESSION.get(API, params=params, timeout=15)
    resp.raise_for_status()
    data = resp.json()
    pages = data.get("query", {}).get("pages", {})
    for page in pages.values():
        ii = page.get("imageinfo", [])
        if ii:
            return ii[0].get("thumburl") or ii[0].get("url")
    return None

def download(url, out_path):
    """Download a file to out_path."""
    resp = SESSION.get(url, timeout=30, stream=True)
    resp.raise_for_status()
    with open(out_path, "wb") as f:
        for chunk in resp.iter_content(65536):
            f.write(chunk)
    size = os.path.getsize(out_path)
    return size

results = {}  # filename -> status

for filename, query in ITEMS:
    out_path = os.path.join(OUT_DIR, filename)
    if os.path.exists(out_path) and os.path.getsize(out_path) > 5000:
        print(f"  SKIP (exists): {filename}")
        results[filename] = "exists"
        continue

    print(f"\n  Searching: {query}")
    try:
        titles = search_commons(query)
        if not titles:
            print(f"  NOT FOUND: {filename}")
            results[filename] = "not_found"
            time.sleep(2)
            continue

        # Try each result until we get an image URL
        thumb_url = None
        chosen_title = None
        for title in titles[:3]:
            thumb_url = get_thumb_url(title)
            if thumb_url:
                chosen_title = title
                break
            time.sleep(1)

        if not thumb_url:
            print(f"  NO URL: {filename} (titles: {titles[:2]})")
            results[filename] = "no_url"
            time.sleep(2)
            continue

        print(f"  Found: {chosen_title}")
        print(f"  URL: {thumb_url[:80]}...")
        size = download(thumb_url, out_path)
        print(f"  Downloaded: {filename} ({size:,} bytes)")
        results[filename] = f"ok:{chosen_title}"
        time.sleep(DELAY)

    except Exception as e:
        print(f"  ERROR {filename}: {e}")
        results[filename] = f"error:{e}"
        time.sleep(3)

# Summary
print("\n\n=== RESULTS ===")
ok = [f for f, s in results.items() if s.startswith("ok") or s == "exists"]
nf = [f for f, s in results.items() if s == "not_found"]
nu = [f for f, s in results.items() if s == "no_url"]
err = [f for f, s in results.items() if s.startswith("error")]

print(f"Downloaded/exists: {len(ok)}")
print(f"Not found: {len(nf)}")
print(f"No URL: {len(nu)}")
print(f"Errors: {len(err)}")

if nf:
    print("\nNOT FOUND:")
    for f in nf:
        print(f"  {f}")
if nu:
    print("\nNO URL:")
    for f in nu:
        print(f"  {f}")
if err:
    print("\nERRORS:")
    for f in err:
        print(f"  {f}: {results[f]}")

# Write results to JSON for reference
with open(os.path.join(os.path.dirname(__file__), "venue_image_results.json"), "w") as jf:
    json.dump(results, jf, indent=2)
print("\nResults saved to scripts/venue_image_results.json")
