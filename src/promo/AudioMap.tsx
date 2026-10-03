import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

type Cue = { file: string; at: number; vol: number };

const CARD_POPS: Cue[] = Array.from({ length: 10 }, (_, i) => ({
  file: "pop.wav",
  at: 554 + i * 90,
  vol: 0.45,
}));

const TYPING: Cue[] = Array.from({ length: 10 }, (_, i) => ({
  file: "tick.wav",
  at: 1466 + i * 9,
  vol: 0.25,
}));

const CUES: Cue[] = [
  // music bed (62.0s, industrial forge)
  { file: "bed.wav", at: 0, vol: 0.22 },
  // act 1: underwater riser + bubbles (S1 0-150)
  { file: "riser.wav", at: 0, vol: 0.5 },
  { file: "blip.wav", at: 36, vol: 0.32 },
  { file: "blip.wav", at: 70, vol: 0.28 },
  { file: "blip.wav", at: 104, vol: 0.24 },
  // act 2: title landing (S2 150-350)
  { file: "boom.wav", at: 146, vol: 0.9 },
  { file: "shimmer.wav", at: 178, vol: 0.45 },
  // problem act (S3 350-550)
  { file: "whoosh.wav", at: 346, vol: 0.55 },
  { file: "crack.wav", at: 392, vol: 0.5 },
  { file: "whoosh.wav", at: 430, vol: 0.4 },
  // features (S4 550-1450): intro whoosh + 10 card pops
  { file: "whoosh.wav", at: 546, vol: 0.55 },
  ...CARD_POPS,
  // terminal (S5 1450-1630)
  { file: "whoosh.wav", at: 1446, vol: 0.55 },
  ...TYPING,
  { file: "blip.wav", at: 1580, vol: 0.4 },
  // outro (S6 1630-1800)
  { file: "riser.wav", at: 1596, vol: 0.3 },
  { file: "whoosh.wav", at: 1626, vol: 0.5 },
  { file: "boom.wav", at: 1644, vol: 0.95 },
  { file: "chime.wav", at: 1676, vol: 0.5 },
];

export const AudioTrack: React.FC = () => (
  <>
    {CUES.map((c, i) => (
      <Sequence key={i} from={c.at}>
        <Audio src={staticFile(`promo/sfx/${c.file}`)} volume={c.vol} />
      </Sequence>
    ))}
  </>
);
