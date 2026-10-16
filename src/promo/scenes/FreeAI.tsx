import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../../theme";
import { beatPump } from "../../beat";
import { useLayout } from "../layout";
import { Headline } from "../Headline";
import { ChatPanel, Bubble } from "../Chat";
import { Logo } from "../Logo";

// Drawn "photo" of a lash set: an eye with a fan of lashes. No stock image needed.
const LashPhoto: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * 0.62} viewBox="0 0 300 186" style={{ display: "block", borderRadius: 14 }}>
    <rect width="300" height="186" fill="#e9c9b5" />
    <path d="M40 110 Q150 40 260 110 Q150 150 40 110 Z" fill="#fff6f0" stroke="#7a4b3a" strokeWidth="4" />
    <circle cx="150" cy="104" r="30" fill="#5a3a2a" />
    <circle cx="150" cy="104" r="13" fill="#140c08" />
    <circle cx="160" cy="95" r="6" fill="#fff" />
    {Array.from({ length: 15 }, (_, i) => {
      const t = i / 14;
      const x = 52 + t * 196;
      const y = 110 - Math.sin(t * Math.PI) * 52;
      const a = (t - 0.5) * 1.6;
      return <line key={i} x1={x} y1={y} x2={x + Math.sin(a) * 30} y2={y - Math.cos(a) * 34} stroke="#140c08" strokeWidth="4" strokeLinecap="round" />;
    })}
  </svg>
);

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
    <ChatPanel width={vertical ? 940 : 760} height={vertical ? 1040 : 900} fs={fs}>
      <Bubble lf={lf} at={8} mine fs={fs} pad={6}><LashPhoto w={vertical ? 520 : 420} /></Bubble>
      <Bubble lf={lf} at={38} fs={fs}>That's a lash set, classic volume.</Bubble>
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
