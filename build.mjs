/* D-Tool 构建脚本 —— 零依赖，node build.mjs
   - 生成全部页面到 dist/（首页、30+ 工具页、关于、隐私、404）
   - 复制静态资源并附加内容哈希版本号（缓存友好）
   - 生成 sitemap.xml / robots.txt / _headers / _redirects
   - --serve 启动本地预览服务器（默认 8787 端口） */

import { readdirSync, readFileSync, statSync, cpSync, rmSync, mkdirSync, writeFileSync, existsSync, renameSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import http from 'node:http';

import { SITE_URL, BRAND, BRAND_NAME, SITE_DESC, CATEGORIES, SITE_KEYWORDS } from './src/site.config.mjs';
import { layout, breadcrumb, toolHead, faqSection, usageSection } from './src/layout.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

/* ---------- 工具模块加载 ---------- */
const toolFiles = readdirSync(path.join(SRC, 'tools')).filter((f) => f.endsWith('.mjs')).sort();
const tools = [];
for (const f of toolFiles) {
  const mod = await import(pathToFileURL(path.join(SRC, 'tools', f)).href);
  tools.push(mod.default);
}
tools.sort((a, b) => a.name.localeCompare(b.name, 'zh'));

const byCat = new Map(CATEGORIES.map((c) => [c.key, []]));
for (const t of tools) {
  if (!byCat.has(t.category)) throw new Error(`工具 ${t.slug} 的分类无效：${t.category}`);
  byCat.get(t.category).push(t);
}

/* ---------- 工具 ---------- */
const hash8 = (s) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h.toString(36);
};

/* 唯一文件名缓存：assets 按内容哈希重命名，配合 _headers 的 immutable 长效缓存 */
function versionAssets() {
  const files = [
    ['css/main.css', 'css/main.<h>.css'],
    ['js/main.js', 'js/main.<h>.js'],
  ];
  const map = {};
  let seed = '';
  for (const [rel, out] of files) {
    const p = path.join(SRC, 'assets', rel);
    const content = existsSync(p) ? readFileSync(p).toString('utf8') : '';
    const h = hash8(content);
    map[rel] = out.replace('<h>', h);
    seed += h;
  }
  return { map, seed };
}

const ASSETS = versionAssets();
const V = ASSETS.seed;

/* ---------- JSON-LD 构造 ---------- */
function toolJsonLd(t) {
  const url = `${SITE_URL}/${t.slug}/`;
  const list = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: t.name,
      url,
      description: t.desc,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      inLanguage: 'zh-CN',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: SITE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: catOf(t).name, item: `${SITE_URL}/#${catOf(t).key}` },
        { '@type': 'ListItem', position: 3, name: t.name },
      ],
    },
  ];
  if (t.faq && t.faq.length) {
    list.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: t.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  return list;
}

function catOf(t) {
  return CATEGORIES.find((c) => c.key === t.category);
}

/* ---------- 页面渲染 ---------- */
function renderToolPage(t) {
  const cat = catOf(t);
  const body = `<div class="wrap">
${[
    breadcrumb([
      { name: '首页', href: '/' },
      { name: cat.name, href: `/#${cat.key}` },
      { name: t.name },
    ]),
    toolHead(t.name, t.desc),
    `<section class="panel" aria-label="${t.name}">${t.body}</section>`,
    usageSection(t.usage || ''),
    faqSection(t.faq),
  ].join('\n')}
</div>`;

  return layout({
    title: t.name,
    description: t.desc,
    keywords: t.keywords,
    path: `/${t.slug}/`,
    body,
    toolScript: existsSync(path.join(SRC, 'assets', 'js', 't', `${t.slug}.js`))
      ? `/assets/js/t/${t.slug}.js`
      : null,
    assets: ASSETS.map,
    jsonLd: toolJsonLd(t),
  });
}

function renderHome() {
  const sections = CATEGORIES.map((cat) => {
    const list = byCat.get(cat.key);
    return `<section class="home-section" id="${cat.key}">
  <h2>${cat.name} <span class="count">${list.length} 款</span></h2>
  <p>${cat.desc}</p>
  <div class="card-grid">
    ${list.map((t) => `<a class="tool-card" href="/${t.slug}/"><h3>${t.name}</h3><p>${t.desc}</p></a>`).join('\n')}
  </div>
