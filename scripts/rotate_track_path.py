"""Rotate an SVG track path constant in venues.ts by 90° on the 500×500 canvas.

Usage: python3 scripts/rotate_track_path.py MONZA_TRACK_PATH ccw [--write]

Output path is absolute (M/L/C/Q/Z); arcs are not supported (no track path uses them).
"""
import argparse
import re
from pathlib import Path

VENUES = Path(__file__).resolve().parent.parent / "frontend" / "src" / "data" / "mock" / "venues.ts"
SIZE = 500.0
ARGC = {"M": 2, "L": 2, "H": 1, "V": 1, "C": 6, "S": 4, "Q": 4, "T": 2, "Z": 0}


def tokenize(d: str):
    for cmd, args in re.findall(r"([MLHVCSQTZmlhvcsqtz])([^MLHVCSQTZmlhvcsqtz]*)", d):
        nums = [float(n) for n in re.findall(r"-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?", args)]
        yield cmd, nums


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


def rotate(x: float, y: float, direction: str):
    # Screen coordinates (y down): ccw sends north to west.
    return (y, SIZE - x) if direction == "ccw" else (SIZE - y, x)


def fmt(v: float) -> str:
    s = f"{v:.3f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def rotate_path(d: str, direction: str) -> str:
    out = []
    for kind, pts in to_absolute(d):
        coords = []
        for i in range(0, len(pts), 2):
            coords.extend(rotate(pts[i], pts[i + 1], direction))
        out.append(kind + " ".join(fmt(c) for c in coords))
    return "".join(out)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("const")
    ap.add_argument("direction", choices=["cw", "ccw"])
    ap.add_argument("--write", action="store_true")
    args = ap.parse_args()

    text = VENUES.read_text()
    pat = re.compile(rf'(const {re.escape(args.const)} =\s*\n\s*")([^"]+)(";)')
    m = pat.search(text)
    if not m:
        raise SystemExit(f"{args.const} not found")
    new_d = rotate_path(m.group(2), args.direction)
    print(new_d[:200] + "…")
    if args.write:
        VENUES.write_text(text[: m.start(2)] + new_d + text[m.end(2):])
        print(f"Rewrote {args.const} in {VENUES}")


if __name__ == "__main__":
    main()
