import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Img, staticFile } from "remotion";
import { COL, METAL, MONO, eyePulse, fadeIn, fadeOut, pop } from "../theme";
import { Wordmark } from "../Wordmark";

const SPARKS = Array.from({ length: 14 }, (_, i) => ({
  x: 80 + ((i * 137) % 1140),
  y: 60 + ((i * 233) % 560),
  p: 2 + (i % 5),
}));

export const S6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = pop(frame, fps, 0, 9);
  const waveUp = pop(frame, fps, 12, 5);
  const reveal = interpolate(frame, [10, 40], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tag = pop(frame, fps, 48);
  const barW = interpolate(frame, [60, 80], [0, 460], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlOp = fadeIn(frame, 86, 12);
  const metaOp = fadeIn(frame, 112, 12);
  const black = interpolate(frame, [140, 164], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glow = eyePulse(frame, 6);
  const sweepT = interpolate(frame, [52, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const crabTop = interpolate(drop, [0, 1], [-240, 118]);
  const bob = Math.sin(frame / 9) * 5;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 55%, ${COL.deep} 0%, ${COL.abyss} 78%)`,
      }}
    >
      {SPARKS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: 4,
            height: 4,
            borderRadius: 2,
            background: i % 3 === 0 ? COL.eye : COL.gold,
            opacity: 0.15 + 0.5 * Math.max(
              0,
              Math.sin(frame / (s.p * 2.2) + i * 1.7) *
                Math.cos(frame / (s.p * 3.1) + i),
            ),
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: crabTop + bob,
          left: 640 - 170,
          transform: `scale(${0.94 + 0.06 * waveUp})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -62,
            top: -48,
            width: 464,
            height: 372,
            borderRadius: "50%",
            background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(224,164,88,0.16) 0%, rgba(232,65,42,${0.04 + 0.05 * glow}) 46%, transparent 72%)`,
            filter: "blur(14px)",
          }}
        />
        <Img
          src={staticFile("promo/crab-v5-cut.png")}
          style={{
            width: 312,
            filter: `drop-shadow(0 0 3px rgba(216,185,138,0.75)) drop-shadow(0 0 ${14 + 12 * glow}px rgba(232,65,42,0.4)) drop-shadow(0 0 46px rgba(224,164,88,0.18))`,
          }}
        />
      </div>
      {/* wordmark: SVG text + metal gradient fill (glyph-clipped by construction) */}
      <div
        style={{
          position: "absolute",
          top: 424,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: reveal / 100,
          transform: `translateX(${(1 - reveal / 100) * -28}px)`,
        }}
      >
        <Wordmark size={96} sweep={sweepT} glow={glow} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 562,
          width: "100%",
          textAlign: "center",
          opacity: tag,
          transform: `translateY(${(1 - tag) * 26}px)`,
        }}
      >
        <span style={{ fontSize: 44, color: COL.text, fontWeight: 700 }}>
          Your AI. With claws.
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 636,
          left: 640 - barW / 2,
          width: barW,
          height: 4,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${COL.bronzeDk}, ${COL.orange}, ${COL.gold})`,
          boxShadow: `0 0 ${10 + 8 * glow}px rgba(255,138,61,0.55)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 658,
          width: "100%",
          textAlign: "center",
          opacity: urlOp,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 26,
            color: COL.bronzeHi,
            letterSpacing: 2,
          }}
        >
          docs.opencrabs.com
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 690,
          width: "100%",
          textAlign: "center",
          opacity: metaOp * 0.95,
        }}
      >
        <span style={{ fontSize: 19, color: COL.muted }}>
          This video was rendered by the crab itself.
        </span>
      </div>
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: black }} />
    </AbsoluteFill>
  );
};
