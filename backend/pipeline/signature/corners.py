"""Reference line, track coordinate and corner detection for one session.

Live-timing X/Y positions are in decimetres. Every lap is mapped onto the
session's reference lap so that a brake point or apex is expressed in the same
track coordinate `s` (metres) for every driver.
"""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np
from scipy.signal import find_peaks

POS_UNITS_PER_M = 10.0
GRID_STEP_M = 1.0
SEARCH_HALF_WINDOW_M = 150
MIN_PROMINENCE_KMH = 25.0
MIN_CORNER_SPACING_M = 100
MAX_WINDOW_M = 800.0
MAX_APEX_HALF_WIDTH_M = 100.0
LABEL_MATCH_RADIUS_M = 200.0


@dataclass
class ReferenceLine:
    s: np.ndarray
    x: np.ndarray
    y: np.ndarray

    @property
    def length(self) -> float:
        return float(self.s[-1])


@dataclass
class Corner:
    index: int
    label: str
    apex_s: float
    window_start: float
    window_end: float
    apex_half_width: float
    ref_min_speed: float

    def to_dict(self) -> dict:
        return {
            "index": self.index,
            "label": self.label,
            "apex_s": round(self.apex_s, 1),
            "window_start": round(self.window_start, 1),
            "window_end": round(self.window_end, 1),
            "apex_half_width": round(self.apex_half_width, 1),
            "ref_min_speed": round(self.ref_min_speed, 1),
        }


def _clean_path(x: np.ndarray, y: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    ok = np.isfinite(x) & np.isfinite(y) & ~((x == 0) & (y == 0))
    x, y = x[ok], y[ok]
    keep = np.ones(len(x), dtype=bool)
    keep[1:] = (np.diff(x) != 0) | (np.diff(y) != 0)
    return x[keep], y[keep]


def path_distance(x: np.ndarray, y: np.ndarray) -> np.ndarray:
    seg = np.hypot(np.diff(x), np.diff(y)) / POS_UNITS_PER_M
    return np.concatenate([[0.0], np.cumsum(seg)])


def build_reference_line(x: np.ndarray, y: np.ndarray) -> ReferenceLine:
    x, y = _clean_path(np.asarray(x, float), np.asarray(y, float))
    cum = path_distance(x, y)
    grid = np.arange(0.0, cum[-1], GRID_STEP_M)
    return ReferenceLine(s=grid, x=np.interp(grid, cum, x), y=np.interp(grid, cum, y))


def speed_distance(t_s: np.ndarray, speed_kmh: np.ndarray) -> np.ndarray:
    v = np.asarray(speed_kmh, float) / 3.6
    dt = np.diff(np.asarray(t_s, float))
    return np.concatenate([[0.0], np.cumsum(0.5 * (v[1:] + v[:-1]) * dt)])


def project_lap(ref: ReferenceLine, t_s: np.ndarray, speed_kmh: np.ndarray,
                x: np.ndarray, y: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """Return (s, lateral_offset_m) for every sample of a lap.

    The nearest reference point is searched within +/-150 m of the lap's own
    integrated distance (scaled to the reference length), so crossover tracks
    such as Suzuka cannot snap onto the other branch.
    """
    dist = speed_distance(t_s, speed_kmh)
    total = dist[-1] if dist[-1] > 0 else 1.0
    prior = dist * ref.length / total

    n_ref = len(ref.s)
    centre = np.clip(np.round(prior / GRID_STEP_M).astype(int), 0, n_ref - 1)
    offsets = np.arange(-SEARCH_HALF_WINDOW_M, SEARCH_HALF_WINDOW_M + 1)
    cand = np.clip(centre[:, None] + offsets[None, :], 0, n_ref - 1)

    xs = np.asarray(x, float)[:, None]
    ys = np.asarray(y, float)[:, None]
    d2 = (ref.x[cand] - xs) ** 2 + (ref.y[cand] - ys) ** 2
    has_pos = np.isfinite(d2).all(axis=1)
    d2 = np.where(np.isfinite(d2), d2, np.inf)
    best = np.argmin(d2, axis=1)
    idx = cand[np.arange(len(cand)), best]

    s = np.where(has_pos, ref.s[idx], prior)
    offset = np.where(has_pos, np.sqrt(d2[np.arange(len(cand)), best]) / POS_UNITS_PER_M, np.nan)
    return s, offset


def detect_corners(ref_s: np.ndarray, ref_speed: np.ndarray, ref: ReferenceLine,
                   labels: list[dict] | None = None) -> list[Corner]:
    """Speed minima on the reference lap with >=25 km/h prominence."""
    order = np.argsort(ref_s)
    s_sorted, v_sorted = np.asarray(ref_s)[order], np.asarray(ref_speed, float)[order]
    s_unique, first = np.unique(s_sorted, return_index=True)
    v_unique = v_sorted[first]
    speed_grid = np.interp(ref.s, s_unique, v_unique)

    peaks, _ = find_peaks(-speed_grid, prominence=MIN_PROMINENCE_KMH,
                          distance=int(MIN_CORNER_SPACING_M / GRID_STEP_M))
    apexes = [float(ref.s[p]) for p in peaks if 30.0 < ref.s[p] < ref.length - 30.0]

    corners: list[Corner] = []
    for k, apex in enumerate(apexes):
        prev_apex = apexes[k - 1] if k > 0 else None
        next_apex = apexes[k + 1] if k + 1 < len(apexes) else None
        start = max(apex - MAX_WINDOW_M, 0.0 if prev_apex is None else (prev_apex + apex) / 2)
        end = min(apex + MAX_WINDOW_M, ref.length if next_apex is None else (apex + next_apex) / 2)
        half = MAX_APEX_HALF_WIDTH_M
        if prev_apex is not None:
            half = min(half, (apex - prev_apex) / 2)
        if next_apex is not None:
            half = min(half, (next_apex - apex) / 2)
        i = int(round(apex / GRID_STEP_M))
        corners.append(Corner(
            index=k,
            label=_label_for(ref, i, labels) or f"C{k + 1}",
            apex_s=apex,
            window_start=start,
            window_end=end,
            apex_half_width=half,
            ref_min_speed=float(speed_grid[i]),
        ))
    return corners


def _label_for(ref: ReferenceLine, i: int, labels: list[dict] | None) -> str | None:
    if not labels:
        return None
    best, best_d = None, LABEL_MATCH_RADIUS_M
    for lab in labels:
        d = np.hypot(ref.x[i] - lab["x"], ref.y[i] - lab["y"]) / POS_UNITS_PER_M
        if d < best_d:
            best, best_d = lab["label"], d
    return best
