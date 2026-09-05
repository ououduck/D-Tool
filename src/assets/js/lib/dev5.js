/* D-Tool 补强算法库 5（纯函数，Node 可测）
   覆盖：Base64 图片预览、文本对齐、数字转中文大写、配色方案 */

const td = new TextDecoder();
const te = new TextEncoder();

/* ---------- Base64 图片预览 ---------- */
export function b64ImagePreview(input) {
  const s = String(input).trim();
  if (!s) return '请输入内容';
  let mime = 'image/png';
  let data = s;
  if (/^data:image\/(\w+);base64,/.test(s)) {
    mime = 'image/' + s.match(/^data:image\/(\w+);base64,/)[1];
    data = s.replace(/^data:image\/\w+;base64,/, '');
  }
  if (!/^[A-Za-z0-9+/=]+$/.test(data)) return '不是合法的 Base64 数据';
  // 估算原始大小
  const padding = (data.match(/=/g) || []).length;
  const bytes = Math.floor(data.length * 3 / 4) - padding;
  return [
    { name: 'MIME 类型', value: mime },
    { name: '数据长度', value: data.length + ' 字符' },
    { name: '估算大小', value: bytes > 1048576 ? (bytes / 1048576).toFixed(2) + ' MB' : (bytes / 1024).toFixed(1) + ' KB' },
    { name: '预览', value: `data:${mime};base64,${data.slice(0, 80)}…` },
  ];
}

/* ---------- 文本对齐 ---------- */
function alignLines(input, width, mode) {
  const w = Math.max(4, parseInt(width, 10) || 40);
  return input.replace(/\r\n/g, '\n').split('\n').map((line) => {
    if (line.length >= w) return line;
    if (mode === 'right') return ' '.repeat(w - line.length) + line;
    if (mode === 'center') {
      const left = Math.floor((w - line.length) / 2);
      return ' '.repeat(left) + line;
    }
    return line + ' '.repeat(w - line.length);
  }).join('\n');
}
export const alignLeft = (input, w) => alignLines(input, w, 'left');
export const alignRight = (input, w) => alignLines(input, w, 'right');
export const alignCenter = (input, w) => alignLines(input, w, 'center');

/* ---------- 数字转中文大写 ---------- */
const CN_UPPER = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
const CN_UNIT = ['', '拾', '佰', '仟'];
const CN_SECTION = ['', '万', '亿', '万亿'];
function sectionToCn(n) {
  let s = '';
  let zero = false;
  for (let i = 0; i < 4; i++) {
    const d = Math.floor(n / 10 ** (3 - i)) % 10;
    if (d === 0) {
      if (s) zero = true;
    } else {
      if (zero) { s += '零'; zero = false; }
      s += CN_UPPER[d] + CN_UNIT[3 - i];
    }
  }
  return s;
}
export function numToCn(values) {
  const n = parseFloat(values[0]);
  if (!Number.isFinite(n)) return '请输入有效数字';
  const neg = n < 0;
  const intPart = Math.floor(Math.abs(n));
  const frac = Math.round((Math.abs(n) - intPart) * 100);
  let intStr = '';
  if (intPart === 0) intStr = '零';
  else {
    let sections = [];
    let x = intPart;
    let idx = 0;
    while (x > 0) {
      const sec = x % 10000;
      if (sec) sections.unshift(sectionToCn(sec) + (idx > 0 ? CN_SECTION[idx] : ''));
      else if (sections.length) sections.unshift('零');
      x = Math.floor(x / 10000);
      idx++;
    }
    intStr = sections.join('').replace(/零+$/, '');
  }
  let result = (neg ? '负' : '') + intStr;
  if (frac > 0) {
    result += '点' + CN_UPPER[Math.floor(frac / 10)] + CN_UPPER[frac % 10];
  }
  return result;
}
export function rmbUpper(values) {
  const n = parseFloat(values[0]);
  if (!Number.isFinite(n)) return '请输入有效数字';
  const neg = n < 0;
  const abs = Math.abs(n);
  const intPart = Math.floor(abs);
  const frac = Math.round((abs - intPart) * 100);
  let intStr = '';
  if (intPart === 0) intStr = '零';
  else {
    let sections = [];
    let x = intPart;
    let idx = 0;
    while (x > 0) {
      const sec = x % 10000;
      if (sec) sections.unshift(sectionToCn(sec) + (idx > 0 ? CN_SECTION[idx] : ''));
      else if (sections.length) sections.unshift('零');
      x = Math.floor(x / 10000);
      idx++;
    }
    intStr = sections.join('').replace(/零+$/, '') + '元';
  }
  let result = (neg ? '负' : '') + intStr;
  if (frac === 0) {
    result += '整';
  } else {
    const jiao = Math.floor(frac / 10);
    const fen = frac % 10;
    if (jiao > 0) result += CN_UPPER[jiao] + '角';
    else result += '零';
    if (fen > 0) result += CN_UPPER[fen] + '分';
    else result += '整';
  }
  return result;
}

/* ---------- 配色方案生成 ---------- */
function hexToHsl(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  return [h, s, l];
}
function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r, g, b;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return '#' + [r, g, b].map((v) => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
}
export function paletteGen(input) {
  const hex = String(input).trim();
  if (!/^#?[0-9a-f]{3}$|^#?[0-9a-f]{6}$/i.test(hex)) return '请输入 HEX 颜色（如 #3498DB）';
  const [h, s, l] = hexToHsl(hex);
  const palettes = [
    ['单色（明度渐变）', [0.6, 0.75, 1, 1.25].map((f) => hslToHex(h, s, Math.min(0.95, Math.max(0.05, l * f)))).join(' | ')],
    ['互补色', `${hex} | ${hslToHex(h + 180, s, l)}`],
    ['类似色（±30°）', `${hslToHex(h - 30, s, l)} | ${hex} | ${hslToHex(h + 30, s, l)}`],
    ['三角色组', `${hex} | ${hslToHex(h + 120, s, l)} | ${hslToHex(h + 240, s, l)}`],
    ['矩形色组', `${hex} | ${hslToHex(h + 60, s, l)} | ${hslToHex(h + 180, s, l)} | ${hslToHex(h + 240, s, l)}`],
  ];
  return palettes.map(([name, value]) => ({ name, value }));
}
