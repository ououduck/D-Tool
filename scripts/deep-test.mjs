/* 深度交互测试 —— node scripts/deep-test.mjs [slug过滤...] [--base URL]
   与 browser-test（页面级：JS 错误/溢出/默认产出）互补，本脚本验证
   "用户输入是否真的被工具使用"：
   1. 全页面 JS 错误捕获（含交互后）
   2. transform：填入示例 → 改参数 → 两次运行输出必须不同（参数接线验证）
   3. calc：填全部输入 → 输出非空、不含 NaN/undefined
   4. gen：连跑两次随机产出、参数生效
   5. image-gen：数值参数与 canvas 实际尺寸强断言（width/height/size/length）
   6. image-effect：真实上传后拖滑块，canvas 像素必须变化（滑块接线验证）
   7. table：搜索过滤与空态提示
   8. api：点击运行后输出区出现结果或错误提示（离线也应有错误态）
   9. 自定义脚本工具：通用填值+点按钮，死按钮与 NaN/undefined 扫描
   结果写 stdout + test/deep-report.json */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

let pw;
try { pw = await import('playwright'); }
catch { pw = await import('playwright-core'); }

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const argBase = (() => {
  const i = process.argv.indexOf('--base');
  return i > -1 ? process.argv[i + 1] : 'http://127.0.0.1:8787';
})();
const BASE = argBase;
const filters = process.argv.slice(2).filter((a) => !a.startsWith('--') && !/^\d+$/.test(a) && a !== argBase);
const WORKERS = 4;

const slugs = fs.readdirSync(path.join(ROOT, 'src', 'tools'))
  .filter((f) => f.endsWith('.mjs')).map((f) => f.slice(0, -4))
  .filter((s) => filters.length ? filters.some((f) => s.includes(f)) : true);

const TEST_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAFklEQVR4nGNk+M9Qz4AFMGETHDkSAK5mAQbyKrj2AAAAAElFTkSuQmCC', 'base64');

/* 64×64 噪声 PNG（浏览器内生成）：足够大且像素丰富，避免撞上 16px 最小尺寸
   下限 / 平坦区域导致的"缩放锐化无变化"误报 */
