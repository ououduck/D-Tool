/* 正则表达式测试工具脚本 */
const $ = (s) => document.querySelector(s);
const { escapeHtml } = window.DT;

const patternEl = $('#re-pattern'), textEl = $('#re-text'), outEl = $('#re-out'), replEl = $('#re-repl');
const replInput = $('#re-replace');

function buildRegExp() {
  const src = patternEl.value;
  if (!src) return null;
  let flags = 'g';
  for (const f of ['i', 'm', 's', 'u']) {
    if ($(`#re-${f}`).checked) flags += f;
  }
  return new RegExp(src, flags);
}

function lineColAt(text, idx) {
  let line = 1, col = 1;
  for (let i = 0; i < idx && i < text.length; i++) {
    if (text[i] === '\n') { line++; col = 1; } else col++;
  }
  return { line, col };
}

$('#re-run').addEventListener('click', () => {
  const text = textEl.value;
  let re;
  try {
    re = buildRegExp();
  } catch (e) {
    outEl.textContent = `正则编译失败：${e.message}`;
    replEl.textContent = '';
    return;
  }
  if (!re) { outEl.textContent = '请先输入正则表达式'; replEl.textContent = ''; return; }
  if (!text) { outEl.textContent = '请先输入测试文本'; replEl.textContent = ''; return; }

  const lines = [];
  const t0 = performance.now();
  let count = 0;
  let warned = false;
  re.lastIndex = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    count++;
    if (count > 2000) { warned = true; break; }
    if (m.index === re.lastIndex) re.lastIndex++; // 零宽匹配防死循环
    if (performance.now() - t0 > 3000) { warned = true; break; }
    const { line, col } = lineColAt(text, m.index);
    const parts = [`#${count}  ${line}:${col}  "${escapeHtml(m[0])}"`];
    if (m.length > 1) {
      for (let g = 1; g < m.length; g++) {
        parts.push(`    组${g}: ${m[g] === undefined ? '(未参与)' : `"${escapeHtml(m[g])}"`}`);
      }
    }
    lines.push(parts.join('\n'));
  }

  if (count === 0 && !re.global) {
    outEl.textContent = '未匹配到任何结果';
  } else {
    outEl.innerHTML = lines.join('\n') + (warned ? '\n\n（匹配过多，已提前终止，请精化正则）' : '') || '未匹配到任何结果';
  }

  // 替换预览
  if (replInput.value !== '') {
    try {
      const r = new RegExp(re.source, re.flags);
      const result = text.replace(r, replInput.value);
      replEl.textContent = `替换后（${count} 处）：\n` + result.slice(0, 2000) + (result.length > 2000 ? '\n…（内容过长已截断）' : '');
    } catch (e) {
      replEl.textContent = `替换失败：${e.message}`;
    }
  } else {
    replEl.textContent = '填写“替换为”后显示预览';
  }
});

replInput.addEventListener('input', () => $('#re-run').click());

$('#re-clear').addEventListener('click', () => {
  patternEl.value = ''; textEl.value = ''; replInput.value = '';
  outEl.textContent = '等待测试…'; replEl.textContent = '等待测试…';
  patternEl.focus();
});
