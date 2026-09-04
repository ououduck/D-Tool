export default {
  slug: 'regex',
  name: '正则表达式测试',
  desc: '在线正则表达式测试工具，实时匹配结果、捕获组与替换预览，支持常用修饰符。',
  keywords: '正则表达式,正则测试,regex,正则在线,正则匹配,regexp测试,正则工具',
  category: 'text',
  body: `<div class="row">
  <div class="field grow">
    <label for="re-pattern">正则表达式</label>
    <input type="text" id="re-pattern" class="mono" placeholder="如：\\d{3,4}-\\d{7,8}">
  </div>
  <div class="field">
    <label for="re-flags" class="field-label">修饰符</label>
    <div class="row">
      <label class="check" title="全局匹配"><input type="checkbox" id="re-g">g</label>
      <label class="check" title="忽略大小写"><input type="checkbox" id="re-i">i</label>
      <label class="check" title="多行"><input type="checkbox" id="re-m">m</label>
      <label class="check" title="dotAll"><input type="checkbox" id="re-s">s</label>
      <label class="check" title="Unicode"><input type="checkbox" id="re-u">u</label>
    </div>
  </div>
</div>
<div class="field">
  <label for="re-text">测试文本</label>
  <textarea id="re-text" class="mono" rows="8" placeholder="输入需要匹配的文本"></textarea>
</div>
<div class="toolbar">
  <button id="re-run" class="btn">测试匹配</button>
  <span class="spacer"></span>
  <button id="re-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="field">
  <label for="re-replace" class="field-label">替换为（可选，预览效果）</label>
  <input type="text" id="re-replace" class="mono" placeholder="$1 表示第 1 个捕获组">
</div>
<div class="output">
  <div class="output-label">匹配结果</div>
  <pre id="re-out">等待测试…</pre>
</div>
<div class="output">
  <div class="output-label">替换预览</div>
  <pre id="re-repl">等待测试…</pre>
</div>`,
  usage: `<ol>
  <li>输入正则表达式（无需前后斜杠）并勾选需要的修饰符：g 全局、i 忽略大小写、m 多行、s 点号匹配换行、u Unicode（建议勾选以正确匹配中文与 emoji）。</li>
  <li>在测试文本中输入内容，点击“测试匹配”，展示每个匹配的整体与捕获组、所在行号。</li>
  <li>填写“替换为”后实时预览替换效果，支持 $1 引用捕获组。</li>
</ol>`,
  faq: [
    { q: '为什么匹配结果和我在别处的不一样？', a: '可能差异来自修饰符：忘记勾选 g 只会显示第一个匹配；中文/emoji 匹配请勾选 u；多行文本需按需勾选 m 或 s。' },
    { q: '如何匹配中文？', a: '推荐写法 [\\u4e00-\\u9fa5]（需勾选 u 修饰符）或 \\p{Script=Han}（需要 u 且浏览器支持）。' },
    { q: '正则太复杂编译失败怎么办？', a: '页面会给出浏览器原生的错误信息（如“Unterminated group”），按提示检查括号、量词与转义即可。' },
  ],
};
