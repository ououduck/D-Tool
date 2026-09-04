export default {
  slug: 'password',
  name: '密码生成器',
  desc: '在线强密码生成器，自定义长度与字符集，强度评估实时显示，可一次生成多个。',
  keywords: '密码生成,随机密码,强密码,密码生成器,密码工具,安全密码,密码强度',
  category: 'gen',
  body: `<div class="row">
  <div class="field grow">
    <label for="pw-len" class="field-label">长度 <span id="pw-lenval" class="text-2">16</span></label>
    <input type="range" id="pw-len" min="6" max="64" value="16">
  </div>
  <div class="field">
    <label for="pw-count" class="field-label">生成个数</label>
    <input type="number" id="pw-count" value="3" min="1" max="20" class="w-xs">
  </div>
</div>
<div class="row">
  <label class="check"><input type="checkbox" id="pw-lower" checked>小写字母 a-z</label>
  <label class="check"><input type="checkbox" id="pw-upper" checked>大写字母 A-Z</label>
  <label class="check"><input type="checkbox" id="pw-digit" checked>数字 0-9</label>
  <label class="check"><input type="checkbox" id="pw-symbol">符号 !@#$%^&amp;*</label>
  <label class="check"><input type="checkbox" id="pw-ambig" checked>排除易混淆字符</label>
</div>
<div class="toolbar">
  <button id="pw-run" class="btn">生成密码</button>
  <span class="spacer"></span>
  <button id="pw-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="strength-row">
  <span class="lbl" id="pw-strength-label">强度：—</span>
  <div class="strength-bar"><i id="pw-strength-bar"></i></div>
</div>
<div id="pw-list" class="mt-12"></div>
<div class="note">基于 crypto.getRandomValues 加密随机数；“排除易混淆字符”会去掉 0O1lI| 等易看错字符。生成后请勿通过聊天软件明文发送密码。</div>`,
  usage: `<ol>
  <li>拖动滑块设置长度（6-64），勾选需要的字符类别，点击“生成密码”。</li>
  <li>每个密码右侧有单独复制按钮；“强度”按熵值实时评估（弱/中/强/极强）。</li>
  <li>建议：密码长度 ≥ 12、至少包含三种字符类别；不同网站使用不同密码。</li>
</ol>`,
  faq: [
    { q: '生成的密码安全吗？', a: '使用浏览器加密随机数生成，不经过网络，不可预测。安全性取决于长度与字符集：16 位混合密码的熵约 95 位，暴力破解在计算上不可行。' },
    { q: '强度条是怎么算的？', a: '按熵值估算：熵 = 长度 × log2(字符集大小)。<64 位弱、64-79 中、80-99 强、≥100 极强。字符集越大、越长，熵越高。' },
    { q: '可以记住这类密码吗？', a: '不推荐记忆随机密码。建议使用密码管理器（如 Bitwarden、KeePass）保存，本工具适合一次性生成后存入管理器。' },
  ],
};
