import alea from "alea";

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * Credit to https://gist.github.com/mjackson/5311256
 *
 * @param {number} h - The hue
 * @param {number} s - The saturation
 * @param {number} l - The lightness
 * @returns {Array<number>} The RGB representation
 */
function hslToRgb(h: number, s: number, l: number) {
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}

/**
 * Helper function that generates a random color for a TagChip.
 * Must be deterministic based on the string.
 * Based off this excellent blog post:
 * https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
 *
 * @param {string} label - input string to hash
 * @returns {string} CSS color string in RGB format
 */
export function randomColorFromLabel(label: string): string {
  const generator = alea(label);
  const hash = generator();
  const goldenRatioConjugate = 0.618033988749895;

  const hue = (hash + goldenRatioConjugate) % 1; // degrees
  const saturation = 0.8; // percent saturation
  const lightness = 0.8; // percent lightness

  const [r, g, b] = hslToRgb(hue, saturation, lightness);

  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}
