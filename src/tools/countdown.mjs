export default {
  slug: 'countdown',
  name: '倒计时器',
  desc: '在线倒计时工具，支持自定义目标时间与任意秒数，实时显示天时分秒，可暂停重置。',
  keywords: '倒计时,倒计时器,在线倒计时,倒计时工具,计时器,秒表',
  category: 'date',
  body: `<div class="stat-grid" style="grid-template-columns:repeat(4,1fr)">
  <div class="stat"><div class="num mono" id="cd-d">0</div><div class="lbl">天</div></div>
  <div class="stat"><div class="num mono" id="cd-h">0</div><div class="lbl">时</div></div>
  <div class="stat"><div class="num mono" id="cd-m">0</div><div class="lbl">分</div></div>
  <div class="stat"><div class="num mono" id="cd-s">0</div><div class="lbl">秒</div></div>
</div>
<div class="row">
  <div class="field grow">
    <label for="cd-datetime" class="field-label">目标时间</label>
    <input type="datetime-local" id="cd-datetime">
  </div>
  <div class="field">
    <label for="cd-seconds" class="field-label">或秒数</label>
    <input type="number" id="cd-seconds" value="300" min="1" max="8640000" class="w-sm">
  </div>
</div>
<div class="toolbar">
  <button id="cd-start" class="btn">开始</button>
  <button id="cd-pause" class="btn btn-ghost">暂停</button>
  <button id="cd-reset" class="btn btn-ghost">重置</button>
  <span class="spacer"></span>
  <button id="cd-fill" class="btn btn-ghost btn-sm">填入 10 分钟后</button>
</div>
<div id="cd-msg" class="note hidden"></div>`,
  usage: `<ol>
  <li>方式一：选择“目标时间”，点击“开始”倒计时到该时刻；方式二：直接填秒数开始。</li>
  <li>暂停可临时停止，重置恢复初始状态；倒计时结束会给出提示。</li>
  <li>适合演示计时、训练间歇、考试倒计时等场景。</li>
</ol>`,
  faq: [
    { q: '刷新页面会重置吗？', a: '会。倒计时状态仅保存在当前页面内存中，刷新后需要重新设置。' },
    { q: '目标时间已过怎么办？', a: '目标时间早于当前时间时会提示“时间已过”，请重新选择；秒数方式不受影响。' },
    { q: '最多支持多长时间？', a: '秒数方式最大 100 天（8640000 秒），目标时间方式支持任意未来时刻。' },
  ],
};
