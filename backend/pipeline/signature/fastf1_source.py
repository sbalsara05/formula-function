"""FastF1 as an alternative source for 2018-2022 (`ingest.py --source fastf1`).

The default for those seasons is TracingInsights' public copy (tracinginsights_source.py),
which needs no account. FastF1 reads the official live-timing archive directly, the same
feed OpenF1 serves from 2023.
The archive needs a signed-in F1 account with an F1 TV subscription. Sign in once with

    ../.venv/bin/python -m fastf1 auth f1tv --authenticate

which stores a token in the user data folder (the password is not kept).

FastF1Client answers the OpenF1 queries ingest.py makes (sessions, meetings, drivers,
laps, stints, race_control, intervals, car_data, location) from a loaded FastF1
session, so lap selection, flag periods and metrics are shared with the OpenF1 path.
"""

from __future__ import annotations

import logging
import shutil
import time
from datetime import datetime, timezone
from pathlib import Path

import fastf1
import numpy as np
import pandas as pd
from fastf1.exceptions import F1AuthError, RateLimitExceededError
from fastf1.internals.f1account import token_manager

from source_common import clean, event_schedule, gaps_from_crossings, iso, parse_query, session_records

RATE_LIMIT_WAIT_S = 15 * 60
MAX_RATE_LIMIT_WAITS = 6

logging.getLogger("fastf1").setLevel(logging.WARNING)


SIGN_IN_HELP = "Sign in once with: ../.venv/bin/python -m fastf1 auth f1tv --authenticate"


def require_sign_in() -> str:
    """Exit with instructions unless a valid F1 TV token is stored. FastF1 itself would
    continue unauthenticated and fail later on every archive request."""
    token = token_manager.get_stored()
    if token is None or not token.is_valid():
        raise SystemExit("The live-timing archive (2018-2022) needs a signed-in F1 account with F1 TV.\n" + SIGN_IN_HELP)
    claims = token.claims
    expires = datetime.fromtimestamp(token.expires_at, tz=timezone.utc)
    return (f"F1 TV token valid until {expires:%Y-%m-%d %H:%M} UTC "
            f"(subscription {claims.get('SubscriptionStatus')}, {claims.get('SubscribedProduct')})")


