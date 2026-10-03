import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { shake } from "./theme";

/** global impact hits (frame numbers on the 1800-frame timeline) */
const HITS: { at: number; amp: number; decay: number; flash: number }[] = [
  { at: 146, amp: 16, decay: 5, flash: 0.5 }, // title slam + boom
  { at: 346, amp: 8, decay: 4, flash: 0.16 }, // whoosh into problem
  { at: 392, amp: 13, decay: 5, flash: 0.3 }, // crack / anvil
  { at: 546, amp: 7, decay: 3, flash: 0.13 }, // features start
  { at: 1446, amp: 7, decay: 3, flash: 0.13 }, // terminal start
  { at: 1644, amp: 18, decay: 6, flash: 0.55 }, // outro slam
  ...Array.from({ length: 10 }, (_, i) => ({
    at: 550 + i * 90,
    amp: 4,
    decay: 2.5,
    flash: 0.1, // per-card anvil tap
  })),
];

/** summed camera-shake offset for the current GLOBAL frame */
export const useShakeOffset = (): { x: number; y: number } => {
  const frame = useCurrentFrame();
  let x = 0;
  let y = 0;
  for (const h of HITS) {
    const o = shake(frame, h.at, h.amp, h.decay);
    x += o.x;
    y += o.y;
  }
  return { x, y };
};

/** red eye-glow vignette that flashes on every impact */
export const ImpactFlash: React.FC = () => {
  const frame = useCurrentFrame();
  let op = 0;
  for (const h of HITS) {
    if (frame >= h.at) {
      op = Math.max(op, h.flash * Math.exp(-(frame - h.at) / 3));
    }
  }
  if (op <= 0.002) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: op,
          background:
            "radial-gradient(ellipse at center, rgba(232,65,42,0.12) 30%, rgba(232,65,42,0.95) 100%)",
        }}
      />
      {HITS.filter((h) => h.flash >= 0.4).map((h) => {
        const t = frame - h.at;
        if (t < 0 || t > 5) return null;
        const k = 1 - t / 5;
        const d = 120 + t * t * 110;
        return (
          <div key={h.at} style={{ position: "absolute", inset: 0 }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: d,
                height: d,
                borderRadius: "50%",
                border: `${8 * k + 1}px solid rgba(232,65,42,${0.5 * k * k})`,
                transform: "translate(-50%,-50%)",
              }}
            />
            {h.amp >= 16 &&
              t <= 3 &&
              Array.from({ length: 16 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 160 + t * t * 60,
                    height: 3,
                    background: `rgba(235,203,139,${0.4 * k})`,
                    transform: `rotate(${i * 22.5}deg) translateX(90px)`,
                    transformOrigin: "0 0",
                  }}
                />
              ))}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/** hard light flick for the first frames after a hit, like a forge strobe */
export const useStrobe = (divisor = 3): number => {
  const frame = useCurrentFrame();
  const nearest = HITS.reduce(
    (best, h) =>
      frame >= h.at && frame - h.at < 9 && frame - h.at < best ? frame - h.at : best,
    99
  );
  if (nearest > 8) return 0;
  return nearest % divisor === 0 ? 0.35 : 0;
};
