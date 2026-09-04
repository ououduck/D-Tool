/* 核心算法库单元测试 —— node test/run.mjs */
import assert from 'node:assert';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const LIB = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'js', 'lib');
const mod = (name) => import(pathToFileURL(path.join(LIB, name)).href);

let passed = 0, failed = 0;
function ok(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (e) { failed++; console.error(`  ✗ ${name}\n    ${e.message}`); }
}
const eq = (a, b, msg) => assert.strictEqual(a, b, msg);

const hashOf = (algo, s) => createHash(algo).update(s, 'utf8').digest('hex');

/* ---------- MD5 ---------- */
console.log('MD5');
const { md5, md5Bytes } = await mod('md5.js');
ok('空串向量', () => eq(md5(''), 'd41d8cd98f00b204e9800998ecf8427e'));
ok('abc 向量', () => eq(md5('abc'), '900150983cd24fb0d6963f7d28e17f72'));
ok('fox 向量', () => eq(md5('The quick brown fox jumps over the lazy dog'), '9e107d9d372bb6826bd81d3542a419d6'));
ok('中文对照 node crypto', () => eq(md5('你好，世界！🦆'), hashOf('md5', '你好，世界！🦆')));
ok('长文本(100KB) 对照', () => {
  const t = 'a'.repeat(100000);
  eq(md5(t), hashOf('md5', t));
});
ok('md5Bytes 二进制安全', () => {
  eq(md5Bytes(new Uint8Array([0, 255, 1, 254])), hashOf('md5', Buffer.from([0, 255, 1, 254])));
});

/* ---------- SHA ---------- */
console.log('SHA');
const { shaHex, hashAll } = await mod('sha.js');
for (const [algo, nodeAlgo] of [['SHA-1', 'sha1'], ['SHA-256', 'sha256'], ['SHA-384', 'sha384'], ['SHA-512', 'sha512']]) {
  ok(`${algo} abc 对照`, async () => eq(await shaHex(algo, 'abc'), hashOf(nodeAlgo, 'abc')));
}
ok('hashAll 多算法', async () => {
  const h = await hashAll('abc');
  eq(h.sha256, hashOf('sha256', 'abc'));
  eq(h.sha512, hashOf('sha512', 'abc'));
});

/* ---------- Base64 ---------- */
console.log('Base64');
const { b64encode, b64decode, b64urlEncode, b64urlDecode, isValidB64 } = await mod('base64.js');
ok('已知向量', () => eq(b64encode('你好'), '5L2g5aW9'));
ok('中文+emoji 往返', () => eq(b64decode(b64encode('D-Tool 中文 🦆 混合')), 'D-Tool 中文 🦆 混合'));
ok('URL-safe 往返', () => eq(b64urlDecode(b64urlEncode('https://example.com/a+b/c?q=1')), 'https://example.com/a+b/c?q=1'));
ok('isValidB64', () => {
  eq(isValidB64('5L2g5aW9'), true);
  eq(isValidB64('abc!'), false);
});

/* ---------- Diff ---------- */
console.log('Diff');
const { diffLines, MAX_LINES } = await mod('diff.js');
ok('相同文本', () => {
  const d = diffLines('a\nb\nc', 'a\nb\nc');
  eq(d.filter((x) => x.type === 'same').length, 3);
  eq(d.filter((x) => x.type !== 'same').length, 0);
});
ok('插入/删除', () => {
  const d = diffLines('a\nc', 'a\nb\nc');
  eq(d.filter((x) => x.type === 'add').length, 1);
  const d2 = diffLines('a\nb\nc', 'a\nc');
  eq(d2.filter((x) => x.type === 'del').length, 1);
});
ok('中文内容', () => {
  const d = diffLines('第一行\n第二行', '第一行\n改动行');
  eq(d.filter((x) => x.type === 'del').map((x) => x.text).join(','), '第二行');
  eq(d.filter((x) => x.type === 'add').map((x) => x.text).join(','), '改动行');
});
ok('超限保护', () => {
  eq(diffLines('x\n'.repeat(MAX_LINES + 1), 'y'), null);
});

/* ---------- CSV ---------- */
console.log('CSV');
const { parseCsv, detectDelimiter, toCsv, csvToJson, jsonToCsv } = await mod('csv.js');
ok('RFC4180 引号字段', () => {
  const rows = parseCsv('a,"b,c","d""e"\nf,g,h');
  eq(rows.length, 2);
  eq(rows[0][1], 'b,c');
  eq(rows[0][2], 'd"e');
});
ok('字段内换行', () => {
  const rows = parseCsv('a,"line1\nline2",b');
  eq(rows[0][1], 'line1\nline2');
});
ok('delimiter 检测', () => eq(detectDelimiter('a\tb\tc\n1\t2\t3'), '\t'));
ok('CSV→JSON 表头', () => {
  const arr = csvToJson('name,age\n张三,28\n李四,31');
  eq(arr.length, 2);
  eq(arr[0].name, '张三');
  eq(arr[1].age, '31');
});
ok('JSON→CSV→JSON 往返', () => {
  const src = [{ name: 'a,b', age: 1 }, { name: 'c"d', age: 2 }];
  const csv = jsonToCsv(src);
  const back = csvToJson(csv);
  eq(back[0].name, 'a,b');
  eq(back[1].name, 'c"d');
});
ok('toCsv 引号转义', () => eq(toCsv([['x"y']]), '"x""y"'));

