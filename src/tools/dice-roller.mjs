/* 2D 骰子工具（手写版：掷骰后显示带点数的正方形骰子面，点击骰子也可掷） */
export default {
  slug: 'dice-roller',
  name: '掷骰子',
  desc: '掷骰子：点击按钮或骰子面随机掷骰，显示带点数的骰子图案，支持多颗与多种面数。',
  keywords: '掷骰子,骰子,骰子模拟,dice,桌游骰子,掷骰,骰子点数',
  category: 'life',
  body: `<div class="dice2d-wrap">
  <div class="dice2d" id="d2" role="button" tabindex="0" aria-label="掷骰子（点击掷骰）" title="点击掷骰子">
    <div class="dice2d-face d2-num" id="d2-face">1</div>
  </div>
</div>
<div class="dice-result" id="d3-result">点击骰子或下方按钮掷骰</div>
<div class="dice-sub">支持 4/6/8/10/12/20 面骰；6 面骰显示点数图案，其余显示数字</div>
<div class="dice-actions">
  <button id="d3-roll" class="btn">掷骰子</button>
  <span class="dice-total" id="d3-total"></span>
</div>
<div class="row">
  <div class="field grow">
    <label for="d3-count" class="field-label">骰子数量（1-10）</label>
    <input type="number" id="d3-count" value="1" min="1" max="10">
  </div>
  <div class="field">
    <label for="d3-sides" class="field-label">面数（4/6/8/10/12/20）</label>
    <select id="d3-sides">
      <option value="4">D4</option>
      <option value="6" selected>D6</option>
      <option value="8">D8</option>
      <option value="10">D10</option>
      <option value="12">D12</option>
      <option value="20">D20</option>
    </select>
  </div>
</div>
<div class="note">加密级随机，每个面等概率出现；掷骰动画只是视觉效果，结果在点击时已确定。</div>`,
  usage: `<ol>
  <li>选择骰子数量与面数，点击"掷骰子"（或直接点击骰子面）。</li>
  <li>骰子快速翻动后停下，显示带点数的结果。</li>
  <li>跑团、桌游、酒桌游戏都能用，多次掷骰自动累计。</li>
</ol>`,
  faq: [
    { q: 'D20 是什么？', a: '20 面骰（D20），TRPG 跑团常用；本工具面数可选 D4/D6/D8/D10/D12/D20。' },
    { q: '点数分布均匀吗？', a: '加密级随机，每个面等概率出现；动画只是视觉效果，结果在点击时已确定。' },
    { q: '可以点骰子掷骰吗？', a: '可以，直接点击骰子面即可掷骰，与点击按钮效果相同。' },
  ],
};
