#!/usr/bin/env bash
# Render the French and Russian cuts (16:9 and vertical).
# Each render writes its own log and an explicit EXIT line.
set -u
cd "$(dirname "$0")/.." || exit 1

run() {
  local comp="$1" out="$2" log="$3"
  echo "=== $comp -> $out ==="
  npx remotion render src/index.ts "$comp" "$out" --log=error > "$log" 2>&1
  local code=$?
  echo "EXIT=$code" >> "$log"
  echo "$comp EXIT=$code"
  return $code
}

fail=0
run CrabMotionFR         out/crabmotion-fr.mp4          out/render-fr.log   || fail=1
run CrabMotionFRVertical out/crabmotion-fr-vertical.mp4 out/render-fr-v.log || fail=1
run CrabMotionRU         out/crabmotion-ru.mp4          out/render-ru.log   || fail=1
run CrabMotionRUVertical out/crabmotion-ru-vertical.mp4 out/render-ru-v.log || fail=1

echo "ALL_RENDERS_DONE fail=$fail"
exit $fail
