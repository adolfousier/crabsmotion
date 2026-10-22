import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT, FONT_MONO, K, RELEASE, TERM_FONT } from "../../theme";
import { ease } from "../../beat";
import { useLayout } from "../layout";
import { useCopy } from "../LocaleContext";
import { resolveLabel } from "../../copy";

// The 8 features of this release, one per beat. Wording follows the release notes.

const AT = 10; // first row
const EVERY = 15; // one beat apart

/** Bars 17-19: WHAT'S NEW, the release's own feature list. This is the release drop. */
export const WhatsNew: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const { copy } = useCopy();
  const features = copy.whatsnew.features;
  const fs = vertical ? 30 : 38;
  const width = vertical ? 980 : 1080;
  const headIn = ease(lf / 8);
  const landed = features.filter((_, i) => lf >= AT + i * EVERY).length;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width,
          background: "rgba(18,18,27,0.92)",
          border: `1px solid rgba(255,122,26,0.55)`,
          borderRadius: 18,
          padding: `${fs * 1.3}px ${fs * 1.5}px`,
          boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,122,26,0.08)",
          opacity: headIn,
          transform: `translateY(${(1 - headIn) * 26}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", fontFamily: FONT_MONO }}>
          <span style={{ color: C.orange, fontWeight: 700, fontSize: fs * 1.02, letterSpacing: 2 }}>
            {copy.whatsnew.title(RELEASE.version)}
          </span>
          <span style={{ color: C.dim, fontSize: fs * 0.8, letterSpacing: 2 }}>
            <span style={{ color: C.white, fontWeight: 700 }}>{RELEASE.features}</span>{" "}
            {resolveLabel(copy.whatsnew.label, RELEASE.features)}
          </span>
        </div>

        {/* 8 segments, one lights per landed feature */}
        <div style={{ display: "flex", gap: 6, marginTop: fs * 0.7, marginBottom: fs * 0.9 }}>
          {features.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 4,
                background: i < landed ? C.orange : "#2a2a36",
                opacity: i < landed ? 1 : 0.7,
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: fs * 0.72 }}>
          {features.map((f, i) => {
            const t = lf - (AT + i * EVERY);
            const e = ease(t / 7);
            const hit = t >= 0 && t < 7 ? 1 - t / 7 : 0;
            return (
              <div
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: fs * 0.85,
                  opacity: e,
                  transform: `translateX(${(1 - e) * -26}px)`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: fs * 0.72,
                    color: t >= 0 ? C.orange : K.dim,
                    width: fs * 1.5,
                    letterSpacing: 1,
                    transform: `scale(${1 + hit * 0.14})`,
                    transformOrigin: "left center",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: FONT,
                    fontWeight: 500,
                    fontSize: fs,
                    color: C.text,
                    whiteSpace: "nowrap",
                    letterSpacing: -0.2,
                  }}
                >
                  {f}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: fs * 0.9, fontFamily: TERM_FONT, fontSize: fs * 0.66, color: C.dim, letterSpacing: 1 }}>
          {copy.whatsnew.footer(RELEASE.fixes, RELEASE.commits, RELEASE.tests)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
