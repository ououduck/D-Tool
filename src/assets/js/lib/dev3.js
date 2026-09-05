/* D-Tool 开发工具算法库 3（纯函数，Node 可测）
   覆盖：代码模板生成、正则转义、HTTP 状态码分类、JSON 校验、颜色格式互转、时间格式化 */

const num = (v, fallback = 0) => { const n = parseFloat(v); return Number.isFinite(n) ? n : fallback; };
const fmt = (n, maxFrac = 4) => {
  if (!Number.isFinite(n)) return '—';
  const abs = Math.abs(n);
  let s;
  if (abs !== 0 && (abs >= 1e15 || abs < 1e-9)) s = n.toExponential(6).replace(/\.?0+e/, 'e');
  else s = String(Number(n.toFixed(maxFrac)));
  const [i, f] = s.split('.');
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (f ? '.' + f : '');
};

/* ---------- 正则转义 ---------- */
export function regexEscape(input) {
  return String(input).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* ---------- 颜色格式互转（HEX/RGB/HSL） ---------- */
export function colorFormat(values) {
  const input = String(values[0] || '').trim();
  if (!input) return '请输入颜色';
  let r, g, b;
  const hexMatch = input.match(/^#?([0-9a-f]{6})$/i);
  const hex3 = input.match(/^#?([0-9a-f]{3})$/i);
  const rgbMatch = input.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (hexMatch) {
    const h = hexMatch[1];
    r = parseInt(h.slice(0, 2), 16);
    g = parseInt(h.slice(2, 4), 16);
    b = parseInt(h.slice(4, 6), 16);
  } else if (hex3) {
    const h = hex3[1];
    r = parseInt(h[0] + h[0], 16);
    g = parseInt(h[1] + h[1], 16);
    b = parseInt(h[2] + h[2], 16);
  } else if (rgbMatch) {
    r = parseInt(rgbMatch[1], 10);
    g = parseInt(rgbMatch[2], 10);
    b = parseInt(rgbMatch[3], 10);
  } else {
    const named = { red: [255, 0, 0], green: [0, 128, 0], blue: [0, 0, 255], black: [0, 0, 0], white: [255, 255, 255], gray: [128, 128, 128], yellow: [255, 255, 0], orange: [255, 165, 0], purple: [128, 0, 128], pink: [255, 192, 203] };
    if (named[input.toLowerCase()]) [r, g, b] = named[input.toLowerCase()];
    else return '无法识别的颜色格式（支持 HEX/RGB/常用颜色名）';
  }
  if ([r, g, b].some((x) => Number.isNaN(x) || x < 0 || x > 255)) return 'RGB 值需在 0-255 之间';
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0, l = (max + min) / 2;
  const d = max - min;
  if (d) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
    else if (max === gn) h = ((bn - rn) / d + 2) * 60;
    else h = ((rn - gn) / d + 4) * 60;
  }
  const hex = '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase();
  return [
    { name: 'HEX', value: hex },
    { name: 'RGB', value: `rgb(${r}, ${g}, ${b})` },
    { name: 'HSL', value: `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)` },
  ];
}

/* ---------- 时间格式化 ---------- */
export function timeFormat(values) {
  const ms = num(values[0]);
  if (!Number.isFinite(ms) || ms < 0) return '请输入毫秒数';
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const msLeft = Math.floor(ms % 1000);
  return [
    { name: '天时分秒', value: `${d} 天 ${h} 时 ${m} 分 ${s} 秒` },
    { name: '时分秒', value: `${h + d * 24} 时 ${m} 分 ${s} 秒` },
    { name: '总秒数', value: fmt(ms / 1000, 3) + ' 秒' },
    { name: '总分钟', value: fmt(ms / 60000, 3) + ' 分' },
    { name: '毫秒', value: fmt(ms, 0) },
  ];
}

/* ---------- JSON 校验 ---------- */
export function jsonValidate(input) {
  try {
    const obj = JSON.parse(input);
    return [
      { name: '是否有效', value: '有效 JSON ✓' },
      { name: '类型', value: Array.isArray(obj) ? '数组' : typeof obj === 'object' ? '对象' : typeof obj },
      { name: '顶层键数', value: Array.isArray(obj) ? String(obj.length) : String(Object.keys(obj).length) },
    ];
  } catch (e) {
    return `无效 JSON：${e.message}`;
  }
}

/* ---------- HTTP 状态码分类 ---------- */
export function statusClassify(values) {
  const code = parseInt(values[0], 10);
  if (Number.isNaN(code) || code < 100 || code > 599) return '请输入 100-599 的状态码';
  if (code < 200) return `${code}：信息响应（1xx）—— 请求已收到，继续处理`;
  if (code < 300) return `${code}：成功（2xx）—— 请求成功处理`;
  if (code < 400) return `${code}：重定向（3xx）—— 需进一步操作完成请求`;
  if (code < 500) return `${code}：客户端错误（4xx）—— 请求有误，检查参数与权限`;
  return `${code}：服务端错误（5xx）—— 服务器处理失败，检查日志`;
}

/* ---------- 代码模板生成（HTML 骨架/JSON 骨架等） ---------- */
export function htmlSkeleton(values) {
  const [title, lang] = [String(values[0] || '页面标题'), String(values[1] || 'zh-CN')];
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    /* 样式 */
  </style>
</head>
<body>
  <!-- 内容 -->
  <script>
    // 脚本
  </script>
</body>
</html>`;
}

/* ---------- HTTP 请求头生成（常用头模板） ---------- */
export function httpHeadersTemplate(values) {
  const [method, contentType] = [String(values[0] || 'GET').toUpperCase(), String(values[1] || 'application/json')];
  const lines = [
    `${method} / HTTP/1.1`,
    'Host: example.com',
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept: application/json, text/plain, */*',
    `Content-Type: ${contentType}`,
    'Authorization: Bearer <token>',
    'Cache-Control: no-cache',
  ];
  return lines.join('\n');
}

/* ---------- gitignore 模板 ---------- */
export function gitignoreTemplate() {
  return `# 依赖
node_modules/
vendor/

# 构建产物
dist/
build/
out/
*.tsbuildinfo

# 环境变量
.env
.env.local
.env.*.local

# 日志
logs/
*.log
npm-debug.log*

# 缓存
.cache/
.temp/

# 系统文件
.DS_Store
Thumbs.db

# 编辑器
.vscode/
.idea/
*.swp

# 测试覆盖率
coverage/
`;

}
