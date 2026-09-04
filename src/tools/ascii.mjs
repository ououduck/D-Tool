export default {
  slug: 'ascii',
  name: 'ASCII 与字符互转',
  desc: '字符与 ASCII 码互转工具，显示十进制、十六进制、二进制与 HTML 实体，支持 UTF-8 中文。',
  keywords: 'ascii码,字符转ascii,ascii表,字符编码,十六进制转换,unicode码点',
  category: 'codec',
  body: `<div class="field">
  <label for="as-in">输入字符或码值</label>
  <textarea id="as-in" class="mono" rows="3" placeholder="输入字符（如 ABC 你好）或数字码值（如 65 或 0x41）"></textarea>
</div>
<div class="toolbar">
  <button id="as-run" class="btn">转换</button>
  <span class="spacer"></span>
  <button id="as-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="table-wrap">
  <table class="data" id="as-table"></table>
</div>`,
  usage: `<ol>
  <li>粘贴字符文本，点击“转换”，每个字符输出 Unicode 码点、UTF-8 字节、十进制 / 十六进制 / 二进制与 HTML 实体。</li>
  <li>输入数字码值（十进制如 65，或 0x41）可反向查看对应字符。</li>
  <li>适用于调试编码问题、生成 HTML 实体、理解字符在计算机中的表示。</li>
</ol>`,
  faq: [
    { q: 'ASCII 和 Unicode 是什么关系？', a: 'ASCII 是 0-127 的 128 个字符（英文字母、数字、符号）；Unicode 是包含全球文字的码点体系，ASCII 是其子集（U+0000~U+007F）。' },
    { q: '中文显示的是 ASCII 吗？', a: '不是。中文在 Unicode 中码点远超 127（如“你”为 U+4F60），在 UTF-8 中占 3 字节；本工具展示其真实码点与字节。' },
    { q: 'HTML 实体怎么用？', a: '格式为 &amp;#十进制; 或 &amp;#x十六进制;，如“你”的实体为 &amp;#20320;，适合在 HTML 中安全显示特殊字符。' },
  ],
};
