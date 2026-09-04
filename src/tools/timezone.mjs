export default {
  slug: 'timezone',
  name: '时区转换',
  desc: '在线时区转换工具，输入时间即可查看全球主要城市与 24 个时区的对应时刻，支持夏令时。',
  keywords: '时区转换,时差,北京时间,时区换算,世界时间,utc转换,时间换算',
  category: 'convert',
  body: `<div class="row">
  <div class="field grow">
    <label for="tz-in">时间</label>
    <input type="datetime-local" id="tz-in">
  </div>
  <div class="field">
    <label for="tz-from" class="field-label">来源时区</label>
    <select id="tz-from"></select>
  </div>
</div>
<div class="toolbar">
  <button id="tz-run" class="btn">转换</button>
  <button id="tz-now" class="btn btn-ghost">使用当前时间</button>
</div>
<div class="output">
  <div class="output-label">各时区对应时刻</div>
  <pre id="tz-out">等待转换…</pre>
</div>
<div class="note">基于浏览器 Intl API 计算，自动处理夏令时；无需网络请求。时区名称采用 IANA 标准（如 Asia/Shanghai）。</div>`,
  usage: `<ol>
  <li>输入时间并选择来源时区（默认你的本地时区），点击“转换”。</li>
  <li>输出包括：UTC、北京时间、纽约、伦敦、东京、悉尼等主要城市时刻，以及常用时区偏移对照。</li>
  <li>适合跨国会议安排、海外出差与远程协作。</li>
</ol>`,
  faq: [
    { q: '会自动处理夏令时吗？', a: '会。Intl API 按 IANA 时区规则自动计算夏令时偏移，纽约、伦敦等城市在夏令时期间会显示正确时刻。' },
    { q: '为什么有些城市名有多个时区？', a: '一些大城市跨时区（如俄罗斯的莫斯科）、或历史上有夏令时切换，这里按 IANA 标准时区名精确计算。' },
    { q: '支持任意时区吗？', a: '来源时区支持全部 IANA 时区（约 600 个），输出展示常用 24 个城市/时区。' },
  ],
};
