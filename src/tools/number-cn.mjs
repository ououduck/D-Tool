export default {
  slug: 'number-cn',
  name: '数字转中文大写',
  desc: '在线数字转中文工具：人民币大写（壹贰叁）与小写中文（一二三）互转，支持小数点与万元。',
  keywords: '数字转中文,人民币大写,金额大写,大写数字,壹贰叁,数字转换中文',
  category: 'convert',
  body: `<div class="field">
  <label for="nc-in">输入数字</label>
  <input type="number" id="nc-in" step="0.01" placeholder="如 123456.78 或 1001">
</div>
<div class="toolbar">
  <button id="nc-run" class="btn">转换</button>
  <span class="spacer"></span>
  <button data-copy-from="#nc-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="nc-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">人民币大写</div>
  <pre id="nc-rmb">等待输入…</pre>
</div>
<div class="output">
  <div class="output-label">中文小写</div>
  <pre id="nc-lower">等待输入…</pre>
</div>`,
  usage: `<ol>
  <li>输入金额（支持两位小数与亿元级别），点击“转换”。</li>
  <li>输出财务标准人民币大写（壹、贰、叁…）与中文小写两种形式。</li>
  <li>适合发票、合同、报销单等财务场景。</li>
</ol>`,
  faq: [
    { q: '大写规范是哪个？', a: '按《支付结算办法》附件标准：壹贰叁肆伍陆柒捌玖拾佰仟万亿，角分后不加“整”，整数后加“整”。' },
    { q: '零的处理规则？', a: '连续多个零只写一个“零”，如 1001 写“壹仟零壹元整”；角位为零、分位非零时补“零”，如 1.05 写“壹元零伍分”。' },
    { q: '支持负数或超出范围？', a: '支持 0 到 9999 亿；负数与超大金额会提示超出范围。' },
  ],
};
