#!/usr/bin/env python3
"""Download 2026 team browse-card photos from Wikimedia Commons (1280px thumbs).

Front 3/4 on-track qualifying shots from the 2026 Chinese GP — same photographic
style as the Aston Martin browse card (trackside, nose visible, not flat side profile).
"""

import argparse
import json
import os
import subprocess
import time
import urllib.parse
import urllib.request

OUT_DIR = '/Users/sbalsara/Documents/GitHub/formula-function/frontend/public/images/teams/browse'
MAX_BYTES = 400 * 1024
DELAY_SECS = 7

UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
HEADERS = {
    'User-Agent': UA,
    'Accept': 'application/json,text/plain,*/*',
    'Accept-Language': 'en-US,en;q=0.9',
}

# slug → Wikimedia filename (2026 Chinese GP qualifying — front 3/4 trackside)
TEAM_FILES: dict[str, str] = {
    'ferrari': '2026 Chinese GP - Ferrari - Charles Leclerc - Qualifying.jpg',
    'red-bull': '2026 Chinese GP - Red Bull - Max Verstappen - Qualifying.jpg',
    'mclaren': '2026 Chinese GP - McLaren - Lando Norris - Qualifying.jpg',
    'mercedes': '2026 Chinese GP - Mercedes - George Russell - Qualifying.jpg',
    'williams': '2026 Chinese GP - Williams - Alex Albon - Qualifying.jpg',
    'aston-martin': '2026 Chinese GP - Aston Martin - Fernando Alonso - Qualifying.jpg',
    'alpine': '2026 Chinese GP - Alpine - Pierre Gasly - Qualifying.jpg',
    'haas': '2026 Chinese GP - Haas - Oliver Bearman - Qualifying.jpg',
    'rb': '2026 Chinese GP - Racing Bulls - Arvid Lindblad - Qualifying.jpg',
    'audi': '2026 Chinese GP - Audi - Nico Hulkenberg - Qualifying.jpg',
    'cadillac': '2026 Chinese GP - Cadillac - Valtteri Bottas - Qualifying.jpg',
}


def thumb_url(filename: str, width: int = 1280) -> str:
    title = f'File:{filename}'
    params = urllib.parse.urlencode({
        'action': 'query',
        'titles': title,
        'prop': 'imageinfo',
        'iiprop': 'url',
        'iiurlwidth': str(width),
        'format': 'json',
    })
    api = f'https://commons.wikimedia.org/w/api.php?{params}'
    req = urllib.request.Request(api, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read().decode())
    pages = data['query']['pages']
    page = next(iter(pages.values()))
    if 'imageinfo' not in page:
        raise RuntimeError(f'No imageinfo for {filename}: {page}')
    return page['imageinfo'][0]['thumburl']


def compress_if_needed(path: str) -> None:
    size = os.path.getsize(path)
    if size > MAX_BYTES:
        print(f'  → {size // 1024}KB — compressing…')
        subprocess.run(
            ['sips', '-Z', '1200', '--setProperty', 'formatOptions', '75', path],
            capture_output=True,
        )
        print(f'  → compressed to {os.path.getsize(path) // 1024}KB')


def download(url: str, dest: str) -> None:
    req = urllib.request.Request(url, headers={**HEADERS, 'Referer': 'https://commons.wikimedia.org/'})
    with urllib.request.urlopen(req, timeout=60) as resp:
        with open(dest, 'wb') as f:
            f.write(resp.read())


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--force', action='store_true', help='Re-download even if file exists')
    args = parser.parse_args()

    os.makedirs(OUT_DIR, exist_ok=True)
    ok, fail = 0, 0

    for i, (slug, filename) in enumerate(TEAM_FILES.items(), 1):
        dest = os.path.join(OUT_DIR, f'{slug}-china-2026.jpg')
        if not args.force and os.path.exists(dest) and os.path.getsize(dest) > 10_000:
            print(f'[{i}/{len(TEAM_FILES)}] skip {slug} (exists)')
            ok += 1
            continue

        print(f'[{i}/{len(TEAM_FILES)}] {slug} ← {filename}')
        try:
            url = thumb_url(filename)
            download(url, dest)
            compress_if_needed(dest)
            print(f'  ✓ {os.path.getsize(dest) // 1024}KB')
            ok += 1
        except Exception as e:
            print(f'  ✗ {e}')
            fail += 1

        if i < len(TEAM_FILES):
            time.sleep(DELAY_SECS)

    print(f'\nDone: {ok} ok, {fail} failed → {OUT_DIR}')


if __name__ == '__main__':
    main()
