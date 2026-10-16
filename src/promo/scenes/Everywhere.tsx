import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT } from "../../theme";
import { ease } from "../../beat";
import { useLayout } from "../layout";

const WHERE = ["TELEGRAM", "DISCORD", "SLACK", "WHATSAPP", "TRELLO", "TERMINAL"];
const EVERY = 9;

/** Bar 17: every surface slams in; the newest is orange, earlier ones dim. */
export const Everywhere: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const size = vertical ? 120 : 112;
  const latest = Math.min(WHERE.length - 1, Math.floor(lf / EVERY));
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: size * 0.1 }}>
      {WHERE.map((w, i) => {
        const t = lf - i * EVERY;
        const e = ease(t / 6);
        const hit = t >= 0 && t < 6 ? 1 - t / 6 : 0;
        return (
          <div key={w} style={{ fontFamily: FONT, fontWeight: 700, fontSize: size, lineHeight: 1, letterSpacing: -size * 0.03, color: i === latest ? C.orange : C.white, opacity: e * (i === latest ? 1 : 0.35), transform: `scale(${0.85 + e * 0.15 + hit * 0.1})` }}>
            {w}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
