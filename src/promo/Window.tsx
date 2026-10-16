import React from "react";
import { K, TERM_FONT } from "../theme";

// macOS Terminal.app chrome (traffic lights, centred title), as in opencrabs-onboarding skins.tsx,
// holding a drawn OpenCrabs TUI. `fs` is the terminal font size; rows are fs * 1.3 tall.
export const Window: React.FC<{
  width: number;
  height?: number;
  fs?: number;
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ width, height, fs = 26, title = "opencrabs", children, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: 14,
      overflow: "hidden",
      background: K.bg,
      border: "1px solid #3d3d3d",
      boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,122,26,0.08)",
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    <div style={{ height: fs * 1.7, background: "#2d2d2d", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", fontFamily: TERM_FONT, fontSize: fs * 0.75, color: "#b8b8bc", flexShrink: 0 }}>
      <div style={{ position: "absolute", left: fs * 0.8, display: "flex", gap: fs * 0.4 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div key={c} style={{ width: fs * 0.6, height: fs * 0.6, borderRadius: fs, background: c }} />
        ))}
      </div>
      {title}
    </div>
    <div style={{ flex: 1, padding: `${fs * 0.8}px ${fs}px`, fontFamily: TERM_FONT, fontSize: fs, lineHeight: 1.3, color: K.text, whiteSpace: "pre" }}>
      {children}
    </div>
  </div>
);

export const Span: React.FC<{ c?: string; b?: boolean; children: React.ReactNode }> = ({ c = K.text, b, children }) => (
  <span style={{ color: c, fontWeight: b ? 700 : 400 }}>{children}</span>
);

/** Type `text` out from local frame `at`, `cps` characters per frame. */
export const typed = (text: string, lf: number, at: number, cps = 1) =>
  text.slice(0, Math.max(0, Math.floor((lf - at) * cps)));
