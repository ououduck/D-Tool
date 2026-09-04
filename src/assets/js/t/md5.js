/* MD5 在线加密工具脚本（实时计算） */
import { md5 } from '../lib/md5.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#md5-in'), outEl = $('#md5-out'), upper = $('#md5-upper');

const render = () => {
  const v = inEl.value;
  if (!v) { outEl.value = ''; outEl.placeholder = '等待输入…'; return; }
  const h = md5(v);
  outEl.value = upper.checked ? h.toUpperCase() : h;
};

inEl.addEventListener('input', render);
upper.addEventListener('change', render);

$('#md5-clear').addEventListener('click', () => { inEl.value = ''; render(); inEl.focus(); toast('已清空'); });
render();