</section>`;
  }).join('\n');

  const total = tools.length;
  const body = `<section class="hero">
  <h1>免费在线站长工具箱</h1>
  <p class="lead">${total} 款常用开发者与站长工具，全部在浏览器本地运行——无需注册、无需下载、数据不上传服务器。</p>
  <div class="search" role="search">
    <input id="tool-search" type="search" placeholder="搜索工具，如：JSON、Base64、时间戳、二维码…" autocomplete="off" aria-label="搜索工具">
    <span class="kbd-hint">/</span>
  </div>
</section>
<div class="container">
${sections}
<section class="home-section home-copy">
  <h2>${BRAND_NAME}</h2>
  <p>${BRAND_NAME}是一套面向站长、运维与开发者的免费在线工具集，覆盖编解码、哈希加密、格式转换、文本处理与网络诊断等高频场景。所有计算都在您的浏览器本地完成，页面不包含任何登录、广告弹窗与付费墙，打开即用。</p>
  <p>每个工具都针对常用场景做了取舍：结果实时计算、一键复制、纯黑白灰界面减少视觉干扰。工具页同时提供使用说明与常见问题，方便快速上手。</p>
</section>
</div>`;

  return layout({
    title: BRAND_NAME,
    description: SITE_DESC,
    keywords: SITE_KEYWORDS,
    path: '/',
    body,
    assets: ASSETS.map,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: BRAND_NAME,
        url: SITE_URL + '/',
        description: SITE_DESC,
        inLanguage: 'zh-CN',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${BRAND_NAME}全部工具`,
        itemListElement: tools.map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.name,
          url: `${SITE_URL}/${t.slug}/`,
        })),
      },
    ],
  });
}

/* ---------- 通用页面 ---------- */
function renderAbout() {
  const body = `<article class="prose">
  <h1>关于 ${BRAND}</h1>
  <p class="lead">一套零后端、零框架依赖的在线站长工具箱，代码完全开源。</p>
  <h2>设计原则</h2>
  <ul>
    <li><strong>本地运行</strong>：全部工具在浏览器内计算，不上传任何数据，可放心处理敏感内容。</li>
    <li><strong>性能优先</strong>：无框架、无图标字体、无 Web 字体，首屏 CSS 约 10KB，一次请求即缓存。</li>
    <li><strong>克制与可用</strong>：黑白灰纯色界面，去除装饰性动画，把注意力留给工具本身。</li>
  </ul>
  <h2>技术栈</h2>
  <p>原生 HTML + CSS + ES Modules，构建脚本为 Node 零依赖脚本。可部署到 Cloudflare Pages、EdgeOne Pages 等任意静态托管平台。</p>
  <h2>隐私</h2>
  <p>本站仅使用隐私友好的 Umami 统计了解访问量，不使用 Cookie、不追踪个体用户。详见<a href="/privacy/">隐私说明</a>。</p>
</article>`;
  return layout({
    title: `关于 ${BRAND_NAME}`,
    description: `了解 ${BRAND_NAME} 的设计理念、技术栈与隐私政策。`,
    path: '/about/',
    body,
    assets: ASSETS.map,
  });
}

function renderPrivacy() {
  const body = `<article class="prose">
  <h1>隐私说明</h1>
  <p class="lead">一句话：本站所有工具在您的浏览器本地运行，不收集、不上传您的数据。</p>
  <h2>工具数据</h2>
  <p>您输入到任何工具页面（编码、哈希、文本、图片等）的内容，均只在当前浏览器内存中处理，不会发送到本站服务器。关掉页面即彻底消失。</p>
  <h2>访问统计</h2>
  <p>本站使用自建 Umami 统计服务（部署于 umami.pldduck.com），仅记录页面浏览量、来源与设备类型等聚合指标。Umami 不使用 Cookie，不采集个人信息，不跨站追踪。</p>
  <h2>依赖的外部服务</h2>
  <p>“IP 地址查询”工具需要向第三方公共服务发起请求以获取公网 IP，此类请求仅在您主动打开该工具时发生。其余工具均无外部请求。</p>
  <h2>联系我们</h2>
  <p>如有隐私相关问题，可通过仓库 Issues 与我们联系。</p>
</article>`;
  return layout({
    title: `隐私说明 - ${BRAND_NAME}`,
    description: `${BRAND_NAME} 的隐私说明：工具数据本地运行、Umami 无 Cookie 统计。`,
    path: '/privacy/',
    body,
    assets: ASSETS.map,
  });
}

