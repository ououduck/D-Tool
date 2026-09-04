/* D-Tool 开发辅助算法库（纯函数，Node 可测）
   覆盖：JSON 对比/转 TS/转 Go/路径提取、压缩（HTML/CSS/JS）、slug、密码强度、
   meta/OG 生成、sitemap/robots 生成、关键词密度、Cron 生成、TOTP、Punycode、curl 生成 */
import { cjkToPinyinFirst } from './text.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n, maxFrac = 4) => {
  if (!Number.isFinite(n)) return '—';
  const abs = Math.abs(n);
  let s;
  if (abs !== 0 && (abs >= 1e15 || abs < 1e-9)) s = n.toExponential(6).replace(/\.?0+e/, 'e');
  else s = String(Number(n.toFixed(maxFrac)));
  const [i, f] = s.split('.');
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (f ? '.' + f : '');
};

/* ---------- JSON 工具 ---------- */
export function jsonParse(input) {
  try { return JSON.parse(input); } catch (e) { throw new Error('JSON 解析失败：' + e.message); }
}
export function jsonDiff(a, b) {
  const objA = jsonParse(a), objB = jsonParse(b);
  const lines = [];
  const walk = (x, y, path) => {
    if (typeof x !== typeof y || (x !== null && y !== null && typeof x === 'object' && Array.isArray(x) !== Array.isArray(y))) {
      lines.push(`- ${path}: ${JSON.stringify(x)}\n+ ${path}: ${JSON.stringify(y)}`);
      return;
    }
    if (x === null || typeof x !== 'object') {
      if (JSON.stringify(x) !== JSON.stringify(y)) lines.push(`- ${path}: ${JSON.stringify(x)}\n+ ${path}: ${JSON.stringify(y)}`);
      return;
    }
    const keys = new Set([...Object.keys(x), ...Object.keys(y)]);
    for (const k of keys) {
      const p = path ? `${path}.${k}` : k;
      if (!(k in x)) lines.push(`+ ${p}: ${JSON.stringify(y[k])}`);
      else if (!(k in y)) lines.push(`- ${p}: ${JSON.stringify(x[k])}`);
      else walk(x[k], y[k], p);
    }
  };
  walk(objA, objB, '');
  return lines.length ? lines.join('\n') : '两个 JSON 完全一致';
}
export function jsonToTs(input) {
  const obj = jsonParse(input);
  const toTs = (v, name, depth) => {
    const ind = '  '.repeat(depth);
    if (v === null) return `${ind}${name}: null;`;
    if (Array.isArray(v)) {
      if (!v.length) return `${ind}${name}: any[];`;
      return `${ind}${name}: ${tsTypeOf(v[0])}[];`;
    }
    if (typeof v === 'object') {
      const inner = Object.entries(v).map(([k, val]) => toTs(val, k, depth + 1)).join('\n');
      return `${ind}${name}: {\n${inner}\n${ind}};`;
    }
    return `${ind}${name}: ${tsTypeOf(v)};`;
  };
  const tsTypeOf = (v) => v === null ? 'null' : Array.isArray(v) ? 'any[]' : typeof v === 'number' ? 'number' : typeof v === 'boolean' ? 'boolean' : 'string';
  const entries = Object.entries(obj).map(([k, v]) => toTs(v, k, 1)).join('\n');
  return `interface Data {\n${entries}\n}`;
}
export function jsonToGo(input) {
  const obj = jsonParse(input);
  const goType = (v) => {
    if (v === null) return 'interface{}';
    if (Array.isArray(v)) return v.length ? '[]' + goType(v[0]) : '[]interface{}';
    if (typeof v === 'number') return Number.isInteger(v) ? 'int64' : 'float64';
    if (typeof v === 'boolean') return 'bool';
    return 'string';
  };
  const cap = (s) => s.replace(/[_-](\w)/g, (_, c) => c.toUpperCase()).replace(/^\w/, (c) => c.toUpperCase());
  const lines = ['type Data struct {'];
  for (const [k, v] of Object.entries(obj)) {
    lines.push(`  ${cap(k)} ${goType(v)} \`json:"${k}"\``);
  }
  lines.push('}');
  return lines.join('\n');
}
export function jsonPaths(input) {
  const obj = jsonParse(input);
  const out = [];
  const walk = (v, path) => {
    if (v !== null && typeof v === 'object') {
      for (const [k, val] of Object.entries(v)) walk(val, path ? `${path}.${k}` : k);
    } else {
      out.push({ name: path, value: `${JSON.stringify(v)} (${v === null ? 'null' : typeof v})` });
    }
  };
  walk(obj, '');
  return out.length ? out : [{ name: '根', value: '空对象' }];
}

