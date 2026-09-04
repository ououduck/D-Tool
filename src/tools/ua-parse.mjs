export default {
  slug: 'ua-parse',
  name: 'User-Agent 解析',
  desc: '在线 User-Agent 解析工具，从 UA 字符串识别浏览器、系统、设备类型与内核。',
  keywords: 'ua解析,user-agent解析,useragent,浏览器识别,ua查询,ua工具',
  category: 'web',
  body: `<div class="field">
  <label for="up-in">User-Agent 字符串</label>
  <textarea id="up-in" class="mono" rows="3" placeholder="粘贴 UA，或点击下方按钮读取当前浏览器 UA"></textarea>
</div>
<div class="toolbar">
  <button id="up-run" class="btn">解析</button>
  <button id="up-now" class="btn btn-ghost">读取本机 UA</button>
  <span class="spacer"></span>
  <button data-copy-from="#up-out" class="btn btn-ghost btn-sm">复制结果</button>
</div>
<div class="output">
  <div class="output-label">解析结果</div>
  <pre id="up-out">等待解析…</pre>
</div>
<div class="note">UA 是浏览器主动声明的字符串，可被伪造；解析结果仅作参考，不应作为安全或统计的绝对依据。点击“读取本机 UA”可查看当前浏览器（需无痕模式下部分信息会隐藏）。</div>`,
  usage: `<ol>
  <li>粘贴任意 UA 字符串点击“解析”，输出浏览器、版本、内核、操作系统、设备类型。</li>
  <li>点击“读取本机 UA”自动填入当前浏览器 UA 并解析。</li>
  <li>适合排查页面兼容性问题、识别爬虫与异常访问。</li>
</ol>`,
  faq: [
    { q: 'UA 解析准确吗？', a: '基于正则特征匹配常见浏览器与系统，覆盖主流组合；小众或高度自定义的 UA 可能识别为“未知”。' },
    { q: '识别结果能用于统计吗？', a: '建议配合服务端其他信号交叉验证。现代浏览器常隐藏或精简 UA（如 Firefox 的 RFP），单一来源不可靠。' },
    { q: '支持哪些浏览器？', a: 'Chrome、Edge、Firefox、Safari、Opera、IE 及主流移动端浏览器，同时识别 Windows/macOS/iOS/Android/Linux 系统。' },
  ],
};
