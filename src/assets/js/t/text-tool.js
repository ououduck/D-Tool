/* 文本处理/统计工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#tt-in');

/* ---------- 统计 ---------- */
const els = { c1: $('#tt-c1'), c2: $('#tt-c2'), words: $('#tt-words'), lines: $('#tt-lines'), bytes: $('#tt-bytes') };

function stats() {
  const v = inEl.value;
  if (!v) { for (const k in els) els[k].textContent = '0'; return; }
  const noSpace = v.replace(/\s/g, '');
  // 字数：连续 ASCII 字母/数字算 1 词，其余每个字符算 1
  const cjkCount = [...v.replace(/[A-Za-z0-9]+/g, ' ')].filter((c) => c.trim()).length;
  const latinWords = (v.match(/[A-Za-z0-9]+/g) || []).length;
  els.c1.textContent = [...v].length.toLocaleString();
  els.c2.textContent = [...noSpace].length.toLocaleString();
  els.words.textContent = (cjkCount + latinWords).toLocaleString();
  els.lines.textContent = (v.split('\n').length).toLocaleString();
  els.bytes.textContent = new TextEncoder().encode(v).length.toLocaleString();
}

inEl.addEventListener('input', stats);

/* ---------- 处理 ---------- */
const replace = (fn) => {
  const out = fn(inEl.value);
  if (out === inEl.value) { toast('文本未变化'); return; }
  inEl.value = out;
  stats();
};

$('#tt-dedup').addEventListener('click', () => replace((v) => [...new Set(v.split('\n'))].join('\n')));
$('#tt-dedup-sort').addEventListener('click', () => replace((v) => [...new Set(v.split('\n'))].sort((a, b) => a.localeCompare(b, 'zh')).join('\n')));
$('#tt-sort').addEventListener('click', () => replace((v) => v.split('\n').sort((a, b) => a.localeCompare(b, 'zh')).join('\n')));
$('#tt-sort-d').addEventListener('click', () => replace((v) => v.split('\n').sort((a, b) => b.localeCompare(a, 'zh')).join('\n')));
$('#tt-reverse').addEventListener('click', () => replace((v) => v.split('\n').reverse().join('\n')));
$('#tt-clear-lines').addEventListener('click', () => replace((v) => v.split('\n').filter((l) => l.trim() !== '').join('\n')));
$('#tt-trim').addEventListener('click', () => replace((v) => v.split('\n').map((l) => l.trim()).join('\n')));

$('#tt-clear').addEventListener('click', () => { inEl.value = ''; stats(); inEl.focus(); toast('已清空'); });

stats();
