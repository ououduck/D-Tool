export default {
  slug: 'hash',
  name: 'SHA 哈希计算',
  desc: '在线 SHA-1/SHA-256/SHA-384/SHA-512 哈希计算器，支持文本与文件，一键计算四种摘要。',
  keywords: 'sha256,sha1,sha512,哈希计算,sha256加密,文件校验,哈希工具',
  category: 'codec',
  body: `<div class="field">
  <label for="sh-in">输入文本</label>
  <textarea id="sh-in" class="mono" placeholder="输入文本计算哈希，或选择下方文件"></textarea>
</div>
<div class="field">
  <label for="sh-file" class="field-label">或选择文件（选中后自动计算）</label>
  <input type="file" id="sh-file">
</div>
<div class="toolbar">
  <button id="sh-run" class="btn">计算哈希</button>
  <span class="spacer"></span>
  <button data-copy-from="#sh-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="sh-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">哈希结果</div>
  <pre id="sh-out">等待输入…</pre>
</div>
<div id="sh-meta" class="img-meta"></div>`,
  usage: `<ol>
  <li>输入文本后点击“计算哈希”，或直接选择文件（文件内容不会上传，在本地计算）。</li>
  <li>一次输出 SHA-1、SHA-256、SHA-384、SHA-512 四种摘要，可分别复制。</li>
  <li>文件哈希常用于校验下载完整性：将官方公布的 SHA-256 与本工具结果对比。</li>
</ol>`,
  faq: [
    { q: 'SHA-1、SHA-256 有什么区别？', a: 'SHA-1 输出 160 位、SHA-256 输出 256 位、SHA-384/512 分别输出 384/512 位。位数越高碰撞难度越大；SHA-1 已被证明不安全，新场景一律建议 SHA-256。' },
    { q: '能计算大文件的哈希吗？', a: '可以。文件在浏览器本地按流读取并计算，几百 MB 的文件也能处理（速度取决于设备）。' },
    { q: '哈希值会随文件修改而变化吗？', a: '会。哈希是内容的指纹，任何一位字节变化都会导致结果完全不同；这就是它能校验完整性的原因。' },
  ],
};
