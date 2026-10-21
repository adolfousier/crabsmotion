import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { C, FONT, FONT_MONO, RELEASE } from "../../theme";
import { beatPump, ease } from "../../beat";
import { useLayout } from "../layout";

// Release numbers, straight from the release notes.
const NUMS = [
  { to: RELEASE.commits, label: "COMMITS" },
  { to: RELEASE.fixes, label: "FIXES" },
  { to: RELEASE.tests, label: "TESTS" },
];

/** Bars 23-24: the release in numbers, version first. */
export const Numbers: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const pump = beatPump(frame, 5);
  const size = vertical ? 170 : 150;
  const headIn = ease(lf / 8);
  const subIn = ease((lf - 76) / 8);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: vertical ? 70 : 54 }}>
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: vertical ? 34 : 32,
          letterSpacing: 4,
          color: C.dim,
          opacity: headIn,
          transform: `translateY(${(1 - headIn) * 20}px)`,
        }}
      >
        <span style={{ color: C.orange, fontWeight: 700 }}>{RELEASE.version}</span> IN NUMBERS
      </div>

      <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", justifyContent: "center", alignItems: "center", gap: vertical ? 70 : 120 }}>
        {NUMS.map((n, i) => {
          const at = 10 + i * 15;
          const e = ease((lf - at) / 8);
          const v = Math.round(interpolate(lf, [at, at + 30], [0, n.to], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
          return (
            <div key={n.label} style={{ textAlign: "center", opacity: e, transform: `translateY(${(1 - e) * 60}px) scale(${1 + (lf > at + 30 ? pump * 0.03 : 0)})` }}>
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: size, lineHeight: 1, letterSpacing: -size * 0.03, color: C.white, fontVariantNumeric: "tabular-nums" }}>{v.toLocaleString("en-US")}</div>
              <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: size * 0.28, color: C.orange, letterSpacing: 4, marginTop: 14 }}>{n.label}</div>
            </div>
          );
        })}
      </div>

      <div style={{ fontFamily: FONT_MONO, fontSize: vertical ? 30 : 28, letterSpacing: 3, color: C.dim, opacity: subIn }}>
        <span style={{ color: C.white, fontWeight: 700 }}>{RELEASE.features}</span> FEATURES ·{" "}
        <span style={{ color: C.white, fontWeight: 700 }}>{RELEASE.contributors}</span> CONTRIBUTORS
      </div>
    </AbsoluteFill>
  );
};
