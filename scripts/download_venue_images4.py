#!/usr/bin/env python3
"""
Final targeted pass: look up specific known Wikimedia Commons filenames
via the imageinfo API (batch, no search/category rate limits).
Only downloads where we have a real JPEG race photo (not PNG circuit maps).
"""
import urllib.request
import urllib.parse
import json
import os
import time

OUT_DIR = os.path.join(os.path.dirname(__file__), "../frontend/public/images/venues")
API = "https://commons.wikimedia.org/w/api.php"
HEADERS = {"User-Agent": "formula-function-bot/1.0 (balsara.s@northeastern.edu)"}
DELAY_DL = 7

def is_real_jpeg(path):
    if not os.path.exists(path) or os.path.getsize(path) < 20000:
        return False
    with open(path, "rb") as f:
        sig = f.read(3)
    return sig == b'\xff\xd8\xff'

def api_get(params):
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read())

def batch_imageinfo(file_titles, width=1280):
    """Check up to 50 File: titles at once, return {title: thumburl} for those that exist."""
    data = api_get({
        "action": "query",
        "titles": "|".join(file_titles[:50]),
        "prop": "imageinfo",
        "iiprop": "url|mediatype|size",
        "iiurlwidth": width,
        "format": "json",
    })
    result = {}
    for page in data.get("query", {}).get("pages", {}).values():
        if "missing" in page:
            continue
        title = page.get("title", "")
        ii = page.get("imageinfo", [])
        if not ii:
            continue
        info = ii[0]
        # Skip very small images (circuit maps are often huge but banners are tiny)
        h = info.get("height", 999)
        w_actual = info.get("width", 999)
        if h < 200 or w_actual < 200:
            continue
        url = info.get("thumburl") or info.get("url")
        if url:
            result[title] = (url, info.get("mediatype",""), h, w_actual)
    return result

def download(url, path):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    with open(path, "wb") as f:
        f.write(data)
    return len(data)

