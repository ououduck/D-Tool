export default {
  slug: 'radix',
  name: '进制转换',
  desc: '二进制、八进制、十进制、十六进制等 2-36 进制互转，基于 BigInt 支持超大整数。',
  keywords: '进制转换,二进制转十六进制,十进制转二进制,十六进制,八进制,进制计算器',
  category: 'convert',
  body: `<div class="row">
  <div class="field grow">
    <label for="rx-in">输入数值</label>
    <input type="text" id="rx-in" class="mono" placeholder="如：ff（十六进制）、1010（二进制）、-255">
  </div>
  <div class="field">
    <label for="rx-base">源进制</label>
    <select id="rx-base">
      <option value="2">二进制 (2)</option>
      <option value="8">八进制 (8)</option>
      <option value="10" selected>十进制 (10)</option>
      <option value="16">十六进制 (16)</option>
      <option value="0">自动识别前缀</option>
      <option value="-1">自定义…</option>
    </select>
  </div>
  <div class="field hidden" id="rx-custom-wrap">
    <label for="rx-custom">自定义进制</label>
    <input type="number" id="rx-custom" min="2" max="36" value="7" class="w-xs">
  </div>
</div>
<div class="toolbar">
  <button id="rx-run" class="btn">转换</button>
  <span class="spacer"></span>
  <button data-copy-from="#rx-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="rx-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">转换结果</div>
  <pre id="rx-out">等待输入…</pre>
</div>
<div class="note">基于 BigInt 计算，可处理任意大小的整数；支持负数。十六进制等输出使用小写字母。</div>`,
  usage: `<ol>
  <li>输入数值并选择源进制（或“自动识别前缀”：0x 十六进制、0b 二进制、0o 八进制、其余按十进制）。</li>
  <li>点击“转换”后一次得到 2/8/10/16/32/36 进制及自定义进制的结果。</li>
  <li>数值支持任意位整数与负号，超出 JS Number 精度的数字同样正确。</li>
</ol>`,
  faq: [
    { q: '32/36 进制是什么？', a: '数字 0-9 加字母 A-Z 依次表示到 31/35，常用于短链、邀请码等场景（36 进制 = 数字+26 个字母）。' },
    { q: '为什么我的 20 位十进制数没有精度问题？', a: '本工具全程使用 BigInt，不经过浮点数，因此任意长度的整数都能精确转换，不会出现“末尾变 0”的精度丢失。' },
    { q: '负数怎么转换？', a: '直接在输入前加负号即可，如 -ff 是 -255 的十六进制写法。注意这里表达的是数学上的负值，不是二进制的补码表示。' },
  ],
};
