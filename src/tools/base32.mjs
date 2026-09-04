export default {
  slug: 'base32',
  name: 'Base32 编码',
  desc: '在线 Base32 编码与解码工具（RFC 4648），支持中文，输出大写字母与数字。',
  keywords: 'base32,base32编码,base32解码,base32加密,rfc4648,编码工具',
  category: 'codec',
  body: `<div class="field">
  <label for="b2-in">输入文本</label>
  <textarea id="b2-in" class="mono" placeholder="输入需要编码或解码的文本，支持中文"></textarea>
</div>
<div class="toolbar">
  <button id="b2-encode" class="btn">编码为 Base32</button>
  <button id="b2-decode" class="btn btn-ghost">解码为文本</button>
  <span class="spacer"></span>
  <button data-copy-from="#b2-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="b2-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">输出</div>
  <textarea id="b2-out" class="mono" readonly placeholder="结果将显示在这里"></textarea>
</div>
<div class="note">Base32 使用 32 个字符（A-Z 与 2-7），大小写不敏感；常用于 TOTP 双因素密钥、短 ID 等场景。与 Base64 相比体积更大（约膨胀 60%），但字符集更安全（无 +/ 等易混淆符号）。</div>`,
  usage: `<ol>
  <li>在输入框粘贴文本，点击“编码为 Base32”或“解码为文本”。</li>
  <li>编码按 UTF-8 处理，中文与 emoji 均可正确转换。</li>
  <li>解码时自动忽略空白字符与 = 填充，大小写均可识别。</li>
</ol>`,
  faq: [
    { q: 'Base32 和 Base64 有什么区别？', a: 'Base32 只用 32 个字符（A-Z、2-7），输出比 Base64 长约 20%，但避开了 + / = 等易混淆或需转义的符号，适合文件名、密钥等场景。' },
    { q: 'TOTP 密钥是这种格式吗？', a: '是的。Google Authenticator 等软件导出的密钥常用 Base32 编码，本工具可直接解码查看或编码生成。' },
    { q: '支持小写输入解码吗？', a: '支持。解码时自动转为大写处理。' },
  ],
};
