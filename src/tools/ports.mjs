export default {
  slug: 'ports',
  name: '常用端口表',
  desc: '常用 TCP/UDP 端口查询表：Web、数据库、邮件、远程连接等 40+ 个知名端口速查。',
  keywords: '端口查询,常用端口,端口号,端口列表,80端口,443端口,tcp端口',
  category: 'ref',
  body: `<div class="field">
  <label for="pt-search">搜索端口号或服务名</label>
  <input type="search" id="pt-search" placeholder="如：80、443、mysql、redis…">
</div>
<div class="table-wrap">
  <table class="data" id="pt-table"></table>
</div>
<div class="note">端口 0-1023 为知名端口，1024-49151 为注册端口，49152-65535 为动态端口。防火墙与安全组配置前请先确认服务实际监听端口。</div>`,
  usage: `<ol>
  <li>输入端口号（如 3306）或服务名（如 mysql）即可过滤。</li>
  <li>列表覆盖 Web、数据库、缓存、邮件、远程管理、代理等常用服务。</li>
  <li>适用于安全组规则配置、服务排障、网络分析。</li>
</ol>`,
  faq: [
    { q: '服务可以改用其他端口吗？', a: '可以，多数服务支持自定义端口；但客户端需同步修改，且部分端口可能被系统保留（如 445）。' },
    { q: '端口开放就安全吗？', a: '不安全。开放端口需配合认证、加密与访问控制；暴露数据库（3306/5432）到公网是常见安全事件成因。' },
    { q: '怎么查看本机监听端口？', a: 'Windows 用 netstat -ano，Linux/macOS 用 ss -tlnp 或 netstat -tlnp。' },
  ],
};
