export default {
  slug: 'mime',
  name: 'MIME 类型表',
  desc: '常用文件扩展名与 MIME 类型对照速查表，支持按扩展名或类型搜索，站长配置必备。',
  keywords: 'mime类型,mime,content-type,文件类型,扩展名对照,http头,mime查询',
  category: 'web',
  body: `<div class="field">
  <label for="mi-search">搜索扩展名或 MIME 类型</label>
  <input type="search" id="mi-search" placeholder="如：pdf、image、application/json…">
</div>
<div class="table-wrap">
  <table class="data" id="mi-table"></table>
</div>
<div class="note">MIME 类型通过 HTTP 响应头 Content-Type 告知浏览器资源类型；配置错误会导致文件被当作文本或下载而非预览。</div>`,
  usage: `<ol>
  <li>在搜索框输入扩展名（不带点，如 mp4）或 MIME 关键字（如 video），表格实时过滤。</li>
  <li>列表中常见扩展名标注了 charset（如 text/html; charset=utf-8）便于直接参考。</li>
  <li>适用于 nginx、Apache、Cloudflare 等平台的 MIME 配置核对。</li>
</ol>`,
  faq: [
    { q: '为什么服务器要正确配置 MIME？', a: '浏览器根据 Content-Type 决定渲染方式：text/html 会渲染页面，application/octet-stream 会强制下载。配置错误会导致乱码或无法预览。' },
    { q: 'JavaScript 应该用什么类型？', a: '现代规范为 text/javascript（旧标准曾用 application/javascript）。两种都能被浏览器识别，W3C 建议统一使用 text/javascript。' },
    { q: '上传文件需要自己判断 MIME 吗？', a: '可以依赖浏览器 File.type，但该值来自扩展名不可靠；后端校验时应读取文件头（magic bytes）判断真实类型。' },
  ],
};
