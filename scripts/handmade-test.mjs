/* 手写工具深度交互测试 —— node scripts/handmade-test.mjs
   覆盖共享运行时之外的手写工具：图片处理（真实上传 canvas 操作）、
   骰子/硬币/猜拳、二维码、计算器等交互复杂工具 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pw from 'playwright';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.argv.includes('--base') ? process.argv[process.argv.indexOf('--base') + 1] : 'http://127.0.0.1:8787';

const browser = await pw.chromium.launch();
const issues = [];
const log = (s, msg) => { issues.push(`${s}: ${msg}`); console.log(`  ✗ ${s}: ${msg}`); };

/* 生成一张测试 PNG（含像素数据，供图片工具处理） */
const TEST_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAFklEQVR4nGNk+M9Qz4AFMGETHDkSAK5mAQbyKrj2AAAAAElFTkSuQmCC', 'base64');

async function pageOf(slug) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  page._errs = [];
  page.on('pageerror', (e) => page._errs.push(e.message.slice(0, 120)));
  await page.goto(`${BASE}/${slug}/`, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(250);
  return { ctx, page };
}
const done = async (ctx) => ctx.close();
const ok = (s) => console.log(`  ✓ ${s}`);

/* ---------- 图片类：上传真实文件后主按钮应产出 ---------- */
const imageTools = [
  'image-compress', 'image-crop', 'image-rotate', 'image-format', 'image-watermark',
  'image-base64', 'image-grid', 'image-resize', 'image-rounded', 'image-blur',
  'image-brightness', 'image-contrast', 'image-hue', 'image-pixelate', 'image-sharpen',
  'image-info', 'image-colors', 'image-histogram', 'image-filter',
];
console.log('图片工具:');
for (const slug of imageTools) {
  try {
    const { ctx, page } = await pageOf(slug);
    const fileInput = await page.$('input[type="file"]');
    if (!fileInput) { log(slug, '无文件上传控件'); await done(ctx); continue; }
    await fileInput.setInputFiles({ name: 'test.png', mimeType: 'image/png', buffer: TEST_PNG });
    /* 图片工具上传即自动处理，无主按钮也视为正常；仅在输出缺失时报错 */
    await page.waitForTimeout(700);
    const html = await page.evaluate(() => document.body.innerHTML);
    const hasOutput = html.includes('data:image') || html.includes('canvas') || /下载|完成|成功|KB|KB/.test(html);
    if (!hasOutput) log(slug, '上传+操作后无可见产出');
    else ok(slug);
    if (page._errs.length) log(slug, 'JS: ' + page._errs[0]);
    await done(ctx);
  } catch (e) { log(slug, e.message.slice(0, 80)); }
}

/* ---------- 趣味交互工具 ---------- */
console.log('趣味工具:');
{
  const { ctx, page } = await pageOf('dice-roller');
  await page.click('#roll-btn, .dice2d, button.btn');
  await page.waitForTimeout(600);
  const txt = await page.textContent('body');
  if (!/\d/.test(txt)) log('dice-roller', '掷骰后无数字结果'); else ok('dice-roller');
  await done(ctx);
}
{
  const { ctx, page } = await pageOf('coin-flip');
  await page.click('button.btn');
  await page.waitForTimeout(900);
  const txt = await page.textContent('body');
  if (!/正面|反面/.test(txt)) log('coin-flip', '翻硬币后无结果'); else ok('coin-flip');
  await done(ctx);
}
{
  const { ctx, page } = await pageOf('rps-game');
  await page.click('button:has-text("石"), button:has-text(" Rock"), .rps-btn >> nth=0');
  await page.waitForTimeout(800);
  const txt = await page.textContent('body');
  if (!/胜|负|平|赢|输/.test(txt)) log('rps-game', '出拳后无胜负结果'); else ok('rps-game');
  await done(ctx);
}

/* ---------- 计算器/复杂交互 ---------- */
console.log('计算器类:');
{
  const { ctx, page } = await pageOf('calculator');
  await page.click('button:has-text("7"), [data-key="7"], .cal-key >> nth=0');
  await page.click('button:has-text("+"), [data-key="+"]');
  await page.click('button:has-text("3"), [data-key="3"]');
  await page.click('button:has-text("="), [data-key="="]');
  await page.waitForTimeout(200);
  const txt = await page.textContent('body');
  if (!/10/.test(txt)) log('calculator', '7+3 未得到 10'); else ok('calculator');
  await done(ctx);
}

/* ---------- 二维码（canvas 渲染） ---------- */
console.log('二维码:');
{
  const { ctx, page } = await pageOf('qrcode');
  await page.fill('textarea, input[type="text"]', 'https://example.com');
  const btn = await page.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await page.waitForTimeout(400); }
  const hasCanvas = await page.evaluate(() => !!document.querySelector('canvas'));
  if (!hasCanvas) log('qrcode', '无 canvas 输出'); else ok('qrcode');
  await done(ctx);
}

await browser.close();
console.log(`\n手写工具深度测试：${issues.length} 个问题`);
if (issues.length) process.exit(1);
