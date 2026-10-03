import { interpolate, spring } from "remotion";

export const COL = {
  abyss: "#080503",
  deep: "#171009",
  water: "#241a0e",
  ink: "#100b06",
  navy: "#140e08",
  panel: "#1a120a",
  orange: "#e0a458",
  coral: "#cba97a",
  gold: "#ebcb8b",
  text: "#f5ebd8",
  dim: "#9a8a72",
  green: "#7fbf8e",
  red: "#e8412a",
  eye: "#ff6b4a",
  ember: "#ff8a3d",
  bronze: "#9a7b52",
  bronzeHi: "#d8b98a",
  bronzeDk: "#5c4530",
  engrave: "#2e2114",
  iron: "#16100a",
  rivet: "#3a2a18",
  steel: "#7e7468",
  blade: "#c2b8a6",
  muted: "#b6a894",
};

export const FONT = "'DejaVu Sans', 'Verdana', 'Segoe UI', system-ui, sans-serif";
export const MONO = "'DejaVu Sans Mono', 'Courier New', monospace";

/** five-stop bronze ramp used for the wordmark fill */
export const METAL =
  "linear-gradient(100deg, #8a6a44 0%, #ebcb8b 22%, #d8b98a 38%, #9a7b52 58%, #f2dcae 76%, #b08850 100%)";

/** copper eye-glow used on accents, rims and drop shadows */
export const GLOW_EYE = "rgba(232,65,42,0.55)";
export const GLOW_COPPER = "rgba(224,164,88,0.5)";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** springy 0->1 entrance; returns 0 before `delay` */
export const pop = (
  frame: number,
  fps: number,
  delay: number,
  damping = 13
): number => {
  if (frame < delay) return 0;
  return spring({
    frame: frame - delay,
    fps,
    config: { damping, stiffness: 130, mass: 0.9 },
  });
};

export const fadeIn = (
  frame: number,
  start: number,
  len: number
): number => interpolate(frame, [start, start + len], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

export const fadeOut = (
  frame: number,
  start: number,
  len: number
): number => interpolate(frame, [start, start + len], [1, 0], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

/** tiny decaying screen shake, centered at `at` */
export const shake = (
  frame: number,
  at: number,
  amp: number,
  decay: number
): { x: number; y: number } => {
  if (frame < at) return { x: 0, y: 0 };
  const t = frame - at;
  const k = amp * Math.exp(-t / decay);
  return { x: Math.sin(t * 2.7) * k, y: Math.cos(t * 2.1) * k * 0.6 };
};

/** twinkle helper for star particles */
export const twinkle = (frame: number, i: number): number =>
  clamp01(0.5 + 0.5 * Math.sin(frame / 4 + i * 2.4));

/** red eye-glow breathing pulse, 0.6 -> 1 */
export const eyePulse = (frame: number, speed = 7): number =>
  0.6 + 0.4 * (0.5 + 0.5 * Math.sin(frame / speed));

/**
 * position (%) of a specular band sweeping across a container.
 * travels -40 -> 140 between `start` and `start + dur`, hidden outside.
 */
export const shineX = (
  frame: number,
  start: number,
  dur: number
): number => {
  if (frame < start || frame > start + dur) return -999;
  const t = clamp01((frame - start) / dur);
  return -40 + t * 180;
};

/**
 * deterministic rising ember particle for frame `f`.
 * `i` seeds position/phase; returns null when the ember is off-life.
 */
export const emberState = (
  f: number,
  i: number,
  delay: number,
  life: number
): { x: number; y: number; op: number; r: number; hue: string } | null => {
  const t = (f - delay) / life;
  if (t < 0 || t > 1) return null;
  const baseX = 40 + ((i * 211) % 1200);
  const sway = Math.sin(f / (7 + (i % 5)) + i * 1.7) * (8 + (i % 3) * 6);
  const y = 780 - t * (760 + (i % 4) * 40);
  const op = Math.sin(t * Math.PI) * (0.5 + 0.5 * Math.sin(f / 3 + i));
  const r = 2 + (i % 3);
  const hue = i % 4 === 0 ? COL.eye : i % 3 === 0 ? COL.ember : COL.gold;
  return { x: baseX + sway, y, op: clamp01(op) * 0.8, r, hue };
};
