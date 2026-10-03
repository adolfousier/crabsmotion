import React from "react";
import { Composition } from "remotion";
import { CrabMotion } from "./CrabMotion";
import { Main as Promo } from "./promo/Main";
import { FPS, DURATION_FRAMES, WIDTH, HEIGHT } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CrabMotion"
        component={CrabMotion}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      {/* 60s mecha-forge promo. Self-contained under src/promo + public/promo
          so it never touches CrabMotion's own scenes, theme or score. */}
      <Composition
        id="OpenCrabsPromo"
        component={Promo}
        durationInFrames={1800}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
