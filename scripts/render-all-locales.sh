#!/usr/bin/env bash
# Render every locale cut at both aspect ratios for the current release.
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
run CrabMotion           out/crabmotion-en.mp4           out/render-en.log    || fail=1
run CrabMotionVertical   out/crabmotion-en-vertical.mp4  out/render-en-v.log  || fail=1
run CrabMotionPT         out/crabmotion-pt.mp4           out/render-pt.log    || fail=1
run CrabMotionPTVertical out/crabmotion-pt-vertical.mp4  out/render-pt-v.log  || fail=1
run CrabMotionID         out/crabmotion-id.mp4           out/render-id.log    || fail=1
run CrabMotionIDVertical out/crabmotion-id-vertical.mp4  out/render-id-v.log  || fail=1
run CrabMotionFR         out/crabmotion-fr.mp4           out/render-fr.log    || fail=1
run CrabMotionFRVertical out/crabmotion-fr-vertical.mp4  out/render-fr-v.log  || fail=1
run CrabMotionRU         out/crabmotion-ru.mp4           out/render-ru.log    || fail=1
run CrabMotionRUVertical out/crabmotion-ru-vertical.mp4  out/render-ru-v.log  || fail=1

echo "ALL_RENDERS_DONE fail=$fail"
exit $fail
