"""Rotate an SVG track path constant in venues.ts on the 500×500 canvas.

Usage: python3 scripts/rotate_track_path.py MONZA_TRACK_PATH ccw [--write]
       python3 scripts/rotate_track_path.py MONACO_TRACK_PATH 45 --write
       python3 scripts/rotate_track_path.py SPA_TRACK_PATH ccw --hotspots spaHotspots --write

Rotation is clockwise on screen. Output path is absolute (M/L/C/Q/A/Z). Arcs add the angle to
their x-axis rotation and keep their flags (rotation preserves sweep direction); radii scale
with any refit. --hotspots moves a Hotspot[] array (x/y percentages) by the same transform.
"""
import argparse
import math
import re
from pathlib import Path

VENUES = Path(__file__).resolve().parent.parent / "frontend" / "src" / "data" / "mock" / "venues.ts"
SIZE = 500.0
ARGC = {"M": 2, "L": 2, "H": 1, "V": 1, "C": 6, "S": 4, "Q": 4, "T": 2, "A": 7, "Z": 0}
NUM = r"[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?"


def arc_args(args: str):
    """Arc args: flags (positions 3 and 4 of each 7-group) may be packed, e.g. '0 01-3.2'."""
    out, pos, i = [], 0, 0
    while True:
        m = re.compile(r"[\s,]*").match(args, pos)
        pos = m.end()
        if pos >= len(args):
            return out
        if i % 7 in (3, 4):
            out.append(float(args[pos])); pos += 1
        else:
            m = re.compile(NUM).match(args, pos)
            if not m:
                raise ValueError(f"bad arc args near {args[pos:pos + 20]!r}")
            out.append(float(m.group(0))); pos = m.end()
        i += 1


def tokenize(d: str):
    for cmd, args in re.findall(r"([MLHVCSQTAZmlhvcsqtaz])([^MLHVCSQTAZmlhvcsqtaz]*)", d):
        if cmd in "Aa":
            yield cmd, arc_args(args)
        else:
            yield cmd, [float(n) for n in re.findall(NUM, args)]


def to_absolute(d: str):
    """Yield absolute segments: ('M',[x,y]) ('L',[x,y]) ('C',[x1,y1,x2,y2,x,y]) ('Q',[...]) ('Z',[])."""
    cx = cy = sx = sy = 0.0
    last_c2 = last_q = None
    for cmd, nums in tokenize(d):
        up, rel = cmd.upper(), cmd.islower()
        n = ARGC[up]
        if up == "Z":
            cx, cy = sx, sy
            last_c2 = last_q = None
            yield "Z", []
            continue
        groups = [nums[i:i + n] for i in range(0, len(nums), n)]
        for gi, g in enumerate(groups):
            ox, oy = (cx, cy) if rel else (0.0, 0.0)
            kind = up
            if up == "M" and gi > 0:
                kind = "L"
            if kind == "M":
                cx, cy = g[0] + ox, g[1] + oy
                sx, sy = cx, cy
                last_c2 = last_q = None
                yield "M", [cx, cy]
            elif kind == "L":
                cx, cy = g[0] + ox, g[1] + oy
                last_c2 = last_q = None
                yield "L", [cx, cy]
            elif kind == "H":
                cx = g[0] + (cx if rel else 0.0)
                last_c2 = last_q = None
                yield "L", [cx, cy]
            elif kind == "V":
                cy = g[0] + (cy if rel else 0.0)
                last_c2 = last_q = None
                yield "L", [cx, cy]
            elif kind == "C":
                x1, y1, x2, y2, x, y = g[0] + ox, g[1] + oy, g[2] + ox, g[3] + oy, g[4] + ox, g[5] + oy
                last_c2, last_q = (x2, y2), None
                cx, cy = x, y
                yield "C", [x1, y1, x2, y2, x, y]
            elif kind == "S":
                x1, y1 = (2 * cx - last_c2[0], 2 * cy - last_c2[1]) if last_c2 else (cx, cy)
                x2, y2, x, y = g[0] + ox, g[1] + oy, g[2] + ox, g[3] + oy
                last_c2, last_q = (x2, y2), None
                cx, cy = x, y
                yield "C", [x1, y1, x2, y2, x, y]
            elif kind == "Q":
                x1, y1, x, y = g[0] + ox, g[1] + oy, g[2] + ox, g[3] + oy
                last_q, last_c2 = (x1, y1), None
                cx, cy = x, y
                yield "Q", [x1, y1, x, y]
            elif kind == "T":
                x1, y1 = (2 * cx - last_q[0], 2 * cy - last_q[1]) if last_q else (cx, cy)
                x, y = g[0] + ox, g[1] + oy
                last_q, last_c2 = (x1, y1), None
                cx, cy = x, y
                yield "Q", [x1, y1, x, y]
            elif kind == "A":
                rx, ry, phi, laf, sf = g[:5]
                x, y = g[5] + ox, g[6] + oy
                last_c2 = last_q = None
                cx, cy = x, y
                yield "A", [rx, ry, phi, laf, sf, x, y]


