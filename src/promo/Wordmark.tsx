import React from "react";

/**
 * "OpenCrabs" wordmark as SVG text with a metal gradient fill.
 * SVG was chosen over background-clip:text because headless Chromium has a
 * known rendering bug when `filter: drop-shadow` is combined with
 * `background-clip: text`: the glow leaks as a hard-edged rectangular band
 * behind the glyphs. SVG text gradient fill + drop-shadow on the <svg>
 * element rasterizes against the glyph alpha only, so it can never show a box.
 */
const FONT_STACK = "'DejaVu Sans', 'Verdana', 'Segoe UI', system-ui, sans-serif";

export const Wordmark: React.FC<{
  size: number;
  /** 0..1 position of the specular band across the wordmark */
  sweep: number;
  /** 0..1 glow intensity pulse */
  glow: number;
}> = ({ size, sweep, glow }) => {
  const w = Math.round(size * 6.8);
  const h = Math.round(size * 1.6);
  const id = `wm${size}`;
  const px = (-0.3 + sweep * 1.5) * w;

  const common = {
    x: w / 2,
    y: h / 2,
    textAnchor: "middle" as const,
    dominantBaseline: "central" as const,
    fontFamily: FONT_STACK,
    fontSize: size,
    fontWeight: 800,
    letterSpacing: size * 0.028,
  };

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{
        display: "block",
        filter: `drop-shadow(0 0 ${14 + 10 * glow}px rgba(224,164,88,0.5)) drop-shadow(0 0 ${40 + 16 * glow}px rgba(255,138,61,${0.16 + 0.12 * glow})) drop-shadow(0 3px 4px rgba(0,0,0,0.7))`,
      }}
    >
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="0.25">
          <stop offset="0%" stopColor="#a9855c" />
          <stop offset="22%" stopColor="#ebcb8b" />
          <stop offset="38%" stopColor="#d8b98a" />
          <stop offset="58%" stopColor="#b89060" />
          <stop offset="76%" stopColor="#f2dcae" />
          <stop offset="100%" stopColor="#c89a5e" />
        </linearGradient>
        <linearGradient
          id={`${id}-band`}
          gradientUnits="userSpaceOnUse"
          x1={px - size}
          y1={0}
          x2={px + size}
          y2={h * 0.4}
        >
          <stop offset="0%" stopColor="rgba(255,246,220,0)" />
          <stop offset="50%" stopColor="rgba(255,248,228,0.9)" />
          <stop offset="100%" stopColor="rgba(255,246,220,0)" />
        </linearGradient>
      </defs>
      <text {...common} fill={`url(#${id}-metal)`}>
        OpenCrabs
      </text>
      <text {...common} fill={`url(#${id}-band)`}>
        OpenCrabs
      </text>
    </svg>
  );
};