/* ---------- 压缩 ---------- */
export function minifyHtml(input) {
  return input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
export function minifyCss(input) {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\s+/g, ' ')
    .trim();
}
export function minifyJs(input) {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '')
    .replace(/^\s+|\s+$/gm, '')
    .replace(/\s*([{}();,=<>+\-*/%!&|?:])\s*/g, '$1')
    .replace(/\n+/g, '\n')
    .trim();
}

/* ---------- Slug（中文转拼音首字母，全小写） ---------- */
export function toSlug(input) {
  return cjkToPinyinFirst(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* ---------- 密码强度 ---------- */
export function passwordStrength(input) {
  if (!input) return '请输入密码';
  let score = 0;
  const len = input.length;
  if (len >= 8) score++;
  if (len >= 12) score++;
  if (/[a-z]/.test(input) && /[A-Z]/.test(input)) score++;
  if (/\d/.test(input)) score++;
  if (/[^A-Za-z0-9]/.test(input)) score++;
  const common = ['password', '123456', '12345678', 'qwerty', 'abc123', '111111', 'iloveyou', 'admin', 'welcome', 'monkey', '1234567890', 'letmein', '666666', '88888888', 'password1', '1q2w3e4r'];
  if (common.includes(input.toLowerCase())) score = Math.min(score, 1);
  const levels = ['极弱', '较弱', '一般', '较强', '很强', '极强'];
  const labels = { 0: '极弱', 1: '较弱', 2: '一般', 3: '较强', 4: '很强', 5: '极强' };
  return [{ name: '强度', value: labels[score] },
          { name: '得分', value: `${score}/5` },
          { name: '长度', value: `${len} 位` },
          { name: '字符类别', value: `${/ [a-z]/.test(' ' + input) ? 1 : 0 + /[A-Z]/.test(input) + /\d/.test(input) + /[^A-Za-z0-9]/.test(input)} / 4` }];
}

/* ---------- Meta / OG 生成 ---------- */
export function metaGenerator(values) {
  const [title, desc, url, keywords] = values;
  return `<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="keywords" content="${esc(keywords)}">
<meta name="viewport" content="width=device, initial-scale=1">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<link rel="canonical" href="${esc(url)}">`;
}

/* ---------- Sitemap 生成 ---------- */
export function sitemapGenerator(values) {
  const [base, urls, freq] = values;
  const list = String(urls).split(/[\s,，]+/).map((u) => u.trim()).filter(Boolean);
  const url = (u) => /^https?:\/\//i.test(u) ? u : `${base.replace(/\/$/, '')}/${u.replace(/^\//, '')}`;
  const lines = [`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`];
  for (const u of [url(''), ...list.map(url)]) {
    lines.push(`  <url><loc>${esc(u)}</loc><changefreq>${freq || 'weekly'}</changefreq></url>`);
  }
  lines.push('</urlset>');
  return lines.join('\n');
}

/* ---------- robots.txt 生成 ---------- */
export function robotsGenerator(values) {
  const [userAgent, allow, disallow, sitemapUrl] = values;
  const lines = [`User-agent: ${userAgent || '*'}`, `Allow: ${allow || '/'}`];
  for (const d of String(disallow).split(/[\s,，]+/).filter(Boolean)) lines.push(`Disallow: ${d}`);
  if (sitemapUrl) lines.push('', `Sitemap: ${sitemapUrl}`);
  return lines.join('\n');
}

/* ---------- 关键词密度 ---------- */
export function keywordDensity(input) {
  const text = input.replace(/<[^>]*>/g, ' ').toLowerCase();
  const words = text.match(/[\u4e00-\u9fff]|[a-z0-9]+/g) || [];
  if (!words.length) return '请输入文本';
  const total = words.length;
  const freq = new Map();
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
  const rows = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30)
    .map(([w, n]) => ({ name: w, value: `${n} 次（${fmt((n / total) * 100, 2)}%）` }));
  return [{ name: '总词数', value: String(total) }, ...rows];
}

/* ---------- Cron 生成 ---------- */
export function cronGenerator(values) {
  const [minute, hour, day, month, dow] = values;
  const m = minute || '*';
  const h = hour || '*';
  const d = day || '*';
  const mo = month || '*';
  const w = dow || '*';
  const expr = `${m} ${h} ${d} ${mo} ${w}`;
  const desc = [];
  if (m === '*' && h === '*' && d === '*' && mo === '*' && w === '*') desc.push('每分钟执行');
  else if (m === '0' && h === '*' && d === '*' && mo === '*' && w === '*') desc.push('每小时整点执行');
  else if (m === '0' && h !== '*' && d === '*' && mo === '*' && w === '*') desc.push(`每天 ${h} 点执行`);
  else if (m === '0' && h !== '*' && d === '*' && mo === '*' && w !== '*') desc.push(`每周${['日', '一', '二', '三', '四', '五', '六'][w]} ${h} 点执行`);
  else if (m === '0' && h !== '*' && d !== '*' && mo === '*' && w === '*') desc.push(`每月 ${d} 日 ${h} 点执行`);
  else desc.push('自定义调度（请对照 Cron 语法核对）');
  return [{ name: 'Cron 表达式', value: expr }, { name: '含义', value: desc[0] }];
}

/* ---------- TOTP（RFC 6238，HMAC-SHA1） ---------- */
export async function totpGenerate(values) {
  const secret = (values[0] || '').replace(/\s+/g, '').toUpperCase();
  if (!secret) return '请输入 Base32 密钥';
  const key = base32Decode(secret);
  const counter = BigInt(Math.floor(Date.now() / 30000));
  const msg = new Uint8Array(8);
  let c = counter;
  for (let i = 7; i >= 0; i--) { msg[i] = Number(c & 0xffn); c >>= 8n; }
  const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', cryptoKey, msg));
  const off = sig[sig.length - 1] & 0xf;
  const code = ((sig[off] & 0x7f) << 24 | sig[off + 1] << 16 | sig[off + 2] << 8 | sig[off + 3]) % 1000000;
  const remaining = 30 - Math.floor(Date.now() / 1000) % 30;
  return [{ name: '动态验证码', value: String(code).padStart(6, '0') },
          { name: '剩余有效', value: `${remaining} 秒` },
          { name: '算法', value: 'TOTP/HMAC-SHA1/30s' }];
}
function base32Decode(s) {
  const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  for (const ch of s.toUpperCase()) {
    const i = ALPHA.indexOf(ch);
    if (i < 0) throw new Error('密钥含非法 Base32 字符（应为 A-Z、2-7）');
    bits += i.toString(2).padStart(5, '0');
  }
  bits = bits.slice(0, Math.floor(bits.length / 8) * 8);
  const out = new Uint8Array(bits.length / 8);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  return out;
}

/* ---------- Punycode（RFC 3492，域名用） ---------- */
const PUNY_BASE = 36, PUNY_TMIN = 1, PUNY_TMAX = 26, PUNY_SKEW = 38, PUNY_DAMP = 700, PUNY_IBIAS = 72, PUNY_IN = 128;
const PUNY_DIGITS = 'abcdefghijklmnopqrstuvwxyz0123456789';
function punyAdapt(delta, numPoints, firstTime) {
  delta = firstTime ? Math.floor(delta / PUNY_DAMP) : delta >> 1;
  delta += Math.floor(delta / numPoints);
  let k = 0;
  while (delta > ((PUNY_BASE - PUNY_TMIN) * PUNY_TMAX) >> 1) { delta = Math.floor(delta / (PUNY_BASE - PUNY_TMIN)); k += PUNY_BASE; }
  return k + Math.floor((PUNY_BASE - PUNY_TMIN + 1) * delta / (delta + PUNY_SKEW));
}
function punyDigitVal(cp) {
  if (cp >= 48 && cp <= 57) return cp - 48 + 26;
  if (cp >= 97 && cp <= 122) return cp - 97;
  throw new Error('非法 Punycode 字符');
}
function punyEncode(str) {
  let output = '';
  const codePoints = [...str];
  let n = PUNY_IN, delta = 0, bias = PUNY_IBIAS;
  const basic = [];
  for (const ch of codePoints) { const cp = ch.codePointAt(0); if (cp < 0x80) { output += ch; basic.push(cp); } }
  let h = basic.length, b = basic.length;
  if (b) output += '-';
  while (h < codePoints.length) {
    let m = Infinity;
    for (const ch of codePoints) { const cp = ch.codePointAt(0); if (cp >= n && cp < m) m = cp; }
    delta += (m - n) * (h + 1);
    n = m;
    for (const ch of codePoints) {
      const cp = ch.codePointAt(0);
      if (cp < n) delta++;
      if (cp === n) {
        let q = delta, k = PUNY_BASE;
        for (;;) {
          const t = k <= bias ? PUNY_TMIN : k >= bias + PUNY_TMAX ? PUNY_TMAX : k - bias;
          if (q < t) break;
          output += PUNY_DIGITS[t + ((q - t) % (PUNY_BASE - t))];
          q = Math.floor((q - t) / (PUNY_BASE - t));
          k += PUNY_BASE;
        }
        output += PUNY_DIGITS[q];
        bias = punyAdapt(delta, h + 1, h === b);
        delta = 0;
        h++;
      }
    }
    delta++;
    n++;
  }
  return output;
}
function punyDecode(str) {
  const out = [];
  let n = PUNY_IN, i = 0, bias = PUNY_IBIAS;
  const dash = str.lastIndexOf('-');
  let b = 0;
  if (dash >= 0) { for (let j = 0; j < dash; j++) out.push(str.charCodeAt(j)); b = dash; }
  let ip = dash >= 0 ? dash + 1 : 0;
  while (ip < str.length) {
    const oldi = i;
    let w = 1;
    for (let k = PUNY_BASE; ; k += PUNY_BASE) {
      if (ip >= str.length) throw new Error('非法 Punycode');
      const digit = punyDigitVal(str.charCodeAt(ip++));
      i += digit * w;
      const t = k <= bias ? PUNY_TMIN : k >= bias + PUNY_TMAX ? PUNY_TMAX : k - bias;
      if (digit < t) break;
      w *= PUNY_BASE - t;
    }
    const outLen = out.length + 1;
    bias = punyAdapt(i - oldi, outLen, oldi === 0);
    n += Math.floor(i / outLen);
    i %= outLen;
    out.splice(i, 0, n);
    i++;
  }
  return String.fromCodePoint(...out);
}
export function punycodeEncode(input) {
  const host = String(input).trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '').toLowerCase();
  const parts = host.split('.').map((p) => /^[\x00-\x7f]+$/.test(p) ? p : 'xn--' + punyEncode(p));
  return parts.join('.');
}
export function punycodeDecode(input) {
  const host = String(input).trim().toLowerCase();
  return host.split('.').map((p) => p.startsWith('xn--') ? punyDecode(p.slice(4)) : p).join('.');
}

/* ---------- curl 生成 ---------- */
export function curlGenerator(values) {
  const [method, url, headers, body] = values;
  if (!/^https?:\/\//i.test(url)) return '请输入完整 URL（http/https 开头）';
  let cmd = `curl -X ${method.toUpperCase()} "${url}"`;
  for (const line of String(headers).split('\n').map((l) => l.trim()).filter(Boolean)) {
    cmd += ` \\\n  -H "${esc(line)}"`;
  }
  if (body && method.toUpperCase() !== 'GET') cmd += ` \\\n  -d '${body.replace(/'/g, "\\'")}'`;
  return cmd;
}
