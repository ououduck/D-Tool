/* 摩斯电码工具脚本 */
import { textToMorse, morseToText } from '../lib/misc.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#mo-in'), outEl = $('#mo-out');

$('#mo-encode').addEventListener('click', () => {
  const v = inEl.value.trim();
  if (!v) return toast('请先输入内容');
  outEl.value = textToMorse(v);
});

$('#mo-decode').addEventListener('click', () => {
  const v = inEl.value.trim();
  if (!v) return toast('请先输入内容');
  outEl.value = morseToText(v);
});

$('#mo-clear').addEventListener('click', () => { inEl.value = ''; outEl.value = ''; inEl.focus(); });
