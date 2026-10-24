import { loadFont as loadGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/SpaceMono";
// Space Grotesk and Space Mono ship no Cyrillic, so Russian falls back glyph by
// glyph to Golos Text and JetBrains Mono. Latin still renders in the brand faces.
import { loadFont as loadCyrDisplay } from "@remotion/google-fonts/GolosText";
import { loadFont as loadCyrMono } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: grotesk } = loadGrotesk("normal", {
  weights: ["400", "500", "600", "700"],
});
const { fontFamily: mono } = loadMono("normal", { weights: ["400", "700"] });
const { fontFamily: cyrDisplay } = loadCyrDisplay("normal", {
  weights: ["400", "700"],
});
const { fontFamily: cyrMono } = loadCyrMono("normal", { weights: ["400", "700"] });

export const FONT = `${grotesk}, ${cyrDisplay}, sans-serif`;
export const FONT_MONO = `${mono}, ${cyrMono}, monospace`;

// ---- palette: minimalist tech, monochrome + crab-coral accent ----
export const C = {
  bg: "#08080B",
  bg2: "#0D0D14",
  panel: "#12121B",
  white: "#FFFFFF",
  dim: "#8A8A96",
  faint: "#3A3A46",
  coral: "#FF5A3C",
  cyan: "#38E1FF",
  amber: "#FFB43C",
  violet: "#A78BFF",
  green: "#5CFF9B",
  // brand: orange is the OpenCrabs accent across the promo
  orange: "#FF7A1A",
  orangeDeep: "#D76414",
  text: "#E8EDF5",
  tg: "#2AABEE",
  tgBubble: "#182533",
  tgMine: "#2B5278",
  tgBg: "#0E1621",
};

// Drawn TUI colours, default theme from opencrabs src/tui/render/palette.rs
// (same values as opencrabs-onboarding/src/engine/term.tsx).
export const K = {
  bg: "#0C0C0F",
  orange: "#D76414",
  text: "#DCDCDC",
  gray: "#787878",
  dim: "#505050",
  teal: "#3CBCBC",
  green: "#50C878",
  panel: "#1E1E2D",
};
export const TERM_FONT = '"SF Mono", Menlo, Monaco, monospace';

// ---- timing: single 120 BPM grid shared with the audio score ----
export const FPS = 30;
export const BPM = 120;
export const BEAT_FRAMES = 15; // 0.5s
export const BAR_FRAMES = 60; // 2.0s
export const DURATION_FRAMES = 1680; // 56s, 28 bars
export const WIDTH = 1920;
export const HEIGHT = 1080;

// The release this promo ships with. Every on-screen number comes from here.
export const RELEASE = {
  version: "v0.5.13",
  features: 2,
  fixes: 52,
  commits: 61,
  tests: 11333,
  contributors: 5,
};

// Promo timeline in global frames. Every scene starts on a bar downbeat.
const bar = (n: number) => (n - 1) * BAR_FRAMES;
export const T = {
  drop: bar(1), // the version itself: v0.5.13 JUST DROPPED
  hook: bar(3), // how to get it
  setup: bar(5),
  free: bar(7),
  errand: bar(10),
  plan: bar(14),
  whatsnew: bar(17), // the 8 features of this release
  cowork: bar(20),
  everywhere: bar(22),
  numbers: bar(23),
  outro: bar(25), // score crash lands here
  end: bar(29),
};

export type Capability = { word: string; sub: string; accent: string };

export const CAPABILITIES: Capability[] = [
  { word: "WRITES CODE", sub: "prompt → pull request", accent: C.coral },
  { word: "SHIPS FEATURES", sub: "atomic commits · clean history", accent: C.cyan },
  { word: "RUNS INFRA", sub: "servers · cron · deploys", accent: C.amber },
  { word: "BROWSES THE WEB", sub: "headless chrome · deep research · scraping", accent: C.violet },
  { word: "VOICE", sub: "hear · speak · offline STT/TTS", accent: C.green },
  { word: "5 CHANNELS", sub: "telegram · discord · slack · whatsapp · trello", accent: C.coral },
  { word: "GENERATES MEDIA", sub: "images · documents · video analysis", accent: C.cyan },
  { word: "MULTI-AGENT", sub: "spawn a team · delegate", accent: C.amber },
  { word: "SELF-IMPROVING", sub: "learns from every session", accent: C.green },
];

export type Stat = { to: number; suffix: string; label: string; accent: string };

export const STATS: Stat[] = [
  { to: 500, suffix: "+", label: "MODELS ROUTED", accent: C.coral },
  { to: 75, suffix: "+", label: "BUILT-IN TOOLS", accent: C.cyan },
  { to: 16, suffix: "", label: "SKILLS", accent: C.violet },
  { to: 24, suffix: "/7", label: "ALWAYS ON", accent: C.amber },
  { to: 100, suffix: "%", label: "SELF-IMPROVING", accent: C.green },
];
