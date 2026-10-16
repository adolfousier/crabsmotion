import React from "react";
import { C, FONT } from "../theme";
import { ease } from "../beat";
import { Logo } from "./Logo";

// A Telegram-style chat with the crab: dark theme, header with the bot's avatar, bubbles that pop in.
export const ChatPanel: React.FC<{ width: number; height: number; fs: number; title?: string; sub?: string; children: React.ReactNode }> = ({ width, height, fs, title = "OpenCrabs", sub = "bot", children }) => (
  <div style={{ width, height, borderRadius: 28, overflow: "hidden", background: C.tgBg, border: "1px solid #22303f", boxShadow: "0 40px 120px rgba(0,0,0,0.6)", display: "flex", flexDirection: "column", fontFamily: FONT }}>
    <div style={{ height: fs * 3.2, background: "#17212B", display: "flex", alignItems: "center", gap: fs * 0.7, padding: `0 ${fs}px`, flexShrink: 0 }}>
      <div style={{ width: fs * 2.2, height: fs * 2.2, borderRadius: fs * 2, background: "#1f2a36", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <Logo width={fs * 1.9} />
      </div>
      <div>
        <div style={{ color: C.white, fontSize: fs * 1.05, fontWeight: 700 }}>{title}</div>
        <div style={{ color: "#6c8196", fontSize: fs * 0.8 }}>{sub}</div>
      </div>
    </div>
    <div style={{ flex: 1, padding: fs, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: fs * 0.6, overflow: "hidden" }}>
      {children}
    </div>
  </div>
);

/** A bubble that pops in at local frame `at`. `mine` = sent by the user (right, blue). */
export const Bubble: React.FC<{ lf: number; at: number; mine?: boolean; fs: number; children: React.ReactNode; pad?: number }> = ({ lf, at, mine, fs, children, pad }) => {
  if (lf < at) return null;
  const e = ease((lf - at) / 7);
  return (
    <div
      style={{
        alignSelf: mine ? "flex-end" : "flex-start",
        maxWidth: "82%",
        background: mine ? C.tgMine : C.tgBubble,
        color: C.white,
        fontSize: fs,
        lineHeight: 1.3,
        padding: pad ?? `${fs * 0.5}px ${fs * 0.75}px`,
        borderRadius: fs * 0.9,
        borderBottomRightRadius: mine ? fs * 0.25 : fs * 0.9,
        borderBottomLeftRadius: mine ? fs * 0.9 : fs * 0.25,
        opacity: e,
        transform: `translateY(${(1 - e) * fs}px) scale(${0.92 + e * 0.08})`,
        transformOrigin: mine ? "right bottom" : "left bottom",
      }}
    >
      {children}
    </div>
  );
};
