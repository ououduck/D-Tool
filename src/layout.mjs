import { SITE_URL, BRAND, BRAND_NAME, LANG, COPYRIGHT_YEAR, CATEGORIES, ANALYTICS } from './site.config.mjs';

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function logoImg(cls = '') {
  const clsAttr = cls ? ` class="${cls}"` : '';
  return `<img class="logo-img${clsAttr}" src="/assets/logo.png" alt="${BRAND} 标志" width="28" height="28" loading="eager">`;
}

/**
 * 页面骨架
 * opts: {
 *   title          页面标题（含品牌后缀之外的完整 <title>）
 *   description    meta description
 *   keywords       额外关键词（可选）
 *   path           页面路径，如 '/'、'/json/'
 *   body           正文 HTML
 *   toolScript     工具脚本路径（可选，如 /assets/js/t/json.js）
 *   v              静态资源版本号（构建时由内容哈希生成，用于缓存更新）
 *   jsonLd         JSON-LD 对象数组（可选）
 *   isHome         是否首页（决定 h1 结构）
 *   noindex        禁止索引（404 页）
 * }
 */
export function layout(opts) {
  const url = SITE_URL + (opts.path === '/' ? '/' : opts.path);
  const fullTitle = opts.title.includes(BRAND) ? opts.title : `${opts.title} - ${BRAND_NAME}`;
  const kw = opts.keywords ? `${opts.keywords},` : '';

  const jsonLd = (opts.jsonLd || [])
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n');

  const navLinks = CATEGORIES.map(
    (c) => `<a href="/#${c.key}">${c.name}</a>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="${LANG}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(opts.description)}">
<meta name="keywords" content="${esc(kw + BRAND_NAME + ',在线工具箱')}">
${opts.noindex ? '<meta name="robots" content="noindex,follow">' : '<meta name="robots" content="index,follow,max-image-preview:large">'}
<link rel="canonical" href="${esc(url)}">
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#111113">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/logo.png">
<link rel="stylesheet" href="/assets/${opts.assets?.['css/main.css'] || 'css/main.css'}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(BRAND_NAME)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(opts.description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:locale" content="zh_CN">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(opts.description)}">
${jsonLd}
</head>
<body>
<a class="skip-link" href="#main">跳到主要内容</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="logo" href="/" aria-label="${esc(BRAND_NAME)} 首页">
      ${logoImg()}<span class="logo-text">${BRAND}</span><span class="logo-sub">在线工具箱</span>
    </a>
    <nav class="site-nav" aria-label="工具分类">${navLinks}</nav>
  </div>
</header>
<main id="main" class="site-main">
${opts.body}
</main>
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <div class="footer-logo">${logoImg('footer-logo-img')}<span>${BRAND}</span></div>
      <p>纯浏览器本地运行的在线站长工具箱，无需注册登录，数据不上传服务器。</p>
    </div>
    <nav class="footer-col" aria-label="分类">
      <h3>分类</h3>
      ${CATEGORIES.map((c) => `<a href="/#${c.key}">${c.name}</a>`).join('')}
    </nav>
    <nav class="footer-col" aria-label="站点">
      <h3>站点</h3>
      <a href="/about/">关于</a>
      <a href="/privacy/">隐私说明</a>
      <a href="/sitemap.xml">站点地图</a>
    </nav>
  </div>
  <div class="container footer-bottom">
    <span>© ${COPYRIGHT_YEAR} ${BRAND_NAME}</span>
    <a class="beian" href="https://beian.miit.gov.cn" target="_blank" rel="noopener nofollow">湘ICP备2025101669号-3</a>
    <span>所有工具均在浏览器本地运行</span>
  </div>
</footer>
<script type="module" src="/assets/${opts.assets?.['js/main.js'] || 'js/main.js'}"></script>
${opts.toolScript ? `<script type="module" src="${opts.toolScript}"></script>` : ''}
${ANALYTICS && ANALYTICS.umamiScript ? ANALYTICS.umamiScript : ''}
</body>
</html>`;
}

/** 面包屑（工具页用） */
export function breadcrumb(items) {
  // items: [{name, href?}] 最后一级为当前页，不带链接
  const last = items.length - 1;
  const inner = items
    .map((it, i) => {
      const span = i === last
        ? `<span class="crumb-current" aria-current="page">${esc(it.name)}</span>`
        : `<a href="${esc(it.href)}">${esc(it.name)}</a>`;
      return `<li>${span}</li>`;
    })
    .join('<li class="crumb-sep" aria-hidden="true">/</li>');
  return `<nav class="crumbs" aria-label="面包屑"><ol>${inner}</ol></nav>`;
}

/** 工具页通用：标题区（h1 + 描述 + 隐私徽标） */
export function toolHead(name, desc) {
  return `<div class="tool-head">
  <h1>${esc(name)}</h1>
  <p class="tool-desc">${esc(desc)}</p>
  <p class="tool-privacy"><span class="dot" aria-hidden="true"></span>纯浏览器本地运行，数据不上传服务器</p>
</div>`;
}

/** FAQ 区块（details/summary，无需 JS）+ 配套 JSON-LD 由 build 生成 */
export function faqSection(faq) {
  if (!faq || !faq.length) return '';
  return `<section class="faq-section">
  <h2>常见问题</h2>
  ${faq.map((f) => `<details class="faq"><summary>${esc(f.q)}</summary><div class="faq-a">${f.a}</div></details>`).join('\n')}
</section>`;
}

/** 使用说明区块 */
export function usageSection(html) {
  if (!html) return '';
  return `<section class="usage-section"><h2>使用说明</h2>${html}</section>`;
}
