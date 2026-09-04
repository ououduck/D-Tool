export default {
  slug: 'caesar',
  name: '凯撒密码',
  desc: '在线凯撒密码加密解密工具，支持 1-25 位位移，可爆破全部位移结果，纯本地运算。',
  keywords: '凯撒密码,凯撒加密,位移密码,caesar,古典密码,密码爆破',
  category: 'codec',
  body: `<div class="field">
  <label for="ce-in">输入文本</label>
  <textarea id="ce-in" class="mono" placeholder="输入需要加密或解密的英文文本（中文等非字母字符保持不变）"></textarea>
</div>
<div class="row">
  <div class="field">
    <label for="ce-shift" class="field-label">位移量（1-25）</label>
    <input type="number" id="ce-shift" value="3" min="1" max="25" class="w-xs">
  </div>
  <div class="field">
    <label class="check"><input type="checkbox" id="ce-decode">解密模式（反方向位移）</label>
  </div>
</div>
<div class="toolbar">
  <button id="ce-run" class="btn">转换</button>
  <button id="ce-brute" class="btn btn-ghost">爆破全部 25 种位移</button>
  <span class="spacer"></span>
  <button data-copy-from="#ce-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="ce-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">输出</div>
  <textarea id="ce-out" class="mono" readonly placeholder="结果将显示在这里"></textarea>
</div>`,
  usage: `<ol>
  <li>输入英文文本，设置位移量（如 3），点击“转换”。</li>
  <li>勾选“解密模式”即反向位移；加密后的文本再次用同位移解密即可还原。</li>
  <li>“爆破全部 25 种位移”一次性输出所有可能结果，便于破解未知位移的凯撒密码。</li>
</ol>`,
  faq: [
    { q: '凯撒密码安全吗？', a: '不安全。只有 25 种可能位移，暴力枚举即可破解，仅适合教学与娱乐，不能用于真实加密。' },
    { q: '中文可以用吗？', a: '可以输入，但中文等非字母字符不会变换（凯撒只位移 A-Z）；中文内容会原样保留。' },
    { q: '经典案例？', a: '古罗马凯撒大帝用于军事通信，位移 3 的版本又称 ROT3；现代变体 ROT13 常用于论坛剧透遮罩。' },
  ],
};
