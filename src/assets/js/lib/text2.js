/* D-Tool 文本算法库 2（纯函数，Node 可测）
   覆盖：截取、分列、对齐、填充、表格转换、字符码、随机打乱、去重统计等 */

const td = new TextDecoder();
const te = new TextEncoder();

/* ---------- 截取 ---------- */
export function truncateText(input, maxLen = 100) {
  const n = Math.max(1, parseInt(maxLen, 10) || 100);
  if (input.length <= n) return input;
  return input.slice(0, n) + `…（共 ${input.length} 字符，已截断）`;
}
export function extractFirstLines(input, count = 10) {
  const n = Math.max(1, parseInt(count, 10) || 10);
  return input.split('\n').slice(0, n).join('\n');
}
export function removeFirstLines(input, count = 1) {
  const n = Math.max(0, parseInt(count, 10) || 1);
  return input.split('\n').slice(n).join('\n');
}
export function extractBetween(input, start = '', end = '') {
  if (!start && !end) return '请填写起始与结束标记';
  const lines = [];
  let rest = input;
  let guard = 0;
  while (rest.length && guard++ < 1000) {
    const si = start ? rest.indexOf(start) : -1;
    if (start && si < 0) break;
    const from = start ? si + start.length : 0;
    const ei = end ? rest.indexOf(end, from) : rest.length;
    if (end && ei < 0) break;
    lines.push(rest.slice(from, ei));
    rest = rest.slice((end ? ei + end.length : rest.length));
  }
  return lines.join('\n');
}

/* ---------- 分列 ---------- */
export function splitColumns(input, sep = '\t') {
  const rows = input.replace(/\r\n/g, '\n').split('\n').map((l) => l.split(sep));
  const max = Math.max(...rows.map((r) => r.length), 0);
  const widths = Array.from({ length: max }, (_, c) => Math.max(...rows.map((r) => (r[c] || '').length), 0));
  return rows.map((r) => r.map((cell, c) => cell.padEnd(widths[c])).join('  ').trimEnd()).join('\n');
}
export function csvToMarkdown(input, sep = ',') {
  const rows = input.replace(/\r\n/g, '\n').split('\n').filter((l) => l.trim()).map((l) => l.split(sep).map((c) => c.trim()));
  if (!rows.length) return '没有数据';
  const max = Math.max(...rows.map((r) => r.length), 0);
  const pad = rows.map((r) => Array.from({ length: max }, (_, i) => r[i] || ''));
  const header = `| ${pad[0].join(' | ')} |`;
  const divider = `| ${pad[0].map(() => '---').join(' | ')} |`;
  const body = pad.slice(1).map((r) => `| ${r.join(' | ')} |`).join('\n');
  return [header, divider, body].join('\n');
}
export function tsvToMarkdown(input) { return csvToMarkdown(input, '\t'); }
export function markdownTableToCsv(input) {
  const lines = input.replace(/\r\n/g, '\n').split('\n');
  const rows = lines.filter((l) => l.trim().startsWith('|')).map((l) =>
    l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()),
  ).filter((r) => !r.every((c) => /^:?-{3,}:?$/.test(c)));
  return rows.map((r) => r.join(',')).join('\n');
}

/* ---------- 对齐/填充 ---------- */
export function padLines(input, width = 20, align = 'left') {
  const w = Math.max(1, parseInt(width, 10) || 20);
  return input.split('\n').map((l) => {
    if (l.length >= w) return l;
    if (align === 'right') return ' '.repeat(w - l.length) + l;
    if (align === 'center') {
      const left = Math.floor((w - l.length) / 2);
      return ' '.repeat(left) + l;
    }
    return l + ' '.repeat(w - l.length);
  }).join('\n');
}
export const padLinesLeft = (input, w) => padLines(input, w, 'left');
export const padLinesRight = (input, w) => padLines(input, w, 'right');
export const padLinesCenter = (input, w) => padLines(input, w, 'center');
export function addPrefix(input, prefix = '') {
  return input.split('\n').map((l) => prefix + l).join('\n');
}
export function addSuffix(input, suffix = '') {
  return input.split('\n').map((l) => l + suffix).join('\n');
}
export function quoteLines(input, quote = '"') {
  return input.split('\n').map((l) => `${quote}${l}${quote}`).join('\n');
}

/* ---------- 字符工具 ---------- */
export function charCodeInfo(input) {
  const chars = [...input];
  if (!chars.length) return '请输入内容';
  return chars.map((ch) => {
    const cp = ch.codePointAt(0);
    return { name: ch, value: `U+${cp.toString(16).toUpperCase().padStart(4, '0')}  ${cp}` };
  });
}
export function unicodeEscape(input) {
  return [...input].map((ch) => {
    const cp = ch.codePointAt(0);
    return cp > 0xffff ? `\\u{${cp.toString(16)}}` : `\\u${cp.toString(16).padStart(4, '0')}`;
  }).join('');
}
export function unicodeUnescape(input) {
  return input.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})/g, (m, a, b) => String.fromCodePoint(parseInt(a || b, 16)));
}

/* ---------- 随机打乱字符/词 ---------- */
export function shuffleChars(input) {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}
export function shuffleWords(input) {
  const arr = input.split(/\s+/);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join(' ');
}

/* ---------- 去重/统计补充 ---------- */
export function uniqueWords(input) {
  return [...new Set(input.split(/\s+/).filter(Boolean))].join('\n');
}
export function wordFrequencyTop(input, count = 20) {
  const n = Math.max(1, Math.min(100, parseInt(count, 10) || 20));
  const words = input.toLowerCase().match(/[a-z0-9]+/g) || [];
  if (!words.length) return '没有英文单词';
  const freq = new Map();
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, n)
    .map(([w, c]) => ({ name: w, value: `${c} 次` }));
}

/* ---------- 文本替换 ---------- */
export function replaceAll(input, find = '', replace = '') {
  if (!find) return '请填写要查找的文本';
  return input.split(find).join(replace);
}
export function replaceRegex(input, pattern = '', replace = '') {
  if (!pattern) return '请填写正则表达式';
  try {
    const re = new RegExp(pattern, 'g');
    return input.replace(re, replace);
  } catch (e) {
    return '正则错误：' + e.message;
  }
}

/* ---------- 二进制/字节工具 ---------- */
export function textToBytes(input) {
  const bytes = te.encode(input);
  return [...bytes].map((b) => `${b}`).join(' ');
}
export function textLengthInfo(input) {
  const chars = [...input].length;
  const bytes = te.encode(input).length;
  const lines = input.split('\n').length;
  return [
    { name: '字符数', value: String(chars) },
    { name: 'UTF-8 字节', value: String(bytes) },
    { name: '行数', value: String(lines) },
    { name: '汉字数', value: String((input.match(/[\u4e00-\u9fff]/g) || []).length) },
    { name: '英文单词', value: String((input.match(/[a-zA-Z]+/g) || []).length) },
  ];
}

/* ---------- 手机号段/随机邮箱等杂项 ---------- */
export function extractChineseChars(input) {
  return (input.match(/[\u4e00-\u9fff]/g) || []).join('');
}
export function extractEnglishWords(input) {
  return (input.match(/[a-zA-Z]+/g) || []).join('\n');
}
