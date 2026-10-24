#!/usr/bin/env bash
# Render probe stills for every locale cut so text overflow can be checked
# without watching the video. Writes out/probe4/<cut>-f<frame>.png.
#
# Frames are chosen per scene, not scattered: the drop card once its stats row
# has landed, the what's-new card mid-list and with every row on screen, and the
# numbers scene after its counts finish ticking.
set -u
cd "$(dirname "$0")/.." || exit 1

# drop=0-119, whatsnew=960-1139, numbers=1320-1499
FRAMES=(60 100 1000 1070 1130 1400 1480)
CUTS=(
  CrabMotion CrabMotionVertical
  CrabMotionPT CrabMotionPTVertical
  CrabMotionID CrabMotionIDVertical
  CrabMotionFR CrabMotionFRVertical
  CrabMotionRU CrabMotionRUVertical
)

rm -rf out/probe4
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
