import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { COL, FONT } from "./theme";
import { S1Intro } from "./scenes/S1Intro";
import { S2Title } from "./scenes/S2Title";
import { S3Problem } from "./scenes/S3Problem";
import { S4Features } from "./scenes/S4Features";
import { S5Terminal } from "./scenes/S5Terminal";
import { S6Outro } from "./scenes/S6Outro";
import { AudioTrack } from "./AudioMap";
import { ImpactFlash, useShakeOffset, useStrobe } from "./Impact";

export const Main: React.FC = () => {
  const { x, y } = useShakeOffset();
  const strobe = useStrobe();
  const shaking = Math.abs(x) > 0.01 || Math.abs(y) > 0.01;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COL.abyss,
        fontFamily: FONT,
      }}
    >
      {/* shake layer: transform only on impact frames, so headless-Chrome
          software-raster can cache the idle 90% of frames (constant
          scale() here tripled render time per frame) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: shaking ? `translate(${x}px, ${y}px)` : undefined,
        }}
      >
        <Sequence from={0} durationInFrames={150}>
          <S1Intro />
        </Sequence>
        <Sequence from={150} durationInFrames={200}>
          <S2Title />
        </Sequence>
        <Sequence from={350} durationInFrames={200}>
          <S3Problem />
        </Sequence>
        <Sequence from={550} durationInFrames={900}>
          <S4Features />
        </Sequence>
        <Sequence from={1450} durationInFrames={180}>
          <S5Terminal />
        </Sequence>
        <Sequence from={1630} durationInFrames={170}>
          <S6Outro />
        </Sequence>
      </div>
      <AudioTrack />
      <ImpactFlash />
      {strobe > 0 && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            backgroundColor: `rgba(245,235,216,${strobe})`,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