function render404() {
  const body = `<div class="notfound">
  <h1>404</h1>
  <p>您访问的页面不存在或已被移动。</p>
  <a class="btn" href="/">返回首页</a>
  <a class="btn btn-ghost" href="/sitemap.xml">站点地图</a>
</div>`;
  return layout({
    title: '页面不存在 - ' + BRAND_NAME,
    description: '页面不存在。',
    path: '/404/',
    body,
    assets: ASSETS.map,
    noindex: true,
  });
}

/* ---------- 站点级文件 ---------- */
function renderSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [`${SITE_URL}/`]
    .concat(tools.map((t) => `${SITE_URL}/${t.slug}/`))
    .concat([`${SITE_URL}/about/`, `${SITE_URL}/privacy/`]);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`).join('\n')}
</urlset>
`;
}

function renderRobots() {
  return `User-agent: *
Allow: /
Disallow: /404.html

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

const HEADERS = `# Cloudflare Pages / EdgeOne Pages 响应头（最具体的路径优先匹配）
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=()
/
  Cache-Control: public, max-age=0, must-revalidate
/404.html
  Cache-Control: public, max-age=300
/sitemap.xml
  Cache-Control: public, max-age=3600
/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;

const REDIRECTS = `# 无斜杠目录请求 → 目录（SEO 统一 URL 形态）
${tools.map((t) => `/${t.slug}    /${t.slug}/`).join('\n')}
/about    /about/
/privacy  /privacy/
`;

/* ---------- 执行 ---------- */
console.log(`工具数量：${tools.length}`);
const distIndex = new Map();
distIndex.set('/', { content: renderHome(), name: 'index.html' });
for (const t of tools) distIndex.set(`/${t.slug}/`, { content: renderToolPage(t), name: 'index.html' });
distIndex.set('/about/', { content: renderAbout(), name: 'index.html' });
distIndex.set('/privacy/', { content: renderPrivacy(), name: 'index.html' });
distIndex.set('/404/', { content: render404(), name: 'index.html' });

const staticFiles = new Map();
staticFiles.set('/sitemap.xml', renderSitemap());
staticFiles.set('/robots.txt', renderRobots());
staticFiles.set('/404.html', render404()); // 平台约定：根级 404.html（Cloudflare / EdgeOne 自定义 404）
staticFiles.set('/_headers', HEADERS);
staticFiles.set('/_redirects', REDIRECTS);

/* 根级站点图标（header LOGO 与 favicon 直接引用根路径；源文件位于仓库根目录） */
const ROOT_COPY = ['favicon.ico', 'logo.png'];

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(path.join(SRC, 'assets'), path.join(DIST, 'assets'), { recursive: true });

/* 重命名带哈希的入口资产（保持 _headers 的 /assets/* immutable 规则） */
for (const [rel, out] of Object.entries(ASSETS.map)) {
  const src = path.join(DIST, 'assets', rel);
  const dst = path.join(DIST, 'assets', out);
  if (existsSync(src) && src !== dst) {
    rmSync(dst, { force: true });
    renameSync(src, dst);
  }
}

let bytes = 0;
for (const [route, { content, name }] of distIndex) {
  const dir = path.join(DIST, route === '/' ? '' : route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, name), content);
  bytes += Buffer.byteLength(content);
}
for (const [route, content] of staticFiles) {
  writeFileSync(path.join(DIST, route.slice(1)), content);
  bytes += Buffer.byteLength(content);
}
for (const f of ROOT_COPY) {
  const src = path.join(ROOT, f);
  const dst = path.join(DIST, f);
  if (existsSync(src)) {
    writeFileSync(dst, readFileSync(src));
    bytes += statSync(src).size;
  }
}

console.log(`生成 ${distIndex.size} 个页面路由 + ${staticFiles.size} 个站点文件，共 ${(bytes / 1024).toFixed(0)}KB`);
console.log(`输出目录：${DIST}`);

/* ---------- 本地预览服务器 ---------- */
if (process.argv.includes('--serve')) {
  const PORT = Number(process.env.PORT || 8787);
  const MIME = {
    '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
    '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
  };
  http.createServer((req, res) => {
    let p;
    try { p = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { p = '/404/'; }
    if (p.endsWith('/')) p += 'index.html';
    let file = path.join(DIST, p);
    if (!existsSync(file) || statSync(file).isDirectory()) file = path.join(DIST, '404.html');
    if (!existsSync(file)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(file);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(readFileSync(file));
  }).listen(PORT, () => {
    console.log(`本地预览：http://localhost:${PORT}/`);
  });
}
