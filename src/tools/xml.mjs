export default {
  slug: 'xml',
  name: 'XML 格式化/压缩',
  desc: '在线 XML 格式化与压缩工具，支持注释、CDATA 与声明，一键整理 XML 文档。',
  keywords: 'xml格式化,xml压缩,xml在线,格式化xml,xml工具,xml美化',
  category: 'dev',
  body: `<div class="field">
  <label for="xl-in">XML 内容</label>
  <textarea id="xl-in" class="mono" rows="9" placeholder="粘贴 XML，如：&lt;root&gt;&lt;item id="1"&gt;内容&lt;/item&gt;&lt;/root&gt;"></textarea>
</div>
<div class="toolbar">
  <button id="xl-format" class="btn">格式化</button>
  <button id="xl-minify" class="btn btn-ghost">压缩为一行</button>
  <label class="check"><input type="checkbox" id="xl-indent2" checked>2 空格缩进</label>
  <span class="spacer"></span>
  <button data-copy-from="#xl-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="xl-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">输出</div>
  <textarea id="xl-out" class="mono" readonly placeholder="结果将显示在这里"></textarea>
</div>
<div id="xl-msg" class="note hidden"></div>`,
  usage: `<ol>
  <li>粘贴 XML 后点击“格式化”，按缩进重新排版，标签属性自动对齐缩进。</li>
  <li>“压缩为一行”去除标签间的空白（注释与 CDATA 内容不受影响）。</li>
  <li>支持 XML 声明、DOCTYPE、注释、CDATA 与自闭合标签。</li>
</ol>`,
  faq: [
    { q: '格式化会改变 XML 语义吗？', a: '不会。仅调整空白缩进与换行，标签、属性、文本与 CDATA 内容原样保留；压缩同理，只删除标签间的多余空白。' },
    { q: 'CDATA 里的内容会被压缩吗？', a: '不会。CDATA 段作为整体保留，内部空白原样输出，避免破坏其中包含的代码或脚本内容。' },
    { q: 'XML 不合法时能格式化吗？', a: '本工具按结构 token 处理，对缺失闭合标签等情况尽量容错；但属性引号不成对等严重错误可能产生错乱结果，建议先修复再格式化。' },
  ],
};
