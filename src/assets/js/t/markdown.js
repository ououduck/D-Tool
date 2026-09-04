/* Markdown 编辑器工具脚本 */
import { renderMarkdown } from '../lib/markdown.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const { toast } = window.DT;

const inEl = $('#md-in'), outEl = $('#md-out');
let timer = 0;

const render = () => {
  const v = inEl.value;
  outEl.innerHTML = v ? renderMarkdown(v) : '<p class="text-3">等待输入…</p>';
};

inEl.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(render, 100);
});

function insert(tpl) {
  const start = inEl.selectionStart, end = inEl.selectionEnd;
  const sel = inEl.value.slice(start, end);
  const replacement = tpl.replace('$sel', sel || '文本');
  inEl.value = inEl.value.slice(0, start) + replacement + inEl.value.slice(end);
  inEl.focus();
  const pos = start + replacement.length;
  inEl.setSelectionRange(pos, pos);
  render();
}

$$('.seg button[data-md]').forEach((b) => b.addEventListener('click', () => insert(b.dataset.md)));

$('#md-clear').addEventListener('click', () => { inEl.value = ''; render(); inEl.focus(); toast('已清空'); });

render();
