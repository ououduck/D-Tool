/* UUID 生成器工具脚本 */
import { uuidList } from '../lib/uuid.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const countEl = $('#uu-count'), upperEl = $('#uu-upper'), nohyphenEl = $('#uu-nohyphen'), outEl = $('#uu-out');

$('#uu-run').addEventListener('click', () => {
  const count = Math.min(100, Math.max(1, Math.round(Number(countEl.value) || 1)));
  const list = uuidList(count, { upper: upperEl.checked });
  outEl.value = list.map((u) => (nohyphenEl.checked ? u.replace(/-/g, '') : u)).join('\n');
  toast(`已生成 ${count} 个 UUID`);
});

$('#uu-clear').addEventListener('click', () => { outEl.value = ''; countEl.focus(); });
