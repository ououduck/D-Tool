export default {
  slug: 'date-calc',
  name: '日期计算器',
  desc: '在线日期计算工具：计算两日期相差天数、日期加减 N 天、星期查询，支持工作日提示。',
  keywords: '日期计算,日期计算器,相差天数,日期加减,星期查询,天数计算',
  category: 'convert',
  body: `<div class="stat-grid">
  <div class="stat"><div class="num" id="dc-now">…</div><div class="lbl">今天</div></div>
</div>
<div class="row">
  <div class="field grow">
    <label for="dc-a">起始日期</label>
    <input type="date" id="dc-a">
  </div>
  <div class="field grow">
    <label for="dc-b">结束日期</label>
    <input type="date" id="dc-b">
  </div>
</div>
<div class="toolbar">
  <button id="dc-diff" class="btn">计算相差</button>
  <span class="spacer"></span>
  <button id="dc-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="field">
  <label for="dc-add">日期加减（天）</label>
  <div class="row">
    <input type="date" id="dc-add-date" class="grow">
    <input type="number" id="dc-add-n" value="7" class="w-xs" aria-label="天数">
    <button id="dc-add-run" class="btn btn-ghost">计算</button>
  </div>
</div>
<div class="output">
  <div class="output-label">结果</div>
  <pre id="dc-out">等待计算…</pre>
</div>`,
  usage: `<ol>
  <li>选择两个日期点击“计算相差”，输出相差天数、周数、自然周工作日数量。</li>
  <li>“日期加减”输入起始日期与天数（负数表示往前），得到目标日期与星期。</li>
  <li>适合项目排期、合同期限、假期规划等场景。</li>
</ol>`,
  faq: [
    { q: '相差天数怎么计算？', a: '按自然日计算（结束日 − 起始日），不含开始当天。如 1 号到 3 号相差 2 天。' },
    { q: '工作日包含周末吗？', a: '“工作日”默认按周一到周五统计，未考虑法定节假日调休；如需精确应参考官方日历。' },
    { q: '日期范围有限制吗？', a: '支持 0001-9999 年任意日期，浏览器日期控件通常提供足够范围。' },
  ],
};
