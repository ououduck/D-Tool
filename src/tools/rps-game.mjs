/* 石头剪刀布可视化工具（手写版，含出拳动画与计分） */
export default {
  slug: 'rps-game',
  name: '石头剪刀布',
  desc: '石头剪刀布人机对战：选择手势与电脑对决，带出拳动画、回合记录与比分。',
  keywords: '石头剪刀布,猜拳,剪刀石头布,rps,猜拳游戏,人机猜拳',
  category: 'life',
  body: `<div class="rps-stage">
  <div class="rps-side">
    <div class="rps-label">你</div>
    <div class="rps-hand" id="rps-mine">🤚</div>
  </div>
  <div class="rps-vs">VS</div>
  <div class="rps-side">
    <div class="rps-label">电脑</div>
    <div class="rps-hand" id="rps-ai">🤚</div>
  </div>
</div>
<div class="dice-result" id="rps-result">选择手势开始对战</div>
<div class="rps-choices">
  <button class="btn rps-choice" data-choice="rock">✊ 石头</button>
  <button class="btn rps-choice" data-choice="scissors">✌️ 剪刀</button>
  <button class="btn rps-choice" data-choice="paper">✋ 布</button>
</div>
<div class="rps-score" id="rps-score"></div>
<div class="rps-history" id="rps-history"></div>
<div class="note">石头胜剪刀、剪刀胜布、布胜石头；先赢 5 局获胜，可随时重置。</div>`,
  usage: `<ol>
  <li>点击"石头/剪刀/布"出拳，电脑随机应战并带动画。</li>
  <li>回合结果与比分实时记录，先赢 5 局获胜。</li>
  <li>谁先赢三局？多来几次！</li>
</ol>`,
  faq: [
    { q: '电脑会作弊吗？', a: '不会，使用随机数独立出拳，无记忆、无针对。' },
    { q: '平局怎么办？', a: '平局不计分，重新出拳即可；平局概率约 1/3。' },
    { q: '比分怎么算？', a: '胜 +1 分，负不扣分，先到 5 分获胜；可点击"重置"重新开始。' },
  ],
};
