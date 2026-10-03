import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { Img, staticFile } from "remotion";
import { COL, METAL, MONO, eyePulse, fadeIn, fadeOut, pop } from "../theme";
import { Wordmark } from "../Wordmark";

const DOTS = Array.from({ length: 10 }, (_, i) => ({
  x: 100 + ((i * 173) % 1080),
  y: 40 + ((i * 91) % 260),
}));

export const S2Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = pop(frame, fps, 6);
  const glow = eyePulse(frame, 7);
  const reveal = interpolate(frame, [10, 40], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // specular sweep travels WITHIN the glyph shapes only (background-clip: text),
  // never as a rectangle floating over the frame
  const sweepT = interpolate(frame, [66, 96], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const barW = interpolate(frame, [40, 62], [0, 520], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagOp = interpolate(frame, [58, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subOp = interpolate(frame, [74, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 90% 70% at 50% 40%, ${COL.deep} 0%, ${COL.abyss} 70%)`,
        }}
      />
      {/* warm forge shafts, copper-toned */}
      <div
        style={{
          position: "absolute",
          left: 140,
          top: -60,
          width: 120,
          height: 900,
          transform: "rotate(18deg)",
          background:
            "linear-gradient(180deg, rgba(224,164,88,0.05) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 880,
          top: -120,
          width: 180,
          height: 900,
          transform: "rotate(-12deg)",
          background:
            "linear-gradient(180deg, rgba(255,107,74,0.04) 0%, transparent 70%)",
        }}
      />
      {DOTS.map((d, i) => {
        const tw = Math.sin(frame / 7 + i * 2.1) * Math.cos(frame / 13 + i);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x + Math.sin(frame / 20 + i) * 12,
              top: d.y + ((frame * (0.3 + (i % 3) * 0.15)) % 300) * -0.2,
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              borderRadius: "50%",
              background: i % 3 === 0 ? COL.eye : COL.gold,
              opacity: 0.25 + 0.55 * Math.max(0, tw),
            }}
          />
        );
      })}

      {/* glow div, ellipse + heavy blur so it never forms a box */}
      <div
        style={{
          position: "absolute",
          left: 290,
          top: 140,
          width: 700,
          height: 520,
          background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(224,164,88,${0.1 + 0.07 * glow}) 0%, rgba(255,138,61,${0.03 + 0.03 * glow}) 46%, transparent 72%)`,
          filter: "blur(32px)",
        }}
      />

      {/* eye-red pulse rings, brass */}
      <div
        style={{
          position: "absolute",
          left: 640 - 250,
          top: 170,
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `2px solid rgba(224,164,88,${0.2 * (1 - reveal / 100)})`,
          transform: `scale(${0.6 + 0.4 * (reveal / 100)})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 640 - 250,
          top: 170,
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `1px solid rgba(255,138,61,${0.12 * (1 - reveal / 100)})`,
          transform: `scale(${0.4 + 0.85 * (reveal / 100)})`,
        }}
      />

      {/* mecha crab, copper halo + eye-red ambient, sized so it clears the title */}
      <div
        style={{
          position: "absolute",
          left: 508,
          top: 96,
          transform: `translateY(${(1 - enter) * -300}px) rotate(${Math.sin(frame / 10) * 2.4}deg) scale(${0.98 + 0.04 * Math.sin(frame / 8)})`,
          opacity: enter,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -70,
            top: -50,
            width: 416,
            height: 330,
            borderRadius: "50%",
            background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(224,164,88,${0.14 + 0.05 * glow}) 0%, rgba(255,138,61,0.05) 44%, transparent 70%)`,
            filter: "blur(14px)",
          }}
        />
        <Img
          src={staticFile("promo/crab-v5-cut.png")}
          style={{
            width: 270,
            filter: `drop-shadow(0 0 3px rgba(216,185,138,0.8)) drop-shadow(0 0 ${16 + 12 * glow}px rgba(232,65,42,0.35)) drop-shadow(0 0 60px rgba(224,164,88,0.22))`,
          }}
        />
      </div>

      {/* wordmark: SVG text + metal gradient fill (glyph-clipped by construction).
          background-clip:text was rendering as a hard rectangle in headless Chrome — banned. */}
      <div
        style={{
          position: "absolute",
          top: 322,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: reveal / 100,
          transform: `translateX(${(1 - reveal / 100) * -28}px)`,
        }}
      >
        <Wordmark size={108} sweep={sweepT} glow={glow} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 462,
          left: 640 - barW / 2,
          width: barW,
          height: 5,
          borderRadius: 3,
          background: `linear-gradient(90deg, ${COL.bronzeDk}, ${COL.orange}, ${COL.gold}, ${COL.orange}, ${COL.bronzeDk})`,
          boxShadow: `0 0 ${10 + 8 * glow}px rgba(255,138,61,0.6)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 498,
          width: "100%",
          textAlign: "center",
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 2,
          color: COL.text,
          opacity: tagOp,
          transform: `translateY(${(1 - tagOp) * 16}px)`,
        }}
      >
        The AI agent that never logs off.
      </div>
      <div
        style={{
          position: "absolute",
          top: 560,
          width: "100%",
          textAlign: "center",
          fontSize: 25,
          letterSpacing: 1,
          color: COL.muted,
          opacity: subOp,
          transform: `translateY(${(1 - subOp) * 16}px)`,
        }}
      >
        One agent. Every channel. Zero babysitting.
      </div>
      {/* vignette, warm */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 75% 62% at 50% 50%, transparent 55%, rgba(8,5,3,0.5) 100%)",
          filter: "blur(10px)",
        }}
      />
    </AbsoluteFill>
  );
};
