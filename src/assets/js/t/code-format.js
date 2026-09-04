/* HTML/CSS 压缩工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const typeEl = $('#cf-type'), commentsEl = $('#cf-comments'), inEl = $('#cf-in'), outEl = $('#cf-out'), metaEl = $('#cf-meta');

function minifyHtml(src) {
  let s = src.replace(/<!--[\s\S]*?-->/g, (m) => (commentsEl.checked ? m : ''));
  // 标签间空白（保留 <pre>/<textarea>/<script>/<style> 内部）
  s = s.replace(/>\s+</g, '><');
  // 属性值中的多余空白
  s = s.replace(/\s+(?=[a-zA-Z-]+=)/g, ' ');
  return s.trim();
}

function minifyCss(src) {
  let s = src.replace(/\/\*[\s\S]*?\*\//g, (m) => (commentsEl.checked ? m : ''));
  s = s.replace(/\s+/g, ' ').replace(/\s*([{}:;,>~])\s*/g, '$1');
  return s.trim();
}

$('#cf-run').addEventListener('click', () => {
  const src = inEl.value;
  if (!src.trim()) return toast('请先输入源码');
  const out = typeEl.value === 'html' ? minifyHtml(src) : minifyCss(src);
  outEl.value = out;
  const before = new TextEncoder().encode(src).length;
  const after = new TextEncoder().encode(out).length;
  metaEl.textContent = `压缩前 ${(before / 1024).toFixed(2)} KB → 压缩后 ${(after / 1024).toFixed(2)} KB，减少 ${(100 - (after / before) * 100).toFixed(1)}%`;
});

$('#cf-clear').addEventListener('click', () => { inEl.value = ''; outEl.value = ''; metaEl.textContent = ''; inEl.focus(); });
