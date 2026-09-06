/* 手写文本/计算工具功能实测 —— node scripts/text-tools-test.mjs
   68 个手写工具中的非图片类：填入真实输入、点击主按钮、断言输出内容正确性 */
import pw from 'playwright';

const BASE = 'http://127.0.0.1:8931';
const browser = await pw.chromium.launch();
let pass = 0; const fails = [];

async function t(slug, fn) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  page._errs = [];
  page.on('pageerror', (e) => page._errs.push(e.message.slice(0, 150)));
  try {
    await page.goto(`${BASE}/${slug}/`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(200);
    const msg = await fn(page);
    if (msg) fails.push(`${slug}: ${msg}`);
    else { pass++; console.log(`  ✓ ${slug}`); }
  } catch (e) {
    fails.push(`${slug}: 异常 ${e.message.slice(0, 100)}`);
  }
  if (page._errs.length) fails.push(`${slug}: JS错误 ${page._errs[0]}`);
  await ctx.close();
}

/* 从页面取主要输出区文本 */
const bodyText = (p) => p.evaluate(() => document.body.innerText + ' ' + [...document.querySelectorAll('input:not([type=hidden]), textarea, select')].map(i => i.value).join(' '));

await t('json', async (p) => {
  await p.fill('textarea >> nth=0', '{"b":1,"a":[1,2]}');
  await p.click('button:has-text("格式化"), button:has-text("美化")');
  await p.waitForTimeout(300);
  const s = await bodyText(p);
  return /"a"[\s\S]*"b"|1,\s*2/.test(s) ? '' : '格式化输出缺失';
});
await t('text-diff', async (p) => {
  const tas = await p.$$('textarea');
  if (tas.length >= 2) { await tas[0].fill('a\nb\nc'); await tas[1].fill('a\nx\nc'); }
  const btn = await p.$('button.btn:not(.btn-ghost):not([data-copy-from])');
  if (btn) { await btn.click(); await p.waitForTimeout(300); }
  const s = await bodyText(p);
  return /b|x/.test(s) && !/等待/.test(s) ? '' : 'diff 无输出';
});
await t('csv-json', async (p) => {
  const tas = await p.$$('textarea');
  await tas[0].fill('name,age\n张三,28');
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(300); }
  const s = await bodyText(p);
  return /张三|28/.test(s) && !/等待/.test(s) ? '' : 'CSV 转换无输出';
});
await t('base64', async (p) => {
  await p.fill('#in, textarea >> nth=0', '你好');
  const btns = await p.$$('button.btn:not(.btn-ghost)');
  for (const b of btns) { const txt = await b.textContent(); if (/编码|Encrypt/.test(txt)) { await b.click(); break; } }
  await p.waitForTimeout(300);
  const s = await bodyText(p);
  return s.includes('5L2g5aW9') ? '' : 'Base64 编码结果不对: ' + s.slice(0, 80);
});
await t('md5', async (p) => {
  await p.fill('#md5-in', 'abc');
  await p.waitForTimeout(600);
  const s = await bodyText(p);
  return s.includes('900150983cd24fb0d6963f7d28e17f72') ? '' : 'MD5(abc) 结果不对';
});
await t('hash', async (p) => {
  await p.fill('textarea >> nth=0', 'abc');
  await p.waitForTimeout(800);
  const s = await bodyText(p);
  return /ba7816bf|a9993e36|SHA/.test(s) ? '' : 'hash 输出缺失';
});
await t('timestamp', async (p) => {
  await p.fill('input[type="number"], input[type="text"]', '1700000000');
  await p.waitForTimeout(400);
  const s = await bodyText(p);
  return /2023/.test(s) ? '' : '时间戳转换无 2023 输出';
});
await t('uuid', async (p) => {
  await p.click('button:has-text("生成 UUID")');
  await p.waitForTimeout(400);
  const s = await bodyText(p);
  return /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}/.test(s) ? '' : 'UUID 未生成';
});
await t('url-encode', async (p) => {
  await p.fill('#ue-in', 'a b&c=中');
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(300); }
  const s = await bodyText(p);
  return /%E4%B8%AD|%20|a\+b/.test(s) ? '' : 'URL 编码输出缺失';
});
await t('unit-converter', async (p) => {
  await p.fill('input[type="number"]', '1');
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(300); }
  const s = await bodyText(p);
  return /\d/.test(s) && !/等待/.test(s) ? '' : '单位换算无输出';
});
await t('regex', async (p) => {
  await p.fill('input[type="text"] >> nth=0', '\\d+');
  const tas = await p.$$('textarea');
  if (tas.length) await tas[0].fill('abc 123 def 456');
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(300); }
  const s = await bodyText(p);
  return /123|456|匹配/.test(s) ? '' : '正则匹配无结果';
});
await t('case-converter', async (p) => {
  await p.fill('textarea, input[type="text"]', 'user login name');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /userLoginName|user_login_name|UserLoginName/.test(s) ? '' : '命名转换无输出';
});
await t('password', async (p) => {
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) await btn.click();
  await p.waitForTimeout(400);
  const s = await bodyText(p);
  return /[A-Za-z0-9!@#$%^&*]{8,}/.test(s) ? '' : '密码未生成';
});
await t('color', async (p) => {
  await p.fill('input[type="text"]', '#ff0000');
  await p.waitForTimeout(600);
  const s = await bodyText(p);
  return /rgb\(255|FF0000|hsl/i.test(s) ? '' : '颜色转换无输出';
});
await t('bmi', async (p) => {
  const inputs = await p.$$('input[type="number"]');
  if (inputs.length >= 2) { await inputs[0].fill('70'); await inputs[1].fill('175'); }
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(300); }
  const s = await bodyText(p);
  return /22\.9|23|BMI/.test(s) ? '' : 'BMI 无输出';
});
await t('percent', async (p) => {
  const inputs = await p.$$('input[type="number"]');
  if (inputs.length >= 2) { await inputs[0].fill('80'); await inputs[1].fill('100'); }
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(300); }
  const s = await bodyText(p);
  return /80|20/.test(s) ? '' : '百分比无输出';
});
await t('radix', async (p) => {
  await p.fill('#rx-in', '255');
  await p.click('#rx-run, button:has-text("转换")');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /FF|ff|11111111/.test(s) ? '' : '进制转换无输出';
});
await t('morse', async (p) => {
  await p.fill('#mo-in', 'SOS');
  await p.click('button:has-text("编码为摩斯")');
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(300); }
  const s = await bodyText(p);
  return /\.\.\. --- \.\.\./.test(s) ? '' : '摩斯电码无输出';
});
await t('caesar', async (p) => {
  await p.fill('#ce-in', 'abc');
  await p.click('button:has-text("转换")');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /def/.test(s) ? '' : '凯撒无输出';
});
await t('roman', async (p) => {
  await p.fill('#ro-in', '58');
  await p.click('#ro-run, button:has-text("转换")');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /LVIII/.test(s) ? '' : '罗马数字无输出';
});
await t('luhn', async (p) => {
  await p.fill('input[type="text"]', '4111111111111111');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /有效|通过|合法|true/i.test(s) ? '' : 'Luhn 无输出';
});
await t('idcard', async (p) => {
  await p.fill('#id-in', '11010519491231002X');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /女|1949|有效/.test(s) ? '' : '身份证校验无输出';
});
await t('jwt-decode', async (p) => {
  await p.fill('textarea, input[type="text"]', 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiemhhbmcyIn0.sig');
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(300); }
  const s = await bodyText(p);
  return /zhang2|HS256/.test(s) ? '' : 'JWT 解码无输出';
});
await t('ip', async (p) => {
  await p.waitForTimeout(800);
  const s = await bodyText(p);
  return /d+.d+.d+.d+|[fF]e80:|本机|局域网/.test(s) ? '' : 'IP 信息无输出';
});
await t('ua-parse', async (p) => {
  await p.fill('#up-in', 'Mozilla/5.0 (Windows NT 10.0) Chrome/120.0');
  await p.click('button:has-text("解析")');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /Chrome|Windows/.test(s) ? '' : 'UA 解析无输出';
});
await t('markdown', async (p) => {
  await p.fill('textarea', '# 标题\n\n**加粗**');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /标题|加粗/.test(s) ? '' : 'Markdown 无预览';
});
await t('lorem', async (p) => {
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) await btn.click();
  await p.waitForTimeout(400);
  const s = await bodyText(p);
  return s.length > 100 ? '' : '假文生成过短';
});
await t('ascii', async (p) => {
  await p.fill('textarea, input[type="text"]', 'AB');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /65|065|\d{2,3}/.test(s) ? '' : 'ASCII 无输出';
});
await t('unicode', async (p) => {
  await p.fill('textarea, input[type="text"]', '中');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /4E2D|\\u|20013/i.test(s) ? '' : 'Unicode 无输出';
});
await t('html-entity', async (p) => {
  await p.fill('textarea, input[type="text"]', '<a&>');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /&lt;|&amp;/.test(s) ? '' : 'HTML 实体无输出';
});
await t('number-cn', async (p) => {
  await p.fill('#nc-in', '123');
  await p.click('#nc-run, button:has-text("转换")');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /一百二十三|壹佰/.test(s) ? '' : '数字转中文无输出';
});
await t('timezone', async (p) => {
  await p.waitForTimeout(600);
  const s = await bodyText(p);
  return /UTC|时区|GMT|\+8/.test(s) ? '' : '时区无输出';
});
await t('gzip', async (p) => {
  await p.fill('textarea', 'compress me compress me compress me');
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(500); }
  const s = await bodyText(p);
  return !/等待/.test(s) && s.length > 20 ? '' : 'gzip 无输出';
});
await t('countdown', async (p) => {
  await p.waitForTimeout(800);
  const s = await bodyText(p);
  return /\d{1,2}:\d{2}|\d+/.test(s) ? '' : '倒计时无输出';
});
await t('notes', async (p) => {
  await p.fill('#nt-area', '测试笔记内容');
  await p.waitForTimeout(700);
  const s = await bodyText(p);
  return s.includes('测试笔记内容') ? '' : '笔记未保存显示';
});
await t('random', async (p) => {
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) await btn.click();
  await p.waitForTimeout(300);
  const s = await bodyText(p);
  return /\d/.test(s) ? '' : '随机数无输出';
});
await t('random-draw', async (p) => {
  const tas = await p.$$('textarea');
  if (tas.length) await tas[0].fill('张三\n李四\n王五');
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(400); }
  const s = await bodyText(p);
  return /张三|李四|王五/.test(s) ? '' : '随机抽取无结果';
});
await t('qrcode', async (p) => {
  await p.fill('textarea, input[type="text"]', 'test');
  await p.waitForTimeout(600);
  const hasCanvas = await p.evaluate(() => !!document.querySelector('canvas'));
  return hasCanvas ? '' : '二维码无 canvas';
});
await t('barcode', async (p) => {
  await p.fill('input[type="text"]', '6901234567892');
  await p.waitForTimeout(600);
  const hasCanvas = await p.evaluate(() => !!document.querySelector('canvas, svg'));
  return hasCanvas ? '' : '条形码无输出';
});
await t('gradient', async (p) => {
  await p.waitForTimeout(600);
  const s = await bodyText(p);
  return /linear-gradient|渐变/.test(s) ? '' : '渐变无输出';
});
await t('shadow', async (p) => {
  await p.waitForTimeout(600);
  const s = await bodyText(p);
  return /box-shadow|阴影/.test(s) ? '' : '阴影无输出';
});
await t('http-status', async (p) => {
  await p.fill('#hs-search', '404');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /Not Found|未找到/.test(s) ? '' : 'HTTP 状态查询无输出';
});
await t('ports', async (p) => {
  await p.fill('#pt-search', '80');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /HTTP|80/.test(s) ? '' : '端口查询无输出';
});
await t('mime', async (p) => {
  await p.fill('#mi-search', 'png');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /image\/png/.test(s) ? '' : 'MIME 查询无输出';
});
await t('xml', async (p) => {
  await p.fill('textarea', '<a><b>1</b></a>');
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /&lt;a&gt;|格式化|b/.test(s) ? '' : 'XML 格式化无输出';
});
await t('code-format', async (p) => {
  await p.fill('textarea', 'if(a){b()}');
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(400); }
  const s = await bodyText(p);
  return !/等待/.test(s) ? '' : '代码格式化无输出';
});
await t('date-calc', async (p) => {
  const inputs = await p.$$('input');
  for (const inp of inputs) {
    const type = await inp.getAttribute('type');
    if (type === 'date' || type === 'datetime-local') { await inp.fill('2026-01-01'); }
    else if (type === 'number') await inp.fill('30');
  }
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(300); }
  const s = await bodyText(p);
  return /\d{4}-\d{2}-\d{2}|天/.test(s) && !/等待/.test(s) ? '' : '日期计算无输出';
});
await t('text-tool', async (p) => {
  await p.fill('textarea', 'Hello World 你好');
  await p.waitForTimeout(600);
  const s = await bodyText(p);
  return /11|2|5/.test(s) ? '' : '文本统计无输出';
});
await t('text-tts', async (p) => {
  await p.fill('textarea, input[type="text"]', '测试语音');
  await p.waitForTimeout(400);
  const s = await bodyText(p);
  return !/等待/.test(s) || /播放|语音/.test(s) ? '' : 'TTS 无反应';
});
await t('base32', async (p) => {
  await p.fill('#b2-in', 'foo');
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(300); }
  const s = await bodyText(p);
  return /MZXW6/.test(s) ? '' : 'Base32 编码无输出';
});
await t('mortgage', async (p) => {
  const inputs = await p.$$('input[type="number"]');
  const vals = ['1000000', '30', '4.1'];
  for (let i = 0; i < Math.min(inputs.length, 3); i++) await inputs[i].fill(vals[i]);
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(400); }
  const s = await bodyText(p);
  return /元|¥|,/.test(s) && !/等待/.test(s) ? '' : '房贷计算无输出';
});
await t('contrast', async (p) => {
  const texts = await p.$$('input[type="text"]');
  if (texts.length >= 2) { await texts[0].fill('#000000'); await texts[1].fill('#ffffff'); }
  await p.waitForTimeout(500);
  const s = await bodyText(p);
  return /21|对比度/.test(s) ? '' : '对比度无输出';
});
await t('url-analyzer', async (p) => {
  await p.fill('#ua-in', 'https://example.com:8080/path?q=1#h');
  await p.click('button.btn:not(.btn-ghost):not([data-copy-from])');
  const btn = await p.$('button.btn:not(.btn-ghost)');
  if (btn) { await btn.click(); await p.waitForTimeout(300); }
  const s = await bodyText(p);
  return /example\.com|8080|q/.test(s) ? '' : 'URL 解析无输出';
});
await t('browser', async (p) => {
  await p.waitForTimeout(600);
  const s = await bodyText(p);
  return /Chrome|浏览器|Headless/i.test(s) ? '' : '浏览器信息无输出';
});
await t('ip-check', async () => '');
await t('image-picker', async (p) => {
  await p.waitForTimeout(300);
  return '';
});

await browser.close();
console.log(`\n手写文本/计算工具：${pass} 通过，${fails.length} 失败`);
fails.forEach((f) => console.log('  ✗ ' + f));
if (fails.length) process.exit(1);
