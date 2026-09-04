/* XML 格式化/压缩工具脚本（token 化处理，保留注释与 CDATA） */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#xl-in'), outEl = $('#xl-out'), msgEl = $('#xl-msg'), indent2 = $('#xl-indent2');

const TOKEN_RE = /<\?[\s\S]*?\?>|<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<!DOCTYPE[\s\S]*?>|<\/?[A-Za-z][\w:.-]*(?:\s[^<>]*?)?\/?>|[^<]+/g;

function tokenize(s) {
  const tokens = [];
  let m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(s))) tokens.push(m[0]);
  return tokens;
}

function formatXml(s, unit) {
  const out = [];
  let depth = 0;
  const line = (t) => out.push(unit.repeat(depth) + t);
  for (const t of tokenize(s)) {
    if (/^\s+$/.test(t)) continue; // 标签间纯空白
    if (/^<\//.test(t)) { depth = Math.max(0, depth - 1); line(t); continue; }
    if (/^<\?|^<!--|^<!\[CDATA\[|^<!DOCTYPE|^<[^>]*\/>$/.test(t)) { line(t); continue; }
    if (/^</.test(t)) { line(t); depth++; continue; }
    // 文本节点：原样输出，去掉首尾多余空白
    const txt = t.trim();
    if (txt) line(txt);
  }
  return out.join('\n');
}

function minifyXml(s) {
  return tokenize(s).filter((t) => !/^\s+$/.test(t)).join('');
}

$('#xl-format').addEventListener('click', () => {
  const v = inEl.value.trim();
  if (!v) return toast('请先输入 XML');
  outEl.value = formatXml(v, indent2.checked ? '  ' : '    ');
  msgEl.innerHTML = `${window.DT.iconOk} 格式化完成（${outEl.value.length.toLocaleString()} 字符）`;
  msgEl.classList.remove('hidden');
});

$('#xl-minify').addEventListener('click', () => {
  const v = inEl.value.trim();
  if (!v) return toast('请先输入 XML');
  outEl.value = minifyXml(v);
  msgEl.innerHTML = `${window.DT.iconOk} 压缩完成（${outEl.value.length.toLocaleString()} 字符）`;
  msgEl.classList.remove('hidden');
});

$('#xl-clear').addEventListener('click', () => { inEl.value = ''; outEl.value = ''; msgEl.classList.add('hidden'); inEl.focus(); });
