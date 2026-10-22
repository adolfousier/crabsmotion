#!/usr/bin/env python3
"""Flag stills where bright pixels run within EDGE px of a frame edge.

Text in the promo is light on a dark background, so a row that carries bright
pixels close to x=0 or x=W is a line that has overflown its box. The badge band
at the top is exempt because the version badge legitimately sits near the edge.

usage: python3 scripts/scan-overflow.py out/probe4
"""
import sys
import glob
import os
from PIL import Image

EDGE = 24          # px: anything closer than this to an edge is a defect
THRESHOLD = 90     # brightness above which a pixel counts as "text"
SKIP_TOP = 0.08    # fraction of height to ignore (version badge band)


def bands(rows, gap=6):
    out = []
    for y in rows:
        if out and y - out[-1][1] <= gap:
            out[-1][1] = y
        else:
            out.append([y, y])
    return out


def scan(path):
    im = Image.open(path).convert("L")
    w, h = im.size
    px = im.load()
    top = int(h * SKIP_TOP)
    hits = []
    for y in range(top, h):
        lo, hi = None, None
        for x in range(w):
            if px[x, y] > THRESHOLD:
                if lo is None:
                    lo = x
                hi = x
        if lo is None:
            continue
        if lo < EDGE or hi > w - EDGE - 1:
            hits.append((y, lo, hi))
    if not hits:
        return []
    found = []
    for y0, y1 in bands([h[0] for h in hits]):
        seg = [h for h in hits if y0 <= h[0] <= y1]
        found.append((y0, y1, min(s[1] for s in seg), max(s[2] for s in seg)))
    return found


def main():
    d = sys.argv[1] if len(sys.argv) > 1 else "out/probe4"
    files = sorted(glob.glob(os.path.join(d, "*.png")))
    if not files:
        print("no stills in", d)
        return 1
    defects = 0
    for f in files:
        found = scan(f)
        if found:
            defects += len(found)
            for y0, y1, lo, hi in found:
                print(f"{os.path.basename(f)}: rows {y0}-{y1} x={lo}..{hi}")
    print(f"scanned {len(files)} stills, defects={defects}")
    return 0 if defects == 0 else 2


if __name__ == "__main__":
    sys.exit(main())
