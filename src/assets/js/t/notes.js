/* 在线便签工具脚本（localStorage 自动保存） */
const $ = (s) => document.querySelector(s);
const { toast, downloadBlob } = window.DT;

const KEY = 'dtool-notes-v1';
const areaEl = $('#nt-area'), metaEl = $('#nt-meta');

let timer = 0;

// 恢复
try {
  const saved = localStorage.getItem(KEY);
  if (saved != null) areaEl.value = saved;
} catch {}

function save() {
  try {
    localStorage.setItem(KEY, areaEl.value);
    const kb = (new TextEncoder().encode(areaEl.value).length / 1024).toFixed(1);
    metaEl.textContent = `已自动保存 · ${areaEl.value.length} 字符（${kb} KB）`;
  } catch {
    metaEl.textContent = '保存失败：超出本地存储上限';
  }
}

areaEl.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(save, 500);
});

$('#nt-export').addEventListener('click', () => {
  if (!areaEl.value) return toast('没有可导出的内容');
  const blob = new Blob([areaEl.value], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, `notes-${new Date().toISOString().slice(0, 10)}.txt`);
});

$('#nt-clear').addEventListener('click', () => {
  if (!areaEl.value && !localStorage.getItem(KEY)) return toast('没有内容');
  if (!confirm('确定清空便签内容吗？此操作不可恢复。')) return;
  areaEl.value = '';
  try { localStorage.removeItem(KEY); } catch {}
  metaEl.textContent = '已清空';
});
