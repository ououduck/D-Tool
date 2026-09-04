export default {
  slug: 'notes',
  name: '在线便签',
  desc: '轻量在线便签本，输入即自动保存在浏览器本地，支持导出为文本文件，无需登录。',
  keywords: '在线便签,便签本,记事本,在线记事,备忘录,自动保存,临时笔记',
  category: 'text',
  body: `<div class="toolbar">
  <span class="text-3" style="font-size:13.5px">内容自动保存到本浏览器，刷新不丢失</span>
  <span class="spacer"></span>
  <button id="nt-export" class="btn btn-ghost btn-sm">导出为 .txt</button>
  <button id="nt-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="field">
  <label for="nt-area" class="field-label">便签内容</label>
  <textarea id="nt-area" rows="14" placeholder="输入内容，自动保存到浏览器本地…"></textarea>
</div>
<div id="nt-meta" class="img-meta"></div>`,
  usage: `<ol>
  <li>直接在文本框输入，内容每 500ms 自动保存到浏览器 localStorage。</li>
  <li>刷新或关闭页面后重新打开，内容依然存在（同一浏览器与域名下）。</li>
  <li>“导出为 .txt”下载纯文本文件；“清空”删除本地保存的内容。</li>
</ol>`,
  faq: [
    { q: '数据保存在哪里？', a: '保存在当前浏览器的 localStorage 中，不上传服务器、不跨设备同步。清除浏览器数据或换浏览器会丢失。' },
    { q: '能存多少内容？', a: 'localStorage 通常有 5MB 上限（按字符计），作为便签足够；超出时会提示保存失败。' },
    { q: '适合存敏感信息吗？', a: '不适合。localStorage 明文存储，任何能访问该浏览器的进程/脚本都可读取；敏感信息请使用密码管理器。' },
  ],
};
