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
    const meta = $('#search-meta');
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
      if (count) count.textContent = String(visible);
      if (meta) meta.textContent = q ? `找到 ${visible} 款工具` : `共 ${total} 款工具`;
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

/* ---------- 返回顶部（滚动超过一屏显示） ---------- */
const toTop = $('#to-top');
if (toTop) {
  const toggle = () => toTop.classList.toggle('show', scrollY > window.innerHeight * 0.8);
  addEventListener('scroll', toggle, { passive: true });
  toggle();
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- 移动端抽屉菜单 ---------- */
const navToggle = $('#nav-toggle');
const drawer = $('#drawer');
const drawerMask = $('#drawer-mask');
const drawerClose = $('#drawer-close');
if (navToggle && drawer) {
  const close = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    if (drawerMask) { drawerMask.classList.remove('show'); drawerMask.hidden = true; }
    document.body.classList.remove('drawer-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  };
  const open = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (drawerMask) { drawerMask.hidden = false; requestAnimationFrame(() => drawerMask.classList.add('show')); }
    document.body.classList.add('drawer-open');
    navToggle.setAttribute('aria-expanded', 'true');
  };
  navToggle.addEventListener('click', () => {
    drawer.classList.contains('open') ? close() : open();
  });
  if (drawerClose) drawerClose.addEventListener('click', close);
  if (drawerMask) drawerMask.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) close();
  });
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
}

/* ---------- 图片工具共享助手 ---------- */
/* 拖拽上传区：绑定点击/键盘/拖拽，校验图片类型与大小 */
function setupDropzone(dropEl, fileEl, onFile, { maxMB = 20 } = {}) {
  dropEl.addEventListener('click', () => fileEl.click());
  dropEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileEl.click(); }
  });
  dropEl.addEventListener('dragover', (e) => { e.preventDefault(); dropEl.classList.add('drag'); });
  dropEl.addEventListener('dragleave', () => dropEl.classList.remove('drag'));
  dropEl.addEventListener('drop', (e) => {
    e.preventDefault();
    dropEl.classList.remove('drag');
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFile(f);
  });
  fileEl.addEventListener('change', () => {
    if (fileEl.files[0]) handleFile(fileEl.files[0]);
    fileEl.value = '';
  });
  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return toast('请选择图片文件');
    if (file.size > maxMB * 1024 * 1024) return toast(`图片过大（>${maxMB}MB）`);
    onFile(file);
  }
}

/* 加载图片文件为 HTMLImageElement（返回 Promise） */
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, url, file });
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('无法读取该图片')); };
    img.src = url;
  });
}

/* 下载 Blob 为文件 */
function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* canvas → Blob */
function canvasToBlob(canvas, type = 'image/png', quality = 0.92) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('导出失败'))), type, quality);
  });
}

/* ---------- 关于页 GitHub 卡片（星标/Fork 数，1 小时本地缓存） ---------- */
const ghCard = document.querySelector('.github-card[data-repo]');
if (ghCard) {
  const repo = ghCard.dataset.repo;
  const cacheKey = `dtool-gh-${repo}`;
  let cached = null;
  try { cached = JSON.parse(localStorage.getItem(cacheKey)); } catch {}
  const apply = (d) => {
    const s = ghCard.querySelector('.gh-stars');
    const f = ghCard.querySelector('.gh-forks');
    if (s && d.stargazers_count != null) s.textContent = d.stargazers_count.toLocaleString();
    if (f && d.forks_count != null) f.textContent = d.forks_count.toLocaleString();
  };
  // 三个数据源并行竞速（GitHub API / jsDelivr / shields.io），谁先成功用谁
  const fetchGh = () =>
    fetch(`https://api.github.com/repos/${repo}`).then((r) => (r.ok ? r.json() : Promise.reject()));
  const fetchJsdelivr = () =>
    fetch(`https://data.jsdelivr.com/v1/packages/gh/${repo}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => ({ stargazers_count: d.stars, forks_count: d.forks }));
  const fetchShields = async () => {
    const [stars, forks] = await Promise.all([
      fetch(`https://img.shields.io/github/stars/${repo}.json`).then((r) => r.json()),
      fetch(`https://img.shields.io/github/forks/${repo}.json`).then((r) => r.json()),
    ]);
    const num = (v) => {
      const s = String(v.value || '').toLowerCase().replace(/,/g, '');
      return s.includes('k') ? Math.round(parseFloat(s) * 1000) : parseInt(s, 10) || 0;
    };
    return { stargazers_count: num(stars), forks_count: num(forks) };
  };
  if (cached && Date.now() - cached.t < 3600e3) {
    apply(cached.d);
  } else {
    Promise.any([fetchGh(), fetchJsdelivr(), fetchShields()])
      .then((d) => {
        apply(d);
        try { localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), d })); } catch {}
      })
      .catch(() => {}); // 全部失败时保留占位，不影响页面
  }
}

window.DT = { $, $$, toast, copyText, escapeHtml, iconOk, iconErr, setupDropzone, loadImage, downloadBlob, canvasToBlob };
