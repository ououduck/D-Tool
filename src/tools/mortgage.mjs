export default {
  slug: 'mortgage',
  name: '房贷计算器',
  desc: '在线房贷计算器，支持等额本息与等额本金两种还款方式，输出月供、总利息与还款明细。',
  keywords: '房贷计算器,房贷,月供计算,等额本息,等额本金,贷款计算器,购房计算',
  category: 'convert',
  body: `<div class="row">
  <div class="field grow">
    <label for="mg-amount">贷款金额（万元）</label>
    <input type="number" id="mg-amount" step="0.01" placeholder="如 100">
  </div>
  <div class="field grow">
    <label for="mg-years">贷款年限（年）</label>
    <input type="number" id="mg-years" step="1" placeholder="如 30">
  </div>
  <div class="field grow">
    <label for="mg-rate">年利率（%）</label>
    <input type="number" id="mg-rate" step="0.01" placeholder="如 3.9">
  </div>
</div>
<div class="toolbar">
  <button id="mg-run" class="btn">计算月供</button>
  <span class="spacer"></span>
  <button data-copy-from="#mg-out" class="btn btn-ghost btn-sm">复制结果</button>
</div>
<div class="output">
  <div class="output-label">还款方案对比</div>
  <pre id="mg-out">等待计算…</pre>
</div>
<div class="note">等额本息：每月还款额相同，前期利息占比高；等额本金：每月本金相同，月供逐月递减，总利息更少。以上为估算值，实际以银行合同为准。</div>`,
  usage: `<ol>
  <li>输入贷款金额（万元）、年限（年）与年利率（%），点击“计算月供”。</li>
  <li>同时给出等额本息与等额本金两种方案的月供、总利息与总还款额对比。</li>
  <li>适用于商业贷款、公积金贷款的粗略测算。</li>
</ol>`,
  faq: [
    { q: '两种方式怎么选？', a: '月收入稳定选等额本息（月供固定好规划）；想少付利息、前期能承受较高月供选等额本金。' },
    { q: '提前还款会减少利息吗？', a: '会。等额本金提前还款节省利息更多；等额本息前期还的主要是利息，越早提前还越划算。' },
    { q: '和银行算的有出入？', a: '银行可能按实际天数计息、包含手续费或利率浮动，本工具为等额系列标准公式估算，误差通常在几元内。' },
  ],
};
