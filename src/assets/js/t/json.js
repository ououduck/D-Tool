/* JSON 格式化/校验工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#js-in'), outEl = $('#js-out'), msgEl = $('#js-msg'), sortEl = $('#js-sort'), indentEl = $('#js-indent');

function parse(input) {
  try {
    return { ok: true, value: JSON.parse(input) };
  } catch (e) {
    const m = String(e.message);
    const pos = m.match(/position (\d+)/);
    let loc = m;
    if (pos) {
      const idx = Number(pos[1]);
      const before = input.slice(0, idx);
      const line = before.split('\n').length;
      const col = idx - before.lastIndexOf('\n');
      loc = `第 ${line} 行，第 ${col} 列`;
    }
    return { ok: false, error: m, loc };
  }
}

function showMsg(text, ok) {
  // ok=true 显示对勾图标，否则显示错误图标；内容为静态文案，可安全使用 innerHTML
  msgEl.innerHTML = (ok ? window.DT.iconOk : window.DT.iconErr) + ' ' + text;
  msgEl.classList.remove('hidden');
}

const indent = () => (indentEl.value === 'tab' ? '\t' : ' '.repeat(Number(indentEl.value)));

$('#js-format').addEventListener('click', () => {
  const v = inEl.value.trim();
  if (!v) return toast('请先输入 JSON');
  const r = parse(v);
  if (!r.ok) { showMsg(`解析失败：${r.error}（${r.loc}）`, false); outEl.value = ''; return; }
  const sorted = sortEl.checked ? sortKeys(r.value) : r.value;
  outEl.value = JSON.stringify(sorted, null, indent());
  showMsg(`JSON 合法，格式化完成（${outEl.value.length.toLocaleString()} 字符）`, true);
});

$('#js-compress').addEventListener('click', () => {
  const v = inEl.value.trim();
  if (!v) return toast('请先输入 JSON');
  const r = parse(v);
  if (!r.ok) { showMsg(`解析失败：${r.error}（${r.loc}）`, false); outEl.value = ''; return; }
  const sorted = sortEl.checked ? sortKeys(r.value) : r.value;
  outEl.value = JSON.stringify(sorted);
  showMsg(`JSON 合法，压缩完成（${outEl.value.length.toLocaleString()} 字符）`, true);
});

$('#js-validate').addEventListener('click', () => {
  const v = inEl.value.trim();
  if (!v) return toast('请先输入 JSON');
  const r = parse(v);
  showMsg(r.ok ? 'JSON 语法正确' : `解析失败：${r.error}（${r.loc}）`, r.ok);
});

$('#js-clear').addEventListener('click', () => { inEl.value = ''; outEl.value = ''; msgEl.classList.add('hidden'); inEl.focus(); });

function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, sortKeys(v)])
    );
  }
  return value;
}
