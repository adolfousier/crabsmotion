import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT, FONT_MONO, RELEASE } from "../../theme";
import { beatPump, ease } from "../../beat";
import { useLayout } from "../layout";
import { useCopy } from "../LocaleContext";
import { measureMono } from "../textFit";
import { Logo } from "../Logo";

/** Bars 1-2: the release itself, up front. v0.5.12, JUST DROPPED, then the counts. */
export const Drop: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical, width } = useLayout();
  const { copy, n } = useCopy();
  const stats = [
    { v: `${RELEASE.features}`, l: copy.drop.features },
    { v: `${RELEASE.fixes}`, l: copy.drop.fixes },
    { v: `${RELEASE.commits}`, l: copy.drop.commits },
    { v: n(RELEASE.tests), l: copy.drop.tests },
  ];
  const pump = beatPump(frame, 5);
  const flash = lf < 7 ? 1 - lf / 7 : 0;
  const verIn = ease(lf / 7);
  const tagIn = ease((lf - 12) / 6);
  const statsIn = ease((lf - 26) / 8);
  const logoIn = ease((lf - 58) / 7);
  const verSize = vertical ? 210 : 230;
  const tagSize = vertical ? 62 : 62;
  const statSize = vertical ? 30 : 32;
  const statGap = vertical ? 26 : 34;
  // A translation can make the stats row wider than the frame, so measure it
  // with the real mono advance and drop to two rows of two when it would spill.
  // Measured off the renders: English lands at 1025px of the 1080px vertical
  // frame, Indonesian at 985, Portuguese at 1147. The 0.96 limit keeps the two
  // that fit on one row and wraps only the one that does not.
  const rowWidth = (items: typeof stats) =>
    items.reduce((w, s) => w + measureMono(`${s.v} ${s.l}`, statSize, 2), 0) +
    statGap * (items.length * 2 - 2) +
    measureMono("·", statSize) * (items.length - 1);
  const statRows = rowWidth(stats) <= width * 0.96 ? [stats] : [stats.slice(0, 2), stats.slice(2)];

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
        {copy.drop.justDropped}
      </div>

      <div
        style={{
          marginTop: vertical ? 54 : 46,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: statSize * 0.7,
          opacity: statsIn,
          transform: `translateY(${(1 - statsIn) * 18}px)`,
        }}
      >
        {statRows.map((row) => (
          <div key={row[0].l} style={{ display: "flex", alignItems: "baseline", gap: statGap, fontFamily: FONT_MONO, fontSize: statSize }}>
            {row.map((s, i) => (
              <React.Fragment key={s.l}>
                {i > 0 && <span style={{ color: C.faint }}>·</span>}
                <span style={{ color: C.dim, letterSpacing: 2 }}>
                  <span style={{ color: C.white, fontWeight: 700 }}>{s.v}</span> {s.l}
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>

      {flash > 0 && <AbsoluteFill style={{ backgroundColor: C.white, opacity: flash * 0.55 }} />}
    </AbsoluteFill>
  );
};
