import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../../theme";
import { beatPump } from "../../beat";
import { useLayout } from "../layout";
import { Headline } from "../Headline";
import { ChatPanel, Bubble } from "../Chat";
import { Logo } from "../Logo";

// Drawn "photo" of a construction drawing: a blueprint floor plan, 12.0 m x 7.0 m. No stock image needed.
const PlanPhoto: React.FC<{ w: number }> = ({ w }) => {
  const ink = "#dbe9ff";
  const dim = { fill: ink, fontSize: 11, fontFamily: "monospace", textAnchor: "middle" as const };
  return (
    <svg width={w} height={w * 0.62} viewBox="0 0 300 186" style={{ display: "block", borderRadius: 14 }}>
      <rect width="300" height="186" fill="#1d4f91" />
      {Array.from({ length: 16 }, (_, i) => <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="186" stroke="#2a62ab" strokeWidth="1" />)}
      {Array.from({ length: 10 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 20} x2="300" y2={i * 20} stroke="#2a62ab" strokeWidth="1" />)}
      <g stroke={ink} fill="none" strokeLinecap="square">
        <rect x="30" y="34" width="240" height="122" strokeWidth="5" />
        <line x1="150" y1="34" x2="150" y2="96" strokeWidth="3" />
        <line x1="150" y1="118" x2="150" y2="156" strokeWidth="3" />
        <line x1="150" y1="96" x2="270" y2="96" strokeWidth="3" />
        <path d="M150 96 A22 22 0 0 0 128 118" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="70" y1="156" x2="104" y2="156" stroke="#1d4f91" strokeWidth="6" />
        <line x1="30" y1="22" x2="270" y2="22" strokeWidth="1.2" />
        <line x1="30" y1="17" x2="30" y2="27" strokeWidth="1.2" />
        <line x1="270" y1="17" x2="270" y2="27" strokeWidth="1.2" />
        <line x1="282" y1="34" x2="282" y2="156" strokeWidth="1.2" />
        <line x1="277" y1="34" x2="287" y2="34" strokeWidth="1.2" />
        <line x1="277" y1="156" x2="287" y2="156" strokeWidth="1.2" />
      </g>
      <text x="150" y="16" {...dim}>12.0 m</text>
      <text x="293" y="99" {...dim} transform="rotate(-90 293 99)">7.0 m</text>
      <text x="90" y="100" {...dim}>LIVING</text>
      <text x="210" y="70" {...dim}>BED 1</text>
      <text x="210" y="130" {...dim}>BED 2</text>
      <text x="268" y="180" {...dim} textAnchor="end" fontSize={8}>A-101 GROUND FLOOR</text>
    </svg>
  );
};

// Voice note: play button + waveform that moves with the beat.
const Voice: React.FC<{ frame: number; fs: number }> = ({ frame, fs }) => {
  const pump = beatPump(frame, 4);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: fs * 0.6 }}>
      <div style={{ width: fs * 2, height: fs * 2, borderRadius: fs, background: C.tg, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: fs }}>▶</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {Array.from({ length: 26 }, (_, i) => (
          <div key={i} style={{ width: 5, borderRadius: 3, background: C.tg, height: fs * (0.3 + Math.abs(Math.sin(i * 1.7)) * 1.1 * (0.7 + pump * 0.3)) }} />
        ))}
      </div>
    </div>
  );
};

/** Bars 5-7: photo in, the crab reads it, makes an image back, talks. All free. */
export const FreeAI: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const fs = vertical ? 34 : 30;
  const chat = (
    <ChatPanel width={vertical ? 940 : 760} height={vertical ? 1090 : 900} fs={fs}>
      <Bubble lf={lf} at={8} mine fs={fs} pad={6}><PlanPhoto w={vertical ? 520 : 420} /></Bubble>
      <Bubble lf={lf} at={38} fs={fs}>That's a floor plan: 3 rooms, 84 m².</Bubble>
      <Bubble lf={lf} at={70} fs={fs} pad={6}>
        <div style={{ width: vertical ? 520 : 420, height: vertical ? 320 : 260, borderRadius: 14, background: "radial-gradient(circle at 50% 45%, #ffb36b 0%, #ff7a1a 45%, #7a2a08 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Logo width={vertical ? 380 : 300} />
        </div>
      </Bubble>
      <Bubble lf={lf} at={104} fs={fs}><Voice frame={frame} fs={fs} /></Bubble>
    </ChatPanel>
  );
  const head = (
    <Headline frame={frame} lf={lf} lines={["*FREE* AI", "*FREE* VISION", "*FREE* IMAGE GEN", "*FREE* VOICE"]} ats={[14, 44, 76, 110]} size={vertical ? 96 : 104} align={vertical ? "center" : "left"} />
  );
  return vertical ? (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 70 }}>{chat}{head}</AbsoluteFill>
  ) : (
    <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 110 }}>{chat}<div style={{ width: 860 }}>{head}</div></AbsoluteFill>
  );
};
