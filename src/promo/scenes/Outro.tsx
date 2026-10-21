import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT, FONT_MONO, TERM_FONT, RELEASE } from "../../theme";
import { beatPump, ease } from "../../beat";
import { useLayout } from "../layout";
import { Logo } from "../Logo";
import { Headline } from "../Headline";

const LEN = 240;
const CRASHES = [0, 210]; // score impacts: outro downbeat and the last bar

/** Bars 25-28: logo, version, download URL, the three verbs, crash flashes, fade out. */
export const Outro: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const pump = beatPump(frame, 5);
  const inP = ease(lf / 10);
  const flash = CRASHES.map((c) => lf - c).filter((d) => d >= 0 && d < 8).map((d) => 1 - d / 8)[0] ?? 0;
  const fade = 1 - ease((lf - (LEN - 18)) / 18);
  const urlIn = ease((lf - 26) / 8);
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
        <div style={{ opacity: urlIn, marginTop: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <div style={{ fontFamily: TERM_FONT, fontSize: vertical ? 50 : 48, color: C.text, background: "#15151d", border: `2px solid ${C.orange}`, borderRadius: 999, padding: "16px 48px", boxShadow: `0 0 ${30 + pump * 30}px rgba(255,122,26,0.35)` }}>
            opencrabs.com/download
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: vertical ? 30 : 28, letterSpacing: 2, color: C.dim }}>
            <span style={{ color: C.orange, fontWeight: 700 }}>{RELEASE.version}</span> · ~45 MB · ONE BINARY
          </div>
        </div>
        <div style={{ marginTop: vertical ? 52 : 44 }}>
          <Headline frame={frame} lf={lf} lines={vertical ? ["DOWNLOAD.", "RUN.", "*TALK.*"] : ["DOWNLOAD. RUN. *TALK.*"]} ats={vertical ? [56, 70, 84] : [56]} size={vertical ? 100 : 84} />
        </div>
      </div>
      {flash > 0 && <AbsoluteFill style={{ backgroundColor: C.white, opacity: flash * 0.7 }} />}
    </AbsoluteFill>
  );
};
