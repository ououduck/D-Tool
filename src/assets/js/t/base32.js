/* Base32 编码/解码工具脚本 */
import { base32Encode, base32Decode } from '../lib/misc.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#b2-in'), outEl = $('#b2-out');

$('#b2-encode').addEventListener('click', () => {
  const v = inEl.value;
  if (!v) return toast('请先输入内容');
  outEl.value = base32Encode(v);
});

$('#b2-decode').addEventListener('click', () => {
  const v = inEl.value.trim();
  if (!v) return toast('请先输入内容');
  try {
    outEl.value = base32Decode(v);
  } catch {
    toast('解码失败：不是合法的 Base32 文本');
  }
});

$('#b2-clear').addEventListener('click', () => { inEl.value = ''; outEl.value = ''; inEl.focus(); });
