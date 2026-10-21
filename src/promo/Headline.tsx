import React from "react";
import { C, FONT, BEAT_FRAMES } from "../theme";
import { beatPump, ease } from "../beat";
import { useLayout } from "./layout";
import { measureLine } from "./textFit";

/** Worst-case beat-pump scale applied to a landed line: 1 + 0.035 pump + 0.08 hit. */
const MAX_BEAT_SCALE = 1.12;

/**
 * Kinetic headline: each line drops in on its own beat (line i lands at
 * `at + i * every` local frames) and every landed line pumps with the kick.
 * Pass `ats` instead to land each line on its own local frame.
 * Words wrapped in *stars* render in brand orange.
 *
 * Lines are set nowrap, so `maxWidth` (defaults to the frame minus a 5% margin
 * on each side) shrinks the type until the longest line fits. A translation
 * that runs longer than the English original scales down here instead of
 * spilling past the edge of the frame.
 */
export const Headline: React.FC<{
  frame: number;
  lf: number;
  lines: string[];
  at?: number;
  every?: number;
  ats?: number[];
  size: number;
  align?: "left" | "center";
  maxWidth?: number;
}> = ({ frame, lf, lines, at = 0, every = BEAT_FRAMES * 2, ats, size, align = "center", maxWidth }) => {
  const pump = beatPump(frame, 5);
  const { width } = useLayout();
  const plain = lines.map((l) => l.replace(/\*/g, ""));
  const widest = Math.max(...plain.map((l) => measureLine(l, size, -size * 0.03)));
  // Every landed line scales up to 1.115x on the kick (pump 0.035 + hit 0.08), so
  // the fit has to reserve that headroom or a line that measures flush still
  // touches the edge on the beat. 0.98 leaves the English cut at its approved
  // size; scenes that share the frame with a card pass the space they have.
  const limit = (maxWidth ?? width * 0.98) / MAX_BEAT_SCALE;
  size = Math.max(size * Math.min(1, limit / widest), size * 0.55);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start", gap: size * 0.12 }}>
      {lines.map((line, i) => {
        const t = lf - (ats ? ats[i] : at + i * every);
        const e = ease(t / 8);
        const hit = t >= 0 && t < 8 ? 1 - t / 8 : 0;
        return (
          <div
            key={i}
            style={{
              fontFamily: FONT,
              fontSize: size,
              fontWeight: 700,
              letterSpacing: -size * 0.03,
              lineHeight: 1,
              color: C.white,
              whiteSpace: "nowrap",
              opacity: e,
              transform: `translateY(${(1 - e) * size * 0.5}px) scale(${1 + (t >= 0 ? pump * 0.035 : 0) + hit * 0.08})`,
              transformOrigin: align === "center" ? "center" : "left center",
            }}
          >
            {line.split(/(\*[^*]+\*)/).map((part, j) =>
              part.startsWith("*") ? (
                <span key={j} style={{ color: C.orange }}>{part.slice(1, -1)}</span>
              ) : (
                <span key={j}>{part}</span>
              ),
            )}
          </div>
        );
      })}
    </div>
  );
};
