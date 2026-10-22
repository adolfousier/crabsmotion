#!/usr/bin/env bash
# Render probe stills for every locale cut so text overflow can be checked
# without watching the video. Writes out/probe4/<cut>-f<frame>.png.
set -u
cd "$(dirname "$0")/.." || exit 1

FRAMES=(60 150 200 350 420 500 660 760 900 945 1100 1200 1240 1380 1550)
CUTS=(CrabMotionFR CrabMotionFRVertical CrabMotionRU CrabMotionRUVertical)

mkdir -p out/probe4
fail=0
for cut in "${CUTS[@]}"; do
  for f in "${FRAMES[@]}"; do
    npx remotion still src/index.ts "$cut" "out/probe4/${cut}-f${f}.png" \
      --frame="$f" --log=error >> out/probe4.log 2>&1
    code=$?
    if [ $code -ne 0 ]; then
      echo "FAIL $cut f$f exit=$code"
      fail=1
    fi
  done
  echo "done $cut"
done

echo "PROBE_DONE fail=$fail"
exit $fail
