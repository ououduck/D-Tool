/* 3D 骰子工具（手写版，含 CSS 3D 旋转动画） */
export default {
  slug: 'dice-roller',
  name: '掷骰子',
  desc: '3D 掷骰子：点击按钮骰子真实滚动，支持自定义骰子数量与面数，桌游必备。',
  keywords: '掷骰子,3d骰子,骰子动画,骰子模拟,dice,桌游骰子,掷骰',
  category: 'life',
  body: `<div class="dice3d-wrap">
  <div class="dice3d" id="d3">
    <div class="face f-front"><span class="pip" style="grid-area:2/2"></span></div>
    <div class="face f-back"><span class="pip" style="grid-area:1/1"></span><span class="pip" style="grid-area:1/3"></span><span class="pip" style="grid-area:2/1"></span><span class="pip" style="grid-area:2/3"></span><span class="pip" style="grid-area:3/1"></span><span class="pip" style="grid-area:3/3"></span></div>
    <div class="face f-right"><span class="pip" style="grid-area:1/3"></span><span class="pip" style="grid-area:3/1"></span></div>
    <div class="face f-left"><span class="pip" style="grid-area:1/1"></span><span class="pip" style="grid-area:1/3"></span><span class="pip" style="grid-area:2/2"></span><span class="pip" style="grid-area:3/1"></span><span class="pip" style="grid-area:3/3"></span></div>
    <div class="face f-top"><span class="pip" style="grid-area:1/3"></span><span class="pip" style="grid-area:2/2"></span><span class="pip" style="grid-area:3/1"></span></div>
    <div class="face f-bottom"><span class="pip" style="grid-area:1/1"></span><span class="pip" style="grid-area:1/3"></span><span class="pip" style="grid-area:3/1"></span><span class="pip" style="grid-area:3/3"></span></div>
  </div>
</div>
<div class="dice-result" id="d3-result">点击"掷骰子"开始</div>
<div class="dice-sub">点数以朝上的面为准（1 对面 6、2 对 5、3 对 4）</div>
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
<div class="note">支持 4/6/8/10/12/20 面骰。动画结束后显示总点数，多次掷骰自动累计；非 6 面骰显示为数字。</div>`,
  usage: `<ol>
  <li>选择骰子数量与面数，点击"掷骰子"。</li>
  <li>3D 骰子真实滚动，动画结束后显示点数与总和。</li>
  <li>跑团、桌游、酒桌游戏都能用，多次掷骰自动累计。</li>
</ol>`,
  faq: [
    { q: 'D20 是什么？', a: '20 面骰（D20），TRPG 跑团常用；本工具面数可选 D4/D6/D8/D10/D12/D20。' },
    { q: '点数分布均匀吗？', a: '加密级随机，每个面等概率出现；动画只是视觉效果，结果在动画前已确定。' },
    { q: '为什么是 3D 动画？', a: '使用 CSS 3D transform（preserve-3d）构建真实立方体，每次滚动随机旋转多圈后停稳。' },
  ],
};