/* ---------- Markdown ---------- */
console.log('Markdown');
const { renderMarkdown } = await mod('markdown.js');
ok('标题/粗斜/代码', () => {
  const h = renderMarkdown('# 标题\n**加粗** *斜体* `code`');
  assert.match(h, /<h1>标题<\/h1>/);
  assert.match(h, /<strong>加粗<\/strong>/);
  assert.match(h, /<em>斜体<\/em>/);
  assert.match(h, /<code>code<\/code>/);
});
ok('XSS 全转义', () => {
  const h = renderMarkdown('<script>alert(1)</script>\n[点我](javascript:alert(2))');
  assert.ok(!h.includes('<script>'), '不应出现原始 script 标签');
  assert.match(h, /&lt;script&gt;/);
  assert.ok(!h.includes('href="javascript:'), '不应出现 javascript: 链接');
});
ok('链接属性', () => {
  const h = renderMarkdown('[官网](https://example.com/?a=1&b=2)');
  assert.match(h, /<a href="https:\/\/example.com\/\?a=1&amp;b=2" target="_blank" rel="noopener nofollow">官网<\/a>/);
});
ok('围栏代码', () => {
  const h = renderMarkdown('```js\nconst a = 1;\n```');
  assert.match(h, /<pre><code class="lang-js">const a = 1;<\/code><\/pre>/);
});
ok('列表/引用/分割线', () => {
  const h = renderMarkdown('- 甲\n- 乙\n\n> 引用\n\n---');
  assert.match(h, /<ul><li>甲<\/li><li>乙<\/li><\/ul>/);
  assert.match(h, /<blockquote><p>引用<\/p><\/blockquote>/);
  assert.match(h, /<hr>/);
});
ok('表格', () => {
  const h = renderMarkdown('| 名称 | 值 |\n| --- | --- |\n| 甲 | 1 |');
  assert.match(h, /<table><thead><tr><th>名称<\/th><th>值<\/th>/);
  assert.match(h, /<td>1<\/td>/);
});
ok('自动链接', () => {
  const h = renderMarkdown('访问 <https://example.com> 吧');
  assert.match(h, /<a href="https:\/\/example.com" target="_blank"/);
});

/* ---------- 颜色 ---------- */
console.log('Color');
const { parseColor, rgbToHex, rgbToHsl, hslToRgb, rgbToHsv, luminance, readableOn, hexToRgb } = await mod('color.js');
ok('各格式解析', () => {
  eq(parseColor('#ff0000').r, 255);
  eq(parseColor('#f00').g, 0);
  eq(parseColor('rgb(0, 128, 255)').b, 255);
  eq(parseColor('hsl(0, 100%, 50%)').r, 255);
  eq(parseColor('red').r, 255);
  eq(parseColor('#ff000080').a, 0.5);
  eq(parseColor('rgba(0,0,0,0.25)').a, 0.25);
  eq(parseColor('hsl(120, 100%, 25%)').g, 128);
  eq(parseColor('notacolor'), null);
});
ok('HEX→HSL→RGB 往返', () => {
  const hsl = rgbToHsl({ r: 64, g: 128, b: 192 });
  const rgb = hslToRgb(hsl.h, hsl.s / 100, hsl.l / 100);
  eq(rgb.r, 64); eq(rgb.g, 128); eq(rgb.b, 192);
});
ok('HSV', () => {
  const hsv = rgbToHsv({ r: 255, g: 0, b: 0 });
  eq(hsv.h, 0); eq(hsv.s, 100); eq(hsv.v, 100);
});
ok('亮度与可读色', () => {
  eq(luminance({ r: 0, g: 0, b: 0 }), 0);
  assert.ok(Math.abs(luminance({ r: 255, g: 255, b: 255 }) - 1) < 0.001);
  eq(readableOn(1), '#18181b');
  eq(readableOn(0), '#ffffff');
});

