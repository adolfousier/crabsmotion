import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { C, K, TERM_FONT } from "../../theme";
import { ease } from "../../beat";
import { useLayout } from "../layout";
import { useCopy } from "../LocaleContext";
import { Headline } from "../Headline";
import { Window } from "../Window";

const TOTAL = 53;
// Task rows are drawn as skeleton bars: the card is about progress, not task names.
const ROWS = [0.62, 0.48, 0.71, 0.55, 0.66, 0.42, 0.58];

/** Bars 12-14: the plan card ticks on while the clock runs from minutes to days. */
export const Plan: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const { copy } = useCopy();
  const fs = vertical ? 28 : 28;
  const inP = ease(lf / 8);
  const step = Math.round(interpolate(lf, [6, 150], [1, 12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const calls = Math.round(interpolate(lf, [6, 150], [3, 46], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const clock = lf < 60 ? copy.plan.clock[0] : lf < 120 ? copy.plan.clock[1] : copy.plan.clock[2];
  const clockHit = [0, 60, 120].map((t) => lf - t).filter((d) => d >= 0 && d < 8).map((d) => 1 - d / 8)[0] ?? 0;
  const done = Math.min(ROWS.length - 1, Math.floor(interpolate(lf, [10, 150], [0, ROWS.length - 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const barCols = 30;
  const filled = Math.round((step / TOTAL) * barCols);

  const card = (
    <div style={{ opacity: inP, transform: `translateY(${(1 - inP) * 40}px)` }}>
      <Window width={vertical ? 960 : 880} fs={fs}>
        <div style={{ border: `1px solid ${K.orange}`, borderRadius: 8, padding: `${fs * 0.6}px ${fs * 0.8}px`, whiteSpace: "normal" }}>
          <div style={{ color: K.orange, fontWeight: 700 }}>{copy.plan.title}</div>
          <div style={{ marginTop: fs * 0.5, whiteSpace: "pre" }}>
            <span style={{ color: K.orange }}>{"█".repeat(filled)}</span>
            <span style={{ color: K.dim }}>{"░".repeat(barCols - filled)}</span>
            <span style={{ color: K.text }}>{`  ${copy.plan.step(step, TOTAL)}`}</span>
          </div>
          <div style={{ marginTop: fs * 0.6, display: "flex", flexDirection: "column", gap: fs * 0.45 }}>
            {ROWS.map((w, i) => {
              const state = i < done ? "done" : i === done ? "active" : "todo";
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: fs * 0.6 }}>
                  <span style={{ width: fs, color: state === "done" ? K.green : state === "active" ? K.orange : K.dim, fontWeight: 700 }}>
                    {state === "done" ? "✓" : state === "active" ? "▸" : "○"}
                  </span>
                  <div style={{ height: fs * 0.45, width: `${w * 80}%`, borderRadius: 4, background: state === "done" ? "#3a3a46" : state === "active" ? K.orange : "#24242e", opacity: state === "active" ? 0.85 : 1 }} />
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: fs * 0.8, display: "flex", justifyContent: "space-between", color: K.gray, fontFamily: TERM_FONT }}>
            <span>{copy.plan.calls(calls)}</span>
            <span style={{ color: C.white, fontWeight: 700, fontSize: fs * (1.2 + clockHit * 0.4), transformOrigin: "right center" }}>⏱ {clock}</span>
          </div>
        </div>
      </Window>
    </div>
  );
  const head = (
    <Headline frame={frame} lf={lf} lines={copy.plan.headline} ats={[60, 120, 150]} size={vertical ? 100 : 84} align={vertical ? "center" : "left"} maxWidth={vertical ? 1044 : 910} />
  );
  return vertical ? (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 110 }}>{card}{head}</AbsoluteFill>
  ) : (
    <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 80 }}>{card}<div style={{ width: 860 }}>{head}</div></AbsoluteFill>
  );
};
