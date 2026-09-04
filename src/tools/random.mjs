export default {
  slug: 'random',
  name: '随机数生成器',
  desc: '在线随机数生成工具，支持区间、小数、唯一性与批量生成，加密级随机。',
  keywords: '随机数生成,随机数,在线随机,随机数生成器,抽奖随机数,随机整数',
  category: 'gen',
  body: `<div class="row">
  <div class="field">
    <label for="rn-min" class="field-label">最小值</label>
    <input type="number" id="rn-min" value="1" class="w-sm">
  </div>
  <div class="field">
    <label for="rn-max" class="field-label">最大值</label>
    <input type="number" id="rn-max" value="100" class="w-sm">
  </div>
  <div class="field">
    <label for="rn-count" class="field-label">个数</label>
    <input type="number" id="rn-count" value="10" min="1" max="1000" class="w-xs">
  </div>
  <div class="field">
    <label class="check"><input type="checkbox" id="rn-unique">每个不重复</label>
  </div>
  <div class="field">
    <label class="check"><input type="checkbox" id="rn-decimal">小数（2 位）</label>
  </div>
</div>
<div class="toolbar">
  <button id="rn-run" class="btn">生成随机数</button>
  <span class="spacer"></span>
  <button data-copy-from="#rn-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="rn-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">结果</div>
  <textarea id="rn-out" class="mono" readonly placeholder="点击生成，每行一个"></textarea>
</div>
<div class="note">使用 crypto.getRandomValues 加密级随机源。开启“每个不重复”时，若区间可容纳数量小于请求个数将提示无法满足。</div>`,
  usage: `<ol>
  <li>设置区间与数量，选择是否去重、是否生成小数，点击“生成随机数”。</li>
  <li>结果每行一个，可直接复制。</li>
  <li>典型场景：抽奖号码、测试数据、分组编号、验证码练习等。</li>
</ol>`,
  faq: [
    { q: '和 Math.random() 有什么区别？', a: 'Math.random() 是伪随机（可预测性较强），本工具使用加密随机源 crypto.getRandomValues，不可预测，适合抽奖等对公平性有要求的场景。' },
    { q: '生成的是闭区间吗？', a: '是。最小值和最大值都包含在内，如 1-100 可能生成 1 也可能生成 100。' },
    { q: '数量太多会卡吗？', a: '单次最多 1000 个，毫秒级完成；去重模式在区间较小时可能失败（如 1-10 范围内要 20 个不重复数），会给出提示。' },
  ],
};
