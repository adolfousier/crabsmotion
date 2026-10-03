import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COL, MONO, fadeOut, pop } from "../theme";

const SCRIPT: { text: string; color: string; size: number }[] = [
  { text: "$ opencrabs chat", color: COL.gold, size: 30 },
  {
    text: "  channels: telegram · discord · whatsapp · slack",
    color: COL.dim,
    size: 25,
  },
  {
    text: "  skills: loaded · cron: armed · heartbeat: on",
    color: COL.dim,
    size: 25,
  },
  {
    text: "  browser: ready · memory: online · a2a: listening",
    color: COL.dim,
    size: 25,
  },
  { text: "● agent online, 24/7", color: COL.eye, size: 31 },
];

export const S5Terminal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chars = Math.max(0, (frame - 34) * 4.6);
  const total = SCRIPT.reduce((a, l) => a + l.text.length + 1, 0);
  const done = chars >= total;
  const exit = fadeOut(frame, 166, 10);
  const win = pop(frame, fps, 4, 14);
  let acc = 0;
  const lines = SCRIPT.map((l, li) => {
    const start = acc;
    acc += l.text.length + 1;
    const vis = Math.max(0, Math.min(l.text.length, Math.floor(chars - start)));
    const typing = chars >= start && chars < start + l.text.length;
    const isLast = li === SCRIPT.length - 1;
    const pulse = done && isLast ? 0.85 + 0.15 * Math.sin(frame / 6) : 1;
    return (
      <div
        key={li}
        style={{
          whiteSpace: "pre",
          fontFamily: MONO,
          fontSize: l.size,
          lineHeight: "52px",
          color: l.color,
          fontWeight: isLast ? 700 : 400,
          opacity: pulse,
          textShadow:
            done && isLast
              ? "0 0 22px rgba(255,107,74,0.6)"
              : "none",
        }}
      >
        {l.text.slice(0, vis)}
        {typing && (
          <span
            style={{
              color: "transparent",
              background: l.color,
              opacity: frame % 26 < 14 ? 1 : 0,
            }}
          >
            {"\u258C"}
          </span>
        )}
      </div>
    );
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0704", opacity: exit }}>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 110,
          width: 1000,
          borderRadius: 16,
          background: COL.panel,
          border: "1px solid rgba(154,138,114,0.3)",
          boxShadow: "0 30px 90px rgba(0,0,0,0.7)",
          transform: `scale(${0.85 + 0.15 * win})`,
          opacity: Math.min(1, win * 1.5),
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 56,
            background: "#1d1409",
            position: "relative",
            borderBottom: "1px solid rgba(154,138,114,0.16)",
          }}
        >
          {[COL.red, COL.gold, COL.green].map((c, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 22 + i * 26,
                top: 21,
                width: 15,
                height: 15,
                borderRadius: 8,
                background: c,
              }}
            />
          ))}
          <div
            style={{
              textAlign: "center",
              lineHeight: "56px",
              fontSize: 18,
              color: COL.dim,
              fontFamily: MONO,
            }}
          >
            agent@node: opencrabs
          </div>
        </div>
        <div style={{ padding: "34px 42px 42px" }}>{lines}</div>
      </div>
      {done && (
        <div
          style={{
            position: "absolute",
            bottom: 64,
            width: "100%",
            textAlign: "center",
            fontSize: 24,
            letterSpacing: 3,
            color: COL.dim,
            opacity: interpolate(frame, [120, 140], [0, 0.9], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          ONE CRAB. FULL STACK.
        </div>
      )}
    </AbsoluteFill>
  );
};
