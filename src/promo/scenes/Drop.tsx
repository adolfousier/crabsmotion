import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT, FONT_MONO, RELEASE } from "../../theme";
import { beatPump, ease } from "../../beat";
import { useLayout } from "../layout";
import { Logo } from "../Logo";

const STATS = [
  { n: `${RELEASE.features}`, l: "FEATURES" },
  { n: `${RELEASE.fixes}`, l: "FIXES" },
  { n: `${RELEASE.commits}`, l: "COMMITS" },
  { n: RELEASE.tests.toLocaleString("en-US"), l: "TESTS" },
];

/** Bars 1-2: the release itself, up front. v0.5.12, JUST DROPPED, then the counts. */
export const Drop: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const pump = beatPump(frame, 5);
  const flash = lf < 7 ? 1 - lf / 7 : 0;
  const verIn = ease(lf / 7);
  const tagIn = ease((lf - 12) / 6);
  const statsIn = ease((lf - 26) / 8);
  const logoIn = ease((lf - 58) / 7);
  const verSize = vertical ? 210 : 230;
  const tagSize = vertical ? 62 : 62;
  const statSize = vertical ? 30 : 32;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* logo box is reserved from frame 0 so nothing jumps when it lands */}
      <div
        style={{
          height: vertical ? 240 : 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: logoIn,
          transform: `scale(${0.82 + logoIn * 0.18 + (lf >= 60 ? pump * 0.04 : 0)})`,
          filter: `drop-shadow(0 0 ${30 + pump * 40}px rgba(255,122,26,0.4))`,
        }}
      >
        <Logo width={vertical ? 300 : 250} />
      </div>

      <div
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: verSize,
          lineHeight: 1,
          letterSpacing: -verSize * 0.04,
          color: C.white,
          fontVariantNumeric: "tabular-nums",
          opacity: verIn,
          transform: `scale(${1.32 - verIn * 0.32 + pump * 0.02})`,
          textShadow: `0 0 ${40 + pump * 50}px rgba(255,122,26,0.45)`,
        }}
      >
        {RELEASE.version}
      </div>

      <div
        style={{
          marginTop: vertical ? 26 : 22,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: tagSize,
          letterSpacing: tagSize * 0.16,
          color: C.orange,
          opacity: tagIn,
          transform: `translateY(${(1 - tagIn) * 24}px) scale(${1 + (lf >= 12 && lf < 20 ? (1 - (lf - 12) / 8) * 0.1 : 0)})`,
        }}
      >
        JUST DROPPED
      </div>

      <div
        style={{
          marginTop: vertical ? 54 : 46,
          display: "flex",
          alignItems: "baseline",
          gap: vertical ? 26 : 34,
          fontFamily: FONT_MONO,
          fontSize: statSize,
          opacity: statsIn,
          transform: `translateY(${(1 - statsIn) * 18}px)`,
        }}
      >
        {STATS.map((s, i) => (
          <React.Fragment key={s.l}>
            {i > 0 && <span style={{ color: C.faint }}>·</span>}
            <span style={{ color: C.dim, letterSpacing: 2 }}>
              <span style={{ color: C.white, fontWeight: 700 }}>{s.n}</span> {s.l}
            </span>
          </React.Fragment>
        ))}
      </div>

      {flash > 0 && <AbsoluteFill style={{ backgroundColor: C.white, opacity: flash * 0.55 }} />}
    </AbsoluteFill>
  );
};
