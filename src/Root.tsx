import React from "react";
import { Composition } from "remotion";
import { Promo } from "./promo/Promo";
import { Locale } from "./copy";
import { FPS, DURATION_FRAMES, WIDTH, HEIGHT } from "./theme";

// Same timeline and scenes; one composition per locale and aspect ratio.
const CUTS: { id: string; locale: Locale; vertical?: boolean }[] = [
  { id: "CrabMotion", locale: "en" },
  { id: "CrabMotionVertical", locale: "en", vertical: true },
  { id: "CrabMotionPT", locale: "pt" },
  { id: "CrabMotionPTVertical", locale: "pt", vertical: true },
  { id: "CrabMotionID", locale: "id" },
  { id: "CrabMotionIDVertical", locale: "id", vertical: true },
];

export const RemotionRoot: React.FC = () => (
  <>
    {CUTS.map(({ id, locale, vertical }) => (
      <Composition
        key={id}
        id={id}
        component={Promo}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={vertical ? HEIGHT : WIDTH}
        height={vertical ? WIDTH : HEIGHT}
        defaultProps={{ locale }}
      />
    ))}
  </>
);
