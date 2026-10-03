import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Img, staticFile } from "remotion";
import { COL, GLOW_EYE, emberState, fadeIn, fadeOut } from "../theme";

// rising forge-embers, deterministic seeds
const EMBERS = Array.from({ length: 16 }, (_, i) => ({
  delay: (i % 6) * 22 + 4,
  life: 90 + (i % 4) * 18,
}));

export const S1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();

  const crabY = interpolate(frame, [5, 95], [height - 60, 232], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const bob = Math.sin(frame / 9) * 7;
  const rot = Math.sin(frame / 13) * 2;
  const pulse = 0.5 + 0.5 * Math.sin(frame / 7);
  const textOp = fadeIn(frame, 72, 16) * fadeOut(frame, 138, 10);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COL.water} 0%, ${COL.deep} 55%, ${COL.abyss} 100%)`,
      }}
    >
      {/* warm forge shafts falling from above */}
      <div
        style={{
          position: "absolute",
          left: 180 + Math.sin(frame / 25) * 12,
          top: -80,
          width: 240,
          height: 900,
          transform: "rotate(14deg)",
          background: "linear-gradient(180deg, rgba(255,190,120,0.08), transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 780 + Math.cos(frame / 21) * 12,
          top: -120,
          width: 180,
          height: 900,
          transform: "rotate(-10deg)",
          background: "linear-gradient(180deg, rgba(255,150,80,0.06), transparent 70%)",
        }}
      />

      {/* rising embers */}
      {EMBERS.map((e, i) => {
        const s = emberState(frame, i, e.delay, e.life);
        if (!s) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              width: s.r * 2,
              height: s.r * 2,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${s.hue}, transparent 75%)`,
              opacity: s.op,
              boxShadow: `0 0 ${4 + s.r}px ${s.hue}`,
            }}
          />
        );
      })}

      {/* mecha crab rising out of the forge */}
      <div
        style={{
          position: "absolute",
          left: 430,
          top: crabY + bob,
          transform: `rotate(${rot}deg) scale(${1 + 0.06 * Math.min(1, frame / 150)})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -70,
            top: -52,
            width: 560,
            height: 380,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(224,164,88,${0.16 + 0.1 * pulse}) 0%, rgba(232,65,42,${0.05 + 0.05 * pulse}) 52%, transparent 80%)`,
            filter: "blur(18px)",
          }}
        />
        <Img
          src={staticFile("promo/crab-v5-cut.png")}
          style={{
            width: 400,
            filter: `drop-shadow(0 0 4px rgba(216,185,138,0.6)) drop-shadow(0 0 ${18 + 10 * pulse}px ${GLOW_EYE}) drop-shadow(0 24px 40px rgba(0,0,0,0.6))`,
          }}
        />
      </div>

      {/* teaser line */}
      <div
        style={{
          position: "absolute",
          top: 612,
          width: "100%",
          textAlign: "center",
          fontSize: 34,
          letterSpacing: 2,
          color: "rgba(245,235,216,0.88)",
          opacity: textOp,
          textShadow: "0 2px 18px rgba(0,0,0,0.65)",
        }}
      >
        Your work keeps moving, even when you don't.
      </div>
    </AbsoluteFill>
  );
};
