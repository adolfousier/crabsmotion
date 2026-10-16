import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT } from "../../theme";
import { beatPump, ease } from "../../beat";
import { useLayout } from "../layout";
import { Logo } from "../Logo";

const WORD = "OPENCRABS";

/** Bar 2: the real logo slams in on the kick, letters stagger up. */
export const LogoHit: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const pump = beatPump(frame, 5);
  const inP = ease(lf / 8);
  const slam = lf < 8 ? 1.25 - inP * 0.25 : 1;
  const size = vertical ? 150 : 170;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ opacity: inP, transform: `scale(${slam * (1 + pump * 0.05)})`, filter: `drop-shadow(0 0 ${40 + pump * 40}px rgba(255,122,26,0.45))` }}>
        <Logo width={vertical ? 640 : 560} />
      </div>
      <div style={{ display: "flex", marginTop: 30 }}>
        {WORD.split("").map((ch, i) => {
          const e = ease((lf - 6 - i * 2) / 8);
          return (
            <span key={i} style={{ fontFamily: FONT, fontSize: size, fontWeight: 700, letterSpacing: -size * 0.03, lineHeight: 1, color: i >= 4 ? C.orange : C.white, display: "inline-block", opacity: e, transform: `translateY(${(1 - e) * 80}px)` }}>
              {ch}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
