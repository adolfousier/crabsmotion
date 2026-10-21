#!/usr/bin/env bash
# Render the four localised cuts (pt-PT + id, 16:9 and vertical).
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
run CrabMotionPT        out/crabmotion-pt.mp4           out/render-pt.log        || fail=1
run CrabMotionPTVertical out/crabmotion-pt-vertical.mp4  out/render-pt-v.log     || fail=1
run CrabMotionID        out/crabmotion-id.mp4           out/render-id.log        || fail=1
run CrabMotionIDVertical out/crabmotion-id-vertical.mp4  out/render-id-v.log     || fail=1

echo "ALL_RENDERS_DONE fail=$fail"
exit $fail
