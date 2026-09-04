export default {
  slug: 'url-encode',
  name: 'URL 编码/解码',
  desc: '在线 URL 编码与解码工具，支持中文与特殊字符，可选择保留 URL 结构字符。',
  keywords: 'url编码,url解码,urlencode,urldecode,网址编码,百分比编码',
  category: 'codec',
  body: `<div class="field">
  <label for="ue-in">输入文本</label>
  <textarea id="ue-in" class="mono" placeholder="输入需要编码或解码的字符串，支持中文"></textarea>
</div>
<div class="toolbar">
  <button id="ue-encode" class="btn">编码</button>
  <button id="ue-decode" class="btn btn-ghost">解码</button>
  <span class="spacer"></span>
  <button data-copy-from="#ue-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="ue-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="field">
  <label class="check"><input type="checkbox" id="ue-partial">使用 encodeURI（保留 :/?#&amp;= 等结构字符，仅编码需要转义的字符）</label>
</div>
<div class="output">
  <div class="output-label">输出</div>
  <textarea id="ue-out" class="mono" readonly placeholder="结果将显示在这里"></textarea>
</div>`,
  usage: `<ol>
  <li>在输入框粘贴需要处理的文本（URL、查询参数或任意字符串）。</li>
  <li>点击“编码”将文本转为 URL 安全格式；点击“解码”将 %XX 序列还原为原文。</li>
  <li>勾选“使用 encodeURI”后，编码时会保留 <code>:/?#&amp;=</code> 等结构字符，适合编码完整 URL 而非单个参数。</li>
</ol>`,
  faq: [
    { q: 'URL 编码和普通转义有什么区别？', a: 'URL 编码（百分号编码）把非 ASCII 与保留字符转换为 % 加十六进制形式，如空格变 %20、中文按 UTF-8 编码；它是 HTTP 查询参数、路径片段的标准表达方式。' },
    { q: 'decodeURIComponent 与 decodeURI 怎么选？', a: '一般用 decodeURIComponent，它把所有 %XX 序列都还原；decodeURI 会保留保留字符对应的编码，主要用于还原完整 URL。' },
    { q: '为什么编码后的中文变长了？', a: '一个汉字在 UTF-8 下占 3 个字节，每个字节编码为 %XX，因此一个汉字编码后为 9 个字符，属正常现象。' },
  ],
};
