import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT_MONO, RELEASE } from "../theme";
import { ease } from "../beat";
import { useLayout } from "./layout";

/** Small version watermark: every scene after the drop carries the release it belongs to. */
export const VersionBadge: React.FC<{ lf: number }> = ({ lf }) => {
  const { vertical } = useLayout();
  const o = ease((lf - 12) / 14);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: vertical ? 56 : 44,
          right: vertical ? 48 : 56,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: o * 0.9,
        }}
      >
        <div style={{ width: 9, height: 9, borderRadius: 9, background: C.orange, boxShadow: `0 0 10px ${C.orange}` }} />
        <span style={{ fontFamily: FONT_MONO, fontSize: vertical ? 24 : 22, letterSpacing: 2, color: C.dim }}>
          {RELEASE.version}
        </span>
      </div>
    </AbsoluteFill>
  );
};
