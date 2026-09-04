/* D-Tool 网络信息算法库（纯函数，Node 可测）
   覆盖：HTTP 头解析/格式化、Cookie 解析、URL 参数提取、请求生成、编码检测 */

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- HTTP 头解析 ---------- */
export function parseHeaders(input) {
  const lines = String(input).replace(/\r\n/g, '\n').split('\n').map((l) => l.trim()).filter(Boolean);
  const rows = [];
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx < 1) continue;
    const name = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    rows.push({ name, value });
  }
  return rows.length ? rows : '未识别到请求头（格式：名称: 值）';
}

/* ---------- Cookie 解析 ---------- */
export function parseCookies(input) {
  const pairs = [];
  for (const part of String(input).split(';')) {
    const idx = part.indexOf('=');
    if (idx < 0) continue;
    const name = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    pairs.push({ name: name || '(无名称)', value });
  }
  return pairs.length ? pairs : '未识别到 Cookie（格式：name=value; name2=value2）';
}

/* ---------- URL 参数提取 ---------- */
export function urlParams(input) {
  const url = String(input).trim();
  const qIdx = url.indexOf('?');
  if (qIdx < 0) return 'URL 中没有查询参数（? 之后的部分）';
  const query = url.slice(qIdx + 1).split('#')[0];
  const rows = [];
  for (const pair of query.split('&')) {
    if (!pair) continue;
    const idx = pair.indexOf('=');
    const name = idx >= 0 ? pair.slice(0, idx) : pair;
    const value = idx >= 0 ? pair.slice(idx + 1) : '';
    rows.push({ name: decodeURIComponentSafe(name), value: decodeURIComponentSafe(value) });
  }
  return rows.length ? rows : '没有可解析的参数';
}
function decodeURIComponentSafe(s) {
  try { return decodeURIComponent(s); } catch { return s; }
}

/* ---------- HTTP 请求生成（原始报文） ---------- */
export function rawRequest(values) {
  const [method, path, host, headers, body] = values;
  const p = path || '/';
  const lines = [`${method.toUpperCase()} ${p} HTTP/1.1`, `Host: ${host}`];
  for (const line of String(headers).split('\n').map((l) => l.trim()).filter(Boolean)) lines.push(line);
  lines.push('Connection: close', '');
  if (body) lines.push(body, '');
  return lines.join('\n');
}

/* ---------- 字符编码检测（基于字节模式） ---------- */
export function detectEncoding(input) {
  const bytes = new TextEncoder().encode(input);
  if (!bytes.length) return '空内容';
  let utf8Valid = true;
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i];
    if (b < 0x80) continue;
    let n = 0;
    if ((b & 0xe0) === 0xc0) n = 1;
    else if ((b & 0xf0) === 0xe0) n = 2;
    else if ((b & 0xf8) === 0xf0) n = 3;
    else { utf8Valid = false; break; }
    for (let k = 1; k <= n; k++) {
      if (i + k >= bytes.length || (bytes[i + k] & 0xc0) !== 0x80) { utf8Valid = false; break; }
    }
    i += n;
  }
  const hasCjk = /[\u4e00-\u9fff]/.test(input);
  const hasAscii = /[\x20-\x7e]/.test(input);
  return [
    { name: 'UTF-8 合法性', value: utf8Valid ? '有效 UTF-8' : '非 UTF-8 字节序列' },
    { name: '包含中文', value: hasCjk ? '是' : '否' },
    { name: '包含 ASCII', value: hasAscii ? '是' : '否' },
    { name: '字节数', value: `${bytes.length} 字节` },
  ];
}