/* ---------- 单位 ---------- */
console.log('Units');
const { UNIT_CATEGORIES, convertUnits, formatNumber } = await mod('units.js');
ok('长度', () => eq(convertUnits(1, 'm', 'cm', UNIT_CATEGORIES.length), 100));
ok('重量 斤', () => eq(convertUnits(1, 'kg', 'jin', UNIT_CATEGORIES.weight), 2));
ok('温度 0°C=32°F', () => eq(Math.round(convertUnits(0, 'c', 'f', UNIT_CATEGORIES.temperature)), 32));
ok('温度 100°C=373.15K', () => {
  assert.ok(Math.abs(convertUnits(100, 'c', 'k', UNIT_CATEGORIES.temperature) - 373.15) < 1e-9);
});
ok('数据 1GiB=1024MiB', () => eq(convertUnits(1, 'GiB', 'MiB', UNIT_CATEGORIES.data), 1024));
ok('时间', () => eq(convertUnits(1, 'h', 's', UNIT_CATEGORIES.time), 3600));
ok('formatNumber', () => {
  eq(formatNumber(1234567.891), '1,234,567.891');
  eq(formatNumber(0.0000000001), '1e-10');
  eq(formatNumber(42), '42');
});

/* ---------- JWT ---------- */
console.log('JWT');
const { decodeJwt, prettyExp } = await mod('jwt.js');
ok('解析标准 token', () => {
  const { header, payload } = decodeJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  eq(header.alg, 'HS256');
  eq(payload.sub, '1234567890');
  eq(payload.name, 'John Doe');
});
ok('中文 payload', () => {
  const { payload } = decodeJwt(`eyJhbGciOiJIUzI1NiJ9.${b64urlEncode(JSON.stringify({ user: '张三' }))}.sig`);
  eq(payload.user, '张三');
});
ok('非法 token 抛错', () => {
  assert.throws(() => decodeJwt('not-a-jwt'));
});
ok('prettyExp', () => {
  const r = prettyExp(Date.now() / 1000 + 3600);
  eq(r.status, '未过期');
  eq(prettyExp('abc'), null);
});

/* ---------- UUID ---------- */
console.log('UUID');
const { uuidV4, uuidList } = await mod('uuid.js');
ok('v4 格式', () => {
  const u = uuidV4();
  assert.match(u, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
});
ok('批量 + 大写', () => {
  const list = uuidList(10, { upper: true });
  eq(list.length, 10);
  assert.match(list[0], /^[0-9A-F-]+$/);
  eq(new Set(list).size, 10);
});

/* ---------- 命名转换 ---------- */
console.log('CaseConv');
const { toCamel, toPascal, toSnake, toUpperSnake, toKebab, toTitle } = await mod('caseconv.js');
ok('下划线→驼峰', () => eq(toCamel('user_login_name'), 'userLoginName'));
ok('驼峰→下划线', () => eq(toSnake('userLoginName'), 'user_login_name'));
ok('HTTP 缩写边界', () => eq(toCamel('HTTPServer'), 'httpServer'));
ok('混合输入', () => {
  eq(toKebab('User Login-Name_test'), 'user-login-name-test');
  eq(toUpperSnake('user login'), 'USER_LOGIN');
  eq(toPascal('user login'), 'UserLogin');
  eq(toTitle('user login'), 'User Login');
});

/* ---------- Gzip ---------- */
console.log('Gzip');
const { SUPPORTED, compressToBytes, decompressToText, bytesToB64, b64ToBytes } = await mod('gzip.js');
ok('支持检测', () => eq(SUPPORTED, typeof CompressionStream !== 'undefined'));
ok('gzip 往返', async () => {
  const t = 'D-Tool 压缩测试 '.repeat(100);
  const bytes = await compressToBytes(t, 'gzip');
  assert.ok(bytes.length < 1000);
  eq(await decompressToText(bytes, 'gzip'), t);
});
ok('deflate 往返', async () => {
  const t = '中文内容 deflate 测试';
  eq(await decompressToText(await compressToBytes(t, 'deflate'), 'deflate'), t);
});
ok('b64 转换', () => {
  const bytes = Uint8Array.from([0, 1, 2, 250, 255]);
  eq([...b64ToBytes(bytesToB64(bytes))].join(','), [...bytes].join(','));
});

/* ---------- QR ---------- */
console.log('QR');
const { default: qrcode } = await mod('qr.js');
ok('多长度生成', () => {
  for (const t of ['', 'a', 'https://example.com', '中文二维码内容测试', 'x'.repeat(500)]) {
    const qr = qrcode(0, 'M');
    qr.addData(t);
    qr.make();
    assert.ok(qr.getModuleCount() > 0, `len=${t.length}`);
  }
});
ok('指定版本 1 → 21×21', () => {
  const qr = qrcode(1, 'M');
  qr.addData('abc');
  qr.make();
  eq(qr.getModuleCount(), 21);
});

/* ---------- 汇总 ---------- */
console.log(`\n${passed} 通过, ${failed} 失败`);
if (failed > 0) process.exit(1);
