export default {
  slug: 'browser',
  name: '浏览器信息',
  desc: '查看当前浏览器与设备信息：User-Agent、分辨率、语言、内存、联网状态等，一键复制 JSON。',
  keywords: '浏览器信息,useragent,ua查看,浏览器版本,设备信息,屏幕分辨率,浏览器检测',
  category: 'web',
  body: `<div class="toolbar">
  <button id="br-run" class="btn">读取信息</button>
  <span class="spacer"></span>
  <button data-copy-from="#br-out" class="btn btn-ghost btn-sm">复制为 JSON</button>
</div>
<div class="table-wrap">
  <table class="data" id="br-table"></table>
</div>
<div id="br-out" class="hidden"></div>
<div class="note">信息读取自浏览器 navigator / screen 等 API，全程本地获取。不同浏览器对部分字段（如内存、内核数）支持不一，缺失项会显示“不支持”。</div>`,
  usage: `<ol>
  <li>点击“读取信息”，展示浏览器、系统、屏幕、网络等环境参数。</li>
  <li>复制为 JSON 可粘贴到 Issue、工单或调试场景，方便描述环境。</li>
  <li>User-Agent 为原始字符串，可配合在线 UA 解析工具进一步分析。</li>
</ol>`,
  faq: [
    { q: 'User-Agent 可以伪造吗？', a: '可以。UA 只是浏览器主动声明，可被插件或开发者工具修改，因此仅用于粗略统计，不应作为安全判断依据。' },
    { q: '设备内存和内核数准确吗？', a: 'navigator.deviceMemory 与 hardwareConcurrency 来自浏览器报告，反映了设备性能大致量级；部分浏览器为隐私会隐藏或取整。' },
    { q: '这些信息会被发送到服务器吗？', a: '不会。信息全部在浏览器本地读取并展示，本站不收集任何环境信息。' },
  ],
};
