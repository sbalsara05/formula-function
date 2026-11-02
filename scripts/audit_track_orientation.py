"""Compare each venue track path in venues.ts against the official F1 course layout SVG.

Reference SVGs (Wikimedia Commons "F1 CourseLayout" files, used only as an orientation
reference — never displayed on the site) are expected in /tmp/svgs plus /tmp/italia.svg.

For every venue we resample both outlines by arc length, centre on the centroid, scale by
RMS radius, then compute a symmetric chamfer distance with our path rotated by 0–355° (5°
steps, screen-space clockwise) and mirrored. The best angle says how far our map is
rotated from the official orientation.

Usage: python3 scripts/audit_track_orientation.py [--json out.json]
"""
import argparse
import json
import math
import re
import xml.etree.ElementTree as ET
from pathlib import Path

import numpy as np
from scipy.spatial import cKDTree

from rotate_track_path import VENUES, flatten

REF_DIR = Path("/tmp/svgs")
REFS = {
    "SPA": "2022_F1_CourseLayout_Belgium.svg",
    "MONACO": "2022_F1_CourseLayout_Monaco.svg",
    "MONZA": "/tmp/italia.svg",
    "SILVERSTONE": "2022_F1_CourseLayout_Britain.svg",
    "SUZUKA": "2022_F1_CourseLayout_Japan.svg",
    "INTERLAGOS": "2022_F1_CourseLayout_São_Paulo.svg",
    "BAHRAIN": "2022_F1_CourseLayout_Bahrain.svg",
    "ABU_DHABI": "2022_F1_CourseLayout_Abu_Dhabi.svg",
    "JEDDAH": "2023_F1_CourseLayout_Saudi-Arabia.svg",
    "MELBOURNE": "2023_F1_CourseLayout_Australia.svg",
    "MIAMI": "2022_F1_CourseLayout_Miami.svg",
    "IMOLA": "2022_F1_CourseLayout_Imola.svg",
    "MONTREAL": "2022_F1_CourseLayout_Canada.svg",
    "BARCELONA": "2023_F1_CourseLayout_Spain.svg",
    "HUNGARORING": "2022_F1_CourseLayout_Hungary.svg",
    "ZANDVOORT": "2022_F1_CourseLayout_Netherlands.svg",
    "BAKU": "2023_F1_CourseLayout_Azerbaijan.svg",
    "SINGAPORE": "2022_F1_CourseLayout_Singapore.svg",
    "COTA": "2022_F1_CourseLayout_COTA.svg",
    "MEXICO": "2022_F1_CourseLayout_Mexico.svg",
    "QATAR": "2023_F1_CourseLayout_Qatar.svg",
}
N = 1500


def resample(polys, n=N):
    segs = []
    for poly in polys:
        a = np.array(poly)
        for i in range(len(a) - 1):
            segs.append((a[i], a[i + 1]))
    lens = np.array([np.linalg.norm(b - a) for a, b in segs])
    total = lens.sum()
    out = []
    for (a, b), L in zip(segs, lens):
        k = max(1, int(round(n * L / total)))
        for t in np.linspace(0, 1, k, endpoint=False):
            out.append(a + (b - a) * t)
    pts = np.array(out)
    pts -= pts.mean(axis=0)
    pts /= math.sqrt((pts ** 2).sum(axis=1).mean())
    return pts


def ref_paths(path: Path):
    """All class=st0 path d strings, refusing any with a transform on it or an ancestor."""
    root = ET.parse(path).getroot()
    out = []

    def walk(el, transformed):
        transformed = transformed or "transform" in el.attrib
        if el.tag.endswith("path") and el.attrib.get("class") == "st0":
            if transformed:
                raise SystemExit(f"{path.name}: st0 path is under a transform")
            out.append(el.attrib["d"])
        for ch in el:
            walk(ch, transformed)

    walk(root, False)
    return out


def chamfer(a, b):
    da, _ = cKDTree(b).query(a)
    db, _ = cKDTree(a).query(b)
    return float(da.mean() + db.mean()) / 2


def rot(pts, deg):
    # Screen space (y down): positive degrees rotate clockwise on screen.
    r = math.radians(deg)
    c, s = math.cos(r), math.sin(r)
    return pts @ np.array([[c, s], [-s, c]])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--json")
    args = ap.parse_args()
    text = VENUES.read_text()
    results = {}
    for key, ref in REFS.items():
        m = re.search(rf'const {key}_TRACK_PATH =\s*\n\s*"([^"]+)"', text)
        ours = resample(flatten(m.group(1)))
        rp = Path(ref) if ref.startswith("/") else REF_DIR / ref
        theirs = resample([p for d in ref_paths(rp) for p in flatten(d)])
        scores = {}
        for mirror in (False, True):
            base = ours * np.array([-1, 1]) if mirror else ours
            for deg in range(0, 360, 5):
                scores[(mirror, deg)] = chamfer(rot(base, deg), theirs)
        (mir, deg), best = min(scores.items(), key=lambda kv: kv[1])
        quarter = {q: scores[(False, q)] for q in (0, 90, 180, 270)}
        results[key] = {
            "bestDeg": deg, "mirror": mir, "best": round(best, 4),
            "quarter": {k: round(v, 4) for k, v in quarter.items()},
        }
        q = " ".join(f"{k:>3}:{v:.3f}" for k, v in quarter.items())
        print(f"{key:12s} best {'M' if mir else ' '}{deg:>3}° {best:.4f} | {q}")
    if args.json:
        Path(args.json).write_text(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
