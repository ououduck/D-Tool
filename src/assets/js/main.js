/* D-Tool 全站脚本：导航、首页搜索、复制、轻提示
   仅 ~2KB，模块化按需调用；工具页各自引入 /assets/js/t/<工具>.js */

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

function escapeHtml(s = '') {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* 黑白风格状态图标（替代 emoji，跟随文字颜色渲染） */
const iconOk = `<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><circle cx="7" cy="7" r="7" fill="currentColor"/><path d="M4 7.2l2 2 4-4.4" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const iconErr = `<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><circle cx="7" cy="7" r="7" fill="currentColor"/><path d="M7 4v3.6" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><circle cx="7" cy="10.2" r="1" fill="#fff"/></svg>`;

/* ---------- 轻提示 Toast ---------- */
let toastEl = null, toastTimer = 0;
function toast(msg) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.setAttribute('role', 'status');
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  requestAnimationFrame(() => toastEl.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1700);
}

/* ---------- 复制 ---------- */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch { return false; }
  }
}

/* data-copy 通用按钮：
   <button data-copy="固定文本"> 或 <button data-copy-from="#out">（读取元素 value / textContent） */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-copy], [data-copy-from]');
  if (!btn) return;
  let text = '';
  if (btn.hasAttribute('data-copy')) {
    text = btn.getAttribute('data-copy');
  } else if (btn.hasAttribute('data-copy-from')) {
    const el = $(btn.getAttribute('data-copy-from'));
    if (el) text = el.value !== undefined ? el.value : el.textContent;
  }
  if (!text) { toast('没有可复制的内容'); return; }
  copyText(text).then((ok) => toast(ok ? '已复制到剪贴板' : '复制失败，请手动选中复制'));
});

/* ---------- 首页工具搜索 ---------- */
const searchInput = $('#tool-search');
if (searchInput) {
  const cards = $$('.tool-card');
  const sections = $$('.home-section');
  const count = $('#tool-count');
  const total = cards.length;
  const apply = (q) => {
    q = q.trim().toLowerCase();
    let visible = 0;
    for (const card of cards) {
      const hit = !q || card.textContent.toLowerCase().includes(q);
      card.classList.toggle('hidden', !hit);
      if (hit) visible++;
    }
    for (const sec of sections) {
      const any = $$('.tool-card', sec).some((c) => !c.classList.contains('hidden'));
      sec.classList.toggle('hidden', !any);
    }
    if (count) count.textContent = `${visible}/${total}`;
  };
  searchInput.addEventListener('input', () => apply(searchInput.value));
  document.addEventListener('keydown', (e) => {
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) {
      e.preventDefault();
      searchInput.focus();
    }
  });
  // 支持 ?q= 预填（配合 JSON-LD SearchAction）
  const q = new URLSearchParams(location.search).get('q');
  if (q) {
    searchInput.value = q;
    apply(q);
  }
}

window.DT = { $, $$, toast, copyText, escapeHtml, iconOk, iconErr };
