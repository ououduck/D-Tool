/* D-Tool 文本算法库 3（纯函数，Node 可测）
   覆盖：大小写变体、URL 组件、引号处理、序号、数字格式化、密码短语、随机句子等 */

const td = new TextDecoder();
const te = new TextEncoder();

/* ---------- 大小写变体 ---------- */
export function toCamelCase(input) {
  return input.toLowerCase().replace(/[^a-z0-9]+(.)/g, (m, c) => c.toUpperCase()).replace(/^[A-Z]/, (c) => c.toLowerCase());
}
export function toPascalCase(input) {
  return input.toLowerCase().replace(/[^a-z0-9]+(.)/g, (m, c) => c.toUpperCase()).replace(/^[a-z]/, (c) => c.toUpperCase());
}
export function toSnakeCase(input) {
  return input.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}
export function toKebabCase(input) {
  return input.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
export function toConstantCase(input) {
  return toSnakeCase(input).toUpperCase();
}

/* ---------- URL 组件 ---------- */
export function urlBreakdown(input) {
  try {
    const u = new URL(input);
    return [
      { name: '协议', value: u.protocol.replace(':', '') },
      { name: '主机', value: u.hostname },
      { name: '端口', value: u.port || (u.protocol === 'https:' ? '443' : u.protocol === 'http:' ? '80' : '默认') },
      { name: '路径', value: u.pathname },
      { name: '查询', value: u.search || '（无）' },
      { name: '哈希', value: u.hash || '（无）' },
    ];
  } catch {
    return 'URL 格式不正确（需要 http/https 开头）';
  }
}

/* ---------- 引号处理 ---------- */
export function toCurlyQuotes(input) {
  return input
    .replace(/(^|[\s(（\[{])"([^"]*?)"/g, '$1“$2”')
    .replace(/'([^']*?)'/g, '‘$1’');
}
export function toStraightQuotes(input) {
  return input.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
}

/* ---------- 序号/列表 ---------- */
export function addNumbering(input, format = '1.') {
  const lines = input.replace(/\r\n/g, '\n').split('\n');
  return lines.map((l, i) => (l.trim() ? `${format.replace('#', String(i + 1))} ${l}` : l)).join('\n');
}
export function addBullets(input, bullet = '-') {
  const lines = input.replace(/\r\n/g, '\n').split('\n');
  return lines.map((l) => (l.trim() ? `${bullet} ${l}` : l)).join('\n');
}

/* ---------- 数字格式化 ---------- */
export function formatNumberWith(input, places = 2) {
  const n = parseFloat(input);
  if (!Number.isFinite(n)) return '请输入有效数字';
  const p = Math.max(0, Math.min(10, parseInt(places, 10) || 2));
  return n.toLocaleString('zh-CN', { minimumFractionDigits: p, maximumFractionDigits: p });
}
export function formatPercent(input, places = 2) {
  const n = parseFloat(input);
  if (!Number.isFinite(n)) return '请输入有效数字';
  const p = Math.max(0, Math.min(10, parseInt(places, 10) || 2));
  return (n * 100).toLocaleString('zh-CN', { minimumFractionDigits: p, maximumFractionDigits: p }) + '%';
}

/* ---------- 密码短语（可读词组合） ---------- */
const PHRASE_WORDS = ['sun', 'moon', 'star', 'sky', 'tree', 'river', 'cloud', 'fire', 'stone', 'wind', 'rain', 'snow', 'lake', 'hill', 'ocean', 'forest'];
const PHRASE_ADJ = ['bright', 'silent', 'golden', 'gentle', 'wild', 'clear', 'deep', 'soft', 'swift', 'calm'];
export function passphrase(count = 1, words = 4) {
  const n = Math.max(1, Math.min(20, parseInt(count, 10) || 1));
  const w = Math.max(2, Math.min(8, parseInt(words, 10) || 4));
  const out = [];
  for (let i = 0; i < n; i++) {
    const parts = [];
    for (let k = 0; k < w; k++) {
      const word = k === 0 ? pick(PHRASE_ADJ) : pick(PHRASE_WORDS);
      parts.push(k % 2 === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
    }
    out.push(parts.join('-') + Math.floor(Math.random() * 90 + 10));
  }
  return out.join('\n');
}
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ---------- 文本加密（字符位移） ---------- */
export function shiftCode(input, shift = 3) {
  const s = parseInt(shift, 10) || 3;
  return [...input].map((ch) => String.fromCodePoint(ch.codePointAt(0) + s)).join('');
}
export function unshiftCode(input, shift = 3) {
  const s = parseInt(shift, 10) || 3;
  return [...input].map((ch) => String.fromCodePoint(ch.codePointAt(0) - s)).join('');
}

/* ---------- 重复文本 ---------- */
export function repeatText(input, count = 3) {
  const n = Math.max(1, Math.min(1000, parseInt(count, 10) || 3));
  return Array.from({ length: n }, () => input).join('\n');
}

/* ---------- 占位文本（中文） ---------- */
const CN_WORDS = ['我们', '他们', '生活', '时间', '世界', '现在', '未来', '梦想', '努力', '坚持', '美好', '幸福', '快乐', '希望', '明天', '今天', '青春', '岁月', '阳光', '远方', '风雨', '星河', '山海', '人间'];
export function loremCn(sentences = 3) {
  const n = Math.max(1, Math.min(50, parseInt(sentences, 10) || 3));
  const out = [];
  for (let i = 0; i < n; i++) {
    const len = 6 + Math.floor(Math.random() * 8);
    const words = Array.from({ length: len }, () => pick(CN_WORDS));
    out.push(words.join('的') + '。');
  }
  return out.join('\n');
}