# Mapping: output_filename → list of candidate Wikimedia Commons titles (ordered best to worst)
CANDIDATES = {
    # SPA
    "spa-1998.jpg": [
        "File:1998 Belgian Grand Prix.jpg",
        "File:David Coulthard 1998 Belgian Grand Prix.jpg",
        "File:Damon Hill 1998 Belgian Grand Prix.jpg",
        "File:Michael Schumacher 1998 Belgian Grand Prix.jpg",
    ],
    "spa-verstappen-2021.jpg": [
        "File:2021 Belgian Grand Prix.jpg",
        "File:Max Verstappen 2021 Belgian Grand Prix.jpg",
        "File:George Russell 2021 Belgian Grand Prix.jpg",
        "File:Lewis Hamilton 2021 Belgian Grand Prix.jpg",
    ],
    # MONACO
    "monaco-senna-1984.jpg": [
        "File:Ayrton Senna 1984 Monaco Grand Prix.jpg",
        "File:1984 Monaco Grand Prix.jpg",
        "File:Ayrton Senna Toleman 1984 Monaco.jpg",
        "File:Toleman TG184 Monaco 1984.jpg",
        "File:Senna 1984 Monaco.jpg",
        "File:Toleman 1984 Monaco.jpg",
    ],
    # MONZA
    "monza-gasly-2020.jpg": [
        "File:Pierre Gasly 2020 Italian Grand Prix.jpg",
        "File:2020 Italian Grand Prix.jpg",
        "File:Pierre Gasly AlphaTauri 2020 Italian Grand Prix.jpg",
        "File:AlphaTauri AT01 2020 Italian Grand Prix.jpg",
    ],
    "monza-hamilton-2017.jpg": [
        "File:Lewis Hamilton 2017 Italian Grand Prix.jpg",
        "File:2017 Italian Grand Prix.jpg",
        "File:Lewis Hamilton Mercedes 2017 Italian Grand Prix.jpg",
    ],
    # SILVERSTONE
    "silverstone-mansell-1987.jpg": [
        "File:Nigel Mansell 1987 British Grand Prix.jpg",
        "File:1987 British Grand Prix.jpg",
        "File:Nelson Piquet 1987 British Grand Prix.jpg",
        "File:Williams FW11B 1987 British Grand Prix.jpg",
    ],
    "silverstone-hamilton-2008.jpg": [
        "File:Lewis Hamilton 2008 British Grand Prix.jpg",
        "File:2008 British Grand Prix.jpg",
        "File:Lewis Hamilton McLaren 2008 British Grand Prix.jpg",
    ],
    # SUZUKA
    "suzuka-senna-prost-1989.jpg": [
        "File:1989 Japanese Grand Prix.jpg",
        "File:Ayrton Senna 1989 Japanese Grand Prix.jpg",
        "File:Senna Prost 1989 Japanese Grand Prix.jpg",
        "File:Alain Prost 1989 Japanese Grand Prix.jpg",
    ],
    "suzuka-senna-prost-1990.jpg": [
        "File:1990 Japanese Grand Prix.jpg",
        "File:Ayrton Senna 1990 Japanese Grand Prix.jpg",
        "File:Senna Prost 1990 Japanese Grand Prix.jpg",
        "File:Alain Prost 1990 Japanese Grand Prix.jpg",
    ],
    # INTERLAGOS
    "interlagos-senna-1991.jpg": [
        "File:Ayrton Senna 1991 Brazilian Grand Prix.jpg",
        "File:1991 Brazilian Grand Prix.jpg",
        "File:Ayrton Senna McLaren 1991 Brazilian Grand Prix.jpg",
    ],
    "interlagos-verstappen-2022.jpg": [
        "File:Max Verstappen 2022 Brazilian Grand Prix.jpg",
        "File:2022 Brazilian Grand Prix.jpg",
        "File:Max Verstappen Red Bull 2022 Brazilian Grand Prix.jpg",
        "File:Lando Norris 2022 Brazilian Grand Prix.jpg",
    ],
    "interlagos-norris-2024.jpg": [
        "File:Lando Norris 2024 Brazilian Grand Prix.jpg",
        "File:2024 Brazilian Grand Prix.jpg",
        "File:Lando Norris McLaren 2024 Brazilian Grand Prix.jpg",
        "File:Max Verstappen 2024 Brazilian Grand Prix.jpg",
    ],
    # BAHRAIN
    "bahrain-grosjean-2020-crash.jpg": [
        "File:Romain Grosjean crash 2020 Bahrain Grand Prix.jpg",
        "File:Grosjean 2020 Bahrain crash.jpg",
        "File:Romain Grosjean 2020 Bahrain Grand Prix crash.jpg",
        "File:2020 Bahrain Grand Prix crash.jpg",
        "File:Romain Grosjean Haas 2020 Bahrain Grand Prix.jpg",
    ],
    "bahrain-verstappen-2021.jpg": [
        "File:Max Verstappen 2021 Bahrain Grand Prix.jpg",
        "File:2021 Bahrain Grand Prix.jpg",
        "File:Lewis Hamilton 2021 Bahrain Grand Prix.jpg",
        "File:Max Verstappen Red Bull 2021 Bahrain Grand Prix.jpg",
    ],
    "bahrain-verstappen-2024.jpg": [
        "File:Max Verstappen 2024 Bahrain Grand Prix.jpg",
        "File:2024 Bahrain Grand Prix.jpg",
        "File:Max Verstappen Red Bull 2024 Bahrain Grand Prix.jpg",
    ],
    # ABU DHABI
    "abu-dhabi-rosberg-2016.jpg": [
        "File:Nico Rosberg 2016 Abu Dhabi Grand Prix.jpg",
        "File:2016 Abu Dhabi Grand Prix.jpg",
        "File:Nico Rosberg Mercedes 2016 Abu Dhabi Grand Prix.jpg",
        "File:Lewis Hamilton 2016 Abu Dhabi Grand Prix.jpg",
    ],
    "abu-dhabi-norris-2024.jpg": [
        "File:Lando Norris 2024 Abu Dhabi Grand Prix.jpg",
        "File:2024 Abu Dhabi Grand Prix.jpg",
        "File:Lando Norris McLaren 2024 Abu Dhabi Grand Prix.jpg",
    ],
    "abu-dhabi-hamilton-2014.jpg": [
        "File:Lewis Hamilton 2014 Abu Dhabi Grand Prix.jpg",
        "File:2014 Abu Dhabi Grand Prix.jpg",
        "File:Lewis Hamilton Mercedes 2014 Abu Dhabi Grand Prix.jpg",
        "File:Nico Rosberg 2014 Abu Dhabi Grand Prix.jpg",
    ],
    # JEDDAH
    "jeddah-2021.jpg": [
        "File:2021 Saudi Arabian Grand Prix.jpg",
        "File:Lewis Hamilton 2021 Saudi Arabian Grand Prix.jpg",
        "File:Max Verstappen 2021 Saudi Arabian Grand Prix.jpg",
        "File:2021 Saudi Arabian Grand Prix start.jpg",
    ],
    "jeddah-verstappen-2022.jpg": [
        "File:Max Verstappen 2022 Saudi Arabian Grand Prix.jpg",
        "File:2022 Saudi Arabian Grand Prix.jpg",
        "File:Charles Leclerc 2022 Saudi Arabian Grand Prix.jpg",
    ],
    # ALBERT PARK
    "albert-park-coulthard-2003.jpg": [
        "File:David Coulthard 2003 Australian Grand Prix.jpg",
        "File:2003 Australian Grand Prix.jpg",
        "File:David Coulthard McLaren 2003 Australian Grand Prix.jpg",
        "File:Kimi Raikkonen 2003 Australian Grand Prix.jpg",
    ],
    "albert-park-leclerc-2024.jpg": [
        "File:Charles Leclerc 2024 Australian Grand Prix.jpg",
        "File:2024 Australian Grand Prix.jpg",
        "File:Charles Leclerc Ferrari 2024 Australian Grand Prix.jpg",
        "File:Carlos Sainz 2024 Australian Grand Prix.jpg",
    ],
    # SHANGHAI
    "shanghai-hamilton-2011.jpg": [
        "File:Lewis Hamilton 2011 Chinese Grand Prix.jpg",
        "File:2011 Chinese Grand Prix.jpg",
        "File:Lewis Hamilton McLaren 2011 Chinese Grand Prix.jpg",
        "File:Sebastian Vettel 2011 Chinese Grand Prix.jpg",
    ],
    # MIAMI
    "miami-verstappen-2022.jpg": [
        "File:Max Verstappen 2022 Miami Grand Prix.jpg",
        "File:2022 Miami Grand Prix.jpg",
        "File:Max Verstappen Red Bull 2022 Miami Grand Prix.jpg",
    ],
    "miami-norris-2024.jpg": [
        "File:Lando Norris 2024 Miami Grand Prix.jpg",
        "File:2024 Miami Grand Prix.jpg",
        "File:Lando Norris McLaren 2024 Miami Grand Prix.jpg",
    ],
    # IMOLA
    "imola-senna-1994.jpg": [
        "File:Ayrton Senna 1994 San Marino Grand Prix.jpg",
        "File:1994 San Marino Grand Prix.jpg",
        "File:Ayrton Senna Williams 1994 San Marino Grand Prix.jpg",
        "File:Senna 1994 Imola.jpg",
        "File:Ayrton Senna 1994.jpg",
    ],
    # CANADA
    "canada-villeneuve-1978.jpg": [
        "File:Gilles Villeneuve 1978 Canadian Grand Prix.jpg",
        "File:1978 Canadian Grand Prix.jpg",
        "File:Gilles Villeneuve Ferrari 1978 Canadian Grand Prix.jpg",
        "File:Gilles Villeneuve Ferrari 312T3.jpg",
    ],
    "canada-vettel-2019.jpg": [
        "File:Sebastian Vettel 2019 Canadian Grand Prix.jpg",
        "File:2019 Canadian Grand Prix.jpg",
        "File:Lewis Hamilton 2019 Canadian Grand Prix.jpg",
        "File:Sebastian Vettel Ferrari 2019 Canadian Grand Prix.jpg",
    ],
    # BARCELONA
    "barcelona-senna-mansell-1991.jpg": [
        "File:Ayrton Senna 1991 Spanish Grand Prix.jpg",
        "File:1991 Spanish Grand Prix.jpg",
        "File:Nigel Mansell 1991 Spanish Grand Prix.jpg",
        "File:Ayrton Senna Nigel Mansell 1991 Spanish Grand Prix.jpg",
    ],
    "barcelona-verstappen-2016.jpg": [
        "File:Max Verstappen 2016 Spanish Grand Prix.jpg",
        "File:2016 Spanish Grand Prix.jpg",
        "File:Max Verstappen Red Bull 2016 Spanish Grand Prix.jpg",
    ],
    "barcelona-hamilton-2017.jpg": [
        "File:Lewis Hamilton 2017 Spanish Grand Prix.jpg",
        "File:2017 Spanish Grand Prix.jpg",
        "File:Lewis Hamilton Mercedes 2017 Spanish Grand Prix.jpg",
    ],
    "barcelona-verstappen-2021.jpg": [
        "File:Max Verstappen 2021 Spanish Grand Prix.jpg",
        "File:2021 Spanish Grand Prix.jpg",
        "File:Max Verstappen Red Bull 2021 Spanish Grand Prix.jpg",
    ],
    # HUNGARORING
    "hungary-hamilton-2020.jpg": [
        "File:Lewis Hamilton 2020 Hungarian Grand Prix.jpg",
        "File:2020 Hungarian Grand Prix.jpg",
        "File:Lewis Hamilton Mercedes 2020 Hungarian Grand Prix.jpg",
    ],
    "hungary-ocon-2021.jpg": [
        "File:Esteban Ocon 2021 Hungarian Grand Prix.jpg",
        "File:2021 Hungarian Grand Prix.jpg",
        "File:Esteban Ocon Alpine 2021 Hungarian Grand Prix.jpg",
        "File:Sebastian Vettel 2021 Hungarian Grand Prix.jpg",
    ],
    # ZANDVOORT
    "zandvoort-verstappen-2021.jpg": [
        "File:Max Verstappen 2021 Dutch Grand Prix.jpg",
        "File:2021 Dutch Grand Prix.jpg",
        "File:Max Verstappen Red Bull 2021 Dutch Grand Prix.jpg",
        "File:Lewis Hamilton 2021 Dutch Grand Prix.jpg",
    ],
    "zandvoort-verstappen-2022.jpg": [
        "File:Max Verstappen 2022 Dutch Grand Prix.jpg",
        "File:2022 Dutch Grand Prix.jpg",
        "File:Max Verstappen Red Bull 2022 Dutch Grand Prix.jpg",
    ],
    "zandvoort-verstappen-2023.jpg": [
        "File:Max Verstappen 2023 Dutch Grand Prix.jpg",
        "File:2023 Dutch Grand Prix.jpg",
        "File:Max Verstappen Red Bull 2023 Dutch Grand Prix.jpg",
        "File:Fernando Alonso 2023 Dutch Grand Prix.jpg",
    ],
    # BAKU
    "baku-verstappen-tyre-2021.jpg": [
        "File:Max Verstappen 2021 Azerbaijan Grand Prix.jpg",
        "File:2021 Azerbaijan Grand Prix.jpg",
        "File:Max Verstappen tyre failure 2021 Azerbaijan Grand Prix.jpg",
        "File:Sergio Perez 2021 Azerbaijan Grand Prix.jpg",
    ],
    "baku-hamilton-2021.jpg": [
        "File:Lewis Hamilton 2021 Azerbaijan Grand Prix.jpg",
        "File:Max Verstappen 2021 Azerbaijan Grand Prix.jpg",
        "File:2021 Azerbaijan Grand Prix.jpg",
    ],
    "baku-leclerc-2022.jpg": [
        "File:Charles Leclerc 2022 Azerbaijan Grand Prix.jpg",
        "File:2022 Azerbaijan Grand Prix.jpg",
        "File:Charles Leclerc Ferrari 2022 Azerbaijan Grand Prix.jpg",
        "File:Sergio Perez 2022 Azerbaijan Grand Prix.jpg",
    ],
    "baku-perez-2021.jpg": [
        "File:Sergio Perez 2021 Azerbaijan Grand Prix.jpg",
        "File:2021 Azerbaijan Grand Prix.jpg",
        "File:Max Verstappen 2021 Azerbaijan Grand Prix.jpg",
    ],
    # MEXICO
    "mexico-hamilton-2016.jpg": [
        "File:Lewis Hamilton 2016 Mexican Grand Prix.jpg",
        "File:2016 Mexican Grand Prix.jpg",
        "File:Lewis Hamilton Mercedes 2016 Mexican Grand Prix.jpg",
    ],
    "mexico-verstappen-2022.jpg": [
        "File:Max Verstappen 2022 Mexican Grand Prix.jpg",
        "File:2022 Mexican Grand Prix.jpg",
        "File:Max Verstappen Red Bull 2022 Mexican Grand Prix.jpg",
    ],
    # LAS VEGAS
    "las-vegas-drain-2023.jpg": [
        "File:2023 Las Vegas Grand Prix.jpg",
        "File:Las Vegas Grand Prix 2023.jpg",
        "File:Carlos Sainz 2023 Las Vegas Grand Prix.jpg",
        "File:2023 Las Vegas Grand Prix night.jpg",
    ],
    "las-vegas-verstappen-2023.jpg": [
        "File:Max Verstappen 2023 Las Vegas Grand Prix.jpg",
        "File:2023 Las Vegas Grand Prix.jpg",
        "File:Max Verstappen Red Bull 2023 Las Vegas Grand Prix.jpg",
    ],
    "las-vegas-verstappen-2024.jpg": [
        "File:Max Verstappen 2024 Las Vegas Grand Prix.jpg",
        "File:2024 Las Vegas Grand Prix.jpg",
        "File:Carlos Sainz 2024 Las Vegas Grand Prix.jpg",
    ],
    # QATAR
    "qatar-hamilton-2021.jpg": [
        "File:Lewis Hamilton 2021 Qatar Grand Prix.jpg",
        "File:2021 Qatar Grand Prix.jpg",
        "File:Lewis Hamilton Mercedes 2021 Qatar Grand Prix.jpg",
    ],
    "qatar-verstappen-wdc3-2023.jpg": [
        "File:Max Verstappen 2023 Qatar Grand Prix.jpg",
        "File:2023 Qatar Grand Prix.jpg",
        "File:Max Verstappen Red Bull 2023 Qatar Grand Prix.jpg",
    ],
    "qatar-alonso-2023.jpg": [
        "File:Fernando Alonso 2023 Qatar Grand Prix.jpg",
        "File:2023 Qatar Grand Prix.jpg",
        "File:Max Verstappen 2023 Qatar Grand Prix.jpg",
    ],
    # Also fix misidentified JPEGs
    "abu-dhabi-hamilton-2014.jpg": [
        "File:Lewis Hamilton 2014 Abu Dhabi Grand Prix.jpg",
        "File:2014 Abu Dhabi Grand Prix.jpg",
        "File:Nico Rosberg 2014 Abu Dhabi Grand Prix.jpg",
    ],
    "albert-park-ralf-2002.jpg": [
        "File:Ralf Schumacher 2002 Australian Grand Prix.jpg",
        "File:2002 Australian Grand Prix.jpg",
        "File:Rubens Barrichello 2002 Australian Grand Prix.jpg",
        "File:Michael Schumacher 2002 Australian Grand Prix.jpg",
    ],
    "shanghai-verstappen-2024.jpg": [
        "File:Max Verstappen 2024 Chinese Grand Prix.jpg",
        "File:2024 Chinese Grand Prix.jpg",
        "File:Max Verstappen Red Bull 2024 Chinese Grand Prix.jpg",
    ],
    "silverstone-mansell-1992.jpg": [
        "File:Nigel Mansell 1992 British Grand Prix.jpg",
        "File:1992 British Grand Prix.jpg",
        "File:Nigel Mansell Williams 1992 British Grand Prix.jpg",
        "File:Nigel Mansell Williams FW14B 1992 British Grand Prix.jpg",
    ],
}

