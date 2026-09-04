export default {
  slug: 'json',
  name: 'JSON 格式化/校验',
  desc: '在线 JSON 格式化、压缩、校验工具，支持排序与语法错误行列定位，纯本地解析。',
  keywords: 'json格式化,json在线,json校验,json压缩,json工具,json解析,json排序',
  category: 'text',
  body: `<div class="field">
  <label for="js-in">JSON 内容</label>
  <textarea id="js-in" class="mono" rows="9" placeholder='{"name":"D-Tool","tools":["json","base64"],"free":true}'></textarea>
</div>
<div class="toolbar">
  <button id="js-format" class="btn">格式化</button>
  <button id="js-compress" class="btn btn-ghost">压缩为一行</button>
  <button id="js-validate" class="btn btn-ghost">校验</button>
  <label class="check"><input type="checkbox" id="js-sort">按 key 排序</label>
  <span class="spacer"></span>
  <button data-copy-from="#js-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="js-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="field">
  <label for="js-indent" class="field-label">缩进</label>
  <select id="js-indent">
    <option value="2">2 空格</option>
    <option value="4">4 空格</option>
    <option value="tab">Tab</option>
  </select>
</div>
<div class="output">
  <div class="output-label">输出</div>
  <textarea id="js-out" class="mono" readonly placeholder="结果将显示在这里"></textarea>
</div>
<div id="js-msg" class="note hidden"></div>`,
  usage: `<ol>
  <li>粘贴 JSON，点击“格式化”按所选缩进排版；“压缩为一行”去除所有空白。</li>
  <li>“校验”只检查语法并给出结果；格式化或压缩失败时，提示会定位到第几行第几列。</li>
  <li>勾选“按 key 排序”后，格式化与压缩会递归按键名字母序重排对象字段。</li>
</ol>`,
  faq: [
    { q: 'JSON 里可以有注释或单引号吗？', a: '标准 JSON 不允许注释和单引号、尾逗号。若你处理的是 JS 对象字面量（带注释/单引号/尾逗号），属于非标准 JSON，本工具会报错。' },
    { q: '提示“第 X 行第 Y 列”是什么意思？', a: '表示语法错误发生在原文本的位置，行从 1 开始计。常见错误：多余逗号、花括号/方括号不配对、字符串未闭合、值后缺少逗号。' },
    { q: 'JSON 是转义好还是格式化好？', a: '接口调试看格式化；存储、传输用压缩（省流量）。注意压缩仅去掉空白，key 与字符串内容不会被改变。' },
  ],
};
