import React from "react";
import { C, FONT, BEAT_FRAMES } from "../theme";
import { beatPump, ease } from "../beat";

/**
 * Kinetic headline: each line drops in on its own beat (line i lands at
 * `at + i * every` local frames) and every landed line pumps with the kick.
 * Words wrapped in *stars* render in brand orange.
 */
export const Headline: React.FC<{
  frame: number;
  lf: number;
  lines: string[];
  at?: number;
  every?: number;
  size: number;
  align?: "left" | "center";
}> = ({ frame, lf, lines, at = 0, every = BEAT_FRAMES * 2, size, align = "center" }) => {
  const pump = beatPump(frame, 5);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start", gap: size * 0.12 }}>
      {lines.map((line, i) => {
        const t = lf - (at + i * every);
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
