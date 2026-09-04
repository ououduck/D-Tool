export default {
  slug: 'calculator',
  name: '在线计算器',
  desc: '简洁的在线计算器，支持加减乘除与百分比、正负号，键盘可操作，结果实时显示。',
  keywords: '计算器,在线计算器,计算器在线,加减乘除,百分比计算',
  category: 'math',
  body: `<div class="calc-wrap">
  <input type="text" id="ca-display" class="mono" readonly value="0" aria-label="计算结果">
  <div class="calc-grid">
    <button class="btn calc-key" data-k="C" data-wide>C</button>
    <button class="btn calc-key" data-k="⌫">⌫</button>
    <button class="btn calc-key" data-k="%">%</button>
    <button class="btn calc-key" data-k="÷">÷</button>
    <button class="btn calc-key" data-k="7">7</button>
    <button class="btn calc-key" data-k="8">8</button>
    <button class="btn calc-key" data-k="9">9</button>
    <button class="btn calc-key" data-k="×">×</button>
    <button class="btn calc-key" data-k="4">4</button>
    <button class="btn calc-key" data-k="5">5</button>
    <button class="btn calc-key" data-k="6">6</button>
    <button class="btn calc-key" data-k="-">-</button>
    <button class="btn calc-key" data-k="1">1</button>
    <button class="btn calc-key" data-k="2">2</button>
    <button class="btn calc-key" data-k="3">3</button>
    <button class="btn calc-key" data-k="+">+</button>
    <button class="btn calc-key" data-k="±">±</button>
    <button class="btn calc-key" data-k="0">0</button>
    <button class="btn calc-key" data-k=".">.</button>
    <button class="btn calc-key calc-eq" data-k="=">=</button>
  </div>
</div>`,
  usage: `<ol>
  <li>点击按钮输入算式，或直接使用键盘数字与小键盘（Enter 等于、Backspace 退格、Esc 清空）。</li>
  <li>支持 + - × ÷ 四则运算、% 百分比、± 正负号。</li>
  <li>所有计算在本地完成，不保存任何输入历史。</li>
</ol>`,
  faq: [
    { q: '百分比怎么用？', a: '在数字后按 % 会除以 100（如 50% = 0.5）；也可以先输入算式再按 % 对当前结果求百分之一。' },
    { q: '支持括号吗？', a: '本计算器为简单四则运算，不支持括号与科学函数；需要复杂计算可用其他科学计算工具。' },
    { q: '键盘怎么操作？', a: '数字与运算符键直接输入，Enter/= 计算结果，Backspace 退格，Esc 或 C 清空，小键盘同样有效。' },
  ],
};
