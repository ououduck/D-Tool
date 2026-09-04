export default {
  slug: 'percent',
  name: '百分比计算器',
  desc: '在线百分比计算器：求百分比、占比、增减幅度、折扣价，三种模式一键换算。',
  keywords: '百分比计算,百分比,占比计算,增长率,折扣计算,百分比在线',
  category: 'math',
  body: `<div class="field">
  <label for="pc-mode" class="field-label">计算模式</label>
  <select id="pc-mode">
    <option value="of">A 的 B% 是多少</option>
    <option value="ratio">A 占 B 的百分之几</option>
    <option value="change">A 相对 B 增减了百分之几</option>
    <option value="discount">原价 A 打 B 折后的价格</option>
  </select>
</div>
<div class="row">
  <div class="field grow">
    <label for="pc-a">A 值</label>
    <input type="number" id="pc-a" step="any" placeholder="数值 A">
  </div>
  <div class="field grow">
    <label for="pc-b">B 值 / 百分比</label>
    <input type="number" id="pc-b" step="any" placeholder="数值 B 或百分比">
  </div>
</div>
<div class="toolbar">
  <button id="pc-run" class="btn">计算</button>
  <span class="spacer"></span>
  <button data-copy-from="#pc-out" class="btn btn-ghost btn-sm">复制结果</button>
</div>
<div class="output">
  <div class="output-label">结果</div>
  <pre id="pc-out">等待计算…</pre>
</div>`,
  usage: `<ol>
  <li>选择计算模式并输入 A、B 两个值，点击“计算”。</li>
  <li>示例：求 200 的 15% —— 模式“A 的 B% 是多少”，A=200，B=15。</li>
  <li>“增减”模式输出增长/下降幅度与变化后的值；“折扣”模式 B 为折数（如 8 折输 8）。</li>
</ol>`,
  faq: [
    { q: '增减百分比怎么理解？', a: 'A 相对 B 增减了百分之几 = (A-B)/B×100%，结果为正表示增长，为负表示下降，同时给出变化后的绝对差值。' },
    { q: '折扣输入的是折数还是百分数？', a: '折数。打 8 折输入 8（= 80%），打 95 折输入 9.5。' },
    { q: '支持负数吗？', a: '支持。除“占比”模式中 B=0 会提示无法计算外，其余模式均可处理负数。' },
  ],
};
