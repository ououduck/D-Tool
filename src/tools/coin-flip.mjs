/* 3D 抛硬币工具（手写版，含 CSS 3D 翻转动画） */
export default {
  slug: 'coin-flip',
  name: '抛硬币',
  desc: '3D 抛硬币：点击按钮硬币空中翻转后落定，支持批量抛掷与统计，决策困难症救星。',
  keywords: '抛硬币,硬币正反面,掷硬币,3d硬币,随机决策,正反面,硬币模拟',
  category: 'life',
  body: `<div class="coin-stage">
  <div class="coin" id="cf-coin">
    <div class="side heads">正</div>
    <div class="side tails">反</div>
  </div>
</div>
<div class="coin-result" id="cf-result">点击"抛硬币"开始</div>
<div class="dice-actions">
  <button id="cf-flip" class="btn">抛硬币</button>
  <span class="dice-total" id="cf-stats"></span>
</div>
<div class="row">
  <div class="field">
    <label for="cf-count" class="field-label">抛掷次数（1-100）</label>
    <input type="number" id="cf-count" value="1" min="1" max="100">
  </div>
</div>
<div class="note">每次独立随机，正反面概率各 50%；多次抛掷自动统计正反次数与占比。</div>`,
  usage: `<ol>
  <li>设置抛掷次数，点击"抛硬币"。</li>
  <li>3D 硬币空中翻转后落定，显示结果。</li>
  <li>选择困难时用它做决定吧！</li>
</ol>`,
  faq: [
    { q: '真的 50% 吗？', a: '使用加密级随机源，理论正反各 50%；物理硬币受抛掷手法影响会略有偏差。' },
    { q: '能连续抛很多次吗？', a: '支持批量（最多 100 次），自动统计正反分布。' },
    { q: '为什么是 3D 动画？', a: '使用 CSS 3D transform 构建双面硬币，每次翻转多圈后停稳，效果更真实。' },
  ],
};
