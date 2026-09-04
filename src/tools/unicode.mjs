export default {
  slug: 'unicode',
  name: 'Unicode 转义/转换',
  desc: '中文、emoji 与 \\uXXXX 转义序列互转，支持扩展格式与码点查看。',
  keywords: 'unicode转换,unicode编码,\\u转义,中文转unicode,emoji码点,utf-8',
  category: 'codec',
  body: `<div class="field">
  <label for="uc-in">输入文本或转义序列</label>
  <textarea id="uc-in" class="mono" placeholder="输入普通文本，或形如 \\u4f60\\u597d 的 Unicode 转义序列"></textarea>
</div>
<div class="toolbar">
  <button id="uc-to" class="btn">文本 → Unicode 转义</button>
  <button id="uc-from" class="btn btn-ghost">转义序列 → 文本</button>
  <span class="spacer"></span>
  <button data-copy-from="#uc-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="uc-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="field">
  <label class="check"><input type="checkbox" id="uc-verbose">使用 \\u{XXXXX} 扩展格式（完整码点，emoji 友好）</label>
</div>
<div class="output">
  <div class="output-label">输出</div>
  <textarea id="uc-out" class="mono" readonly placeholder="结果将显示在这里"></textarea>
</div>`,
  usage: `<ol>
  <li>“文本 → Unicode 转义”把每个字符转换为 \\uXXXX 形式（BMP 内字符）或 \\u{XXXXX}（勾选扩展格式，支持 emoji 等增补平面字符）。</li>
  <li>“转义序列 → 文本”识别并还原 \\uXXXX 与 \\u{XXXXX} 两种写法。</li>
  <li>适合把字符串写进 JSON、源码转义场景，或排查乱码。</li>
</ol>`,
  faq: [
    { q: '\\uXXXX 与 \\u{XXXXX} 有什么不同？', a: '\\uXXXX 固定 4 位十六进制，只能表示 U+0000 ~ U+FFFF（基本多语言平面）；emoji 等字符超出该范围，需用两个代理项表示或使用 \\u{...} 扩展格式。' },
    { q: '这工具能转 UTF-8 字节吗？', a: '本工具做码点级别的转换。需要查看 UTF-8 十六进制字节时，可以配合 Base64 工具或编码工具查看。' },
    { q: '乱码文本能用它修复吗？', a: '可以。如果乱码是“中文被存成了 \\uXXXX 字面量”，粘贴后点击“转义序列 → 文本”即可还原；但如果是编码错乱（如 UTF-8 被当 GBK 读），本工具无法修复。' },
  ],
};
