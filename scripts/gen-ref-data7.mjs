/* 速查手册（ref）数据生成 7：node scripts/gen-ref-data7.mjs
   HTTP 方法扩展/常用端口补充/进制前缀/HTML 颜色值/时间单位/数据单位 */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'js', 'lib', 'data');
const write = (name, rows) => {
  writeFileSync(path.join(OUT, name + '.js'), `/* 自动生成：${name} 速查表 */\nexport const ${name} = ${JSON.stringify(rows)};\n`);
  console.log(`✓ ${name}.js (${rows.length} 行)`);
};

/* ---------- 常用 HTTP 请求场景 ---------- */
const httpScenarios = [
  ['GET /', '获取首页', '浏览器访问'],
  ['GET /api/users?page=1', '分页查询', '列表接口'],
  ['POST /api/login', '登录', '提交账号密码'],
  ['POST /api/users', '创建用户', '提交 JSON 数据'],
  ['PUT /api/users/1', '整体更新', '替换整个资源'],
  ['PATCH /api/users/1', '部分更新', '只改个别字段'],
  ['DELETE /api/users/1', '删除', '删除资源'],
  ['HEAD /large.zip', '检查资源', '只看响应头'],
  ['OPTIONS /api', '预检请求', 'CORS 探测'],
  ['GET /api/search?q=abc', '搜索', '查询参数传关键词'],
  ['POST /api/upload', '文件上传', 'multipart 表单'],
  ['GET /api/download?id=1', '文件下载', '返回文件流'],
  ['GET /api/export.csv', '导出 CSV', '服务端生成文件'],
  ['POST /api/refresh', '刷新令牌', '换新 token'],
  ['GET /api/profile', '获取个人资料', '需 Authorization'],
  ['POST /api/verify', '验证码校验', '提交验证码'],
];
write('HTTP_SCENARIOS', httpScenarios);

/* ---------- 数据单位换算（十进制） ---------- */
const dataUnits = [
  ['1 KB', '1000 B', '十进制千字节'],
  ['1 MB', '1000 KB', '十进制兆字节'],
  ['1 GB', '1000 MB', '十进制吉字节'],
  ['1 TB', '1000 GB', '十进制太字节'],
  ['1 PB', '1000 TB', '十进制拍字节'],
  ['1 KiB', '1024 B', '二进制千字节'],
  ['1 MiB', '1024 KiB', '二进制兆字节'],
  ['1 GiB', '1024 MiB', '二进制吉字节'],
  ['1 TiB', '1024 GiB', '二进制太字节'],
  ['1 nibble', '4 bit', '半字节'],
  ['1 byte', '8 bit', '一字节'],
  ['1 word', '2/4/8 B', '字长（依架构）'],
  ['1 KB vs 1 KiB', '1000 vs 1024', '厂商 vs 系统'],
  ['1 TB 硬盘', '≈ 931 GiB', '厂商十进制标称'],
  ['1 Gbps', '≈ 125 MB/s', '网络速率换算'],
];
write('DATA_UNITS', dataUnits);

/* ---------- 时间单位换算 ---------- */
const timeUnits = [
  ['1 毫秒', '0.001 秒', 'ms'],
  ['1 秒', '1000 毫秒', 's'],
  ['1 分钟', '60 秒', 'min'],
  ['1 小时', '60 分钟', 'h'],
  ['1 天', '24 小时', 'd'],
  ['1 周', '7 天', 'week'],
  ['1 月（平均）', '30.44 天', 'month'],
  ['1 年（平年）', '365 天', 'year'],
  ['1 年（闰年）', '366 天', 'leap year'],
  ['1 年（约）', '8760 小时', 'hour/year'],
  ['1 世纪', '100 年', 'century'],
  ['1 千年', '1000 年', 'millennium'],
  ['1 刻钟', '15 分钟', 'quarter'],
  ['1 光年', '9.46 万亿公里', 'light year'],
];
write('TIME_UNITS', timeUnits);

/* ---------- 常用进制前缀 ---------- */
const radixPrefix = [
  ['0b', '二进制', '1010 = 10'],
  ['0o', '八进制', '0o17 = 15'],
  ['0x', '十六进制', '0xFF = 255'],
  ['0d', '十进制（少见）', '显式十进制'],
  ['1e3', '科学计数', '1000'],
  ['0.1e1', '科学计数', '1'],
  ['1_000', '数字分隔符', '1000（ES2021）'],
  ['BigInt n', '大整数', '123n'],
  ['-0', '负零', 'IEEE 754'],
  ['NaN', '非数字', 'Number.NaN'],
  ['Infinity', '无穷', 'Number.POSITIVE_INFINITY'],
];
write('RADIX_PREFIX', radixPrefix);

/* ---------- 常用 HTML 颜色值 ---------- */
const htmlColors = [
  ['黑色', '#000000', 'black'],
  ['白色', '#FFFFFF', 'white'],
  ['红色', '#FF0000', 'red'],
  ['绿色', '#008000', 'green'],
  ['蓝色', '#0000FF', 'blue'],
  ['黄色', '#FFFF00', 'yellow'],
  ['橙色', '#FFA500', 'orange'],
  ['紫色', '#800080', 'purple'],
  ['粉色', '#FFC0CB', 'pink'],
  ['灰色', '#808080', 'gray'],
  ['青色', '#00FFFF', 'aqua'],
  ['棕色', '#A52A2A', 'brown'],
  ['金色', '#FFD700', 'gold'],
  ['银色', '#C0C0C0', 'silver'],
  ['海军蓝', '#000080', 'navy'],
  ['橄榄', '#808000', 'olive'],
  ['栗色', '#800000', 'maroon'],
  ['青绿', '#008080', 'teal'],
  ['品红', '#FF00FF', 'fuchsia'],
  ['酸橙', '#00FF00', 'lime'],
];
write('HTML_COLORS', htmlColors);
