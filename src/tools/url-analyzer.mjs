export default {
  slug: 'url-analyzer',
  name: 'URL 解析器',
  desc: '在线 URL 解析工具，拆解协议、域名、路径、查询参数等全部组成部分，支持编码解码。',
  keywords: 'url解析,url分析,链接解析,url组成部分,查询参数解析,url工具',
  category: 'web',
  body: `<div class="field">
  <label for="ua-in">输入 URL</label>
  <input type="url" id="ua-in" class="mono" placeholder="如 https://example.com/path/to?name=value&amp;page=2#section">
</div>
<div class="toolbar">
  <button id="ua-run" class="btn">解析</button>
  <button id="ua-encode" class="btn btn-ghost">URL 编码</button>
  <button id="ua-decode" class="btn btn-ghost">URL 解码</button>
  <span class="spacer"></span>
  <button data-copy-from="#ua-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="ua-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">解析结果</div>
  <pre id="ua-out">等待解析…</pre>
</div>`,
  usage: `<ol>
  <li>粘贴 URL 点击“解析”，输出协议、域名、端口、路径、查询参数（含解码后的键值）、锚点等全部组成。</li>
  <li>“URL 编码 / 解码”对整串进行 encodeURIComponent / decodeURIComponent 处理。</li>
  <li>适合调试接口地址、分析推广链接、排查跳转问题。</li>
</ol>`,
  faq: [
    { q: '解析结果中的查询参数会自动解码吗？', a: '会。每个参数单独解码（decodeURIComponent），便于查看中文与特殊字符的真实值。' },
    { q: '相对路径或非标准 URL 支持吗？', a: '支持常见形式；缺少协议时会按 http 补全尝试解析，仍失败则提示输入完整 URL。' },
    { q: '能解析 hash 路由吗？', a: '能。hash（# 之后的部分）会单独列出，包含 hash 内再带参数的场景。' },
  ],
};
