export default {
  slug: 'bmi',
  name: 'BMI 计算器',
  desc: '在线 BMI 体质指数计算器，输入身高体重即得指数与体重状态，附国际与亚洲参考标准。',
  keywords: 'bmi计算器,bmi指数,bmi,体质指数,体重标准,标准体重计算',
  category: 'convert',
  body: `<div class="row">
  <div class="field grow">
    <label for="bi-height">身高（cm）</label>
    <input type="number" id="bi-height" step="0.1" placeholder="如 170">
  </div>
  <div class="field grow">
    <label for="bi-weight">体重（kg）</label>
    <input type="number" id="bi-weight" step="0.1" placeholder="如 60">
  </div>
</div>
<div class="toolbar">
  <button id="bi-run" class="btn">计算 BMI</button>
  <span class="spacer"></span>
  <button data-copy-from="#bi-out" class="btn btn-ghost btn-sm">复制结果</button>
</div>
<div class="stat-grid">
  <div class="stat"><div class="num" id="bi-value">—</div><div class="lbl">BMI 指数</div></div>
  <div class="stat"><div class="num" id="bi-level">—</div><div class="lbl">体重状态</div></div>
  <div class="stat"><div class="num" id="bi-normal">—</div><div class="lbl">标准体重范围</div></div>
</div>
<div class="output">
  <div class="output-label">参考标准</div>
  <pre id="bi-out">等待计算…</pre>
</div>`,
  usage: `<ol>
  <li>输入身高（cm）与体重（kg），点击“计算 BMI”。</li>
  <li>BMI = 体重 ÷ 身高²，亚洲标准：18.5 以下偏瘦、18.5-23.9 正常、24-27.9 超重、28 以上肥胖。</li>
  <li>输出同时给出标准体重范围与参考说明。</li>
</ol>`,
  faq: [
    { q: 'BMI 适合所有人吗？', a: 'BMI 未区分肌肉与脂肪：运动员、孕妇、未成年人可能误判。它适合普通成年人作为健康参考，不能替代医学评估。' },
    { q: '为什么有亚洲标准？', a: '研究表明亚洲人相同 BMI 下体脂率与代谢风险更高，因此 WHO 与我国分别给出更严格的超重/肥胖切点。' },
    { q: '标准体重范围怎么算？', a: '按正常区间 18.5-23.9 反推：范围 = 18.5×身高² 至 23.9×身高²。' },
  ],
};
