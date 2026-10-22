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
  // French set: accents the pt/id/en copy never needed.
  "è": 0.577, "ë": 0.577, "ä": 0.578, "î": 0.266, "ï": 0.266, "ö": 0.612,
  "ù": 0.616, "û": 0.616, "ÿ": 0.616, "œ": 0.984, "æ": 0.874,
  "È": 0.554, "Ë": 0.554, "Ä": 0.634, "Î": 0.264, "Ï": 0.264, "Ö": 0.676,
  "Ù": 0.672, "Û": 0.672, "Œ": 0.836, "Æ": 0.821,
};

// Space Grotesk has no Cyrillic, so Russian glyphs fall back to Golos Text 700.
// Advances read from the shipped woff2 (variable, instanced at wght=700).
const CYRILLIC: Record<string, number> = {
  "Ё": 0.625, "Ђ": 0.835, "Ѓ": 0.56, "Є": 0.71, "Ѕ": 0.67, "І": 0.34, "Ї": 0.34, "Ј": 0.57,
  "Љ": 1.06, "Њ": 1.09, "Ћ": 0.85, "Ќ": 0.735, "Ў": 0.71, "Џ": 0.74, "А": 0.71, "Б": 0.68,
  "В": 0.705, "Г": 0.56, "Д": 0.75, "Е": 0.625, "Ж": 1.02, "З": 0.668, "И": 0.76, "Й": 0.76,
  "К": 0.735, "Л": 0.73, "М": 0.89, "Н": 0.76, "О": 0.77, "П": 0.75, "Р": 0.67, "С": 0.71,
  "Т": 0.65, "У": 0.71, "Ф": 0.93, "Х": 0.72, "Ц": 0.776, "Ч": 0.685, "Ш": 1.0, "Щ": 1.035,
  "Ъ": 0.75, "Ы": 0.92, "Ь": 0.67, "Э": 0.71, "Ю": 0.985, "Я": 0.7, "а": 0.58, "б": 0.605,
  "в": 0.58, "г": 0.46, "д": 0.625, "е": 0.59, "ж": 0.82, "з": 0.556, "и": 0.61, "й": 0.61,
  "к": 0.58, "л": 0.596, "м": 0.72, "н": 0.61, "о": 0.6, "п": 0.6, "р": 0.615, "с": 0.575,
  "т": 0.52, "у": 0.6, "ф": 0.77, "х": 0.58, "ц": 0.631, "ч": 0.576, "ш": 0.84, "щ": 0.88,
  "ъ": 0.62, "ы": 0.76, "ь": 0.55, "э": 0.575, "ю": 0.785, "я": 0.585, "ё": 0.59, "ђ": 0.635,
  "ѓ": 0.46, "є": 0.575, "ѕ": 0.56, "і": 0.274, "ї": 0.274, "ј": 0.274, "љ": 0.865, "њ": 0.89,
  "ћ": 0.635, "ќ": 0.58, "ў": 0.6, "џ": 0.59, "Ґ": 0.56, "ґ": 0.46, "Ұ": 0.7, "ұ": 0.601,
  "№": 1.11,
};

/** Space Mono is monospaced, so every glyph advances the same 0.612em. */
export const MONO_ADVANCE = 0.612;

/** JetBrains Mono, the Cyrillic fallback for mono runs, advances 0.6em. */
export const MONO_ADVANCE_CYR = 0.6;

/** Width of a single nowrap line in px, including CSS letter-spacing. */
export const measureLine = (text: string, size: number, letterSpacing: number) => {
  const glyphs = [...text];
  const body = glyphs.reduce((w, ch) => w + (GROTESK_700[ch] ?? CYRILLIC[ch] ?? 0.62) * size, 0);
  return body + letterSpacing * glyphs.length;
};

/** Width of a monospaced run in px. */
export const measureMono = (text: string, size: number, letterSpacing = 0) => {
  const glyphs = [...text];
  const body = glyphs.reduce((w, ch) => w + (CYRILLIC[ch] ? MONO_ADVANCE_CYR : MONO_ADVANCE) * size, 0);
  return body + letterSpacing * glyphs.length;
};
