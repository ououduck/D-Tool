/* 凯撒密码工具脚本 */
import { caesar } from '../lib/misc.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#ce-in'), outEl = $('#ce-out'), shiftEl = $('#ce-shift'), decodeEl = $('#ce-decode');

function run(shiftOverride = null, decodeOverride = null) {
  const v = inEl.value;
  if (!v) return '';
  const shift = shiftOverride ?? Math.min(25, Math.max(1, Math.round(Number(shiftEl.value) || 3)));
  const decode = decodeOverride ?? decodeEl.checked;
  return caesar(v, shift, decode);
}

$('#ce-run').addEventListener('click', () => {
  if (!inEl.value) return toast('请先输入内容');
  outEl.value = run();
});

$('#ce-brute').addEventListener('click', () => {
  if (!inEl.value) return toast('请先输入内容');
  outEl.value = Array.from({ length: 25 }, (_, i) => {
    const s = i + 1;
    return `位移 ${String(s).padStart(2)}：${caesar(inEl.value, s, true)}`;
  }).join('\n');
});

$('#ce-clear').addEventListener('click', () => { inEl.value = ''; outEl.value = ''; inEl.focus(); });
