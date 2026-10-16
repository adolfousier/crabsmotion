import React from "react";
import { AbsoluteFill } from "remotion";
import { C, K } from "../../theme";
import { ease } from "../../beat";
import { useLayout } from "../layout";
import { Headline } from "../Headline";
import { Window, Span, typed } from "../Window";
import { Cursor } from "../../components/Cursor";

const JOINS = [
  { at: 34, who: "@nicole", color: "#ff8fb1" },
  { at: 52, who: "@carlos", color: "#6fb7ff" },
];

/** Bars 15-16: /cowork pulls your friends into the same crab. */
export const Cowork: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const fs = vertical ? 34 : 34;
  const inP = ease(lf / 8);

  const win = (
    <div style={{ opacity: inP, transform: `translateY(${(1 - inP) * 40}px)` }}>
      <Window width={vertical ? 900 : 860} fs={fs}>
        <div><Span c={K.gray}>{"> "}</Span><Span c={K.orange} b>{typed("/cowork", lf, 4, 0.6)}</Span>{lf < 22 && <Cursor frame={frame} color={C.orange} height={fs} />}</div>
        <div>{" "}</div>
        {JOINS.map((j) => {
          if (lf < j.at) return <div key={j.who}>{" "}</div>;
          const e = ease((lf - j.at) / 6);
          return (
            <div key={j.who} style={{ display: "flex", alignItems: "center", gap: fs * 0.5, opacity: e, transform: `translateX(${(1 - e) * -30}px)`, margin: `${fs * 0.2}px 0` }}>
              <div style={{ width: fs * 1.2, height: fs * 1.2, borderRadius: fs, background: j.color }} />
              <Span c={K.green} b>{j.who}</Span><Span c={K.gray}>{" joined"}</Span>
            </div>
          );
        })}
      </Window>
    </div>
  );
  const head = <Headline frame={frame} lf={lf} lines={["BRING YOUR", "*FRIENDS.*"]} ats={[70, 85]} size={vertical ? 130 : 130} align={vertical ? "center" : "left"} />;
  return vertical ? (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 120 }}>{win}{head}</AbsoluteFill>
  ) : (
    <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 110 }}>{win}<div style={{ width: 760 }}>{head}</div></AbsoluteFill>
  );
};