def arc_points(p0, rx, ry, phi, laf, sf, x, y, steps=12):
    """SVG endpoint arc -> points (SVG spec F.6.5 centre parameterisation)."""
    x0, y0 = p0
    if rx == 0 or ry == 0 or (x0, y0) == (x, y):
        return [(x, y)]
    rx, ry = abs(rx), abs(ry)
    c, s = math.cos(math.radians(phi)), math.sin(math.radians(phi))
    dx, dy = (x0 - x) / 2, (y0 - y) / 2
    x1, y1 = c * dx + s * dy, -s * dx + c * dy
    lam = (x1 / rx) ** 2 + (y1 / ry) ** 2
    if lam > 1:
        rx, ry = rx * math.sqrt(lam), ry * math.sqrt(lam)
    num = rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1
    den = rx * rx * y1 * y1 + ry * ry * x1 * x1
    k = math.sqrt(max(0.0, num / den)) * (-1 if laf == sf else 1)
    cxp, cyp = k * rx * y1 / ry, -k * ry * x1 / rx
    cx = c * cxp - s * cyp + (x0 + x) / 2
    cy = s * cxp + c * cyp + (y0 + y) / 2

    def ang(ux, uy, vx, vy):
        return math.atan2(ux * vy - uy * vx, ux * vx + uy * vy)

    t1 = ang(1, 0, (x1 - cxp) / rx, (y1 - cyp) / ry)
    dt = ang((x1 - cxp) / rx, (y1 - cyp) / ry, (-x1 - cxp) / rx, (-y1 - cyp) / ry)
    if not sf and dt > 0:
        dt -= 2 * math.pi
    elif sf and dt < 0:
        dt += 2 * math.pi
    pts = []
    for i in range(1, steps + 1):
        t = t1 + dt * i / steps
        ex, ey = rx * math.cos(t), ry * math.sin(t)
        pts.append((c * ex - s * ey + cx, s * ex + c * ey + cy))
    return pts


def flatten(d: str):
    """Absolute polylines (one per subpath); curves and arcs sampled at 12 steps."""
    polys, cur, pos = [], [], (0.0, 0.0)
    for kind, p in to_absolute(d):
        if kind == "M":
            if len(cur) > 1:
                polys.append(cur)
            cur, pos = [(p[0], p[1])], (p[0], p[1])
        elif kind == "L":
            pos = (p[0], p[1])
            cur.append(pos)
        elif kind in ("C", "Q"):
            x0, y0 = pos
            for i in range(1, 13):
                t = i / 12
                if kind == "C":
                    x = (1-t)**3*x0 + 3*(1-t)**2*t*p[0] + 3*(1-t)*t*t*p[2] + t**3*p[4]
                    y = (1-t)**3*y0 + 3*(1-t)**2*t*p[1] + 3*(1-t)*t*t*p[3] + t**3*p[5]
                else:
                    x = (1-t)**2*x0 + 2*(1-t)*t*p[0] + t*t*p[2]
                    y = (1-t)**2*y0 + 2*(1-t)*t*p[1] + t*t*p[3]
                cur.append((x, y))
            pos = cur[-1]
        elif kind == "A":
            cur.extend(arc_points(pos, *p))
            pos = (p[5], p[6])
        elif kind == "Z" and cur:
            cur.append(cur[0])
            pos = cur[0]
    if len(cur) > 1:
        polys.append(cur)
    return polys


def bbox(d: str):
    pts = [pt for poly in flatten(d) for pt in poly]
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    return min(xs), min(ys), max(xs), max(ys)


