export default {
  slug: 'code-format',
  name: 'HTML/CSS 压缩',
  desc: '在线 HTML 与 CSS 代码压缩工具，去除注释与多余空白，可显著减小文件体积。',
  keywords: 'html压缩,css压缩,html压缩工具,代码压缩,压缩html,压缩css,在线压缩',
  category: 'dev',
  body: `<div class="row">
  <div class="field grow">
    <label for="cf-type" class="field-label">语言</label>
    <select id="cf-type">
      <option value="html">HTML</option>
      <option value="css">CSS</option>
    </select>
  </div>
  <div class="field">
    <label class="check"><input type="checkbox" id="cf-comments">保留注释</label>
  </div>
</div>
<div class="field">
  <label for="cf-in">源码</label>
  <textarea id="cf-in" class="mono" rows="9" placeholder="粘贴 HTML 或 CSS 代码"></textarea>
</div>
<div class="toolbar">
  <button id="cf-run" class="btn">压缩</button>
  <span class="spacer"></span>
  <button data-copy-from="#cf-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="cf-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">压缩结果</div>
  <textarea id="cf-out" class="mono" readonly placeholder="结果将显示在这里"></textarea>
</div>
<div id="cf-meta" class="img-meta"></div>`,
  usage: `<ol>
  <li>选择 HTML 或 CSS，粘贴源码点击“压缩”。</li>
  <li>HTML 压缩去除标签间空白与注释（可选保留）；CSS 压缩去除注释、换行与多余空格。</li>
  <li>展示压缩前后体积对比，适合发布前的体积优化。</li>
</ol>`,
  faq: [
    { q: '压缩会改变功能吗？', a: '不会。仅移除空白与注释；CSS 中字符串与内容属性内的空白会被保留。' },
    { q: '和 Gzip 压缩冲突吗？', a: '不冲突。文本压缩先减小源文件，服务器 Gzip 再压缩传输，两者叠加效果更好。' },
    { q: '支持 JS 压缩吗？', a: '暂不支持 JS 压缩（需要语法解析，风险较高）；本工具专注 HTML 与 CSS。' },
  ],
};
