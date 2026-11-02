#!/usr/bin/env python3
"""
Source openly licensed (non-Wikimedia) images for placeholder slots and self-host them.

Search uses the Openverse API restricted to Flickr, so every candidate comes
with creator + CC license metadata for IMAGE_SOURCES.md.

Usage:
  python3 scripts/fill_placeholder_images.py search "Nelson Piquet Brabham" [--n 20] [--page 2]
  python3 scripts/fill_placeholder_images.py f1-article <formula1.com article url>
  python3 scripts/fill_placeholder_images.py preview <url> <name> [--crop x,y,w,h]
  python3 scripts/fill_placeholder_images.py fetch <url> <public-relative-dest> [--crop x,y,w,h]

  preview → /tmp/ff-preview/<name>.jpg (for visual checks before committing)
  fetch   → frontend/public/<dest>, compressed to <=400KB JPEG, verified with `file`

Run one command at a time — never in parallel (rate limits).
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
FRONTEND = os.path.join(ROOT, 'frontend')
PUBLIC = os.path.join(FRONTEND, 'public')
PREVIEW_DIR = '/tmp/ff-preview'
MAX_BYTES = 400_000
DELAY_SECS = 5
UA = 'formula-function-image-audit/1.0 (self-hosted CC images)'
BLOCKED_HOSTS = ('wikimedia.org', 'wikipedia.org', 'wp-content', 'wordpress.com', 'motorsport.com')


def http_get(url: str) -> bytes:
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read()


def search(query: str, n: int, page: int) -> None:
    # Anonymous Openverse access rejects page_size > 20 with a 401
    params = urllib.parse.urlencode({'q': query, 'source': 'flickr', 'page_size': min(n, 20), 'page': page})
    data = json.loads(http_get(f'https://api.openverse.org/v1/images/?{params}'))
    print(f'total {data.get("result_count")} for "{query}"')
    for r in data.get('results', []):
        print(' | '.join([
            f'{r["license"]} {r["license_version"]}',
            f'{r.get("width")}x{r.get("height")}',
            (r.get('title') or '')[:80],
            r.get('creator') or '',
            r['url'],
            r['foreign_landing_url'],
        ]))
    time.sleep(DELAY_SECS)


def f1_article_images(article_url: str) -> None:
    html = http_get(article_url).decode('utf-8', 'replace')
    found = re.findall(r'media\.formula1\.com/image/upload/[^"\\ ]*?((?:content/dam/)?fom-website/[^"\\ ]+?)\.(?:jpg|jpeg|webp|png)', html)
    for path in dict.fromkeys(found):
        if any(seg in path for seg in ('/sponsors/', 'redesign-assets', 'ooyala', 'Homepagers', 'App%20Store', 'Logo')):
            continue
        print(f'https://media.formula1.com/image/upload/c_fit,w_1400/q_auto/v1740000001/{path}.jpg')
    time.sleep(DELAY_SECS)


def guard(url: str) -> None:
    if any(h in url for h in BLOCKED_HOSTS):
        raise SystemExit(f'refusing blocked host: {url}')


def download(url: str, dest: str, crop: str = '') -> None:
    guard(url)
    raw = http_get(url)
    tmp = dest + '.raw'
    with open(tmp, 'wb') as f:
        f.write(raw)
    compress(tmp, dest, crop)
    os.remove(tmp)
    kind = subprocess.run(['file', '-b', dest], capture_output=True, text=True).stdout.strip()
    if not kind.startswith('JPEG'):
        raise SystemExit(f'not a JPEG: {dest} ({kind})')
    print(f'OK {dest} · {os.path.getsize(dest)} bytes · {kind[:60]}')
    time.sleep(DELAY_SECS)


def compress(src: str, dest: str, crop: str = '') -> None:
    # crop = "x,y,w,h" as fractions (0-1) of the source frame
    script = """
const sharp = require('sharp');
const [src, dest, max, crop] = process.argv.slice(1);
(async () => {
  const input = await sharp(src).rotate().toBuffer();
  const { width, height } = await sharp(input).metadata();
  let base = sharp(input);
  if (crop) {
    const [x, y, w, h] = crop.split(',').map(Number);
    base = sharp(await base.extract({
      left: Math.round(x * width), top: Math.round(y * height),
      width: Math.round(w * width), height: Math.round(h * height),
    }).toBuffer());
  }
  const img = await base.toBuffer();
  for (const q of [85, 78, 70, 62, 55]) {
    const buf = await sharp(img).resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: q, mozjpeg: true }).toBuffer();
    if (buf.length <= Number(max) || q === 55) { await require('fs').promises.writeFile(dest, buf); return; }
  }
})().catch(e => { console.error(e); process.exit(1); });
"""
    subprocess.run(['node', '-e', script, src, dest, str(MAX_BYTES), crop], cwd=FRONTEND, check=True)


def main() -> None:
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    cmd = sys.argv[1]
    crop = sys.argv[sys.argv.index('--crop') + 1] if '--crop' in sys.argv else ''
    if cmd == 'search':
        n = int(sys.argv[sys.argv.index('--n') + 1]) if '--n' in sys.argv else 20
        page = int(sys.argv[sys.argv.index('--page') + 1]) if '--page' in sys.argv else 1
        search(sys.argv[2], n, page)
    elif cmd == 'f1-article':
        f1_article_images(sys.argv[2])
    elif cmd == 'preview':
        os.makedirs(PREVIEW_DIR, exist_ok=True)
        download(sys.argv[2], os.path.join(PREVIEW_DIR, sys.argv[3] + '.jpg'), crop)
    elif cmd == 'fetch':
        dest = os.path.join(PUBLIC, sys.argv[3].lstrip('/'))
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        download(sys.argv[2], dest, crop)
    else:
        raise SystemExit(__doc__)


if __name__ == '__main__':
    main()
