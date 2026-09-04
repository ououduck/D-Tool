export default {
  slug: 'roman',
  name: '罗马数字转换',
  desc: '在线罗马数字与阿拉伯数字互转工具，支持 1-3999，规范写法校验。',
  keywords: '罗马数字,罗马数字转换,罗马数字对照,数字转罗马,roman numerals',
  category: 'convert',
  body: `<div class="row">
  <div class="field grow">
    <label for="ro-in">阿拉伯数字或罗马数字</label>
    <input type="text" id="ro-in" class="mono" placeholder="如 1999 或 MCMXCIX">
  </div>
</div>
<div class="toolbar">
  <button id="ro-run" class="btn">转换</button>
  <span class="spacer"></span>
  <button data-copy-from="#ro-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="ro-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">结果</div>
  <pre id="ro-out">等待输入…</pre>
</div>`,
  usage: `<ol>
  <li>输入 1-3999 的整数得到罗马数字，或输入罗马数字（如 MCMXCIX）得到阿拉伯数字。</li>
  <li>自动识别输入类型；罗马数字按规范写法（减法规则：IV、IX、XL、XC、CD、CM）校验。</li>
  <li>适合年份、章节编号、钟表刻度的转换。</li>
</ol>`,
  faq: [
    { q: '为什么只支持到 3999？', a: '标准罗马数字用 I V X L C D M 表示，最大规范写法为 MMMCMXCIX（3999）；更大数字需要上划线扩展，规则不统一。' },
    { q: 'IIII 是错的吗？', a: '现代规范钟表上偶见 IIII，但标准罗马数字中 4 写作 IV；本工具按规范校验，IIII 会提示非规范写法。' },
    { q: '0 有罗马数字吗？', a: '罗马数字体系没有 0 的符号（用 nulla 表示“无”），因此 0 与负数不在支持范围。' },
  ],
};
