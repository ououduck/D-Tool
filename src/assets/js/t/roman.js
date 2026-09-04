/* 罗马数字转换工具脚本 */
import { toRoman, fromRoman } from '../lib/misc.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#ro-in'), outEl = $('#ro-out');

$('#ro-run').addEventListener('click', () => {
  const v = inEl.value.trim();
  if (!v) return toast('请输入内容');
  try {
    if (/^\d+$/.test(v)) {
      outEl.textContent = `${v} = ${toRoman(Number(v))}`;
    } else {
      outEl.textContent = `${v.toUpperCase()} = ${fromRoman(v)}`;
    }
  } catch (e) {
    outEl.textContent = e.message;
  }
});

$('#ro-clear').addEventListener('click', () => { inEl.value = ''; outEl.textContent = '等待输入…'; inEl.focus(); });
