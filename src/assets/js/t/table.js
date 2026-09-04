/* 共享运行时：速查表格（build 时渲染静态表格 + 前端搜索过滤）
   页面结构：搜索框 #tb-search、表格 #tb-table、计数 #tb-count（可选） */

const $ = (s) => document.querySelector(s);
const table = $('#tb-table');
if (!table) return;

const search = $('#tb-search');
const count = $('#tb-count');
const rows = [...table.querySelectorAll('tbody tr')];
const total = rows.length;

function apply(q) {
  q = q.trim().toLowerCase();
  let visible = 0;
  for (const tr of rows) {
    const hit = !q || tr.textContent.toLowerCase().includes(q);
    tr.classList.toggle('hidden', !hit);
    if (hit) visible++;
  }
  if (count) count.textContent = q ? `匹配 ${visible} / ${total} 条` : `共 ${total} 条`;
}

if (search) search.addEventListener('input', () => apply(search.value));
apply('');
