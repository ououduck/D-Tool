/* 颜色解析与转换：HEX / RGB / HSL / HSV / 命名色 */

const NAMED = {
  black: '#000000', white: '#ffffff', red: '#ff0000', green: '#008000', blue: '#0000ff',
  gray: '#808080', grey: '#808080', yellow: '#ffff00', orange: '#ffa500', purple: '#800080',
  pink: '#ffc0cb', brown: '#a52a2a', cyan: '#00ffff', magenta: '#ff00ff', lime: '#00ff00',
  navy: '#000080', teal: '#008080', silver: '#c0c0c0', maroon: '#800000', olive: '#808000',
};

function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

function parseChannel(c) {
  if (c.endsWith('%')) return Math.round((parseFloat(c) / 100) * 255);
  const v = parseFloat(c);
  return Number.isFinite(v) ? Math.round(clamp(v, 0, 255)) : null;
}

function parseAlpha(a) {
  if (a.endsWith('%')) return clamp(parseFloat(a) / 100, 0, 1);
  return clamp(parseFloat(a), 0, 1);
}

export function hexToRgb(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: h.length === 8 ? Math.round((parseInt(h.slice(6, 8), 16) / 255) * 100) / 100 : 1,
  };
}

export function parseColor(str) {
  const s = String(str).trim().toLowerCase();
  if (!s) return null;
  if (NAMED[s]) return hexToRgb(NAMED[s]);
  if (s.startsWith('#')) return hexToRgb(s);

  let m = s.match(/^rgba?\(\s*([\d.]+%?)\s*[,/\s]+\s*([\d.]+%?)\s*[,/\s]+\s*([\d.]+%?)\s*(?:[,/\s]+\s*([\d.]+%?)\s*)?\)$/);
  if (m) {
    const r = parseChannel(m[1]), g = parseChannel(m[2]), b = parseChannel(m[3]);
    if (r === null || g === null || b === null) return null;
    return { r, g, b, a: m[4] === undefined ? 1 : parseAlpha(m[4]) };
  }

  m = s.match(/^hsla?\(\s*([\d.]+)(?:deg)?\s*[,/\s]+\s*([\d.]+)%\s*[,/\s]+\s*([\d.]+)%\s*(?:[,/\s]+\s*([\d.]+%?)\s*)?\)$/);
  if (m) {
    const h = (parseFloat(m[1]) % 360 + 360) % 360;
    const sat = clamp(parseFloat(m[2]) / 100, 0, 1);
    const l = clamp(parseFloat(m[3]) / 100, 0, 1);
    return { ...hslToRgb(h, sat, l), a: m[4] === undefined ? 1 : parseAlpha(m[4]) };
  }
  return null;
}

export function rgbToHex({ r, g, b, a = 1 }) {
  const to2 = (v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0');
  let hex = `#${to2(r)}${to2(g)}${to2(b)}`;
  if (a < 1) hex += to2(a * 255);
  return hex;
}

export function rgbToHsl({ r, g, b }) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
    else if (max === gn) h = ((bn - rn) / d + 2) * 60;
    else h = ((rn - gn) / d + 4) * 60;
  }
  // 不取整，保留精度以便 HSL→RGB 往返；展示时由调用方四舍五入
  return { h, s: s * 100, l: l * 100 };
}

export function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export function rgbToHsv({ r, g, b }) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
    else if (max === gn) h = ((bn - rn) / d + 2) * 60;
    else h = ((rn - gn) / d + 4) * 60;
  }
  return { h: Math.round(h), s: Math.round(max === 0 ? 0 : (d / max) * 100), v: Math.round(max * 100) };
}

/* 相对亮度（WCAG），用于判断深/浅背景 */
export function luminance({ r, g, b }) {
  const lin = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function readableOn(lum) {
  return lum > 0.45 ? '#18181b' : '#ffffff';
}
