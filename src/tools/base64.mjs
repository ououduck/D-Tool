export default {
  slug: 'base64',
  name: 'Base64 编码/解码',
  desc: '在线 Base64 编码与解码工具，UTF-8 安全支持中文和 emoji，可选 URL 安全模式。',
  keywords: 'base64,base64编码,base64解码,base64加密,在线base64',
  category: 'codec',
  body: `<div class="field">
  <label for="b64-in">输入文本</label>
  <textarea id="b64-in" class="mono" placeholder="输入需要编码或解码的文本，支持中文与 emoji"></textarea>
</div>
<div class="toolbar">
  <button id="b64-encode" class="btn">编码为 Base64</button>
  <button id="b64-decode" class="btn btn-ghost">解码为文本</button>
  <span class="spacer"></span>
  <button data-copy-from="#b64-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="b64-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="field">
  <label class="check"><input type="checkbox" id="b64-url">URL 安全模式（RFC 4648：- 和 _ 替代 + 和 /，去掉 = 填充）</label>
</div>
<div class="output">
  <div class="output-label">输出</div>
  <textarea id="b64-out" class="mono" readonly placeholder="结果将显示在这里"></textarea>
</div>`,
  usage: `<ol>
  <li>在输入框粘贴文本，点击“编码为 Base64”或“解码为文本”。</li>
  <li>本工具按 UTF-8 处理字符，中文、日文、emoji 均可正确编解码（解码仅支持标准 Base64 文本）。</li>
  <li>在 URL、文件名等场景使用时，可勾选“URL 安全模式”生成无 +/= 的变体。</li>
</ol>`,
  faq: [
    { q: 'Base64 是加密吗？', a: '不是。Base64 只是一种可逆的二进制到文本的编码方式，任何人都能解码，不适合保护敏感数据；它主要用于在文本协议中安全传输二进制内容。' },
    { q: '为什么编码结果末尾有 = 号？', a: 'Base64 按 3 字节一组编码，数据长度不是 3 的倍数时用 = 补齐到 4 的倍数，解码时会自动忽略这些填充符。' },
    { q: '解码报错怎么办？', a: '请确认输入是合法 Base64（仅含 A-Z a-z 0-9 + / 与末尾的 =）。如果是从 URL 复制的，可能包含了 - 和 _，请勾选 URL 安全模式后重试。' },
  ],
};
