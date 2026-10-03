import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { COL, fadeOut, pop, shake } from "../theme";

const CARDS = [
  {
    kicker: "REACH IT ANYWHERE",
    head: "One inbox for every chat",
    body: "Telegram, WhatsApp, Discord, Slack. Same brain on all of them.",
    accent: COL.orange,
    icon: "chat",
  },
  {
    kicker: "IT DOES REAL THINGS",
    head: "Hands on the web",
    body: "Books, fills forms, hunts data. Not just answers.",
    accent: COL.gold,
    icon: "cursor",
  },
  {
    kicker: "WORKS WHILE YOU SLEEP",
    head: "Set it, forget it",
    body: "Timed jobs that run on their own, then report back.",
    accent: COL.green,
    icon: "clock",
  },
  {
    kicker: "NEVER FORGETS",
    head: "Remembers your project",
    body: "No re-explaining your work every morning.",
    accent: COL.coral,
    icon: "net",
  },
  {
    kicker: "HIRES ITS OWN HELP",
    head: "One command, a team",
    body: "It spins up helper agents to finish the job.",
    accent: COL.orange,
    icon: "link",
  },
  {
    kicker: "TALK TO IT",
    head: "Speaks and listens",
    body: "Send a voice note, get a spoken answer back.",
    accent: COL.gold,
    icon: "wave",
  },
  {
    kicker: "REAL FILES, NOT TEXT",
    head: "Reports that arrive finished",
    body: "Excel, Word, PDF, slides, made on demand.",
    accent: COL.green,
    icon: "doc",
  },
  {
    kicker: "SEND A PHOTO",
    head: "It sees what you mean",
    body: "Screenshots, scans, diagrams, understood.",
    accent: COL.coral,
    icon: "eye",
  },
  {
    kicker: "SHIPS YOUR CODE",
    head: "Writes it, ships it",
    body: "Opens the pull request, watches the build go green.",
    accent: COL.orange,
    icon: "branch",
  },
  {
    kicker: "GETS BETTER ALONE",
    head: "Smarter every week",
    body: "Learns new skills and sharpens itself.",
    accent: COL.gold,
    icon: "evolve",
  },
];

