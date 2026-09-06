/* 罗马数字转换工具脚本 */
import { toRoman, fromRoman } from '../lib/misc.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#ro-in'), outEl = $('#ro-out');

const run = () => {
  const v = inEl.value.trim();
  if (!v) { outEl.textContent = '等待输入…'; return; }
  try {
    if (/^\d+$/.test(v)) {
      outEl.textContent = `${v} = ${toRoman(Number(v))}`;
    } else {
      outEl.textContent = `${v.toUpperCase()} = ${fromRoman(v)}`;
    }
  } catch (e) {
    outEl.textContent = e.message;
  }
};

$('#ro-run').addEventListener('click', run);
/* 输入即算（所见即所得） */
inEl.addEventListener('input', run);

$('#ro-clear').addEventListener('click', () => { inEl.value = ''; outEl.textContent = '等待输入…'; inEl.focus(); });
