/* 假文生成工具脚本 */
import { loremCn, loremEn } from '../lib/lorem.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const typeEl = $('#lo-type'), paraEl = $('#lo-para'), sentEl = $('#lo-sent'), outEl = $('#lo-out');

$('#lo-run').addEventListener('click', () => {
  const paras = Math.min(20, Math.max(1, Math.round(Number(paraEl.value) || 3)));
  const sents = Math.min(30, Math.max(1, Math.round(Number(sentEl.value) || 5)));
  outEl.value = typeEl.value === 'cn' ? loremCn(paras, sents) : loremEn(paras, sents);
  toast(`已生成 ${paras} 段占位文本`);
});

$('#lo-clear').addEventListener('click', () => { outEl.value = ''; typeEl.focus(); });
