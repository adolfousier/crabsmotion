import React from "react";
import { AbsoluteFill } from "remotion";
import { C, TERM_FONT } from "../../theme";
import { ease } from "../../beat";
import { useLayout } from "../layout";
import { Headline } from "../Headline";
import { ChatPanel, Bubble } from "../Chat";

// The real run (Telegram, 2026-10-08/09): the crab ordered a 13kg butane on gazmondego.com.
// Only shop, product, price and the shop's reply are shown. No address, phone or name.
const STEPS: { at: number; text: string }[] = [
  { at: 30, text: "opening gazmondego.com" },
  { at: 50, text: "filling the order form" },
];

const Step: React.FC<{ lf: number; at: number; done: boolean; fs: number; text: string }> = ({ lf, at, done, fs, text }) => {
  if (lf < at) return null;
  const e = ease((lf - at) / 6);
  return (
    <div style={{ opacity: e, fontFamily: TERM_FONT, fontSize: fs * 0.85, color: done ? "#8fd18f" : "#9fb3c8" }}>
      {done ? "✓ " : "◌ "}{text}
    </div>
  );
};

// Drawn photo of the delivered bottle at the door.
const Delivered: React.FC<{ w: number }> = ({ w }) => (
  <svg width={w} height={w * 0.62} viewBox="0 0 300 186" style={{ display: "block", borderRadius: 14 }}>
    <rect width="300" height="186" fill="#3b3430" />
    <rect x="0" y="140" width="300" height="46" fill="#5b4e45" />
    <rect x="190" y="20" width="80" height="130" fill="#6e4a32" stroke="#2a1a10" strokeWidth="4" />
    <rect x="105" y="62" width="70" height="96" rx="26" fill="#ff7a1a" />
    <rect x="125" y="44" width="30" height="22" rx="4" fill="#9a9a9a" />
    <rect x="112" y="96" width="56" height="8" fill="#c85a10" />
  </svg>
);

/** Bars 8-11: a real errand, done end to end in the browser. */
export const Errand: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const fs = vertical ? 34 : 30;
  const sent = lf >= 128;

  const chat = (
    <ChatPanel width={vertical ? 940 : 780} height={vertical ? 1180 : 940} fs={fs}>
      <Bubble lf={lf} at={6} mine fs={fs}>order me a 13kg butane from gazmondego, morning delivery</Bubble>
      <Bubble lf={lf} at={28} fs={fs}>
        {STEPS.map((s, i) => (
          <Step key={s.text} lf={lf} at={s.at} done={lf >= (STEPS[i + 1]?.at ?? 74)} fs={fs} text={s.text} />
        ))}
        {lf >= 74 && (
          <div style={{ marginTop: fs * 0.5, padding: `${fs * 0.4}px ${fs * 0.6}px`, borderLeft: `4px solid ${C.orange}`, background: "rgba(255,122,26,0.08)", borderRadius: 6, fontWeight: 700, opacity: ease((lf - 74) / 6) }}>
            Butane 13kg x1 · €39.90
          </div>
        )}
        {lf >= 100 && (
          <div style={{ marginTop: fs * 0.5, color: "#9fb3c8", fontStyle: "italic", opacity: ease((lf - 100) / 6) }}>
            “Obrigado pela sua mensagem.”
          </div>
        )}
        {sent && (
          <div style={{ marginTop: fs * 0.5, color: "#50c878", fontWeight: 700, fontSize: fs * 1.1, transform: `scale(${1 + Math.max(0, 1 - (lf - 128) / 8) * 0.15})`, transformOrigin: "left center" }}>
            ORDER SENT ✓
          </div>
        )}
      </Bubble>
      <Bubble lf={lf} at={168} fs={fs} pad={6}>
        <Delivered w={vertical ? 520 : 420} />
        <div style={{ padding: `${fs * 0.3}px ${fs * 0.4}px 0` }}>delivered.</div>
      </Bubble>
    </ChatPanel>
  );
  const head = (
    <Headline frame={frame} lf={lf} lines={["IT RUNS YOUR", "ERRANDS.", "*FOR REAL.*"]} ats={[150, 165, 195]} size={vertical ? 110 : 112} align={vertical ? "center" : "left"} />
  );
  return vertical ? (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 70 }}>{chat}{head}</AbsoluteFill>
  ) : (
    <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 110 }}>{chat}<div style={{ width: 820 }}>{head}</div></AbsoluteFill>
  );
};
