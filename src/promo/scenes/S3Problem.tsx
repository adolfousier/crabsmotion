import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Easing, interpolate } from "remotion";
import { Img, staticFile } from "remotion";
import { COL, eyePulse, fadeIn, fadeOut, pop } from "../theme";

const LINES: { t: string; d: number }[] = [
  { t: "OpenCrabs lives on the server.", d: 84 },
  { t: "Always on. Always listening.", d: 106 },
  { t: "It ships while you sleep.", d: 128 },
];

export const S3Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = interpolate(frame, [50, 64], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const aOp = (1 - 0.6 * fadeIn(frame, 54, 12)) * fadeOut(frame, 70, 10);
  const pulse = pop(frame, fps, 84);
  const sx = frame < 54 || frame > 70 ? 0 : Math.sin((frame - 54) * 2.7) * 7 * Math.exp(-((frame - 54) / 16) * 4);
  const exit = fadeOut(frame, 186, 12);
  const barH = 260 * pulse;
  const glow = eyePulse(frame, 8);
  return (
    <AbsoluteFill style={{ backgroundColor: COL.navy, opacity: exit, transform: `translateX(${sx}px)` }}>
      <div style={{ position: "absolute", width: "100%", opacity: aOp }}>
        <div style={{ position: "absolute", top: 280, width: "100%", textAlign: "center", fontSize: 54, fontWeight: 700, color: COL.text }}>
          Most assistants die
        </div>
        <div style={{ position: "absolute", top: 352, width: "100%", textAlign: "center", fontSize: 40, color: COL.dim }}>
          the moment you close the tab.
        </div>
        <div style={{ position: "absolute", top: 310, left: 640 - (760 * reveal) / 2, width: 760 * reveal, height: 5, borderRadius: 3, backgroundColor: COL.red }} />
      </div>
      <div style={{ position: "absolute", left: 640 - 420, top: 240 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 8, height: barH, borderRadius: 4, background: COL.orange }} />
        {LINES.map((l, i) => {
          const s = pop(frame, fps, l.d);
          const big = i === 0;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 40 + (1 - s) * -140,
                top: i * 92,
                opacity: Math.min(1, s * 1.5),
                fontSize: big ? 56 : 42,
                fontWeight: big ? 800 : 600,
                color: big ? COL.orange : i === 1 ? COL.text : COL.gold,
                whiteSpace: "nowrap",
              }}
            >
              {l.t}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 490, left: 1000, transform: `rotate(${Math.sin(frame / 8) * 3}deg)` }}>
        <Img
          src={staticFile("promo/crab-v5-cut.png")}
          style={{
            width: 130,
            filter: `drop-shadow(0 0 3px rgba(216,185,138,0.5)) drop-shadow(0 0 ${8 + 6 * glow}px rgba(232,65,42,0.45)) drop-shadow(0 8px 16px rgba(0,0,0,0.55))`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
