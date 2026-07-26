#!/usr/bin/env python3
"""
Download 2026 F1.com driver cutouts (*right.webp — full-body suit photos)
and self-host them for peak-era portraits.

NOTE: Do NOT use *numberwhitefrless.webp — those are racing-number graphics,
not driver photos. The drivers listing page composites number + *right cutout.

Run: python3 scripts/download_f1_portraits.py
     python3 scripts/download_f1_portraits.py --force
"""

from __future__ import annotations

import os
import sys
import time
import urllib.request

IMAGES_DIR = os.path.join(
    os.path.dirname(__file__),
    '..',
    'frontend',
    'public',
    'images',
    'drivers',
)
DELAY_SECS = 2
UA = (
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
    'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15'
)

# (f1_ref, team_slug_in_url, lastname, app_id)
# Filenames: [lastname]-f1-portrait-2026.webp
DRIVERS: list[tuple[str, str, str, str]] = [
    ('chalec01', 'ferrari', 'leclerc', 'leclerc'),
    ('lewham01', 'ferrari', 'hamilton', 'hamilton'),
    ('maxver01', 'redbullracing', 'verstappen', 'max_verstappen'),
    ('isahad01', 'redbullracing', 'hadjar', 'hadjar'),
    ('lialaw01', 'racingbulls', 'lawson', 'lawson'),
    ('arvlin01', 'racingbulls', 'lindblad', 'lindblad'),
    ('lannor01', 'mclaren', 'norris', 'norris'),
    ('oscpia01', 'mclaren', 'piastri', 'piastri'),
    ('georus01', 'mercedes', 'russell', 'russell'),
    ('andant01', 'mercedes', 'antonelli', 'antonelli'),
    ('carsai01', 'williams', 'sainz', 'sainz'),
    ('alealb01', 'williams', 'albon', 'albon'),
    ('piegas01', 'alpine', 'gasly', 'gasly'),
    ('fracol01', 'alpine', 'colapinto', 'colapinto'),
    ('lanstr01', 'astonmartin', 'stroll', 'stroll'),
    ('feralo01', 'astonmartin', 'alonso', 'alonso'),
    ('gabbor01', 'audi', 'bortoleto', 'bortoleto'),
    ('nichul01', 'audi', 'hulkenberg', 'hulkenberg'),
    ('olibea01', 'haasf1team', 'bearman', 'bearman'),
    ('estoco01', 'haasf1team', 'ocon', 'ocon'),
    ('valbot01', 'cadillac', 'bottas', 'bottas'),
    ('serper01', 'cadillac', 'perez', 'perez'),
]


def url_for(team: str, ref: str) -> str:
    # *right.webp = full-body driver cutout used on formula1.com/drivers cards
    path = f'common/f1/2026/{team}/{ref}/2026{team}{ref}right.webp'
    return (
        'https://media.formula1.com/image/upload/'
        f'c_fit,w_1200/q_auto:best/v1740000001/{path}'
    )


def download(url: str, dest: str) -> None:
    req = urllib.request.Request(
        url,
        headers={
            'User-Agent': UA,
            'Accept': 'image/webp,image/*,*/*;q=0.8',
            'Referer': 'https://www.formula1.com/',
        },
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = resp.read()
    # Guard against accidental number-graphic downloads (tiny files)
    if len(data) < 50_000:
        raise RuntimeError(
            f'downloaded only {len(data)} bytes — likely wrong asset (expected *right.webp photo)'
        )
    with open(dest, 'wb') as f:
        f.write(data)


def main() -> None:
    force = '--force' in sys.argv
    os.makedirs(IMAGES_DIR, exist_ok=True)
    print(f'Downloading {len(DRIVERS)} portraits → {os.path.abspath(IMAGES_DIR)}')
    ok = 0
    for i, (ref, team, lastname, _app_id) in enumerate(DRIVERS):
        filename = f'{lastname}-f1-portrait-2026.webp'
        dest = os.path.join(IMAGES_DIR, filename)
        url = url_for(team, ref)
        if (
            not force
            and os.path.exists(dest)
            and os.path.getsize(dest) > 50_000
        ):
            print(f'[{i+1:02d}/{len(DRIVERS)}] SKIP exists {filename} ({os.path.getsize(dest)} bytes)')
            ok += 1
            continue
        try:
            download(url, dest)
            size = os.path.getsize(dest)
            print(f'[{i+1:02d}/{len(DRIVERS)}] OK {filename} ({size} bytes)')
            ok += 1
        except Exception as e:
            print(f'[{i+1:02d}/{len(DRIVERS)}] FAIL {filename}: {e}')
        if i < len(DRIVERS) - 1:
            time.sleep(DELAY_SECS)
    print(f'Done: {ok}/{len(DRIVERS)}')


if __name__ == '__main__':
    main()
