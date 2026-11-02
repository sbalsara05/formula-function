#!/usr/bin/env python3
"""
Fetch source pages for the venue track-fingerprint pass and cache them as plain text.

Reads `sources` from scripts/venue_fingerprint_inputs.json (or URLs on the command line),
fetches each one sequentially with a delay, and writes readable text to
scripts/venue_audit_cache/fingerprint/<slug>__<host>.txt so figures can be re-checked offline.

Usage:
  python3 scripts/fetch_fingerprint_sources.py url <slug> <url> [<url> ...]
  python3 scripts/fetch_fingerprint_sources.py extract <slug>   # print Pirelli/TI figures from cache

Run one instance at a time — never in parallel (rate limits).
"""

from __future__ import annotations

import html
import os
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
CACHE = os.path.join(ROOT, 'scripts', 'venue_audit_cache', 'fingerprint')
DELAY_SECS = 6
UA = 'Mozilla/5.0 (formula-function venue fingerprint audit)'


def cache_path(slug: str, url: str) -> str:
    host = urllib.parse.urlparse(url).netloc.replace('www.', '')
    tail = re.sub(r'[^a-z0-9]+', '-', urllib.parse.urlparse(url).path.lower()).strip('-')[-60:]
    return os.path.join(CACHE, f'{slug}__{host}__{tail}.txt')


def to_text(raw: str) -> str:
    raw = re.sub(r'(?is)<(script|style|noscript|svg)[^>]*>.*?</\1>', ' ', raw)
    raw = re.sub(r'(?i)<\s*(br|/p|/h\d|/li|/tr|/div|h\d[^>]*)\s*/?>', '\n', raw)
    raw = re.sub(r'(?i)</t[dh]>', ' | ', raw)
    raw = re.sub(r'<[^>]+>', ' ', raw)
    raw = html.unescape(raw)
    lines = [re.sub(r'[ \t]+', ' ', ln).strip() for ln in raw.splitlines()]
    return '\n'.join(ln for ln in lines if ln)


def fetch(slug: str, urls: list[str]) -> None:
    os.makedirs(CACHE, exist_ok=True)
    for i, url in enumerate(urls):
        dest = cache_path(slug, url)
        if os.path.exists(dest):
            print(f'cached  {dest}')
            continue
        if i:
            time.sleep(DELAY_SECS)
        req = urllib.request.Request(url, headers={'User-Agent': UA})
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                body = r.read().decode('utf-8', 'replace')
        except Exception as e:  # noqa: BLE001
            print(f'FAIL    {url} · {e}')
            continue
        text = to_text(body)
        with open(dest, 'w') as f:
            f.write(f'SOURCE: {url}\n\n{text}\n')
        print(f'OK      {dest} · {len(text)} chars')


RATING_KEYS = ['TRACTION', 'TYRE STRESS', 'ASPHALT GRIP', 'BRAKING', 'ASPHALT ABRASION',
               'LATERAL', 'TRACK EVOLUTION', 'DOWNFORCE']
TABLE_KEYS = ['Number of Corners', 'Lap Time At Full Throttle', 'Lap Distance At Full Throttle',
              'Braking Events', 'Heavy Braking Events', 'Braking Energy', 'Maximum Lateral G-Force',
              'Maximum Speed', 'Gear Changes Per Lap']


def extract(slug: str) -> None:
    files = sorted(f for f in os.listdir(CACHE) if f.startswith(f'{slug}__'))
    for name in files:
        text = open(os.path.join(CACHE, name)).read()
        print(f'== {name}')
        for k in RATING_KEYS:
            m = re.search(rf'(?m)^#*\s*{re.escape(k)}\s*\n+\s*(\d)\s*/\s*5', text)
            if m:
                print(f'  pirelli {k}: {m.group(1)}/5')
        for k in TABLE_KEYS:
            m = re.search(rf'{re.escape(k)}[^|\n]*\|\s*([^|\n]+)', text)
            if m:
                print(f'  table {k}: {m.group(1).strip()}')
        for m in re.finditer(r'difficulty (?:index|rating) of (\d)', text):
            print(f'  brembo index: {m.group(1)}')


def main() -> None:
    if len(sys.argv) >= 4 and sys.argv[1] == 'url':
        fetch(sys.argv[2], sys.argv[3:])
    elif len(sys.argv) == 3 and sys.argv[1] == 'extract':
        extract(sys.argv[2])
    else:
        print(__doc__)
        sys.exit(1)


if __name__ == '__main__':
    main()
