/* 命名格式转换工具脚本 */
import { CONVERTERS } from '../lib/caseconv.js';

const $ = (s) => document.querySelector(s);
const { escapeHtml } = window.DT;

const inEl = $('#cc-in'), outEl = $('#cc-out');

inEl.addEventListener('input', () => {
  const v = inEl.value.trim();
  if (!v) { outEl.innerHTML = '<div class="empty">输入后实时转换</div>'; return; }
  outEl.innerHTML = CONVERTERS.map(([name, fn, tip]) => {
    let val;
    try { val = fn(v); } catch { val = '—'; }
    return `<div class="case-row">
  <span class="cname">${escapeHtml(name)}</span>
  <code>${escapeHtml(val)}</code>
  <span class="text-3" style="font-size:12px;display:none">${escapeHtml(tip)}</span>
  <span class="spacer"></span>
  <button class="btn btn-ghost btn-sm" data-copy="${escapeHtml(val)}">复制</button>
</div>`;
  }).join('');
});
