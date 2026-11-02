"""Rate-limited client for the OpenF1 historical API (no account required).

OpenF1 allows 30 requests per minute on the free tier and answers 429 with a
`retry-after` header when that is exceeded.
"""

from __future__ import annotations

import time
from typing import Any

import requests

BASE_URL = "https://api.openf1.org/v1"
MIN_INTERVAL_S = 2.2
MAX_RETRIES = 6


class OpenF1Error(RuntimeError):
    pass


class OpenF1Client:
    def __init__(self, min_interval_s: float = MIN_INTERVAL_S, timeout_s: float = 180.0):
        self.session = requests.Session()
        self.session.headers["User-Agent"] = "formula-function-signature-pipeline/0.1"
        self.min_interval_s = min_interval_s
        self.timeout_s = timeout_s
        self.calls = 0
        self._last_call = 0.0

    def _wait_turn(self) -> None:
        elapsed = time.monotonic() - self._last_call
        if elapsed < self.min_interval_s:
            time.sleep(self.min_interval_s - elapsed)
        self._last_call = time.monotonic()

    def get(self, endpoint: str, query: str) -> list[dict[str, Any]]:
        """GET /v1/<endpoint>?<query>. The query is passed verbatim so that
        OpenF1 comparison operators (`date>=...`) are not percent-encoded."""
        url = f"{BASE_URL}/{endpoint}?{query}"
        for attempt in range(1, MAX_RETRIES + 1):
            self._wait_turn()
            self.calls += 1
            try:
                resp = self.session.get(url, timeout=self.timeout_s)
            except requests.RequestException as exc:
                backoff = 10 * attempt
                print(f"    [openf1] network error ({exc.__class__.__name__}), retry in {backoff}s", flush=True)
                time.sleep(backoff)
                continue

            if resp.status_code == 200:
                data = resp.json()
                if not isinstance(data, list):
                    raise OpenF1Error(f"Unexpected payload for {url}: {str(data)[:200]}")
                return data
            if resp.status_code == 404:
                return []
            if resp.status_code == 429:
                wait = int(resp.headers.get("retry-after", "60")) + 2
                print(f"    [openf1] rate limited, waiting {wait}s", flush=True)
                time.sleep(wait)
                continue
            if resp.status_code >= 500:
                backoff = 15 * attempt
                print(f"    [openf1] HTTP {resp.status_code}, retry in {backoff}s", flush=True)
                time.sleep(backoff)
                continue
            raise OpenF1Error(f"HTTP {resp.status_code} for {url}: {resp.text[:200]}")
        raise OpenF1Error(f"Gave up after {MAX_RETRIES} attempts: {url}")
