/* D-Tool 补强算法库 4（纯函数，Node 可测）
   覆盖：正则测试、CSS 压缩美化、HTML 实体数量、JWT 载荷解码、时间差、进制转换补充 */

const num = (v, fallback = 0) => { const n = parseFloat(v); return Number.isFinite(n) ? n : fallback; };
const fmt = (n, maxFrac = 4) => {
  if (!Number.isFinite(n)) return '—';
  const abs = Math.abs(n);
  let s;
  if (abs !== 0 && (abs >= 1e15 || abs < 1e-9)) s = n.toExponential(6).replace(/\.?0+e/, 'e');
  else s = String(Number(n.toFixed(maxFrac)));
  const [i, f] = s.split('.');
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (f ? '.' + f : '');
};

/* ---------- 正则测试（返回匹配结果） ---------- */
export function regexTest(values) {
  const [pattern, flags, text] = values;
  if (!pattern) return '请填写正则表达式';
  try {
    const re = new RegExp(pattern, flags || 'g');
    const matches = text.match(re);
    if (!matches || !matches.length) return '没有匹配到内容';
    const unique = [...new Set(matches)];
    return [
      { name: '匹配数量', value: String(matches.length) },
      { name: '去重后', value: String(unique.length) },
      { name: '匹配内容', value: unique.slice(0, 20).join(' | ') },
    ];
  } catch (e) {
    return '正则错误：' + e.message;
  }
}

/* ---------- CSS 美化 ---------- */
export function cssBeautify(input) {
  return String(input)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};:])\s*/g, '$1 ')
    .replace(/\s*([,])\s*/g, '$1 ')
    .replace(/\{\s*/g, '{\n  ')
    .replace(/;\s*/g, ';\n  ')
    .replace(/\}\s*/g, '\n}\n')
    .replace(/:\s+/g, ': ')
    .split('\n').map((l) => l.trimEnd()).join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/* ---------- JWT 解码 ---------- */
export function jwtPayload(input) {
  const parts = String(input).trim().split('.');
  if (parts.length !== 3) return 'JWT 格式不正确（应为 三段：header.payload.signature）';
  try {
    const decode = (s) => JSON.stringify(JSON.parse(atob(s.replace(/-/g, '+').replace(/_/g, '/'))), null, 2);
    return [
      { name: 'Header（头部）', value: decode(parts[0]) },
      { name: 'Payload（载荷）', value: decode(parts[1]) },
      { name: 'Signature', value: parts[2] + '（长度 ' + parts[2].length + '）' },
    ];
  } catch {
    return '解码失败：请确认是标准 Base64url JWT';
  }
}

/* ---------- 时间差（当前时间对比） ---------- */
export function timeDiffCalc(values) {
  const t = new Date(values[0]);
  if (Number.isNaN(t.getTime())) return '请输入有效时间';
  const diff = t - new Date();
  const abs = Math.abs(diff);
  const d = Math.floor(abs / 86400000);
  const h = Math.floor((abs % 86400000) / 3600000);
  const m = Math.floor((abs % 3600000) / 60000);
  const s = Math.floor((abs % 60000) / 1000);
  return [
    { name: '方向', value: diff > 0 ? '未来（还未到）' : diff < 0 ? '过去（已过）' : '就是现在' },
    { name: '相差', value: `${d} 天 ${h} 时 ${m} 分 ${s} 秒` },
    { name: '总分钟', value: fmt(abs / 60000, 1) + ' 分钟' },
  ];
}

/* ---------- 数组工具：去重/排序/取前N ---------- */
export function arrayTools(values) {
  const [items, mode] = [String(values[0] || ''), values[1] || 'unique'];
  const arr = items.split(/[\s,，;；]+/).filter(Boolean);
  if (!arr.length) return '请输入数组元素（空格/逗号分隔）';
  if (mode === 'unique') return [...new Set(arr)].join(', ');
  if (mode === 'sort') return arr.sort((a, b) => a.localeCompare(b, 'zh', { numeric: true })).join(', ');
  if (mode === 'reverse') return arr.reverse().join(', ');
  if (mode === 'count') {
    const freq = new Map();
    arr.forEach((x) => freq.set(x, (freq.get(x) || 0) + 1));
    return [...freq.entries()].map(([k, v]) => `${k}: ${v} 次`).join('\n');
  }
  return arr.join(', ');
}
export const arrayToolsUnique = (input) => arrayTools([input, 'unique']);
export const arrayToolsSort = (input) => arrayTools([input, 'sort']);
export const arrayToolsReverse = (input) => arrayTools([input, 'reverse']);
export const arrayToolsCount = (input) => arrayTools([input, 'count']);

/* ---------- 手机号/邮箱正则校验 ---------- */
export function validateContact(values) {
  const [type, value] = [values[0], String(values[1] || '').trim()];
  if (!value) return '请输入内容';
  if (type === 'phone') {
    const ok = /^1[3-9]\d{9}$/.test(value);
    return [{ name: '手机号', value: value }, { name: '校验结果', value: ok ? '格式合法 ✓' : '格式不正确（需 1[3-9] 开头 11 位）' }];
  }
  const ok = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  return [{ name: '邮箱', value: value }, { name: '校验结果', value: ok ? '格式合法 ✓' : '格式不正确' }];
}

/* ---------- 单词计数（英文） ---------- */
export function wordCount(values) {
  const text = String(values[0] || '');
  if (!text.trim()) return '请输入文本';
  const words = text.match(/[a-zA-Z]+(?:['-][a-zA-Z]+)*/g) || [];
  const chars = text.length;
  const sentences = (text.match(/[.!?。！？]+/g) || []).length;
  return [
    { name: '单词数', value: String(words.length) },
    { name: '字符数', value: String(chars) },
    { name: '句子数', value: String(sentences || 1) },
    { name: '平均词长', value: fmt(chars / (words.length || 1), 2) },
  ];
}
