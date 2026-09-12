/* 浏览器批量页面测试 —— node scripts/browser-test.mjs [分类文件...]
   用 playwright 逐页访问 dist：
   1. 页面 JS 错误 / console error
   2. gen 工具自动生成是否产出内容
   3. transform/calc 有默认输入时点击主按钮是否产出
   4. 桌面 1280px 与移动 375px 水平溢出检测
   结果写 stdout + test/browser-report.json */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

let pw;
try { pw = await import('playwright'); }
catch { pw = await import((await import('playwright-core')).default ? 'playwright-core' : 'playwright-core'); }

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.argv.includes('--base') ? process.argv[process.argv.indexOf('--base') + 1] : 'http://127.0.0.1:8787';

const tools = fs.readdirSync(path.join(ROOT, 'src', 'tools')).filter((f) => f.endsWith('.mjs'));
const browser = await pw.chromium.launch();

async function testPage(slug, def) {
  const issues = [];
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message.slice(0, 120)));
  page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text().slice(0, 120)); });
  try {
    /* 第三方 API/图片可能永远保持网络活动；页面可用性以 DOM 加载完成为准。 */
    await page.goto(`${BASE}/${slug}/`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(150);

    /* 溢出检测（桌面） */
    const o1 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (o1 > 1) issues.push(`桌面溢出 ${o1}px`);

    /* gen 工具：自动运行过，输出应有内容 */
    const gOut = await page.$('#g-out');
    if (gOut) {
      const t = (await gOut.textContent()) || '';
      if (/^点击按钮生成/.test(t.trim())) issues.push('gen 未自动生成');
      else if (!t.trim()) issues.push('gen 输出为空');
    }

    /* transform/calc：有默认值则点击运行 */
    const xIn = await page.$('#x-in');
    if (xIn) {
      const v = await xIn.inputValue();
      if (v && v.length < 200 && !/^(等待|点击)/.test(v)) {
        const btn = await page.$('#x-run-0');
        if (btn) {
          await btn.click();
          await page.waitForTimeout(250);
          const out = await page.$('#x-out-wrap');
          const t = out ? (await out.textContent()) || '' : '';
          if (/等待输入/.test(t)) issues.push('transform 点击后无输出');
          else if (out) {
            const html = await out.innerHTML();
            if (html.includes('toast') || /undefined/.test(t)) issues.push('transform 输出含 undefined');
          }
        }
      }
    }
    const cRun = await page.$('#c-run');
    if (cRun) {
      await cRun.click();
      await page.waitForTimeout(250);
      const out = await page.$('#c-out');
      const t = out ? (await out.textContent()) || '' : '';
      if (/等待输入/.test(t)) issues.push('calc 点击后无输出（可能缺必填默认值，人工复核）');
      else if (/undefined/.test(t)) issues.push('calc 输出含 undefined');
    }
  } catch (e) {
    issues.push('加载失败: ' + e.message.slice(0, 100));
  }
  if (errs.length) issues.push(...[...new Set(errs)].slice(0, 3));
  await ctx.close();
  return issues;
}

/* 移动端溢出批量检测（轻量：只查溢出） */
async function mobileOverflow(slugs) {
  const ctx = await browser.newContext({ viewport: { width: 375, height: 800 } });
  const page = await ctx.newPage();
  const bad = [];
  for (const s of slugs) {
    try {
      await page.goto(`${BASE}/${s}/`, { waitUntil: 'domcontentloaded', timeout: 12000 });
      await page.waitForTimeout(60);
      const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (o > 1) bad.push(`${s}: ${o}px`);
    } catch { bad.push(`${s}: 加载失败`); }
  }
  await ctx.close();
  return bad;
}

const defs = [];
for (const f of tools) {
  try {
    const def = (await import(pathToFileURL(path.join(ROOT, 'src', 'tools', f)).href)).default;
    defs.push({ slug: def.slug, def });
  } catch (e) { console.log(`✗ ${f} 定义解析失败: ${e.message}`); }
}
defs.sort((a, b) => a.def.category?.localeCompare(b.def.category || '') || a.slug.localeCompare(b.slug));

console.log(`测试 ${defs.length} 个工具页面…`);
const report = {};
let idx = 0;
for (const { slug } of defs) {
  idx++;
  const issues = await testPage(slug, {});
  if (issues.length) { report[slug] = issues; console.log(`  ✗ ${slug}: ${issues.join(' | ')}`); }
  if (idx % 60 === 0) console.log(`  … ${idx}/${defs.length}`);
}

console.log('\n移动端 375px 溢出检测…');
const mob = await mobileOverflow(defs.map((d) => d.slug));
mob.forEach((m) => console.log('  ✗ ' + m));

await browser.close();
fs.writeFileSync(path.join(ROOT, 'test', 'browser-report.json'), JSON.stringify({ issues: report, mobile: mob }, null, 2));
const n = Object.keys(report).length + mob.length;
console.log(`\n完成：${defs.length} 页，桌面问题 ${Object.keys(report).length} 页，移动溢出 ${mob.length} 页`);
if (n > 0) process.exit(1);
