// Advance widths for the two fonts the promo uses, in em units, read straight
// out of the shipped font files (Space Grotesk 700 instanced at wght=700,
// Space Mono 700). Headline copy is set with `whiteSpace: nowrap`, so a longer
// translation overflows silently: these numbers let a scene shrink a line to
// the box it actually has instead of guessing from the character count.

const GROTESK_700: Record<string, number> = {
  " ": 0.254, "!": 0.298, '"': 0.514, "#": 0.636, "%": 0.758, "&": 0.591, "'": 0.294,
  "(": 0.398, ")": 0.39, "*": 0.54, "+": 0.62, ",": 0.294, "-": 0.432, ".": 0.298, "/": 0.388,
  "0": 0.648, "1": 0.452, "2": 0.594, "3": 0.608, "4": 0.636, "5": 0.6, "6": 0.618, "7": 0.554,
  "8": 0.6, "9": 0.618, ":": 0.298, ";": 0.298, "?": 0.578,
  A: 0.634, B: 0.664, C: 0.644, D: 0.666, E: 0.554, F: 0.534, G: 0.662, H: 0.656, I: 0.264,
  J: 0.61, K: 0.626, L: 0.542, M: 0.882, N: 0.67, O: 0.676, P: 0.604, Q: 0.676, R: 0.632,
  S: 0.606, T: 0.588, U: 0.672, V: 0.618, W: 0.898, X: 0.644, Y: 0.624, Z: 0.576,
  a: 0.578, b: 0.638, c: 0.586, d: 0.638, e: 0.577, f: 0.436, g: 0.638, h: 0.616, i: 0.266,
  j: 0.268, k: 0.564, l: 0.266, m: 0.854, n: 0.616, o: 0.612, p: 0.638, q: 0.638, r: 0.396,
  s: 0.524, t: 0.456, u: 0.616, v: 0.548, w: 0.784, x: 0.592, y: 0.616, z: 0.518,
  "«": 0.72, "»": 0.72, "²": 0.364, "·": 0.218, "…": 0.798, "€": 0.678,
  "À": 0.634, "Á": 0.634, "Â": 0.634, "Ã": 0.634, "Ç": 0.644, "É": 0.554, "Ê": 0.554,
  "Í": 0.264, "Ó": 0.676, "Ô": 0.676, "Õ": 0.676, "Ú": 0.672, "Ü": 0.672,
  "à": 0.578, "á": 0.578, "â": 0.578, "ã": 0.578, "ç": 0.586, "é": 0.577, "ê": 0.577,
  "í": 0.266, "ó": 0.612, "ô": 0.612, "õ": 0.612, "ú": 0.616, "ü": 0.616,
  "‘": 0.294, "’": 0.294, "“": 0.514, "”": 0.514,
};

/** Space Mono is monospaced, so every glyph advances the same 0.612em. */
export const MONO_ADVANCE = 0.612;

/** Width of a single nowrap line in px, including CSS letter-spacing. */
export const measureLine = (text: string, size: number, letterSpacing: number) => {
  const glyphs = [...text];
  const body = glyphs.reduce((w, ch) => w + (GROTESK_700[ch] ?? 0.62) * size, 0);
  return body + letterSpacing * glyphs.length;
};

/** Width of a monospaced run in px. */
export const measureMono = (text: string, size: number, letterSpacing = 0) =>
  [...text].length * MONO_ADVANCE * size + letterSpacing * [...text].length;
