"""Shared pieces for the OpenF1-shaped clients that cover seasons before 2023
(tracinginsights_source.py, fastf1_source.py)."""

from __future__ import annotations

from datetime import timedelta

import numpy as np
import pandas as pd

SESSION_CODES = {"Qualifying": "Q", "Race": "R"}
SESSION_LENGTH = {"Qualifying": timedelta(hours=1, minutes=15), "Race": timedelta(hours=3)}


def utc(ts) -> pd.Timestamp:
    ts = pd.Timestamp(ts)
    return ts.tz_localize("UTC") if ts.tzinfo is None else ts.tz_convert("UTC")


def iso(ts) -> str | None:
    return None if ts is None or pd.isna(ts) else utc(ts).isoformat()


def clean(value):
    """JSON-safe scalar: NaN, NaT and the string 'None' become None."""
    if value is None or value is pd.NaT or (isinstance(value, str) and value == "None"):
        return None
    if isinstance(value, float) and np.isnan(value):
        return None
    if isinstance(value, np.integer):
        return int(value)
    if isinstance(value, np.floating):
        return float(value)
    return value


def parse_query(query: str) -> tuple[dict, tuple[float, float] | None]:
    """Split an OpenF1 query string into key=value params and an optional date>= / date<= window."""
    params, lo, hi = {}, None, None
    for part in filter(None, query.split("&")):
        if ">=" in part:
            lo = utc(part.split(">=", 1)[1]).timestamp()
        elif "<=" in part:
            hi = utc(part.split("<=", 1)[1]).timestamp()
        else:
            key, value = part.split("=", 1)
            params[key] = value
    return params, ((lo, hi) if lo is not None and hi is not None else None)


def event_schedule(year: int) -> list[dict]:
    """Rounds of a season with their qualifying and race start times (FastF1's published
    schedule, which needs no sign-in)."""
    import fastf1

    schedule = fastf1.get_event_schedule(year, include_testing=False)
    events = []
    for _, ev in schedule.iterrows():
        sessions = {}
        for i in range(1, 6):
            name = ev.get(f"Session{i}")
            if name in SESSION_CODES and pd.notna(ev.get(f"Session{i}DateUtc")):
                sessions[name] = utc(ev[f"Session{i}DateUtc"])
        events.append({"round": int(ev["RoundNumber"]), "name": ev["EventName"],
                       "location": ev["Location"], "country": ev["Country"], "sessions": sessions})
    return events


def session_records(year: int, events: list[dict], circuit_keys: dict[int, int | None]) -> list[dict]:
    """OpenF1 /sessions records for the qualifying and race of each event."""
    out = []
    for ev in events:
        for name, start in ev["sessions"].items():
            out.append({
                "session_key": f"{year}-{ev['round']:02d}-{SESSION_CODES[name]}",
                "session_name": name, "meeting_key": f"{year}-{ev['round']:02d}",
                "date_start": start.isoformat(), "date_end": (start + SESSION_LENGTH[name]).isoformat(),
                "circuit_key": circuit_keys.get(ev["round"]), "circuit_short_name": ev["location"],
                "country_name": ev["country"], "is_cancelled": False,
            })
    return out


CROSSING_STAMP_LEAD_S = 1.0


def gaps_from_crossings(rows: pd.DataFrame, t0: pd.Timestamp) -> pd.DataFrame:
    """OpenF1 /intervals records at each lap's end: the gap to the car ahead on the same lap,
    from timing-line crossing times. Expects driver_number, lap_number, end_s (session seconds).

    Records are stamped slightly before the crossing: ingest looks the gap up at lap start +
    lap time, which can differ from the crossing time by a few milliseconds."""
    out = []
    for _, g in rows.dropna(subset=["end_s"]).groupby("lap_number"):
        g = g.sort_values("end_s")
        crossing = g["end_s"].to_numpy(float)
        gaps = np.diff(crossing, prepend=crossing[0])
        for drv, t, gap, lead in zip(g["driver_number"], crossing, gaps, crossing - crossing[0]):
            stamp = t0 + pd.Timedelta(seconds=float(t) - CROSSING_STAMP_LEAD_S)
            out.append({"date": iso(stamp), "driver_number": int(drv),
                        "interval": float(gap), "gap_to_leader": float(lead)})
    return pd.DataFrame(out)
