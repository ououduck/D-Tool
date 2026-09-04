export default {
  slug: 'http-status',
  name: 'HTTP 状态码查询',
  desc: 'HTTP 状态码大全：1xx-5xx 全部常见状态码含义速查表，支持按代码或关键词搜索。',
  keywords: 'http状态码,状态码大全,404,500,503,502,301,302,http错误码,状态码查询',
  category: 'ref',
  body: `<div class="field">
  <label for="hs-search">搜索状态码或含义</label>
  <input type="search" id="hs-search" placeholder="如：404、重定向、服务端错误…">
</div>
<div class="table-wrap">
  <table class="data" id="hs-table"></table>
</div>
<div class="note">状态码由三位数字组成：1xx 信息、2xx 成功、3xx 重定向、4xx 客户端错误、5xx 服务端错误。排查问题时先确认代码类别，再查看具体含义。</div>`,
  usage: `<ol>
  <li>在搜索框输入状态码数字（如 502）或关键词（如“缓存”“鉴权”），表格实时过滤。</li>
  <li>列表覆盖 RFC 标准与常见扩展状态码，附英文标准名与中文说明。</li>
  <li>适合排查接口/页面异常时快速对照。</li>
</ol>`,
  faq: [
    { q: '404 和 410 有什么区别？', a: '404 表示资源当前不存在（可能是临时或永久）；410 明确表示资源曾存在但已被永久删除，不会再出现。' },
    { q: '301 和 302 怎么选？', a: '301 永久重定向（网站改版换域名），302 临时重定向（活动页跳转）；SEO 场景永久迁移用 301，避免权重丢失。' },
    { q: '500 和 502、503、504 怎么区分？', a: '500 是应用代码错误；502 是网关/代理收到上游无效响应（如 PHP-FPM 挂了）；503 是服务过载或维护中；504 是网关等待上游超时。' },
  ],
};