let NOISE_PNG = null;
async function noisePng() {
  if (NOISE_PNG) return NOISE_PNG;
  const page = await (await browser.newContext()).newPage();
  const dataUrl = await page.evaluate(() => {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    const ctx = c.getContext('2d');
    for (let y = 0; y < 64; y++) {
      for (let x = 0; x < 64; x++) {
        ctx.fillStyle = `hsl(${(x * 5 + y * 11) % 360} 70% ${(x * y) % 90 + 8}%)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
    return c.toDataURL('image/png');
  });
  await page.context().close();
  NOISE_PNG = Buffer.from(dataUrl.split(',')[1], 'base64');
  return NOISE_PNG;
}

/* transform 工具需要结构化输入的示例（其余用通用样本） */
const SAMPLES = [
  [/^json-diff/, '{"name":"old","n":1,"del":true}\n---\n{"name":"new","n":2,"add":1}'],
  [/^json/, '{"name":"D-Tool","version":2,"ok":true,"tags":["a","b"],"deep":{"x":1}}'],
  [/^contact-validate/, '13800138000'],
  [/^extract-between/, '<title>D-Tool 工具箱</title>\n<div>正文</div>'],
  [/^substitution/, 'Hello World'],
  [/^csv/, 'name,age,city\n张三,28,北京\n李四,32,上海'],
  [/^regex/, '联系 test@example.com 或 13800138000，日期 2026-01-01'],
  [/^(cron|crontab)/, '0 9 * * 1-5'],
  [/^jwt/, 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U'],
  [/^html-?entity|^entity/, '<div class="a">你好 & 坏</div>'],
  [/^(markdown|md2|md-)/, '# 标题\n\n**加粗** 与 `code`\n\n- 列表项'],
  [/^(sql|sql-)/, 'SELECT id, name FROM users WHERE age > 18 ORDER BY id DESC;'],
  [/^xml/, '<root><item id="1">A</item><item id="2">B</item></root>'],
  [/^(url|urlencode)/, 'https://example.com/搜索?q=你好&page=2#frag'],
  [/^(css|css-)/, 'body { color: #333; margin: 0 auto; }'],
  [/^(js|js-|javascript)/, 'const arr = [3,1,2]; arr.sort();'],
  [/^(diff|text-diff)/, 'apple\nbanana\ncherry'],
  [/^(pinyin)/, '你好世界'],
  [/^ascii-art|^text-art/, 'HI'],
  [/^(base32|base58|base62|base85|base91|base36|z85)$/, 'hello world'],
  [/^morse$/, 'SOS hello'],
  [/^timestamp/, '1700000000'],
];
// 含大写/小写/数字/中文且为两行：大小写转换、编号、对齐、行数类工具都能产生可见变化
const GENERIC_SAMPLE = 'Hello D-Tool 123 abc XYZ 测试\n第二行 line-2 456 def';
const sampleFor = (slug) => (SAMPLES.find(([re]) => re.test(slug)) || [null, GENERIC_SAMPLE])[1];

const browser = await pw.chromium.launch();
const problems = [];   // { slug, msg, kind: 'fail'|'warn' }
let doneCount = 0;

const fails = (s, m) => { problems.push({ slug: s, kind: 'fail', msg: m }); console.log(`  ✗ ${s}: ${m}`); };
const warns = (s, m) => { problems.push({ slug: s, kind: 'warn', msg: m }); console.log(`  · ${s}: ${m}`); };

/* ---------- 通用小工具 ---------- */
async function newPage() {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  try { await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: BASE }); } catch { /* 内核不支持则跳过 */ }
  const page = await ctx.newPage();
  page._errs = [];
  page.on('pageerror', (e) => page._errs.push('pageerror: ' + e.message.slice(0, 160)));
  page.on('console', (m) => { if (m.type() === 'error') page._errs.push('console: ' + m.text().slice(0, 160)); });
  return { ctx, page };
}

/* 数字输入取一个与默认不同的合法值 */
function distinctNumber(el) {
  const min = el.min !== '' ? Number(el.min) : null;
  const max = el.max !== '' ? Number(el.max) : null;
  const cur = Number(el.value || 0);
  if (min != null && max != null && max > min) return min + Math.max(1, Math.round((max - min) / 3));
  if (min != null) return min + 1;
  if (max != null) return Math.max(0, max - 1);
  return cur === 7 ? 9 : 7;
}

/* 填充一个控件（返回填的值或 null 表示跳过） */
async function fillControl(page, el) {
  const t = await el.evaluate((e) => ({ tag: e.tagName, type: e.type || '', val: e.value, min: e.min ?? '', max: e.max ?? '', checked: e.checked }));
  if (t.type === 'file' || t.type === 'color' || t.type === 'date' || t.type === 'datetime-local' || t.type === 'time') return null;
  if (t.type === 'checkbox') { if (!t.checked) { await el.check(); await el.dispatchEvent('change'); } return 'checked'; }
  if (t.type === 'radio') { await el.check(); return 'radio'; }
  if (t.tag === 'SELECT') {
    const opts = await el.evaluate((e) => e.options.length);
    if (opts > 1) { await el.evaluate((e) => { e.selectedIndex = Math.min(1, e.options.length - 1); e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); }); return 'select'; }
    return null;
  }
  if (t.type === 'range') {
    const min = t.min !== '' ? Number(t.min) : 0, max = t.max !== '' ? Number(t.max) : 100;
    await el.evaluate((e, v) => window.__fill(e, String(v)), Math.round((min + max) / 2));
    return 'range';
  }
  if (t.type === 'number') { await el.evaluate((e, v) => window.__fill(e, String(v)), distinctNumber({ min: t.min, max: t.max, value: t.val })); return 'number'; }
  if (t.tag === 'TEXTAREA' || ['text', 'search', 'url', 'email', 'tel', 'password'].includes(t.type)) {
    const v = t.val && t.val.length > 4 ? (t.val + ' X') : '测试 AB';
    await el.evaluate((e, s) => window.__fill(e, s), v);
    return 'text';
  }
  return null;
}

async function fillAll(page) {
  return page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    return [...main.querySelectorAll('input, select, textarea')]
      .filter((e) => e.offsetParent !== null && e.type !== 'hidden')
      .filter((e) => !e.closest('.site-search, header, nav'))
      .map((e) => e.id || e.name || e.tagName);
  });
}

async function clickRun(page, selectors) {
  for (const sel of selectors) {
    const el = await page.$(sel);
    if (el && await el.isVisible() && await el.isEnabled()) { await el.click(); return sel; }
  }
  return null;
}

const norm = (s) => (s || '');
/* 保留原始空白（缩进/对齐类工具的输出差异就在空格里），仅去首尾换行 */
const raw = (s) => (s || '').replace(/^\s+|\s+$/g, '');
const isErrRender = (t) => /^(处理出错|计算出错|生成出错|请)/.test((t || '').trim());
const outHasJunk = (t) => !isErrRender(t) && /\bundefined\b|\bNaN\b|\bInfinity\b|\[object Object\]/.test(t);

/* ---------- 各 kind 测试 ---------- */
async function testTransform(page, slug) {
  const sample = sampleFor(slug);
  await page.evaluate((s) => window.__fill(document.querySelector('#x-in'), s), sample);
  await clickRun(page, ['#x-run-0', '#x-run-1']);
  await page.waitForTimeout(300);
  const out1 = raw(await page.evaluate(() => document.querySelector('#x-out-wrap')?.textContent));
  if (!out1) return fails(slug, 'transform 无输出区');
  if (outHasJunk(out1)) return fails(slug, `transform 输出异常: ${out1.slice(0, 80)}`);
  // 参数接线验证：阶段一用默认参数，阶段二反向/换选项/数值+1，输出必须变化
  const hasParams = await page.evaluate(() => document.querySelectorAll('main [id^="xp-"]').length > 0);
  if (hasParams) {
    await page.evaluate(() => {
      document.querySelectorAll('main [id^="xp-"]').forEach((e) => {
        if (e.tagName === 'SELECT') { e.selectedIndex = e.options.length - 1; e.dispatchEvent(new Event('change', { bubbles: true })); }
        else if (e.type === 'number') window.__fill(e, String(Number(e.value || 0) + 1));
        else if (e.type === 'range') window.__fill(e, e.max || '100');
        else window.__fill(e, e.value ? (e.value.length <= 2 ? e.value + 'Z' : e.value.split('').reverse().join('')) : 'ZZZ');
      });
    });
    await clickRun(page, ['#x-run-0', '#x-run-1']);
    await page.waitForTimeout(250);
    const out2 = raw(await page.evaluate(() => document.querySelector('#x-out-wrap')?.textContent));
    if (out2 === out1 && !isErrRender(out2)) {
      warns(slug, `参数改动后输出未变化（疑似参数未生效）: ${out1.slice(0, 50)}`);
    }
  }
}

async function testCalc(page, slug) {
  const forms = await page.$$('main .calc-form input, main .calc-form select, main .calc-form textarea');
  for (const el of forms) {
    const t = await el.evaluate((e) => ({ tag: e.tagName, type: e.type || '' }));
    if ((t.tag === 'INPUT' && (t.type === 'text' || t.type === 'number' || t.type === 'search')) || t.tag === 'TEXTAREA') {
      // 计算类文本输入几乎都是数值，用数字样本避免 NaN 误报
      const cur = await el.inputValue();
      await el.evaluate((e, v) => window.__fill(e, String(v)), cur === '5' ? '6' : '5');
    } else {
      await fillControl(page, el);
    }
  }
  await clickRun(page, ['#c-run']);
  await page.waitForTimeout(350);
  const out = norm(await page.evaluate(() => document.querySelector('#c-out')?.textContent));
  if (!out) return fails(slug, 'calc 无输出');
  if (outHasJunk(out)) fails(slug, `calc 输出含 NaN/undefined/Infinity: ${out.slice(0, 90)}`);
}

async function testGen(page, slug) {
  const params = await page.$$('main [id^="gp-"]');
  for (const p of params) await fillControl(page, p);
  await clickRun(page, ['#g-run']);
  await page.waitForTimeout(300);
  const out1 = norm(await page.evaluate(() => document.querySelector('#g-out')?.textContent));
  if (!out1 || /无结果|点击按钮生成/.test(out1)) return fails(slug, `gen 无产出: ${out1.slice(0, 50)}`);
  if (outHasJunk(out1)) return fails(slug, `gen 输出异常: ${out1.slice(0, 80)}`);
  // 再跑一次：随机类生成器两次应不同（批量/带种子除外）
  await clickRun(page, ['#g-run']);
  await page.waitForTimeout(250);
  const out2 = norm(await page.evaluate(() => document.querySelector('#g-out')?.textContent));
  if (out1 === out2 && out1.length < 200) warns(slug, 'gen 连续两次输出完全相同（若为确定性生成可忽略）');
}

async function testTable(page, slug) {
  const rows = await page.$$eval('#tb-table tbody tr', (r) => r.length);
  if (!rows) return fails(slug, '表格无数据行');
  const search = await page.$('#tb-search');
  if (search) {
    await page.evaluate(() => window.__fill(document.querySelector('#tb-search'), 'zzzzqqqqxx'));
    await page.waitForTimeout(200);
    const emptyTip = await page.evaluate(() => {
      const el = document.querySelector('.search-empty');
      return el ? !el.hidden : false;
    });
    if (!emptyTip) warns(slug, '搜索无结果时未显示空态提示');
    await page.evaluate(() => window.__fill(document.querySelector('#tb-search'), ''));
    await page.waitForTimeout(150);
  }
}

async function testImageGen(page, slug) {
  const set = async (id, v) => {
    const el = await page.$(`#${id}`);
    if (el) await el.evaluate((e, s) => window.__fill(e, s), String(v));
  };
  const cfgType = await page.evaluate(() => JSON.parse(document.querySelector('#ig-cfg').textContent).type);
  await clickRun(page, ['#ig-run']);
  await page.waitForTimeout(250);
  const dims1 = await page.evaluate(() => [document.querySelector('#ig-canvas').width, document.querySelector('#ig-canvas').height]);
  if (dims1[0] < 10) return fails(slug, `canvas 未生成（${dims1.join('×')}）`);
  // 强断言：数值参数必须决定 canvas 尺寸
  if (cfgType === 'placeholder') {
    await set('ig-p-width', 321); await set('ig-p-height', 243); await set('ig-p-text', 'T');
    await clickRun(page, ['#ig-run']); await page.waitForTimeout(250);
    const dims2 = await page.evaluate(() => [document.querySelector('#ig-canvas').width, document.querySelector('#ig-canvas').height]);
    if (dims2[0] !== 321 || dims2[1] !== 243) fails(slug, `占位图参数未生效：设 321×243 实得 ${dims2.join('×')}`);
  } else if (cfgType === 'avatar') {
    await set('ig-p-size', 200); await set('ig-p-name', '测试');
    await clickRun(page, ['#ig-run']); await page.waitForTimeout(250);
    const d = await page.evaluate(() => document.querySelector('#ig-canvas').width);
    if (d !== 200) fails(slug, `头像尺寸参数未生效：设 200 实得 ${d}`);
  } else if (cfgType === 'captcha') {
    await set('ig-p-length', 6);
    await clickRun(page, ['#ig-run']); await page.waitForTimeout(250);
    const d = await page.evaluate(() => document.querySelector('#ig-canvas').width);
    if (d !== 6 * 32 + 20) fails(slug, `验证码长度参数未生效：设 6 实得宽 ${d}（期望 ${6 * 32 + 20}）`);
  }
  // 下载按钮应真实触发下载
  const dl = await page.$('#ig-download');
  if (dl) {
    const dlPromise = page.waitForEvent('download', { timeout: 5000 }).then(() => true).catch(() => false);
    await dl.click();
    if (!await dlPromise) fails(slug, '下载 PNG 按钮未触发下载');
  }
}

async function testImageEffect(page, slug) {
  const fileEl = await page.$('#ie-file');
  if (!fileEl) return fails(slug, '无上传控件');
  await fileEl.setInputFiles({ name: 't.png', mimeType: 'image/png', buffer: await noisePng() });
  await page.waitForTimeout(500);
  const before = await page.evaluate(() => document.querySelector('#ie-canvas')?.toDataURL());
  if (!before || before === 'data:,' ) return fails(slug, '上传后 canvas 为空');
  // 滑块接线验证：拖到头再比较像素
  const slider = await page.$('main input[type="range"]');
  if (slider) {
    const min = Number(await slider.getAttribute('min') || 0);
    const max = Number(await slider.getAttribute('max') || 100);
    await slider.evaluate((e, v) => window.__fill(e, String(v)), max);
    await page.waitForTimeout(450);
    const after = await page.evaluate(() => document.querySelector('#ie-canvas')?.toDataURL());
    if (after === before) fails(slug, '滑块拖动后画面无变化（参数未生效）');
    // 恢复中间值
    await slider.evaluate((e, v) => window.__fill(e, String(v)), Math.round((min + max) / 2));
  }
  // meta 与下载可用性
  const meta = norm(await page.evaluate(() => document.querySelector('#ie-meta')?.textContent));
  if (!meta) warns(slug, '上传后无尺寸信息提示');
  const dl = await page.$('#ie-download');
  if (dl && !(await dl.evaluate((e) => e.disabled))) {
    const dlPromise = page.waitForEvent('download', { timeout: 5000 }).then(() => true).catch(() => false);
    await dl.click();
    if (!await dlPromise) fails(slug, '下载 PNG 按钮未触发下载');
  }
}

async function testApi(page, slug) {
  await clickRun(page, ['#api-run']);
  const deadline = Date.now() + 15000;
  let out = '';
  while (Date.now() < deadline) {
    await page.waitForTimeout(700);
    out = norm(await page.evaluate(() => document.querySelector('#api-out')?.textContent));
    if (out && !/加载中|请点击|点击按钮/.test(out)) break;
  }
  if (!out) return fails(slug, 'api 点击后输出区始终为空');
  if (/undefined|NaN/.test(out)) fails(slug, `api 输出异常: ${out.slice(0, 80)}`);
  console.log(`    api: ${out.slice(0, 60)}`);
}

/* 自定义脚本工具：通用填值 + 真实上传 + 点按钮 + 死按钮检测 */
async function testCustom(page, slug) {
  const hash = () => page.evaluate(() => {
    const m = document.querySelector('main') || document.body;
    const canvasLen = [...m.querySelectorAll('canvas')].map((c) => {
      try { return c.toDataURL().length; } catch { return 0; }
    }).join(',');
    return m.innerHTML.length + ':' + [...m.querySelectorAll('input,textarea,select')].map((e) => String(e.value).length).join('|') + ':' + canvasLen;
  });
  // 带上传控件的页面直接真实上传，让后续按钮操作作用在真实图片上
  const fileEl = await page.$('main input[type="file"]');
  if (fileEl) {
    try { await fileEl.setInputFiles({ name: 't.png', mimeType: 'image/png', buffer: await noisePng() }); await page.waitForTimeout(500); }
    catch { /* 某些工具对格式有特殊要求，忽略 */ }
  }
  const controls = await page.$$('main input:not([type=file]):not([type=hidden]), main select, main textarea');
  for (const el of controls) await fillControl(page, el);
  const h0 = await hash();
  // 死按钮判定：点击前强制隐藏 toast（去掉 .show），点击后 toast 重新出现或 DOM 变化都算"有响应"
  let deadClicks = 0, clicked = 0;
  const buttons = await page.$$('main button');
  for (const btn of buttons) {
    const info = await btn.evaluate((e) => ({ id: e.id, text: e.textContent.trim(), cls: e.className, visible: e.offsetParent !== null, disabled: e.disabled }));
    if (!info.visible || info.disabled) continue;
    if (/复制|下载|清空|重置|copy|download|clear|reset/i.test(info.id + ' ' + info.text)) continue;
    if (info.cls.includes('btn-ghost') && /返回|back/i.test(info.text)) continue;
    const toastText = await page.evaluate(() => {
      const t = document.querySelector('.toast');
      if (t) { t.classList.remove('show'); return t.textContent; }
      return null;
    });
    const hBefore = await hash();
    await btn.click();
    clicked++;
    await page.waitForTimeout(250);
    const hAfter = await hash();
    const fired = await page.evaluate((prev) => {
      const t = document.querySelector('.toast');
      return !!(t && (t.classList.contains('show') || (prev !== null && t.textContent !== prev)));
    }, toastText);
    if (hAfter === hBefore && !fired) { deadClicks++; console.log(`    死按钮: ${slug} #${info.id || info.text.slice(0, 8)}`); }
  }
  if (clicked && deadClicks === clicked) warns(slug, `点击 ${clicked} 个按钮全部无响应（死按钮）`);
  const text = norm(await page.evaluate(() => (document.querySelector('main') || document.body).textContent));
  if (outHasJunk(text)) fails(slug, `交互后页面出现 NaN/undefined/Infinity: ${text.slice(0, 80)}`);
}

const STRATEGY = [
  [{ 'x-cfg': 1 }, testTransform],
  [{ 'c-cfg': 1 }, testCalc],
  [{ 'g-cfg': 1 }, testGen],
  [{ 'tb-table': 1 }, testTable],
  [{ 'ig-cfg': 1 }, testImageGen],
  [{ 'ie-cfg': 1 }, testImageEffect],
  [{ 'api-cfg': 1 }, testApi],
];

async function testOne(slug) {
  const { ctx, page } = await newPage();
  try {
    await page.goto(`${BASE}/${slug}/`, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(200);
    await page.evaluate(() => {
      window.__fill = (el, v) => {
        const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype
          : el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
        setter.call(el, v);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      };
    });

    const flags = await page.evaluate(() => Object.fromEntries(
      ['x-cfg', 'c-cfg', 'g-cfg', 'tb-table', 'ig-cfg', 'ie-cfg', 'api-cfg'].map((id) => [id, !!document.getElementById(id)])));

    let tested = false;
    for (const [flag, fn] of STRATEGY) {
      const key = Object.keys(flag)[0];
      if (flags[key]) { await fn(page, slug); tested = true; break; }
    }
    if (!tested) await testCustom(page, slug);

    if (page._errs.length) fails(slug, `JS 错误: ${page._errs.slice(0, 2).join(' | ')}`);
  } catch (e) {
    fails(slug, '测试执行失败: ' + String(e.message || e).slice(0, 120));
  } finally {
    await ctx.close();
    doneCount++;
    if (doneCount % 40 === 0) console.log(`  … ${doneCount}/${slugs.length}`);
  }
}

console.log(`深度交互测试 ${slugs.length} 个工具 → ${BASE}`);
const queue = [...slugs];
await Promise.all(Array.from({ length: WORKERS }, async () => {
  while (queue.length) {
    const s = queue.shift();
    if (s) await testOne(s);
  }
}));

const failList = problems.filter((p) => p.kind === 'fail');
const warnList = problems.filter((p) => p.kind === 'warn');
console.log(`\n完成：${slugs.length} 页，失败 ${failList.length}，警告 ${warnList.length}`);
fs.writeFileSync(path.join(ROOT, 'test', 'deep-report.json'),
  JSON.stringify({ at: new Date().toISOString(), base: BASE, total: slugs.length, problems }, null, 2));
if (failList.length) {
  console.log('\n失败清单：');
  for (const p of failList) console.log(`  ✗ ${p.slug}: ${p.msg}`);
}
process.exit(failList.length ? 1 : 0);
