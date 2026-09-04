/* 单位换算工具脚本 */
import { UNIT_CATEGORIES, convertUnits, formatNumber } from '../lib/units.js';

const $ = (s) => document.querySelector(s);
const { escapeHtml } = window.DT;

const catEl = $('#un-cat'), valEl = $('#un-val'), fromEl = $('#un-from'), toEl = $('#un-to');
const resultEl = $('#un-result'), tableEl = $('#un-table');

/* 构建类别下拉 */
for (const [key, cat] of Object.entries(UNIT_CATEGORIES)) {
  const opt = document.createElement('option');
  opt.value = key;
  opt.textContent = cat.name;
  catEl.appendChild(opt);
}

function fillUnits(select, keep) {
  const cat = UNIT_CATEGORIES[catEl.value];
  select.innerHTML = '';
  for (const [key, [label]] of Object.entries(cat.units)) {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = label;
    select.appendChild(opt);
  }
  select.value = keep && cat.units[keep] ? keep : Object.keys(cat.units)[0];
}

function render() {
  const cat = UNIT_CATEGORIES[catEl.value];
  const v = parseFloat(valEl.value);
  if (!Number.isFinite(v)) { resultEl.innerHTML = ''; tableEl.innerHTML = ''; return; }

  // 顶部换算结果
  const converted = convertUnits(v, fromEl.value, toEl.value, cat);
  const fromLabel = cat.units[fromEl.value][0], toLabel = cat.units[toEl.value][0];
  resultEl.innerHTML = `<div class="stat"><div class="num">${escapeHtml(formatNumber(converted))}</div><div class="lbl">${escapeHtml(toLabel)}</div></div>
  <div class="stat"><div class="num">${escapeHtml(formatNumber(v))}</div><div class="lbl">${escapeHtml(fromLabel)}</div></div>`;

  // 全单位对照表
  const rows = Object.entries(cat.units)
    .map(([key, [label]]) => {
      const val = convertUnits(v, fromEl.value, key, cat);
      return `<tr><td><code>${escapeHtml(label)}</code></td><td>${escapeHtml(formatNumber(val))}</td><td><button class="btn btn-ghost btn-sm" data-copy="${escapeHtml(String(val))}">复制</button></td></tr>`;
    })
    .join('');
  tableEl.innerHTML = `<thead><tr><th>单位</th><th>换算值</th><th></th></tr></thead><tbody>${rows}</tbody>`;
}

catEl.addEventListener('change', () => { fillUnits(fromEl); fillUnits(toEl, fromEl.value); render(); });
fromEl.addEventListener('change', render);
toEl.addEventListener('change', render);
valEl.addEventListener('input', render);

fillUnits(fromEl);
fillUnits(toEl, fromEl.value);
render();
