import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { C, FONT } from "../../theme";
import { beatPump, ease } from "../../beat";
import { useLayout } from "../layout";

// v0.5.10 release numbers, straight from the release notes.
const NUMS = [
  { to: 10762, label: "TESTS" },
  { to: 99, label: "COMMITS" },
  { to: 31, label: "FEATURES" },
];

/** Bars 18-19: three real numbers count up, one per beat pair. */
export const Numbers: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const pump = beatPump(frame, 5);
  const size = vertical ? 170 : 150;
  return (
    <AbsoluteFill style={{ flexDirection: vertical ? "column" : "row", justifyContent: "center", alignItems: "center", gap: vertical ? 90 : 120 }}>
      {NUMS.map((n, i) => {
        const at = i * 15;
        const e = ease((lf - at) / 8);
        const v = Math.round(interpolate(lf, [at, at + 30], [0, n.to], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
        return (
          <div key={n.label} style={{ textAlign: "center", opacity: e, transform: `translateY(${(1 - e) * 60}px) scale(${1 + (lf > at + 30 ? pump * 0.03 : 0)})` }}>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: size, lineHeight: 1, letterSpacing: -size * 0.03, color: C.white, fontVariantNumeric: "tabular-nums" }}>{v.toLocaleString("en-US")}</div>
            <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: size * 0.28, color: C.orange, letterSpacing: 4, marginTop: 14 }}>{n.label}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