class FastF1Client:
    """OpenF1-shaped answers from FastF1. One session is held in memory at a time."""

    name = "fastf1"

    def __init__(self, cache_dir: Path):
        print(require_sign_in(), flush=True)
        cache_dir.mkdir(parents=True, exist_ok=True)
        fastf1.Cache.configure(cache_dir=str(cache_dir), use_requests_cache=False)
        self.cache_dir = cache_dir
        self.calls = 0
        self._schedule: dict[int, list[dict]] = {}
        self._key: str | None = None
        self._session = None
        self._car: pd.DataFrame | None = None
        self._pos: pd.DataFrame | None = None

    # ─── OpenF1-compatible entry point ────────────────────────────────────

    def get(self, endpoint: str, query: str = ""):
        self.calls += 1
        params, window = parse_query(query)
        if endpoint == "sessions":
            return self._sessions(int(params["year"]))
        if endpoint == "meetings":
            return self._meetings(int(params["year"]))
        session = self._load(params["session_key"])
        handler = getattr(self, f"_{endpoint}")
        return handler(session, window) if endpoint in ("car_data", "location") else handler(session)

    # ─── Schedule ─────────────────────────────────────────────────────────

    def _season(self, year: int) -> list[dict]:
        if year not in self._schedule:
            self._schedule[year] = event_schedule(year)
        return self._schedule[year]

    def _sessions(self, year: int) -> list[dict]:
        try:
            index = {m["Name"]: m for m in fastf1._api.season_schedule(f"/static/{year}/")}
        except Exception:  # circuit keys only feed cosmetic corner labels
            index = {}
        events = self._season(year)
        keys = {ev["round"]: (index.get(ev["name"], {}).get("Circuit") or {}).get("Key") for ev in events}
        return session_records(year, events, keys)

    def _meetings(self, year: int) -> list[dict]:
        return [{"meeting_key": f"{year}-{ev['round']:02d}", "meeting_name": ev["name"]} for ev in self._season(year)]

    # ─── Session loading ──────────────────────────────────────────────────

    def _load(self, session_key: str):
        if session_key == self._key:
            return self._session
        self.release()
        year, rnd, code = session_key.split("-")
        session = fastf1.get_session(int(year), int(rnd), code)
        for attempt in range(MAX_RATE_LIMIT_WAITS + 1):
            try:
                session.load(laps=True, telemetry=True, weather=False, messages=True)
                break
            except RateLimitExceededError:
                if attempt == MAX_RATE_LIMIT_WAITS:
                    raise
                print(f"  FastF1 hourly request limit reached; waiting {RATE_LIMIT_WAIT_S // 60} min", flush=True)
                time.sleep(RATE_LIMIT_WAIT_S)
            except F1AuthError as exc:
                raise SystemExit(f"F1 TV sign-in failed: {exc}\n{SIGN_IN_HELP}") from exc
        self._key, self._session = session_key, session
        self._car = self._telemetry_frame(session.car_data, ["Speed", "Throttle", "Brake", "nGear"])
        self._pos = self._telemetry_frame(session.pos_data, ["X", "Y", "Z"])
        return session

    @staticmethod
    def _telemetry_frame(by_driver: dict, cols: list[str]) -> pd.DataFrame:
        parts = []
        for drv, tel in (by_driver or {}).items():
            if tel is None or tel.empty:
                continue
            part = pd.DataFrame({c.lower() if c != "nGear" else "n_gear": tel[c].to_numpy() for c in cols})
            part["ts"] = pd.to_datetime(tel["Date"]).dt.tz_localize("UTC").astype("int64").to_numpy() / 1e9
            part["driver_number"] = int(drv)
            parts.append(part)
        return pd.concat(parts, ignore_index=True) if parts else pd.DataFrame(columns=["ts", "driver_number", *cols])

    def release(self) -> None:
        """Drop the loaded session and its FastF1 cache files (outputs are already saved in data/raw)."""
        if self._session is not None:
            api_path = getattr(self._session, "api_path", None)
            if api_path:
                shutil.rmtree(self.cache_dir / api_path.removeprefix("/static/"), ignore_errors=True)
        self._key, self._session, self._car, self._pos = None, None, None, None

    # ─── Endpoints ────────────────────────────────────────────────────────

    def _drivers(self, s) -> list[dict]:
        return [{
            "driver_number": int(r.DriverNumber), "first_name": clean(r.FirstName), "last_name": clean(r.LastName),
            "full_name": clean(r.FullName), "name_acronym": clean(r.Abbreviation), "team_name": clean(r.TeamName),
        } for r in s.results.itertuples() if pd.notna(r.DriverNumber)]

    def _laps(self, s) -> pd.DataFrame:
        laps = s.laps
        return pd.DataFrame({
            "driver_number": laps["DriverNumber"].astype(int).to_numpy(),
            "lap_number": laps["LapNumber"].astype("Int64").to_numpy(),
            "lap_duration": laps["LapTime"].dt.total_seconds().to_numpy(),
            "date_start": [iso(t) for t in laps["LapStartDate"]],
            "is_pit_out_lap": laps["PitOutTime"].notna().to_numpy(),
        }).dropna(subset=["lap_number"])

    def _stints(self, s) -> pd.DataFrame:
        laps = s.laps[s.laps["Stint"].notna() & s.laps["LapNumber"].notna()]
        rows = []
        for (drv, stint), g in laps.groupby(["DriverNumber", "Stint"]):
            g = g.sort_values("LapNumber")
            compounds = g["Compound"].dropna()
            first_life = g["TyreLife"].dropna()
            rows.append({
                "driver_number": int(drv), "stint_number": int(stint),
                "lap_start": int(g["LapNumber"].iloc[0]), "lap_end": int(g["LapNumber"].iloc[-1]),
                "compound": compounds.mode().iloc[0] if len(compounds) else None,
                "tyre_age_at_start": max(float(first_life.iloc[0]) - 1, 0.0) if len(first_life) else 0.0,
            })
        return pd.DataFrame(rows)

    def _race_control(self, s) -> list[dict]:
        msgs = []
        rcm = s.race_control_messages
        if rcm is not None and not rcm.empty:
            for m in rcm.itertuples():
                msgs.append({
                    "date": iso(m.Time), "category": clean(m.Category), "message": clean(m.Message),
                    "flag": clean(m.Flag), "scope": clean(m.Scope),
                    "sector": int(m.Sector) if pd.notna(m.Sector) else None,
                    "lap_number": int(m.Lap) if pd.notna(getattr(m, "Lap", np.nan)) else None,
                })
        # Live timing carries session status as its own feed; OpenF1 lists it as race-control messages.
        status = getattr(s, "session_status", None)
        if status is not None and not status.empty and s.t0_date is not None:
            for row in status.itertuples():
                msgs.append({"date": iso(s.t0_date + row.Time), "category": "SessionStatus",
                             "message": f"SESSION {str(row.Status).upper()}", "flag": None, "scope": None,
                             "sector": None, "lap_number": None})
        return sorted((m for m in msgs if m["date"]), key=lambda m: m["date"])

    def _intervals(self, s) -> pd.DataFrame:
        laps = s.laps[s.laps["LapNumber"].notna()]
        rows = pd.DataFrame({"driver_number": laps["DriverNumber"].astype(int), "lap_number": laps["LapNumber"],
                             "end_s": laps["Time"].dt.total_seconds()})
        return gaps_from_crossings(rows, pd.Timestamp(s.t0_date))

    def _car_data(self, s, window) -> pd.DataFrame:
        car = self._window(self._car, window)
        return pd.DataFrame({
            "date": pd.to_datetime(car["ts"], unit="s", utc=True), "driver_number": car["driver_number"],
            "speed": car["speed"], "throttle": car["throttle"],
            "brake": np.where(car["brake"].astype(bool), 100, 0), "n_gear": car["n_gear"],
        })

    def _location(self, s, window) -> pd.DataFrame:
        pos = self._window(self._pos, window)
        return pd.DataFrame({"date": pd.to_datetime(pos["ts"], unit="s", utc=True), "driver_number": pos["driver_number"],
                             "x": pos["x"], "y": pos["y"], "z": pos["z"]})

    @staticmethod
    def _window(frame: pd.DataFrame, window) -> pd.DataFrame:
        if window is None:
            return frame
        lo, hi = window
        return frame[(frame["ts"] >= lo) & (frame["ts"] <= hi)]
