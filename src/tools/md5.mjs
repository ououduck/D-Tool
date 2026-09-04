export default {
  slug: 'md5',
  name: 'MD5 在线加密',
  desc: '在线 MD5 哈希计算工具，输入即算、支持中文，结果实时显示，纯本地运行。',
  keywords: 'md5加密,md5解密,md5计算,md5在线,md5校验,哈希',
  category: 'codec',
  body: `<div class="field">
  <label for="md5-in">输入文本</label>
  <textarea id="md5-in" class="mono" placeholder="输入文本，MD5 结果实时计算，支持中文"></textarea>
</div>
<div class="toolbar">
  <label class="check"><input type="checkbox" id="md5-upper">大写输出</label>
  <span class="spacer"></span>
  <button data-copy-from="#md5-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="md5-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">MD5 摘要（32 位十六进制）</div>
  <input type="text" id="md5-out" class="mono" readonly placeholder="等待输入…">
</div>
<div class="note">MD5 已被证实存在碰撞，不适合用于安全场景（密码存储、签名等），请改用 SHA-256 等安全哈希（见 <a href="/hash/">SHA 哈希工具</a>）；本工具适用于文件校验、接口签名等非安全用途。</div>`,
  usage: `<ol>
  <li>在输入框粘贴文本，MD5 结果会随输入实时更新。</li>
  <li>勾选“大写输出”可得到大写十六进制形式。</li>
  <li>需要计算文件的 MD5 时，请在输入框粘贴文件的十六进制内容或使用 SHA 哈希工具。</li>
</ol>`,
  faq: [
    { q: 'MD5 可以解密吗？', a: '严格来说 MD5 不可逆，不存在“解密”。网上所谓 MD5 解密本质是彩虹表/字典反查：把常见明文算好 MD5 后比对。随机长密码的 MD5 无法反查。' },
    { q: 'MD5 还安全吗？', a: '不安全。2004 年起已被证明可以构造碰撞，2017 年更被用于构造恶意证书。涉及安全校验请使用 SHA-256 或更高强度算法。' },
    { q: '不同工具算出的 MD5 会不一样吗？', a: '不会。MD5 是确定性算法，只要输入字节一致结果就一致。出现差异通常是编码问题（如中文的 UTF-8/GBK 编码不同，或文件多了一个换行符）。' },
  ],
};
