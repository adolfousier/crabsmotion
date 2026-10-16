import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT, TERM_FONT } from "../../theme";
import { beatPump, ease } from "../../beat";
import { useLayout } from "../layout";
import { Logo } from "../Logo";
import { Headline } from "../Headline";

const LEN = 300;
const CRASHES = [0, 240]; // score impacts: bar 20 and bar 24 downbeats

/** Bars 20-24: logo, download URL, the three verbs, crash flashes, fade out. */
export const Outro: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const pump = beatPump(frame, 5);
  const inP = ease(lf / 10);
  const flash = CRASHES.map((c) => lf - c).filter((d) => d >= 0 && d < 8).map((d) => 1 - d / 8)[0] ?? 0;
  const fade = 1 - ease((lf - (LEN - 20)) / 20);
  const urlIn = ease((lf - 30) / 8);
  const size = vertical ? 150 : 140;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: fade }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${inP * (1 + pump * 0.03 + flash * 0.12)})` }}>
        <div style={{ filter: `drop-shadow(0 0 ${40 + pump * 40}px rgba(255,122,26,0.45))` }}>
          <Logo width={vertical ? 560 : 440} />
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: size, letterSpacing: -size * 0.03, lineHeight: 1, color: C.white, marginTop: 24 }}>
          OPEN<span style={{ color: C.orange }}>CRABS</span>
        </div>
        <div style={{ opacity: urlIn, marginTop: 40, fontFamily: TERM_FONT, fontSize: vertical ? 50 : 48, color: C.text, background: "#15151d", border: `2px solid ${C.orange}`, borderRadius: 999, padding: "16px 48px", boxShadow: `0 0 ${30 + pump * 30}px rgba(255,122,26,0.35)` }}>
          opencrabs.com/download
        </div>
        <div style={{ marginTop: 60 }}>
          <Headline frame={frame} lf={lf} lines={vertical ? ["DOWNLOAD.", "RUN.", "*TALK.*"] : ["DOWNLOAD. RUN. *TALK.*"]} ats={vertical ? [60, 75, 90] : [60]} size={vertical ? 100 : 84} />
        </div>
      </div>
      {flash > 0 && <AbsoluteFill style={{ backgroundColor: C.white, opacity: flash * 0.7 }} />}
    </AbsoluteFill>
  );
};