const Icon: React.FC<{ kind: string; frame: number }> = ({ kind, frame }) => {
  if (kind === "chat") {
    return (
      <svg width={130} height={130} viewBox="0 0 130 130">
        <rect x={12} y={18} width={106} height={74} rx={18} fill={COL.orange} />
        <path d="M40 92 L34 118 L64 92 Z" fill={COL.orange} />
        <circle cx={43} cy={55} r={6} fill={COL.navy} />
        <circle cx={65} cy={55} r={6} fill={COL.navy} />
        <circle cx={87} cy={55} r={6} fill={COL.navy} />
      </svg>
    );
  }
  if (kind === "cursor") {
    return (
      <svg width={130} height={130} viewBox="0 0 130 130">
        <path
          d="M30 14 L102 66 L66 72 L82 106 L66 113 L50 79 L30 100 Z"
          fill={COL.gold}
          stroke="#c98f2e"
          strokeWidth={3}
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (kind === "clock") {
    const a = (frame * 9) % 360;
    return (
      <svg width={130} height={130} viewBox="0 0 130 130">
        <circle cx={65} cy={65} r={52} fill="none" stroke={COL.green} strokeWidth={7} />
        <line x1={65} y1={65} x2={65} y2={30} stroke={COL.green} strokeWidth={6} strokeLinecap="round" transform={`rotate(${a} 65 65)`} />
        <line x1={65} y1={65} x2={88} y2={78} stroke={COL.text} strokeWidth={5} strokeLinecap="round" transform={`rotate(${a / 6} 65 65)`} />
        <circle cx={65} cy={65} r={5} fill={COL.green} />
      </svg>
    );
  }
  if (kind === "link") {
    return (
      <svg width={130} height={130} viewBox="0 0 130 130">
        <circle cx={32} cy={38} r={16} fill="none" stroke={COL.coral} strokeWidth={7} />
        <circle cx={98} cy={92} r={16} fill="none" stroke={COL.coral} strokeWidth={7} />
        <line x1={44} y1={50} x2={86} y2={80} stroke={COL.coral} strokeWidth={7} strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "wave") {
    return (
      <svg width={130} height={130} viewBox="0 0 130 130">
        {Array.from({ length: 9 }, (_, i) => {
          const h = 22 + 52 * Math.abs(Math.sin(frame / 7 + i * 0.9));
          return (
            <rect
              key={i}
              x={9 + i * 14}
              y={65 - h / 2}
              width={8}
              height={h}
              rx={4}
              fill={COL.gold}
              opacity={0.72 + 0.28 * Math.abs(Math.sin(frame / 5 + i))}
            />
          );
        })}
      </svg>
    );
  }
  if (kind === "doc") {
    return (
      <svg width={130} height={130} viewBox="0 0 130 130">
        <path d="M30 14 H82 L102 34 V116 H30 Z" fill={COL.panel} stroke={COL.green} strokeWidth={5} strokeLinejoin="round" />
        <path d="M82 14 V34 H102" fill="none" stroke={COL.green} strokeWidth={5} />
        {[58, 76, 94].map((y) => (
          <line key={y} x1={44} y1={y} x2={88} y2={y} stroke={COL.green} strokeWidth={5} strokeLinecap="round" opacity={0.85} />
        ))}
      </svg>
    );
  }
  if (kind === "eye") {
    const lid = frame % 150 < 7 ? 1 : 0;
    return (
      <svg width={130} height={130} viewBox="0 0 130 130">
        <path d="M12 65 Q65 15 118 65 Q65 115 12 65 Z" fill="#171009" stroke={COL.orange} strokeWidth={6} strokeLinejoin="round" />
        <circle cx={65} cy={65} r={20} fill={COL.orange} />
        <circle cx={65} cy={65} r={9} fill={COL.navy} />
        <circle cx={72} cy={58} r={4} fill={COL.text} opacity={1 - lid} />
        <path d="M12 65 Q65 15 118 65" fill="#171009" stroke={COL.orange} strokeWidth={6} opacity={lid} />
      </svg>
    );
  }
  if (kind === "branch") {
    return (
      <svg width={130} height={130} viewBox="0 0 130 130">
        <circle cx={40} cy={26} r={11} fill={COL.gold} />
        <circle cx={40} cy={104} r={11} fill={COL.gold} />
        <circle cx={94} cy={52} r={11} fill={COL.orange} />
        <line x1={40} y1={37} x2={40} y2={93} stroke={COL.gold} strokeWidth={6} />
        <path d="M40 64 Q40 52 83 52" fill="none" stroke={COL.orange} strokeWidth={6} />
      </svg>
    );
  }
  if (kind === "evolve") {
    return (
      <svg width={130} height={130} viewBox="0 0 130 130">
        <path d="M100 52 A38 38 0 1 0 104 82" fill="none" stroke={COL.green} strokeWidth={7} strokeLinecap="round" />
        <path d="M84 30 L106 48 L78 54 Z" fill={COL.green} />
        <path d="M52 84 L66 58 L80 84 L66 74 Z" fill={COL.text} />
      </svg>
    );
  }
  const nodes = [
    [65, 26],
    [22, 62],
    [108, 62],
    [40, 108],
    [92, 108],
  ];
  return (
    <svg width={130} height={130} viewBox="0 0 130 130">
      {nodes.map((n, i) => (
        <line key={i} x1={65} y1={72} x2={n[0]} y2={n[1]} stroke={COL.coral} strokeWidth={3} opacity={0.35 + 0.4 * Math.abs(Math.sin(frame / 6 + i))} />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n[0]} cy={n[1]} r={9} fill={COL.coral} opacity={0.6 + 0.4 * Math.abs(Math.sin(frame / 5 + i * 1.3))} />
      ))}
      <circle cx={65} cy={72} r={14} fill={COL.text} />
    </svg>
  );
};

const Card: React.FC<{ idx: number }> = ({ idx }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = CARDS[idx];
  const s = pop(frame, fps, 3);
  const exit = fadeOut(frame, 76, 12);
  const slide = interpolate(s, [0, 1], [80, 0]);
  const slam = shake(frame, 5, 9, 2.2);
  const age = Math.max(0, frame - 5);
  const slamScale = interpolate(frame, [0, 6], [2.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  }) + 0.1 * Math.exp(-age / 4) * Math.abs(Math.cos(age * 0.9));
  const flash = frame >= 5 ? Math.exp(-(frame - 5) / 3.2) : 0;
  const iconScale = 0.5 + 0.5 * pop(frame, fps, 8, 8);
  return (
    <AbsoluteFill style={{ opacity: exit }}>
      {flash > 0.02 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 70% 55% at 38% 52%, rgba(255,236,200,${0.34 * flash}) 0%, rgba(255,138,61,${0.16 * flash}) 45%, transparent 70%)`,
          }}
        />
      )}
      <div style={{ position: "absolute", top: 150, right: 120, fontFamily: "inherit", fontSize: 26, letterSpacing: 3, color: COL.blade }}>
        {String(idx + 1).padStart(2, "0")}/10
      </div>
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 120,
          transform: `translate(${slam.x}px, ${slam.y}px) translateY(${slide}px) scale(${slamScale})`,
          opacity: Math.min(1, s * 1.4),
        }}
      >
        <div style={{ width: 66, height: 4, background: c.accent, borderRadius: 2, marginBottom: 26, transform: `scaleX(${s})` }} />
        <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
          <div style={{ transform: `scale(${iconScale})`, width: 130 }}>
            <Icon kind={c.icon} frame={frame} />
          </div>
          <div style={{ maxWidth: 780 }}>
            <div style={{ fontSize: 24, letterSpacing: 6, color: c.accent, marginBottom: 14 }}>
              {c.kicker}
            </div>
            <div style={{ fontSize: 62, fontWeight: 800, color: COL.text, lineHeight: 1.05, marginBottom: 18 }}>
              {c.head}
            </div>
            <div style={{ fontSize: 29, color: COL.muted, lineHeight: 1.35 }}>{c.body}</div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 80, width: "100%", display: "flex", justifyContent: "center", gap: 9 }}>
        {CARDS.map((_, i) => (
          <div key={i} style={{ width: i === idx ? 30 : 10, height: 8, borderRadius: 4, background: i === idx ? c.accent : "rgba(126,116,104,0.5)", transition: "none" }} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const S4Features: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COL.iron }}>
    {Array.from({ length: 10 }, (_, i) => (
      <Sequence key={i} from={i * 90} durationInFrames={92} layout="none">
        <Card idx={i} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
