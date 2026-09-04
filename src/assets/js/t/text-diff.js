/* 文本对比工具脚本 */
import { diffLines, MAX_LINES } from '../lib/diff.js';

const $ = (s) => document.querySelector(s);
const { escapeHtml, toast } = window.DT;

const aEl = $('#td-a'), bEl = $('#td-b'), statsEl = $('#td-stats'), outEl = $('#td-out');

$('#td-run').addEventListener('click', () => {
  const a = aEl.value, b = bEl.value;
  if (!a && !b) return toast('请先输入两侧文本');
  const result = diffLines(a, b);
  if (result === null) {
    outEl.innerHTML = `<p class="empty">单侧文本超过 ${MAX_LINES} 行，请分段对比</p>`;
    statsEl.textContent = '';
    return;
  }
  const added = result.filter((x) => x.type === 'add').length;
  const removed = result.filter((x) => x.type === 'del').length;
  const same = result.filter((x) => x.type === 'same').length;

  let an = 0, bn = 0;
  const rows = result.map((r) => {
    if (r.type !== 'add') an++;
    if (r.type !== 'del') bn++;
    const no = r.type === 'del' ? `${an}` : r.type === 'add' ? `${bn}` : `${an} ${bn}`;
    return `<div class="drow ${r.type}"><span class="dno">${no}</span><span class="dtxt">${escapeHtml(r.text) || '&nbsp;'}</span></div>`;
  }).join('');

  statsEl.innerHTML = `共 ${result.length} 行 · <strong>新增 ${added}</strong> · <del>删除 ${removed}</del> · 不变 ${same}`;
  outEl.innerHTML = rows;
});

$('#td-swap').addEventListener('click', () => {
  const t = aEl.value;
  aEl.value = bEl.value;
  bEl.value = t;
});

$('#td-clear').addEventListener('click', () => { aEl.value = ''; bEl.value = ''; statsEl.textContent = ''; outEl.innerHTML = ''; aEl.focus(); });
