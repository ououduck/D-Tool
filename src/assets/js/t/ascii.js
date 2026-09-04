/* ASCII 与字符互转工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast, escapeHtml } = window.DT;

const inEl = $('#as-in'), tableEl = $('#as-table');

function toRows(chars) {
  const rows = [];
  for (const ch of chars) {
    const cp = ch.codePointAt(0);
    const utf8 = [...new TextEncoder().encode(ch)].map((b) => b.toString(16).padStart(2, '0'));
    rows.push({
      char: ch,
      cp,
      hex: 'U+' + cp.toString(16).toUpperCase().padStart(4, '0'),
      dec: cp,
      bin: cp.toString(2),
      utf8: utf8.length ? utf8.join(' ') : '—',
      ent: cp > 127 ? `&#${cp};` : (ch === '&' ? '&amp;' : ch),
    });
  }
  return rows;
}

$('#as-run').addEventListener('click', () => {
  const v = inEl.value.trim();
  if (!v) return toast('请先输入内容');

  // 数字码值反向查询
  if (/^(0x[0-9a-fA-F]+|\d+)$/.test(v)) {
    const cp = v.startsWith('0x') ? parseInt(v, 16) : parseInt(v, 10);
    if (cp < 0 || cp > 0x10ffff) return toast('码值超出 Unicode 范围');
    const ch = String.fromCodePoint(cp);
    const rows = toRows([ch]);
    tableEl.innerHTML = render(rows);
    return;
  }

  tableEl.innerHTML = render(toRows([...v]));
});

function render(rows) {
  return `<thead><tr><th>字符</th><th>码点</th><th>十进制</th><th>十六进制</th><th>二进制</th><th>UTF-8 字节</th><th>HTML 实体</th></tr></thead><tbody>
${rows.map((r) => `<tr><td><code>${escapeHtml(r.char)}</code></td><td>${r.hex}</td><td>${r.dec}</td><td>${r.dec.toString(16)}</td><td>${r.bin}</td><td>${r.utf8}</td><td>${escapeHtml(r.ent)}</td></tr>`).join('')}
</tbody>`;
}

$('#as-clear').addEventListener('click', () => { inEl.value = ''; tableEl.innerHTML = ''; inEl.focus(); });
