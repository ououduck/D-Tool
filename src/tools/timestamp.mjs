export default {
  slug: 'timestamp',
  name: '时间戳转换',
  desc: 'Unix 时间戳与日期互转工具，自动识别秒/毫秒，支持复制当前时间戳与多种格式输出。',
  keywords: '时间戳,unix时间戳,时间戳转换,timestamp,时间戳在线,毫秒时间戳',
  category: 'date',
  body: `<div class="stat-grid" id="ts-stats">
  <div class="stat"><div class="num mono" id="ts-now-s">…</div><div class="lbl">当前时间戳 · 秒</div></div>
  <div class="stat"><div class="num mono" id="ts-now-ms">…</div><div class="lbl">当前时间戳 · 毫秒</div></div>
</div>
<div class="field mt-12">
  <label for="ts-in">时间戳 → 日期</label>
  <input type="text" id="ts-in" class="mono" placeholder="输入秒（10 位）或毫秒（13 位）时间戳，自动识别">
</div>
<div class="field">
  <label for="ts-date">日期时间 → 时间戳</label>
  <input type="datetime-local" id="ts-date">
</div>
<div class="toolbar">
  <button id="ts-fill" class="btn btn-ghost btn-sm">填入当前时间戳</button>
  <button data-copy-from="#ts-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="ts-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">转换结果</div>
  <pre id="ts-out">输入时间戳或日期后自动转换</pre>
</div>`,
  usage: `<ol>
  <li>当前时间戳每秒自动刷新，可随时复制（秒或毫秒）。</li>
  <li>在“时间戳 → 日期”输入框粘贴秒（10 位）或毫秒（13 位）时间戳，结果自动展示本地时间、UTC 与 ISO 8601 格式。</li>
  <li>选择“日期时间”控件后自动转换为对应时间戳，两种转换都支持负数与 1970 年前后。</li>
</ol>`,
  faq: [
    { q: '秒和毫秒时间戳怎么区分？', a: '通常 10 位是秒、13 位是毫秒。本工具按位数自动识别；若你输入了特殊长度，可查看“毫秒”输出是否异常并手动补齐或截断。' },
    { q: '为什么显示的时间和预期差 8 小时？', a: '时间戳是 UTC 时刻，与时区无关。若输出显示 UTC 时间，与北京时间相差 8 小时属正常；本工具同时给出本地时间（自动按浏览器时区转换）。' },
    { q: '2038 年问题还存在吗？', a: '32 位系统的 2038 年问题在 JavaScript 中不存在——JS 的 Date 基于 64 位毫秒，可表示 ±1.08 亿年，本工具也能正确转换大时间戳。' },
  ],
};
