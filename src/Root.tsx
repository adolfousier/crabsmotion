import React from "react";
import { Composition } from "remotion";
import { Promo } from "./promo/Promo";
import { FPS, DURATION_FRAMES, WIDTH, HEIGHT } from "./theme";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="CrabMotion" component={Promo} durationInFrames={DURATION_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="CrabMotionVertical" component={Promo} durationInFrames={DURATION_FRAMES} fps={FPS} width={HEIGHT} height={WIDTH} />
  </>
);