def make_transform(d: str, deg: float):
    """Clockwise screen-space rotation by `deg`.

    Multiples of 90° rotate about the canvas centre (exact, stays on canvas). Other angles
    rotate about the path's bbox centre, then scale and centre the result so its bbox fits
    the canvas with the original path's tightest margin. Returns (fn(x, y), scale).
    """
    deg %= 360
    r = math.radians(deg)
    c, s = round(math.cos(r), 12), round(math.sin(r), 12)
    x0, y0, x1, y1 = bbox(d)
    if deg % 90 == 0:
        h = SIZE / 2
        return (lambda x, y: (h + c * (x - h) - s * (y - h), h + s * (x - h) + c * (y - h))), 1.0
    bx, by = (x0 + x1) / 2, (y0 + y1) / 2
    rot = lambda x, y: (c * (x - bx) - s * (y - by), s * (x - bx) + c * (y - by))
    pts = [rot(*pt) for poly in flatten(d) for pt in poly]
    rx0, rx1 = min(p[0] for p in pts), max(p[0] for p in pts)
    ry0, ry1 = min(p[1] for p in pts), max(p[1] for p in pts)
    margin = min(x0, y0, SIZE - x1, SIZE - y1)
    k = min((SIZE - 2 * margin) / (rx1 - rx0), (SIZE - 2 * margin) / (ry1 - ry0))
    mx, my = (rx0 + rx1) / 2, (ry0 + ry1) / 2

    def fn(x, y):
        u, v = rot(x, y)
        return SIZE / 2 + k * (u - mx), SIZE / 2 + k * (v - my)

    return fn, k


def fmt(v: float) -> str:
    s = f"{v:.3f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def transform_path(d: str, deg: float):
    fn, k = make_transform(d, deg)
    out = []
    for kind, pts in to_absolute(d):
        if kind == "A":
            rx, ry, phi, laf, sf, x, y = pts
            nx, ny = fn(x, y)
            vals = [fmt(rx * k), fmt(ry * k), fmt((phi + deg) % 360), str(int(laf)), str(int(sf)), fmt(nx), fmt(ny)]
            out.append("A" + " ".join(vals))
            continue
        coords = []
        for i in range(0, len(pts), 2):
            coords.extend(fn(pts[i], pts[i + 1]))
        out.append(kind + " ".join(fmt(v) for v in coords))
    return "".join(out), fn


def rotate_path(d: str, direction: str) -> str:
    return transform_path(d, 90 if direction == "cw" else 270)[0]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("const")
    ap.add_argument("rotation", help="cw, ccw, or clockwise degrees (e.g. 45, -65)")
    ap.add_argument("--hotspots", help="Hotspot[] constant to move with the path (x/y are %% of canvas)")
    ap.add_argument("--write", action="store_true")
    args = ap.parse_args()
    deg = {"cw": 90.0, "ccw": 270.0}.get(args.rotation)
    deg = float(args.rotation) if deg is None else deg

    text = VENUES.read_text()
    pat = re.compile(rf'(const {re.escape(args.const)} =\s*\n\s*")([^"]+)(";)')
    m = pat.search(text)
    if not m:
        raise SystemExit(f"{args.const} not found")
    new_d, fn = transform_path(m.group(2), deg)
    print(new_d[:200] + "…")
    print("bbox before", [round(v) for v in bbox(m.group(2))], "after", [round(v) for v in bbox(new_d)])
    text = text[: m.start(2)] + new_d + text[m.end(2):]

    if args.hotspots:
        hp = re.compile(rf"export const {re.escape(args.hotspots)}: Hotspot\[\] = \[(.*?)\n\];", re.S)
        hm = hp.search(text)
        if not hm:
            raise SystemExit(f"{args.hotspots} not found")

        def move(mm):
            x, y = fn(float(mm.group(1)) * SIZE / 100, float(mm.group(2)) * SIZE / 100)
            nx, ny = round(x * 100 / SIZE), round(y * 100 / SIZE)
            print(f"  hotspot {mm.group(1)},{mm.group(2)} -> {nx},{ny}")
            return f"x: {nx}, y: {ny}"

        body = re.sub(r"x: (-?[\d.]+), y: (-?[\d.]+)", move, hm.group(1))
        text = text[: hm.start(1)] + body + text[hm.end(1):]

    if args.write:
        VENUES.write_text(text)
        print(f"Rewrote {args.const}{' and ' + args.hotspots if args.hotspots else ''} in {VENUES}")


if __name__ == "__main__":
    main()
