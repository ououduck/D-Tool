export default {
  slug: 'html-entity',
  name: 'HTML 实体转义/反转义',
  desc: 'HTML 特殊字符转义与实体还原工具，防止 XSS 注入、正确显示 HTML 代码。',
  keywords: 'html转义,html实体,html特殊字符,htmlescape,xss转义,html编码',
  category: 'codec',
  body: `<div class="field">
  <label for="he-in">输入文本</label>
  <textarea id="he-in" class="mono" placeholder="输入 HTML 片段或包含实体的文本"></textarea>
</div>
<div class="toolbar">
  <button id="he-encode" class="btn">转义特殊字符</button>
  <button id="he-encode-all" class="btn btn-ghost">全部转义为实体</button>
  <button id="he-decode" class="btn btn-ghost">还原实体</button>
  <span class="spacer"></span>
  <button data-copy-from="#he-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="he-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">输出</div>
  <textarea id="he-out" class="mono" readonly placeholder="结果将显示在这里"></textarea>
</div>
<div class="note">“全部转义为实体”会把每个字符转换为 &amp;#xxx; 数字实体，适合需要完全规避解析场景；还原实体可解码命名实体（如 &amp;lt;）与数字实体（如 &amp;#60;）。</div>`,
  usage: `<ol>
  <li>粘贴需要处理的 HTML 或文本。</li>
  <li>“转义特殊字符”将 &lt; &gt; &amp; &quot; ' 转换为实体，便于在页面上展示 HTML 代码。</li>
  <li>“还原实体”通过浏览器 HTML 解析器还原全部命名与数字实体，安全且不会执行脚本。</li>
</ol>`,
  faq: [
    { q: '转义能防止 XSS 吗？', a: '可以。把用户输入中的 &lt; &gt; &amp; &quot; &#39; 转为实体后，浏览器会把它们当作文本而非标签渲染，这是防御 XSS 的基本手段（还需配合正确的输出位置处理）。' },
    { q: '命名实体和数字实体有什么区别？', a: '命名实体如 &amp;lt; 有名字，数字实体如 &amp;#60; 使用 Unicode 码点。两者效果相同，数字实体覆盖面更全。' },
    { q: '反转义是否安全？', a: '安全。本工具使用浏览器的 HTML 解析器提取文本内容（textContent），解析过程中的脚本不会被执行。' },
  ],
};
