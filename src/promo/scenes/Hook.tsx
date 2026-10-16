import React from "react";
import { AbsoluteFill } from "remotion";
import { C, K, TERM_FONT } from "../../theme";
import { beatPump, ease } from "../../beat";
import { useLayout } from "../layout";
import { Headline } from "../Headline";
import { Window, Span, typed } from "../Window";
import { Cursor } from "../../components/Cursor";

const URL = "opencrabs.com/download";

/** Bar 1: the download URL, the one command, the size. */
export const Hook: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const pump = beatPump(frame, 5);
  const urlIn = ease(lf / 6);
  const winIn = ease((lf - 16) / 6);
  const fs = vertical ? 40 : 44;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: vertical ? 70 : 54 }}>
      <div
        style={{
          opacity: urlIn,
          transform: `scale(${0.9 + urlIn * 0.1 + pump * 0.02})`,
          fontFamily: TERM_FONT,
          fontSize: fs,
          color: C.text,
          background: "#15151d",
          border: `2px solid ${C.orange}`,
          borderRadius: 999,
          padding: `${fs * 0.45}px ${fs * 1.1}px`,
          boxShadow: `0 0 ${30 + pump * 30}px rgba(255,122,26,0.35)`,
        }}
      >
        <span style={{ color: C.dim }}>https://</span>
        {typed(URL, lf, 1, 2.4)}
      </div>
      <div style={{ opacity: winIn, transform: `translateY(${(1 - winIn) * 30}px)` }}>
        <Window width={vertical ? 900 : 860} fs={34} title="you — -zsh">
          <Span c={K.green} b>{"you@MacBook ~ % "}</Span>
          <Span>{typed("./opencrabs", lf, 18, 1)}</Span>
          {lf < 34 && <Cursor frame={frame} color={C.orange} height={34} />}
        </Window>
      </div>
      <Headline frame={frame} lf={lf} lines={["*~45 MB.* ONE BINARY."]} at={34} size={vertical ? 92 : 104} />
    </AbsoluteFill>
  );
};
