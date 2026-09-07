#!/usr/bin/env python3
"""Image audit across drivers.ts / teams.ts / venues.ts.

Reports every image reference and classifies as:
  - OK_LOCAL    → local /images/... path that exists on disk
  - MISSING_LOCAL → local /images/... path that does not exist
  - OK_WIKIMEDIA → upload.wikimedia.org or commons FilePath URL
  - WIKI_REDIRECT → en.wikipedia.org/wiki/Special:FilePath/... (redirect, not stable)
  - EXTERNAL_OTHER → any other URL (likely blocked)
  - EMPTY → empty string
  - SHORTHAND_VAR → bare variable like `W + '...'` or other concat
"""
import re
import os
import sys
from pathlib import Path

ROOT = Path("/Users/sbalsara/Documents/GitHub/formula-function/frontend")
DATA = ROOT / "src/data/mock"
PUBLIC = ROOT / "public"

FILES = ["drivers.ts", "teams.ts", "venues.ts"]

# Match field assignments: imageUrl: "...", image: "...", portraitUrl: "..."
# Also match bare `W + '...'` style variable concatenations (legacy)
PATTERNS = [
    # field: "literal string"
    re.compile(r'(image|imageUrl|portraitUrl)\s*:\s*"([^"]*)"'),
    re.compile(r"(image|imageUrl|portraitUrl)\s*:\s*'([^']*)'"),
    # field: bareVariable or W + "..." — concat patterns
    re.compile(r'(image|imageUrl|portraitUrl)\s*:\s*([A-Z_][A-Z0-9_]*\s*\+[^,}\n]+)'),
]

def classify(url: str) -> tuple[str, str]:
    """Returns (status, note)."""
    if url == "":
        return ("EMPTY", "")
    if url.startswith("/"):
        rel = url.lstrip("/")
        path = PUBLIC / rel
        if path.exists():
            size = path.stat().st_size
            return ("OK_LOCAL", f"{size//1024}K")
        return ("MISSING_LOCAL", str(path))
    if "upload.wikimedia.org" in url:
        return ("OK_WIKIMEDIA", "")
    if "commons.wikimedia.org/wiki/Special:FilePath/" in url:
        return ("OK_WIKIMEDIA", "commons-filepath")
    if "en.wikipedia.org/wiki/Special:FilePath/" in url:
        return ("WIKI_REDIRECT", "")
    return ("EXTERNAL_OTHER", url[:60])


def find_owner(file_text: str, match_start: int) -> str:
    """Walk back to find the closest `export const X` name that owns this match."""
    head = file_text[:match_start]
    # Find last `export const NAME` before this point
    matches = list(re.finditer(r'export const (\w+)', head))
    if matches:
        return matches[-1].group(1)
    return "<unknown>"


def main():
    rows = []
    for fname in FILES:
        path = DATA / fname
        text = path.read_text()
        for pat in PATTERNS:
            for m in pat.finditer(text):
                field = m.group(1)
                url = m.group(2)
                line_no = text[:m.start()].count("\n") + 1
                owner = find_owner(text, m.start())
                # For variable concat patterns, mark separately
                if pat is PATTERNS[2]:
                    status, note = ("SHORTHAND_VAR", url.strip())
                else:
                    status, note = classify(url)
                rows.append({
                    "file": fname,
                    "line": line_no,
                    "owner": owner,
                    "field": field,
                    "url": url,
                    "status": status,
                    "note": note,
                })

    # Summary by status
    from collections import Counter, defaultdict
    by_status = Counter(r["status"] for r in rows)
    by_file = defaultdict(Counter)
    for r in rows:
        by_file[r["file"]][r["status"]] += 1

    print("=" * 70)
    print("IMAGE AUDIT — formula-function")
    print("=" * 70)
    print(f"\nTotal references: {len(rows)}")
    print("\nBy status:")
    for status, n in by_status.most_common():
        print(f"  {status:18} {n}")
    print("\nBy file:")
    for f, counts in by_file.items():
        print(f"  {f}: " + ", ".join(f"{s}={n}" for s, n in counts.most_common()))

    # Report problem rows
    bad = [r for r in rows if r["status"] in ("MISSING_LOCAL", "WIKI_REDIRECT", "EXTERNAL_OTHER", "EMPTY", "SHORTHAND_VAR")]
    print(f"\n{'-'*70}")
    print(f"PROBLEMS: {len(bad)}")
    print(f"{'-'*70}\n")
    for r in bad:
        ref = f"{r['file']}:{r['line']}"
        print(f"[{r['status']:15}] {ref:25} {r['owner']:30} {r['field']:12} → {r['url'][:60] or '(empty)'}")
        if r["note"] and r["status"] == "MISSING_LOCAL":
            print(f"    expected: {r['note']}")

    # Also report what we have NO entries for at all — entities without any image field
    print(f"\n{'-'*70}")
    print("ENTITIES MISSING ALL IMAGE FIELDS (potential gaps)")
    print(f"{'-'*70}")
    # Look for `export const X: DriverEra[]` arrays where some elements have no imageUrl
    for fname in FILES:
        path = DATA / fname
        text = path.read_text()
        # Find DriverEra[] arrays — count elements with vs without imageUrl
        for arr_match in re.finditer(r'export const (\w+):\s*(DriverEra|TeamIconicCar|TeamEngineeringEra|VenueIconicMoment|ReelSlide)\[\]\s*=\s*\[', text):
            name = arr_match.group(1)
            kind = arr_match.group(2)
            start = arr_match.end()
            # Find matching close bracket — naive depth counter
            depth = 1
            i = start
            while i < len(text) and depth > 0:
                if text[i] == "[":
                    depth += 1
                elif text[i] == "]":
                    depth -= 1
                i += 1
            body = text[start:i-1]
            # Count top-level objects: balance braces at depth 0
            elem_count = 0
            with_img = 0
            depth = 0
            buf = []
            for ch in body:
                if ch == "{":
                    if depth == 0:
                        buf = []
                    depth += 1
                elif ch == "}":
                    depth -= 1
                    if depth == 0:
                        elem_count += 1
                        elem_text = "".join(buf)
                        if re.search(r'\b(image|imageUrl)\s*:', elem_text):
                            with_img += 1
                if depth >= 1:
                    buf.append(ch)
            if elem_count > with_img:
                print(f"  {fname:14} {name:35} ({kind}) {with_img}/{elem_count} have image")


if __name__ == "__main__":
    main()
