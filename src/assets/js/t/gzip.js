/* Gzip 压缩/解压工具脚本 */
import { SUPPORTED, compressToBytes, decompressToText, bytesToB64, b64ToBytes } from '../lib/gzip.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#gz-in'), outEl = $('#gz-out'), metaEl = $('#gz-meta'), deflate = $('#gz-deflate');

if (!SUPPORTED) {
  $('#gz-warn').classList.remove('hidden');
  $('#gz-compress').disabled = true;
  $('#gz-decompress').disabled = true;
}

const fmtSize = (n) => {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
};

$('#gz-compress').addEventListener('click', async () => {
  const v = inEl.value;
  if (!v) return toast('请先输入内容');
  try {
    const bytes = await compressToBytes(v, deflate.checked ? 'deflate' : 'gzip');
    outEl.value = bytesToB64(bytes);
    const raw = new TextEncoder().encode(v).length;
    metaEl.textContent = `压缩前 ${fmtSize(raw)} → 压缩后 ${fmtSize(bytes.length)}（含 Base64 文本 ${fmtSize(outEl.value.length)}），压缩率 ${(100 - (bytes.length / raw) * 100).toFixed(1)}%`;
  } catch {
    toast('压缩失败');
  }
});

$('#gz-decompress').addEventListener('click', async () => {
  const v = inEl.value.trim();
  if (!v) return toast('请先输入内容');
  try {
    const text = await decompressToText(b64ToBytes(v), deflate.checked ? 'deflate' : 'gzip');
    outEl.value = text;
    metaEl.textContent = `解压成功，原文 ${text.length} 字符，Base64 输入 ${fmtSize(b64ToBytes(v).length)}`;
  } catch {
    toast('解压失败：数据不是有效的 gzip/deflate Base64 内容');
  }
});

$('#gz-clear').addEventListener('click', () => { inEl.value = ''; outEl.value = ''; metaEl.textContent = ''; inEl.focus(); });
