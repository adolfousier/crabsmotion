import React from "react";
import { AbsoluteFill } from "remotion";
import { C, K } from "../../theme";
import { ease } from "../../beat";
import { useLayout } from "../layout";
import { useCopy } from "../LocaleContext";
import { Headline } from "../Headline";
import { Window, Span, typed } from "../Window";
import { Cursor } from "../../components/Cursor";

// ASCII banner the real TUI draws (opencrabs-onboarding engine/Wizard.tsx).
const BANNER = [
  "   ___                    ___           _",
  "  / _ \\ _ __  ___ _ _    / __|_ _ __ _| |__  ___",
  " | (_) | '_ \\/ -_) ' \\  | (__| '_/ _` | '_ \\(_-<",
  "  \\___/| .__/\\___|_||_|  \\___|_| \\__,_|_.__//__/",
  "       |_|",
];
/** Bars 3-4: first launch, the crab is already talking. No account, no keys. */
export const Setup: React.FC<{ frame: number; start: number }> = ({ frame, start }) => {
  const lf = frame - start;
  const { vertical } = useLayout();
  const { copy } = useCopy();
  const inP = ease(lf / 8);
  const name = typed("Adolfo", lf, 52, 0.5);

  const win = (
    <div style={{ opacity: inP, transform: `translateY(${(1 - inP) * 40}px)` }}>
      <Window width={vertical ? 1000 : 1060} fs={vertical ? 26 : 30}>
        {BANNER.map((l) => (
          <div key={l}><Span c={K.orange} b>{l}</Span></div>
        ))}
        <div>{" "}</div>
        <div><Span c={K.orange} b>{"🦀 "}</Span><Span>{typed(copy.setup.ask, lf, 8, 1.6)}</Span></div>
        <div>{" "}</div>
        <div style={{ border: `1px solid ${lf >= 44 ? K.orange : K.dim}`, borderRadius: 6, padding: "6px 14px" }}>
          <Span c={K.gray}>{"> "}</Span><Span b>{name}</Span>
          {lf >= 44 && <Cursor frame={frame} color={C.orange} height={24} />}
        </div>
      </Window>
    </div>
  );
  const head = (
    <Headline frame={frame} lf={lf} lines={copy.setup.headline} ats={[66, 81, 96]} size={vertical ? 120 : 96} align={vertical ? "center" : "left"} maxWidth={vertical ? 1044 : 690} />
  );

  return vertical ? (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 110 }}>{win}{head}</AbsoluteFill>
  ) : (
    <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 80 }}>{win}<div style={{ width: 600 }}>{head}</div></AbsoluteFill>
  );
};