# Collect all candidate titles, deduplicate
all_candidates = {}  # title -> set of filenames that want it
for filename, candidates in CANDIDATES.items():
    for title in candidates:
        all_candidates.setdefault(title, []).append(filename)

print(f"Checking {len(all_candidates)} candidate filenames for {len(CANDIDATES)} items...")
print("Doing batch imageinfo lookup...")

# Batch check all candidates
found = {}  # title -> (thumburl, mediatype, height, width)
titles_list = list(all_candidates.keys())

for i in range(0, len(titles_list), 48):
    batch = titles_list[i:i+48]
    result = batch_imageinfo(batch)
    found.update(result)
    print(f"  Checked {min(i+48, len(titles_list))}/{len(titles_list)} — found {len(result)} in this batch")
    time.sleep(3)

print(f"\nTotal found: {len(found)} of {len(titles_list)} candidates")

# For each filename, find the best candidate
plan = {}  # filename -> (title, thumburl)
for filename, candidates in CANDIDATES.items():
    for title in candidates:
        if title in found:
            plan[filename] = (title, found[title][0])
            break

print(f"Can download: {len(plan)} of {len(CANDIDATES)} items")

# Download
results = {}
for filename, (title, url) in plan.items():
    out_path = os.path.join(OUT_DIR, filename)
    print(f"\n  {filename}")
    print(f"    ← {title[:70]}")
    try:
        size = download(url, out_path)
        with open(out_path, "rb") as f:
            sig = f.read(3)
        fmt = "JPEG" if sig == b'\xff\xd8\xff' else ("PNG" if sig[:2] == b'\x89P' else "OTHER")
        print(f"    {size:,} bytes ({fmt})")
        results[filename] = f"ok:{fmt}:{title[:50]}"
        time.sleep(DELAY_DL)
    except Exception as e:
        print(f"    ERROR: {e}")
        results[filename] = f"error:{e}"
        time.sleep(3)

# Report missing
missing = [f for f in CANDIDATES if f not in plan]
print(f"\n\n=== SUMMARY ===")
print(f"Downloaded: {len([v for v in results.values() if v.startswith('ok')])}")
print(f"Could not find: {len(missing)}")
if missing:
    print("\nNot found on Wikimedia Commons:")
    for f in missing:
        print(f"  {f}")

with open(os.path.join(os.path.dirname(__file__), "venue_image_results4.json"), "w") as jf:
    json.dump({"found": {k: v[0] for k,v in plan.items()}, "missing": missing, "results": results}, jf, indent=2)
