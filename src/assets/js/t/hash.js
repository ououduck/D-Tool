/* SHA 哈希计算工具脚本（文本 + 文件） */
import { hashAll } from '../lib/sha.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#sh-in'), outEl = $('#sh-out'), metaEl = $('#sh-meta'), fileEl = $('#sh-file');

let fileBuffer = null, fileName = '';

async function compute(buffer, label) {
  outEl.textContent = '计算中…';
  const t0 = performance.now();
  const h = await hashAll(null, buffer);
  const ms = Math.max(1, Math.round(performance.now() - t0));
  outEl.textContent = Object.entries(h)
    .map(([algo, hex]) => `${algo.toUpperCase().replace('SHA', 'SHA-')} : ${hex}`)
    .join('\n');
  metaEl.textContent = `${label}，共 ${buffer.byteLength.toLocaleString()} 字节，耗时 ${ms}ms`;
}

$('#sh-run').addEventListener('click', async () => {
  if (fileBuffer) {
    await compute(fileBuffer, `文件：${fileName}`);
  } else if (inEl.value) {
    await compute(new TextEncoder().encode(inEl.value), `文本：${inEl.value.length} 字符`);
  } else {
    toast('请输入文本或选择文件');
  }
});

fileEl.addEventListener('change', async () => {
  const f = fileEl.files[0];
  if (!f) return;
  if (f.size > 512 * 1024 * 1024) return toast('文件过大（>512MB）');
  try {
    fileBuffer = await f.arrayBuffer();
    fileName = f.name;
    await compute(fileBuffer, `文件：${f.name}`);
  } catch {
    toast('读取文件失败');
  }
});

$('#sh-clear').addEventListener('click', () => {
  inEl.value = ''; fileEl.value = ''; fileBuffer = null; fileName = '';
  outEl.textContent = '等待输入…'; metaEl.textContent = '';
  inEl.focus();
});
