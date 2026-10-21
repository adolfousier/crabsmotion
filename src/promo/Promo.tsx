import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { C, T } from "../theme";
import { Background } from "../components/Background";
import { Drop } from "./scenes/Drop";
import { Hook } from "./scenes/Hook";
import { Setup } from "./scenes/Setup";
import { FreeAI } from "./scenes/FreeAI";
import { Errand } from "./scenes/Errand";
import { Plan } from "./scenes/Plan";
import { WhatsNew } from "./scenes/WhatsNew";
import { Cowork } from "./scenes/Cowork";
import { Everywhere } from "./scenes/Everywhere";
import { Numbers } from "./scenes/Numbers";
import { Outro } from "./scenes/Outro";
import { VersionBadge } from "./VersionBadge";

// Scene order on the shared 120 BPM grid; each runs until the next one starts.
const SCENES: [number, React.FC<{ frame: number; start: number }>][] = [
  [T.drop, Drop],
  [T.hook, Hook],
  [T.setup, Setup],
  [T.free, FreeAI],
  [T.errand, Errand],
  [T.plan, Plan],
  [T.whatsnew, WhatsNew],
  [T.cowork, Cowork],
  [T.everywhere, Everywhere],
  [T.numbers, Numbers],
  [T.outro, Outro],
];

/** v0.5.12 release promo: same timeline for the 16:9 and 9:16 cuts. */
export const Promo: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio src={staticFile("score.wav")} />
      <Background frame={frame} accent={C.orange} />
      {SCENES.map(([from, Scene], i) => {
        const to = SCENES[i + 1]?.[0] ?? T.end;
        return (
          <Sequence key={from} from={from} durationInFrames={to - from}>
            <Scene frame={frame} start={from} />
          </Sequence>
        );
      })}
      <Sequence from={T.hook} durationInFrames={T.end - T.hook}>
        <VersionBadge lf={frame - T.hook} />
      </Sequence>
    </AbsoluteFill>
  );
};
